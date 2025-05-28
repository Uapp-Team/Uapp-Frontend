import { Upload } from "antd";
import React from "react";
import {
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import ButtonLoader from "../../../../Components/ButtonLoader";
import uapploader2 from "../../../../../../assets/img/profile-cover.png";
import { rootUrl } from "../../../../../../constants/constants";
import * as Icon from "react-feather";
import ImageUploadCrop from "../../../../../../components/ImageUpload/ImageUploadCrop";

const UpdateCoverPhoto = ({
  employeeDetails,
  permissions,
  permissionList,
  updateCoverPhoto,
  modalOpen,
  closeModal,
  handleSubmitCoverPhoto,
  id,
  handleCancel,
  previewImage,
  text,
  error,
  FileList,
  handlePreview,
  handleChange,
  previewVisible,
  previewTitle,
  buttonStatus,
  progress,
  croppedImage,
  setCroppedImage,
}) => {
  return (
    <div className="uapp-employee-cover-image">
      <div
        className="bg-image-profile"
        style={{
          backgroundImage: `url(${
            employeeDetails?.coverImage?.fileUrl
              ? rootUrl + employeeDetails?.coverImage?.fileUrl
              : uapploader2
          })`,
        }}
      >
        <div className="uplode-cover-image">
          <div className="uplode-cover-image">
            {permissions?.includes(permissionList.Update_SalesTeamLeader) ? (
              <span onClick={updateCoverPhoto}>
                {" "}
                <i className="fas fa-camera" style={{ cursor: "pointer" }}>
                  {" "}
                </i>
              </span>
            ) : null}
          </div>
        </div>

        <ImageUploadCrop
          modalOpen={modalOpen}
          closeModal={closeModal}
          heading="Update Cover Photo"
          onSubmit={handleSubmitCoverPhoto}
          croppedImage={croppedImage}
          setCroppedImage={setCroppedImage}
          error={error}
          errorText="Cover photo is required"
          progress={progress}
          buttonStatus={buttonStatus}
        />

        {/* cover photo edit modal starts here */}
        {/* <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
          <ModalHeader>Update Cover Photo</ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmitCoverPhoto}>
              <input type="hidden" name="id" id="id" value={id} />

              <FormGroup row className="has-icon-left position-relative">
                <Col className="ml-5" md="4">
                  <span>
                    Cover Photo <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <div className="row d-flex">
                    <div className="col-md-6">
                      <>
                        <Upload
                          listType="picture-card"
                          multiple={false}
                          fileList={FileList}
                          onPreview={handlePreview}
                          onChange={handleChange}
                          beforeUpload={(file) => {
                            return false;
                          }}
                        >
                          {FileList.length < 1 ? (
                            <div
                              className="text-danger"
                              style={{ marginTop: 8 }}
                            >
                              <Icon.Upload />
                              <br />
                              <span>Upload Image Here</span>
                            </div>
                          ) : (
                            ""
                          )}
                        </Upload>
                        <Modal
                          visible={previewVisible}
                          title={previewTitle}
                          footer={null}
                          onCancel={handleCancel}
                        >
                          <img
                            alt="example"
                            style={{ width: "100%" }}
                            src={previewImage}
                          />
                        </Modal>

                        <span className="text-danger d-block">{text}</span>

                        {error && (
                          <span className="text-danger">
                            Cover photo is required
                          </span>
                        )}
                      </>
                    </div>
                  </div>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col md="12">
                  <div className="d-flex justify-content-end">
                    <Button
                      color="danger"
                      onClick={closeModal}
                      className="mr-1 mt-3"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="ml-1 mt-3"
                      color="primary"
                      disabled={buttonStatus}
                    >
                      {progress ? <ButtonLoader /> : "Update"}
                    </Button>
                  </div>
                </Col>
              </FormGroup>
            </form>
          </ModalBody>
        </Modal> */}
        {/* cover photo edit modal ends here */}
      </div>
    </div>
  );
};

export default UpdateCoverPhoto;
