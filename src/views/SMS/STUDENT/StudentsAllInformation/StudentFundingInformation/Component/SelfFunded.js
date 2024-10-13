import { Upload, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { Col, FormGroup, Form, Row } from "reactstrap";
import * as Icon from "react-feather";
import { rootUrl } from "../../../../../../constants/constants";
import post from "../../../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../../../../helpers/get";
import SaveButton from "../../../../../../components/buttons/SaveButton";
import PreviousButton from "../../../../../../components/buttons/PreviousButton";
import { useHistory } from "react-router-dom";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import UploadButton from "../../../../../../components/buttons/UploadButton";
import DownloadButton from "../../../../../../components/buttons/DownloadButton";
const SelfFunded = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const [FileList1, setFileList1] = useState([]);
  const [selfError, setSelfError] = useState("");
  const [progress, setProgress] = useState(false);
  const { addToast } = useToasts();
  const [selfFunding, setSelfFunding] = useState({});
  const [check, setCheck] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  //  Dynamic1  COde Start

  useEffect(() => {
    get(`SelfFunded/GetByStudentId/${studentid}`).then((res) => {
      console.log(res);
      setSelfFunding(res);
      setCheck(res);
    });
  }, [success, studentid]);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setSelfError("");
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append(
      "SelfFundedFile",
      FileList1.length === 0 ? null : FileList1[0]?.originFileObj
    );
    if (!FileList1) {
      setSelfError("Please upload attachment");
    } else {
      // setButtonStatus(true);
      setProgress(true);
      post(`SelfFunded/Create`, subData).then((res) => {
        // setButtonStatus(false);
        setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccess(!success);
          history.push(`/addStudentEducationalInformation/${studentid}/${1}`);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  const handlePrevious = () => {
    history.push(`/addStudentApplicationInformation/${studentid}/${1}`);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="studentId"
          id="studentId"
          value={studentid}
        />
        <Row>
          <Col lg="6" md="8">
            <FormGroup>
              <span>
                Attachment (Bank statement, Job Reference with Salary Amount or
                Business Certificate)
              </span>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative">
              <Col sm="4">
                <span>Upload Image:</span>
              </Col>
              <Col sm="4">
                <Upload
                  listType="picture-card"
                  onPreview={handlePreview1}
                  multiple={false}
                  fileList={FileList1}
                  onChange={handleChange1}
                  beforeUpload={(file) => {
                    return false;
                  }}
                >
                  {FileList1.length < 1 ? (
                    <div className="text-danger" style={{ marginTop: 8 }}>
                      <Icon.Upload />
                    </div>
                  ) : ""}
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
                <div className="text-danger d-block">{selfError}</div>
              </Col>

              <Col sm="4">
                {selfFunding?.attachement ? (
                  <a href={rootUrl + selfFunding?.attachement} target="blank">
                    <DownloadButton />
                  </a>
                ) : null}
              </Col>
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col lg="6" md="8">
            <div>
              <input
                onChange={(e) => {
                  setCheck(e.target.checked);
                }}
                type="checkbox"
                name=""
                value=""
                checked={check}
              />{" "}
              <span>
                I confirm that all the information provided about my source fund
                is true, complete and accurate.
              </span>
            </div>
          </Col>
        </Row>
        <Row className=" mt-4">
          <Col lg="6" md="8" className="d-flex justify-content-between">
            <PreviousButton action={handlePrevious} />
            {permissions?.includes(permissionList?.Edit_Student) ? (
              <>
                {check && (
                  <SaveButton text="Save and Next" progress={progress} />
                )}
              </>
            ) : null}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SelfFunded;
