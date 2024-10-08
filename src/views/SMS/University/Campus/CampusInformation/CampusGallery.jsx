import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Card,
  CardBody,
  Col,
  Input,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import get from "../../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../../../components/buttons/SaveButton";
import CampusNavbar from "../CampusNavbar";
import remove from "../../../../../helpers/remove";
import MediaPictures from "../../UniversityMedia";
import { rootUrl } from "../../../../../constants/constants";
import ButtonLoader from "../../../../../components/buttons/ButtonLoader";
import preview from "../../../../../assets/img/university/preview.png";
import removepic from "../../../../../assets/img/university/remove.png";
import Axios from "axios";
import PreviousButton from "../../../../../components/buttons/PreviousButton";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const CampusGallery = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const { uniId, campusId } = useParams();
  const [gallery, setGallery] = useState([]);
  const [FileList, setFileList] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [galleryObj, setGalleryObj] = useState({});
  const [fileError, setFileError] = useState(false);
  const [delGalId, setDelGalId] = useState(0);
  const [delGalName, setDelGalName] = useState("");
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const { addToast } = useToasts();

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
      Axios.post(`${rootUrl}CampusGallery/Create`, subdata, config).then(
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
    get(`CampusGallery/GetByCampusId/${campusId}`).then((res) => {
      console.log(res);
      setGallery(res);
    });
  }, [success, campusId]);

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
    remove(`CampusGallery/Delete/${id}`).then((action) => {
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
    history.push(`/CampusSubjectIntake/${uniId}/${campusId}`);
  };

  return (
    <div>
      <CampusNavbar
        title="Campus Information"
        activeTab="4"
        id={uniId}
        subId={campusId}
      />
      <Card>
        <CardBody>
          <p className="section-title">Gallery</p>

          <div className="row mb-5">
            <div className="">
              <div className="container mt-2">
                <Form onSubmit={handleUpload}>
                  <Input
                    type="hidden"
                    id="campusId"
                    name="campusId"
                    value={campusId}
                  />

                  <FormGroup row className="has-icon-left position-relative">
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
                        text="Save"
                        progress={progress}
                        buttonStatus={buttonStatus}
                      />
                    )}
                  </FormGroup>
                </Form>
              </div>
            </div>

            <div className="col-md-8">
              {gallery.length > 0 ? (
                <div className="container row g-4">
                  {gallery.map((gall, i) => (
                    <div key={i} className="containerCustom p-2">
                      <div className="uniGalleryImage">
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

                  <Modal
                    isOpen={deleteModal}
                    toggle={closeDeleteModal}
                    className="uapp-modal"
                  >
                    <ModalBody>
                      <p>
                        Are You Sure to Delete this <b>{delGalName}</b> ? Once
                        Deleted it can't be Undone!
                      </p>
                    </ModalBody>

                    <ModalFooter>
                      <Button onClick={closeDeleteModal}>NO</Button>

                      <Button
                        color="danger"
                        onClick={() => handleDeleteItem(delGalId)}
                        disabled={buttonStatus1}
                      >
                        {progress1 ? <ButtonLoader /> : "YES"}
                      </Button>
                    </ModalFooter>
                  </Modal>

                  {/* delete modal ends here */}
                </div>
              ) : (
                <p className="ml-1">There is no gallery item added here.</p>
              )}
            </div>
          </div>
          <FormGroup className="mt-4 text-left">
            <PreviousButton action={goPrevious} />
          </FormGroup>
        </CardBody>
      </Card>
    </div>
  );
};

export default CampusGallery;
