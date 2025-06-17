import React from "react";
import {
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import ButtonLoader from "../../../../Components/ButtonLoader";
import EditDivButton from "../../../../Components/EditDivButton";
import * as Icon from "react-feather";
import { Upload } from "antd";
import { rootUrl } from "../../../../../../constants/constants";
import uapploader from "../../../../../../assets/img/profile-img.png";

const UpdateProfilePhoto = ({
  employeeDetails,
  permissionList,
  permissions,
  updateProfilePic,
  modalOpen2,
  closeModal1,
  handleSubmitProfilePhoto,
  FileList1,
  id,
  handlePreview1,
  handleChange1,
  previewVisible1,
  previewTitle1,
  handleCancel1,
  previewImage1,
  text1,
  error1,
  progress,
  buttonStatus1,
  redirect,
}) => {
  return (
    <div className="uapp-employee-profile-image-edit">
      <Row>
        <Col>
          <div className="uapp-employee-profile-image">
            <div className="text-left">
              <div className="profile-pic">
                {employeeDetails?.profileImage == null ? (
                  <img
                    className="empProfileImg"
                    src={uapploader}
                    alt="profile_img"
                  />
                ) : (
                  <img
                    className="empProfileImg"
                    src={rootUrl + employeeDetails?.profileImage?.fileUrl}
                    alt="profile_img"
                  />
                )}
                {permissions?.includes(
                  permissionList.Update_SalesTeamLeader
                ) ? (
                  <div class="edit">
                    <span onClick={updateProfilePic}>
                      <i
                        className="fas fa-camera"
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                      </i>
                    </span>
                  </div>
                ) : null}
              </div>

              {/* profile photo edit modal starts here */}
              <Modal
                isOpen={modalOpen2}
                toggle={closeModal1}
                className="uapp-modal"
              >
                <ModalHeader>Update Profile Photo</ModalHeader>

                <ModalBody>
                  <form onSubmit={handleSubmitProfilePhoto}>
                    <input type="hidden" name="id" id="id" value={id} />

                    <FormGroup row className="has-icon-left position-relative">
                      <Col className="ml-5" md="4">
                        <span>
                          Profile Photo <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <div className="row d-flex">
                          <div className="col-md-6">
                            <>
                              <Upload
                                listType="picture-card"
                                multiple={false}
                                fileList={FileList1}
                                onPreview={handlePreview1}
                                onChange={handleChange1}
                                beforeUpload={(file) => {
                                  return false;
                                }}
                              >
                                {FileList1.length < 1 ? (
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
                                visible={previewVisible1}
                                title={previewTitle1}
                                footer={null}
                                onCancel={handleCancel1}
                              >
                                <img
                                  alt="example"
                                  style={{ width: "100%" }}
                                  src={previewImage1}
                                />
                              </Modal>

                              <span className="text-danger d-block">
                                {text1}
                              </span>

                              {error1 && (
                                <span className="text-danger">
                                  Profile photo is required
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
                            onClick={closeModal1}
                            className="mr-1 mt-3"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            className="ml-1 mt-3"
                            color="primary"
                            disabled={buttonStatus1}
                          >
                            {progress ? <ButtonLoader /> : "Update"}
                          </Button>
                        </div>
                      </Col>
                    </FormGroup>
                  </form>
                </ModalBody>
              </Modal>
              {/* profile photo edit modal ends here */}
            </div>
          </div>
        </Col>

        <Col>
          {permissions?.includes(permissionList?.Update_SalesTeamLeader) ? (
            <EditDivButton
              className={"uapp-employee-profile-Edit"}
              func={() => redirect(id)}
            />
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default UpdateProfilePhoto;
