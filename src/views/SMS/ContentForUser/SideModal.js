/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Row } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../components/buttons/SaveButton";
import post from "../../../helpers/post";
import { rootUrl } from "../../../constants/constants";
import MultiSelectU from "../../../components/form/MultiSelectU";
import { userTypes } from "../../../constants/userTypeConstant";
import ToggleSwitch from "../Components/ToggleSwitch";
import CancelButton from "../../../components/buttons/CancelButton";
import put from "../../../helpers/put";

const SideModal = ({
  title = "Content",
  details,
  isDetails,
  closeModal,
  success,
  setSuccess,
  edit,
  setEdit,
  handleDeleteContent,
  permission = false,
}) => {
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  const [isCheck, setIsCheck] = useState(false);
  const [file, setFile] = useState(null);
  const [imageTitle, setImageTitle] = useState(
    details?.contentTitle ? details?.contentTitle : ""
  );
  const [imageTitleError, setImageTitleError] = useState("");
  const [imageDetails, setImageDetails] = useState(
    details?.contentDetails ? details?.contentDetails : ""
  );
  // const [imageDetailsError, setImageDetailsError] = useState("");
  const [shareableLink, setShareableLink] = useState(
    details?.shareableLink ? details?.shareableLink : ""
  );
  // const [userLable, setUserLable] = useState("Select");
  const [userValue, setUserValue] = useState(
    details?.userTypeIds ? details?.userTypeIds : []
  );
  const [userError, setUserError] = useState("");
  const [isuserError, setIsUserError] = useState(false);
  const [tags, setTags] = useState([]);
  // const [isNewTag, setIsNewTag] = useState(false);
  // const [newTags, setNewTags] = useState([]);
  const [tagsError, setTagsError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [noteShow, setNoteShow] = useState(true);
  const [denie, setDenie] = useState(false);
  const [denieNote, setDenieNote] = useState("");
  const [denieError, setDenieError] = useState("");

  const adminPermission =
    userType === userTypes?.SystemAdmin.toString() ||
    userType === userTypes?.Admin.toString();

  useEffect(() => {
    const options = details?.tags?.map((item) => ({
      label: item?.tag,
      value: item?.tag,
    }));
    setTags(options);
  }, [details.tags]);

  const handleImageTitle = (e) => {
    let data = e.target.value.trimStart();
    setImageTitle(data);
    if (data === "") {
      setImageTitleError("Title is required");
    } else {
      setImageTitleError("");
    }
  };

  const handleDenieNote = (e) => {
    let data = e.target.value.trimStart();
    setDenieNote(data);
    if (data === "") {
      setDenieError("Note is required");
    } else {
      setDenieError("");
    }
  };

  const ValidateForm = () => {
    var isValid = true;

    if (!imageTitle) {
      isValid = false;
      setImageTitleError("Title is required");
    }
    // if (!imageDetails) {
    //   isValid = false;
    //   setImageDetailsError("Details is required");
    // }
    if (
      (userType === userTypes?.SystemAdmin.toString() ||
        userType === userTypes?.Admin.toString()) &&
      userValue.length === 0
    ) {
      isValid = false;
      setIsUserError(true);
      setUserError("User Type is required");
    }
    if (!tags) {
      isValid = false;
      setTagsError("Please input file category or add this field.");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    subData.append("contentFile", !isDetails ? details : file ? file : null);
    subData.append(
      "contentMediaId",
      details?.contentMediaId ? details?.contentMediaId : 0
    );
    subData.append(
      "userTypeIds",
      userValue.length !== 0
        ? JSON.stringify(userValue)
        : JSON.stringify([{ label: "UserType", value: userType }])
    );
    subData.append("previousTags", JSON.stringify(tags));
    // subData.append("newTags", JSON.stringify(newTags));
    if (ValidateForm()) {
      setProgress(true);
      setButtonStatus(true);

      if (details?.id) {
        put("MarketingContent/update", subData).then((res) => {
          setProgress(false);
          setButtonStatus(false);
          addToast(res?.data?.title, {
            appearance: res?.data?.isSuccess === true ? "success" : "error",
            autoDismiss: true,
          });
          res?.data?.isSuccess === true && closeModal();
          res?.data?.isSuccess === true && setSuccess(!success);
        });
      } else {
        post("MarketingContent/add", subData).then((res) => {
          if (res?.status === 400) {
            setTimeout(() => {
              post("MarketingContent/add", subData).then((res) => {
                if (res?.status === 400) {
                  setTimeout(() => {
                    post("MarketingContent/add", subData).then((res) => {
                      setProgress(false);
                      setButtonStatus(false);
                      addToast(res?.data?.title, {
                        appearance:
                          res?.data?.isSuccess === true ? "success" : "error",
                        autoDismiss: true,
                      });
                      res?.data?.isSuccess === true && closeModal();
                      res?.data?.isSuccess === true && setSuccess(!success);
                    });
                  }, 500);
                } else {
                  setProgress(false);
                  setButtonStatus(false);
                  addToast(res?.data?.title, {
                    appearance:
                      res?.data?.isSuccess === true ? "success" : "error",
                    autoDismiss: true,
                  });
                  res?.data?.isSuccess === true && closeModal();
                  res?.data?.isSuccess === true && setSuccess(!success);
                }
              });
            }, 500);
          } else {
            setProgress(false);
            setButtonStatus(false);
            addToast(res?.data?.title, {
              appearance: res?.data?.isSuccess === true ? "success" : "error",
              autoDismiss: true,
            });
            res?.data?.isSuccess === true && closeModal();
            res?.data?.isSuccess === true && setSuccess(!success);
          }
        });
      }
    }
  };

  const approve = () => {
    put(`MarketingContent/approve?id=${details?.id}&isCheck=${isCheck}`).then(
      (res) => {
        setProgress(false);
        setButtonStatus(false);
        addToast(res?.data?.title, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        res?.data?.isSuccess === true && closeModal();
        res?.data?.isSuccess === true && setSuccess(!success);
      }
    );
  };

  const submitDenie = (e) => {
    e.preventDefault();

    if (!denieNote) {
      setDenieError("Note is required");
    } else {
      const subData = new FormData(e.target);
      post("MarketingContent/deny", subData).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        addToast(res?.data?.title, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        res?.data?.isSuccess === true && closeModal();
        res?.data?.isSuccess === true && setSuccess(!success);
      });
    }
  };

  return (
    <>
      <div className="aff-content-modal overflowY">
        <div className="d-flex justify-content-between mb-30px">
          <h3>{title}</h3>
          <div>
            {(userType === userTypes?.SystemAdmin.toString() ||
              userType === userTypes?.Admin.toString() ||
              (permission === true && details?.content?.fileUrl)) && (
              <>
                {isDetails && (
                  <>
                    <span
                      className="search-key bg-orange-light pointer"
                      onClick={handleDeleteContent}
                    >
                      Delete
                      <i class="far fa-trash-alt ml-1"></i>
                    </span>

                    <span
                      onClick={() => {
                        setEdit(!edit);
                      }}
                      className="search-key mr-2 pointer"
                    >
                      Edit <i class="fas fa-pencil-alt ml-1"></i>
                    </span>
                  </>
                )}
              </>
            )}

            <span
              onClick={() => {
                closeModal();
              }}
              className="search-key mr-0 pointer"
            >
              Close <i class="fas fa-times ml-1"></i>
            </span>
          </div>
        </div>
        <Row>
          <Col className="">
            {/* <div
              className="bg-cover-img details-image"
              style={{
                background:
                  "url(" + !isDetails
                    ? URL.createObjectURL(details)
                    : rootUrl + details?.content?.fileUrl + ")",
              }}
            ></div> */}
            <p>Previous</p>
            {!isDetails ? (
              <div
                className="bg-cover-img details-image mb-30px"
                style={{
                  background: "url(" + URL.createObjectURL(details) + ")",
                }}
              ></div>
            ) : (
              <div
                className="bg-cover-img details-image mb-30px"
                style={{
                  background:
                    "url(" + rootUrl + details?.content?.fileUrl + ")",
                }}
              ></div>
            )}
          </Col>
          {/* <Col>
            <img
              className="w-100 mb-30px overflow-hidden details-image p-16px"
              src={
                !isDetails
                  ? URL.createObjectURL(details)
                  : rootUrl + details?.content?.fileUrl
              }
              alt=""
            />
          </Col> */}
          <Col className="mb-30px">
            {edit && (
              <>
                <p>New </p>

                {file ? (
                  <div
                    className="bg-cover-img details-image mb-30px"
                    style={{
                      background: "url(" + URL.createObjectURL(file) + ")",
                    }}
                  ></div>
                ) : (
                  // <img
                  //   className="w-100 mb-30px overflow-hidden details-image p-16px"
                  //   src={URL.createObjectURL(file)}
                  //   alt=""
                  // />
                  <div className="h-100 pb-30px">
                    <label
                      className="details-upload pointer"
                      htmlFor="content2"
                    >
                      <h1 className="mb-0">+</h1>
                      <span>Upload Here</span>
                    </label>{" "}
                    <input
                      name="content2"
                      id="content2"
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>

        <hr className="mb-30px" />
        {isDetails && !edit ? (
          <>
            {permission && adminPermission && (
              <>
                <h3>{details?.createdByName}</h3>
                <p className="text-uapp">{details?.userViewId}</p>
              </>
            )}

            {details?.tags?.map((item, i) => (
              <p className="search-key" key={i}>
                {item?.tag}
              </p>
            ))}

            <h3 className="mt-3">{details?.contentTitle}</h3>
            <p style={{ color: "#495057" }}>{details?.contentDetails}</p>

            {details?.shareableLink && (
              <p>
                <a
                  href={details?.shareableLink}
                  target="blank"
                  className="text-uapp"
                >
                  Shareable Link
                </a>
              </p>
            )}
            <div className="mr-3 mb-3">
              <a href={rootUrl + details?.content?.fileUrl} target="blank">
                <SaveButton text="Download" />
              </a>
            </div>

            {permission && details?.rejectionReasons.length > 0 && (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                  <span className="fw-500">Note</span>
                  <span
                    className="fs-12px text-uapp pointer text-underline"
                    onClick={() => setNoteShow(!noteShow)}
                  >
                    {noteShow ? "Hide Note" : "Show Note"}
                  </span>
                </div>

                {noteShow && (
                  <>
                    {details?.rejectionReasons?.map((item, i) => (
                      <p className="details-note" key={i}>
                        <span>{item?.createdDate}</span>
                        <hr className="my-1" />
                        <span className="text-gray-70">{item?.note}</span>
                      </p>
                    ))}
                  </>
                )}
              </>
            )}

            {!adminPermission && (
              <SaveButton
                text="Re-Upload"
                progress={progress}
                buttonStatus={buttonStatus}
                action={() => setEdit(!edit)}
              />
            )}

            <>
              {adminPermission && denie ? (
                <Form onSubmit={submitDenie} className="w-75">
                  <input
                    name="contentId"
                    value={details?.id ? details?.id : 0}
                    type="hidden"
                  />
                  <FormGroup>
                    <span>Note</span>
                    <Input
                      className="form-mt"
                      type="textarea"
                      name="note"
                      id="note"
                      onChange={(e) => {
                        handleDenieNote(e);
                      }}
                      placeholder="Add a note explaining the reason for denial"
                      value={denieNote}
                    />
                    <span className="text-danger">{denieError}</span>
                  </FormGroup>

                  <div className="d-flex justify-content-start align-items-center mb-3">
                    <SaveButton
                      text="Submit"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />

                    <CancelButton
                      cancel={() => setDenie(!denie)}
                      className="ml-2"
                    />
                  </div>
                </Form>
              ) : (
                <>
                  {permission && adminPermission && (
                    <>
                      <div className="d-flex justify-content-start align-items-center">
                        <p>Publish for all</p>
                        <span className="ml-2">
                          <ToggleSwitch
                            defaultChecked={isCheck}
                            onChange={() => setIsCheck(!isCheck)}
                          />
                        </span>
                      </div>

                      <div className="d-flex justify-content-start align-items-center mb-3">
                        <SaveButton
                          text="Aprove"
                          progress={progress}
                          buttonStatus={buttonStatus}
                          action={approve}
                        />

                        {!isCheck && (
                          <CancelButton
                            text="Denied"
                            cancel={() => setDenie(!denie)}
                            className="ml-2 bg-red text-white"
                          />
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          </>
        ) : (
          <>
            <Form onSubmit={handleSubmit} className="w-75">
              <input
                name="id"
                value={details?.id ? details?.id : 0}
                type="hidden"
              />
              <FormGroup>
                <span>
                  <span className="text-danger">*</span>File Title
                </span>
                <Input
                  className="form-mt"
                  type="text"
                  name="contentTitle"
                  id="contentTitle"
                  onChange={(e) => {
                    handleImageTitle(e);
                  }}
                  placeholder="Provide a title for your file"
                  value={imageTitle}
                />

                <span className="text-danger">{imageTitleError}</span>
              </FormGroup>
              <FormGroup>
                <span>Description</span>
                <Input
                  className="form-mt"
                  type="textarea"
                  name="contentDetails"
                  id="contentDetails"
                  onChange={(e) => {
                    setImageDetails(e.target.value.trimStart());
                  }}
                  placeholder="Add a brief description of the file (optional)"
                  value={imageDetails}
                />
                {/* <span className="text-danger">{imageDetailsError}</span> */}
              </FormGroup>
              <FormGroup>
                <span>Shareable Link</span>
                <Input
                  className="form-mt"
                  type="text"
                  name="shareableLink"
                  id="shareableLink"
                  onChange={(e) => {
                    setShareableLink(e.target.value.trimStart());
                  }}
                  placeholder="Paste your Google Drive and drop box link here"
                  value={shareableLink}
                />
                <span className="text-gray">
                  Ensure the Google Drive link is set to be shareable with
                  anyone
                </span>
              </FormGroup>

              {adminPermission && (
                <FormGroup>
                  <span>
                    <span className="text-danger">*</span>User Type
                  </span>
                  <MultiSelectU
                    url="UserTypeDD/get-marketing-selects"
                    value={userValue}
                    setValue={setUserValue}
                    name="userTypeIds"
                    error={isuserError}
                    setError={setIsUserError}
                    errorText={userError}
                  />
                </FormGroup>
              )}
              <FormGroup>
                <span>
                  <span className="text-danger">*</span>Category
                </span>

                <MultiSelectU
                  url="MarketingContent/get-tag-selects"
                  value={tags}
                  setValue={setTags}
                />

                {/* <div
                  className="text-right pointer fw-500 text-link"
                  onClick={() => setIsNewTag(!isNewTag)}
                >
                  {!isNewTag && "+ Add new"}
                </div>
                {isNewTag && (
                  <MultiTextSelect value={newTags} setValue={setNewTags} />
                )} */}
                <span className="text-danger">{tagsError}</span>
              </FormGroup>
              <FormGroup>
                <SaveButton
                  text="Upload"
                  progress={progress}
                  buttonStatus={buttonStatus}
                />
              </FormGroup>
            </Form>
          </>
        )}
      </div>
    </>
  );
};

export default SideModal;
