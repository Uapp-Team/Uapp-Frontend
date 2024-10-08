import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { connect, useSelector } from "react-redux";
import preview from "../../../../assets/img/university/preview.png";
import removepic from "../../../../assets/img/university/remove.png";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { rootUrl } from "../../../../constants/constants";
import MediaPictures from "../UniversityMedia";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import ButtonLoader from "../../Components/ButtonLoader";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const AddUniversityGallery = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const history = useHistory();
  const [gallery, setGallery] = useState([]);
  const [FileList, setFileList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [galleryObj, setGalleryObj] = useState({});

  const [fileError, setFileError] = useState(false);
  const [delGalId, setDelGalId] = useState(0);
  const [delGalName, setDelGalName] = useState("");

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(true);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const { addToast } = useToasts();
  const { univerId } = useParams();

  const galleryResult = useSelector(
    (state) => state.UniversityGalleryImageReducer.universityGalleryImage
  );
  //
  const AuthStr = localStorage.getItem("token");

  const handleUpload = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    for (let i = 0; i < galleryResult.length; i++) {
      subdata.append(`mediaFile`, galleryResult[i]?.originFileObj);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        authorization: AuthStr,
      },
    };

    if (FileList.length < 1) {
      setFileError(true);
    } else {
      setLoading(true);
      setButtonStatus(true);
      setProgress(true);
      Axios.post(`${rootUrl}UniversityGallery/Create`, subdata, config).then(
        (res) => {
          setButtonStatus(false);
          setProgress(false);
          setSuccess(!success);
          setFileList([]);
          setFileError(false);
          setLoading(false);
          addToast(res.data.message, {
            appearance: "success",
            autoDismiss: true,
          });
        }
      );
    }
  };

  useEffect(() => {
    get(`UniversityGallery/GetByUniversity/${univerId}`).then((res) => {
      setLoading2(false);
      console.log(res);
      setGallery(res);
    });
  }, [success, univerId]);

  // useEffect(() => {
  //   const subdata = new FormData();
  //   subdata.append(`universityId`, univerId);

  //   for (let i = 0; i < galleryResult.length; i++) {
  //     subdata.append(`mediaFile`, galleryResult[i]?.originFileObj);
  //   }

  //   const config = {
  //     headers: {
  //       "content-type": "multipart/form-data",
  //       authorization: AuthStr,
  //     },
  //   };

  //   if (FileList.length < 1) {
  //     setFileError(true);
  //   } else {
  //     setLoading(true);
  //     setButtonStatus(true);
  //     setProgress(true);
  //     Axios.post(`${rootUrl}UniversityGallery/Create`, subdata, config).then(
  //       (res) => {
  //         setButtonStatus(false);
  //         setProgress(false);
  //         setSuccess(!success);
  //         setFileList([]);
  //         setFileError(false);
  //         setLoading(false);
  //         addToast(res.data.message, {
  //           appearance: "success",
  //           autoDismiss: true,
  //         });
  //       }
  //     );
  //   }
  // }, [FileList, univerId, galleryResult]);

  const handleDelete = (gallery) => {
    setDelGalName(gallery?.mediaFileMedia?.fileName);
    setDelGalId(gallery?.id);
    setDeleteModal(true);
  };

  // on Close Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
    setDelGalName("");
    setDelGalId(0);
  };
  // on Close View Modal
  const closeViewModal = () => {
    // setGalleryObj({});
    setViewModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    setButtonStatus1(true);
    setProgress1(true);
    remove(`UniversityGallery/Delete/${id}`).then((action) => {
      setButtonStatus1(false);
      setProgress1(false);
      setDeleteModal(false);
      setSuccess(!success);
      addToast(action, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelGalName("");
      setDelGalId(0);
    });
  };

  const handleView = (gallery) => {
    setGalleryObj(gallery);
    setViewModalOpen(true);
  };

  const goPrevious = () => {
    history.push(`/addUniversityFinancial/${univerId}`);
  };
  const goForward = () => {
    history.push(`/addUniversityTemplateDocument/${univerId}`);
  };

  return (
    <>
      {loading2 ? (
        <Loader />
      ) : (
        <>
          <p className="section-title">
            <span className="text-danger">*</span>Gallery
          </p>

          <div className="row mb-5">
            <div className="">
              <div className="container mt-2">
                <Form onSubmit={handleUpload}>
                  {/* <FormGroup row className="has-icon-left position-relative"> */}
                  <Input
                    type="hidden"
                    id="universityId"
                    name="universityId"
                    value={univerId}
                  />
                  {/* <Input type="hidden" id="Id" name="Id" value={selectedId} /> */}
                  {/* </FormGroup> */}
                  <FormGroup row className="has-icon-left position-relative">
                    {/* <Col md="5">
                      <span>
                        Select Files <span className="text-danger">*</span>{" "}
                      </span>
                    </Col> */}
                    <Col>
                      {loading ? (
                        <p className="text-center mt-4">Uploading...</p>
                      ) : (
                        <>
                          {
                            <MediaPictures
                              accept={
                                "image/png, image/jpeg, image/jpg, video/mp4"
                              }
                              FileList={FileList}
                              setFileList={setFileList}
                              setFileError={setFileError}
                            />
                          }

                          {fileError && (
                            <span className="text-danger">
                              At least one file is required
                            </span>
                          )}
                        </>
                      )}
                    </Col>
                  </FormGroup>

                  <FormGroup className="has-icon-left position-relative">
                    {permissions?.includes(permissionList.Edit_University) && (
                      <SaveButton
                        progress={progress}
                        buttonStatus={buttonStatus}
                      />
                    )}
                  </FormGroup>
                  {/* <FormGroup
                    row
                    className="has-icon-left position-relative"
                    style={{ display: "flex", justifyContent: "end" }}
                  >
                    <Col md="5">
                      <CustomButtonRipple
                        type={"submit"}
                        className={"mr-1 mt-3 badge-primary"}
                        name={progress ? <ButtonLoader /> : "Save"}
                        isDisabled={buttonStatus}
                        permission={6}
                      />
                    </Col>
                  </FormGroup> */}
                </Form>
              </div>
            </div>

            <div className="col-md-8">
              {gallery.length > 0 ? (
                <div className="container row g-4">
                  {gallery.map((gall, i) => (
                    <div key={i} className="containerCustom p-2">
                      <div className="uniGalleryImage">
                        {/* <img
                          src={rootUrl + gall?.mediaFileMedia?.thumbnailUrl}
                          alt="Avatar"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      */}
                        <div
                          style={{
                            backgroundImage: `url(${
                              rootUrl + gall?.mediaFileMedia?.thumbnailUrl
                            })`,
                            backgroundSize: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                        ></div>
                        <div className="uniShadow"></div>
                      </div>
                      <div className="middle d-flex">
                        <img
                          onClick={() => handleView(gall)}
                          src={preview}
                          alt=""
                          style={{ padding: "5px" }}
                        />

                        <img
                          onClick={() => handleDelete(gall)}
                          src={removepic}
                          alt=""
                          style={{ padding: "4px" }}
                        />
                      </div>
                    </div>
                  ))}

                  {/* view modal starts here */}
                  <Modal
                    size="50%"
                    isOpen={viewModalOpen}
                    toggle={closeViewModal}
                    className="uapp-modal2"
                  >
                    <ModalBody>
                      {/* <img
                              className="w-100 mx-auto"
                              src={
                                rootUrl + galleryObj?.mediaFileMedia?.fileUrl
                              }
                              alt=""
                            /> */}
                      {/* {galleryObj?.mediaFileMedia?.fileName.includes(".jpg") || galleryObj?.mediaFileMedia?.fileName.includes(".png") || galleryObj?.mediaFileMedia?.fileName.includes(".jfif") || galleryObj?.mediaFileMedia?.fileName.includes(".JPG") ? (
                        <img
                          src={rootUrl + galleryObj?.mediaFileMedia?.fileUrl}
                          alt="Avatar"
                          className="image"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        <video
                          src={rootUrl + galleryObj?.mediaFileMedia?.fileUrl}
                          width="480"
                          height="360"
                          controls
                        >
                          The browser does not support videos.
                        </video>
                      )} */}

                      {galleryObj?.mediaFileMedia?.mediaType === 1 ? (
                        <img
                          src={rootUrl + galleryObj?.mediaFileMedia?.fileUrl}
                          alt="gallery_image"
                          className="image"
                          style={{ width: "100%" }}
                        />
                      ) : galleryObj?.mediaFileMedia?.mediaType === 3 ? (
                        <video
                          src={rootUrl + galleryObj?.mediaFileMedia?.fileUrl}
                          width="100%"
                          height="100%"
                          controls
                        >
                          The browser does not support videos.
                        </video>
                      ) : (
                        <span>This format cannot be opened.</span>
                      )}
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        className=""
                        color="danger"
                        onClick={closeViewModal}
                      >
                        Close
                      </Button>
                    </ModalFooter>
                  </Modal>

                  {/* view modal ends here */}

                  {/* delete modal starts here */}
                  <ConfirmModal
                    text={`Do You Want To Delete This ${delGalName} Student Information ?`}
                    isOpen={deleteModal}
                    toggle={() => setDeleteModal(!deleteModal)}
                    confirm={() => handleDeleteItem(delGalId)}
                    cancel={() => setDeleteModal(false)}
                    buttonStatus={buttonStatus}
                    progress={progress}
                  />

                  {/* delete modal ends here */}
                </div>
              ) : (
                <p className="ml-1">There is no gallery item added here.</p>
              )}
            </div>
          </div>

          <Row className="mt-4">
            <Col className="d-flex justify-content-between mt-4">
              <PreviousButton action={goPrevious} />
              {FileList?.length === 0 && (
                <SaveButton text="Next" action={goForward} />
              )}
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  univerSityTypeList: state.universityTypeDataReducer.universityTypes,
  univerSityCountryList: state.universityCountryDataReducer.universityCountries,
  univerSityStateList: state.universityStateDataReducer.universityStates,
});

export default connect(mapStateToProps)(AddUniversityGallery);
