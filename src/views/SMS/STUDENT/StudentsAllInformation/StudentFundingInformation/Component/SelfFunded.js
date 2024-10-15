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
import { EyeOutlined } from '@ant-design/icons';
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
  const [previewFileType, setPreviewFileType] = useState("");

  //  Dynamic1  COde Start

  useEffect(() => {
    get(`SelfFunded/GetByStudentId/${studentid}`).then((res) => {
      console.log(res);
      setSelfFunding(res);
      setCheck(res);
    });
  }, [success, studentid]);

  useEffect(() => {
    if (selfFunding?.attachement) {
      setFileList1([
        {
          uid: selfFunding?.id,
          name: 'Attachement',
          status: 'done',
          url: rootUrl + selfFunding?.attachement,
        }
      ]);
    }
  }, [selfFunding]);

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
    // Infer file type if it's not provided
    const inferFileType = (file) => {
      const extension = file.url ? file.url.split('.').pop().toLowerCase() : '';
      switch (extension) {
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'gif':
          return 'image/jpeg';
        case 'pdf':
          return 'application/pdf';
        case 'doc':
          return 'application/msword';
        case 'docx':
          return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        default:
          return 'unknown';
      }
    };

    const fileType = file.type || inferFileType(file);
    if (fileType.startsWith('image')) {
      // If it's an image
      file.preview = await getBase64(file.originFileObj || file.url);
      setPreviewImage(file.preview || file.url);
      setPreviewFileType(fileType);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
    } else if (fileType === 'application/pdf') {
      // If it's a PDF
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage(pdfPreview);
      setPreviewVisible(true);
      setPreviewFileType(fileType);
      setPreviewTitle(file.name);
    } else if (
      fileType === 'application/msword' ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      // For DOC or DOCX files
      const googleViewer = `https://docs.google.com/viewer?url=${file.url || URL.createObjectURL(file.originFileObj)}&embedded=true`;
      setPreviewImage(googleViewer);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
      setPreviewFileType(fileType);
    } else {
      // Handle unsupported file types
      alert('Preview not available for this file type');
    }
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
                <span>Upload Document:</span>
              </Col>
              <Col sm="4">
                <Upload
                  onPreview={handlePreview1}
                  multiple={false}
                  fileList={FileList1}
                  onChange={handleChange1}
                  beforeUpload={(file) => false}
                  itemRender={(originNode, file) => (
                    <div style={{ display: 'flex', alignItems: 'baseLine' }}>
                      {originNode}
                      <EyeOutlined
                        style={{ marginLeft: '8px', cursor: 'pointer' }}
                        onClick={() => handlePreview1(file)}
                      />
                    </div>
                  )}
                >
                  {FileList1.length < 1 ? <UploadButton /> : ""}
                </Upload>

                {previewVisible && (
                  <Modal
                    title={previewTitle}
                    visible={previewVisible}
                    footer={null}
                    onCancel={() => setPreviewVisible(false)}
                  >
                    {previewFileType === 'application/pdf' ? (
                      <iframe
                        src={previewImage}
                        style={{ width: '100%', height: '80vh' }}
                        frameBorder="0"
                      ></iframe>
                    ) : (
                      <img alt={previewTitle} src={previewImage} style={{ width: '100%' }} />
                    )}
                  </Modal>
                )}

                <div className="text-danger d-block">{selfError}</div>
              </Col>

              <Col sm="4">
                {FileList1.length > 0 && selfFunding?.attachement ? (
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
