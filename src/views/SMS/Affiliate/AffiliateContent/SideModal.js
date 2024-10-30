import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import MultiTextSelect from "../../../../components/form/MultiTextSelect";
import MultiSelect from "../../../../components/form/MultiSelect";
import SaveButton from "../../../../components/buttons/SaveButton";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";

const SideModal = ({
  title = "Content",
  details,
  isDetails,
  closeModal,
  success,
  setSuccess,
}) => {
  const { addToast } = useToasts();
  const [imageTitle, setImageTitle] = useState("");
  const [imageTitleError, setImageTitleError] = useState("");
  const [imageDetails, setImageDetails] = useState("");
  const [imageDetailsError, setImageDetailsError] = useState("");
  const [userLable, setUserLable] = useState("Select");
  const [userValue, setUserValue] = useState(0);
  const [userError, setUserError] = useState("");
  const [tags, setTags] = useState([]);
  const [isNewTag, setIsNewTag] = useState(false);
  const [newTags, setNewTags] = useState([]);
  const [tagsError, setTagsError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);

  const handleImageTitle = (e) => {
    let data = e.target.value.trimStart();
    setImageTitle(data);
    if (data === "") {
      setImageTitleError("Title is required");
    } else {
      setImageTitleError("");
    }
  };

  const handleImageDetails = (e) => {
    let data = e.target.value.trimStart();
    setImageDetails(data);
    if (data === "") {
      setImageDetailsError("Details is required");
    } else {
      setImageDetailsError("");
    }
  };

  const ValidateForm = () => {
    var isValid = true;

    if (!imageTitle) {
      isValid = false;
      setImageTitleError("Title is required");
    }
    if (!imageDetails) {
      isValid = false;
      setImageDetailsError("Details is required");
    }
    if (userValue == 0) {
      isValid = false;
      setUserError("User Type is required");
    }
    if (!tags && !newTags) {
      isValid = false;
      setTagsError("Tags is required");
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    subData.append("contentFile", details);
    subData.append("previousTags", JSON.stringify(tags));
    subData.append("newTags", JSON.stringify(newTags));
    if (ValidateForm()) {
      setButtonStatus(true);

      post("MarketingContent/add", subData).then((res) => {
        addToast(res?.data?.title, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setSuccess(!success);

        setButtonStatus(false);
      });
    }
  };

  return (
    <>
      <div className="aff-content-modal overflowY">
        <div className="d-flex justify-content-between mb-30px">
          <h3>{title}</h3>
          <div>
            <span
              className="search-key bg-orange-light pointer"
              onClick={() => closeModal(false)}
            >
              Delete
              <i class="far fa-trash-alt ml-2"></i>
            </span>

            <span
              onClick={() => closeModal(false)}
              className="search-key mr-0 pointer"
            >
              Close <i class="fas fa-times ml-2"></i>
            </span>
          </div>
        </div>

        <img
          className="w-100 mb-30px overflow-hidden"
          src={
            !isDetails
              ? URL.createObjectURL(details)
              : `https://avatars.githubusercontent.com/u/86868333?v=4`
          }
          alt=""
        />

        {/* <div
          className="bg-cover-img h-350px mb-30px"
          style={{
            background:
              "url(" + !isDetails
                ? URL.createObjectURL(details)
                : `https://avatars.githubusercontent.com/u/86868333?v=4` + ")",
          }}
        ></div> */}

        <hr className="mb-30px" />
        {isDetails ? (
          <>
            <h3>Facebook banner.jpg</h3>
          </>
        ) : (
          <>
            <Form onSubmit={handleSubmit} className="w-75">
              <FormGroup>
                <span>
                  <span className="text-danger">*</span>Image Title
                </span>
                <Input
                  className="form-mt"
                  type="text"
                  name="contentTitle"
                  id="contentTitle"
                  onChange={(e) => {
                    handleImageTitle(e);
                  }}
                  placeholder="Enter Image Title"
                  value={imageTitle}
                />
                <span className="text-danger">{imageTitleError}</span>
              </FormGroup>{" "}
              <FormGroup>
                <span>Image Details</span>
                <Input
                  className="form-mt"
                  type="textarea"
                  name="contentDetails"
                  id="contentDetails"
                  onChange={(e) => {
                    handleImageDetails(e);
                  }}
                  placeholder="Enter Image Details"
                  value={imageDetails}
                />
                <span className="text-danger">{imageDetailsError}</span>
              </FormGroup>
              <FormGroup>
                <span>User Type</span>
                <DefaultDropdownU
                  label={userLable}
                  setLabel={setUserLable}
                  value={userValue}
                  setValue={setUserValue}
                  url="UserTypeDD/get-marketing-selects"
                  name="userTypeId"
                  error={userError}
                  setError={setUserError}
                  action={() => {}}
                />
              </FormGroup>
              <FormGroup>
                <span>Choose Tags</span>

                <MultiSelect
                  url="ProviderDD/index"
                  value={tags}
                  setValue={setTags}
                />

                <div
                  className="text-right pointer fw-500 text-link"
                  onClick={() => setIsNewTag(!isNewTag)}
                >
                  + Add new
                </div>
                {isNewTag && (
                  <MultiTextSelect value={newTags} setValue={setNewTags} />
                )}
                <span className="text-danger">{tagsError}</span>
              </FormGroup>
              <FormGroup>
                <SaveButton
                  text="Submit"
                  progress={buttonStatus}
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
