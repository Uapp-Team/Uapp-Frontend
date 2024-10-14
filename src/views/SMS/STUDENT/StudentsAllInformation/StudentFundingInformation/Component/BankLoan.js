import { Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { Col, FormGroup, Form, Row } from "reactstrap";
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

const BankLoan = ({ studentid, success, setSuccess }) => {
  const history = useHistory();
  const [FileList1, setFileList1] = useState([]);
  const [bLoanError, setBLoanError] = useState("");
  const { addToast } = useToasts();
  const [bankFunding, setBankFunding] = useState({});
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [check, setCheck] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewFileType, setPreviewFileType] = useState("");
  const [selfError, setSelfError] = useState("");

  //  Dynamic4  COde Start

  useEffect(() => {
    get(`BankLoan/GetByStudentId/${studentid}`).then((res) => {
      console.log(res);
      setBankFunding(res);
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

  const handlePreview1 = async (file) => {
    if (file.type.startsWith('image')) {
      file.preview = await getBase64(file.originFileObj)
      setPreviewImage(file.preview || file.url);
      setPreviewFileType(file.type);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
    } else if (file.type === 'application/pdf') {
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage(pdfPreview); // You can use this in an iframe in the modal
      setPreviewVisible(true);
      setPreviewFileType(file.type);
      setPreviewTitle(file.name);
    } else if (
      file.type === 'application/msword' ||
      file.type ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      // For DOC or DOCX files, use Google Docs Viewer
      const googleViewer = `https://docs.google.com/viewer?url=${file.url || URL.createObjectURL(file.originFileObj)}&embedded=true`;
      setPreviewImage(googleViewer);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
      setPreviewFileType(file.type);
    } else {
      // Handle other file types or show an alert for unsupported types
      alert('Preview not available for this file type');
    }
  };

  const handleChange1 = ({ fileList }) => {
    setFileList1(fileList);
    setBLoanError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("bankLoanFile", FileList1[0]?.originFileObj);

    // setButtonStatus(true);
    setProgress(true);
    post(`BankLoan/Create`, subData).then((res) => {
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
  };

  const handlePrevious = () => {
    history.push(`/addStudentApplicationInformation/${studentid}/${1}`);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <input
          name="studentId"
          id="studentId"
          value={studentid}
          type="hidden"
        />

        <Row>
          <Col lg="6" md="8">
            <FormGroup>
              <span>
                Attachment ( If already applied please attach prove, If not we
                will ask latter)
              </span>
            </FormGroup>
            <FormGroup row>
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
                {bankFunding?.attachement ? (
                  <a href={rootUrl + bankFunding?.attachement} target="blank">
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

export default BankLoan;
