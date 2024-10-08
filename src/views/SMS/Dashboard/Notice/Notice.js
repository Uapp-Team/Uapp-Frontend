import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Form, FormGroup, Input, Row } from "reactstrap";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import downloadBtn from "../../../../assets/img/download.png";
import uploadBtn from "../../../../assets/img/upload.png";
import { Upload } from "antd";
import { rootUrl } from "../../../../constants/constants";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import { useHistory, useParams } from "react-router-dom";

const Notice = () => {
  const [FileList6, setFileList6] = useState([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [noticeData, setNoticeData] = useState({});
  const [working, setWorking] = useState([]);
  const [noticeFor, setNoticeFor] = useState([]);
  const { addToast } = useToasts();
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  // const [featureId, setFeatureId] = useState(undefined);

  useEffect(() => {
    get(`NoticeUser/Index`).then((res) => {
      setNoticeFor(res);
      console.log(res, "notice");
    });
  }, []);

  // const handleFirstName = (e) => {
  //   setFirstName(e.target.value);
  //   if (e.target.value === "") {
  //     setFirstNameError("First name is required");
  //   } else {
  //     setFirstNameError("");
  //   }
  // };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "ordered" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  const handleChange6 = ({ fileList }) => {
    setFileList6(fileList);
    setAttachmentError("");
  };

  const handleChange = (e, id) => {
    let isChecked = e.target.checked;

    if (isChecked === true) {
      setWorking([...working, id]);
    } else {
      const res = working.filter((c) => c !== id);
      setWorking([res]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("Title", title);
    subData.append("Content", value);
    subData.append("UserTypeIds", working);
    subData.append(
      "AttachmentFile",
      FileList6.length === 0 ? null : FileList6[0]?.originFileObj
    );

    setButtonStatus(true);
    setProgress(true);
    post(`Notice/create`, subData).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);

        setFileList6([]);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      history.push("/NoticeList");
    });
  };
  return (
    <div>
      <BreadCrumb
        title="Notice Information"
        backTo="Notice"
        path={`/NoticeList`}
      />
      <Card>
        <CardBody>
          <p className="section-title">Create A New Notice</p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <FormGroup>
                  <span>
                    <span className="text-danger">*</span> Title
                  </span>

                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Enter Title"

                    // onChange={(e) => {
                    //   handleFirstName(e);
                    // }}
                  />
                  {/* <span className="text-danger">{firstNameError}</span> */}
                </FormGroup>

                <FormGroup row>
                  <Col md="12" className="mb-3" style={{ height: "370px" }}>
                    <span>
                      <span className="text-danger">*</span> Description
                    </span>
                    <ReactQuill
                      theme="snow"
                      value={value}
                      modules={modules}
                      className="editor-input"
                      onChange={setValue}
                    />
                  </Col>
                </FormGroup>

                <FormGroup row className="has-icon-left position-relative">
                  <Col md="4">
                    <span>Attachment</span>
                  </Col>
                  <Col md="4">
                    <Upload
                      multiple={false}
                      fileList={FileList6}
                      onChange={handleChange6}
                      beforeUpload={(file) => {
                        return false;
                      }}
                    >
                      {FileList6.length < 1 ? (
                        <img className="mb-1" src={uploadBtn} alt="" />
                      ) : (
                        ""
                      )}
                    </Upload>

                    <span className="text-danger">{attachmentError}</span>
                  </Col>
                  <Col md="4">
                    {noticeData?.cv?.fileUrl ? (
                      <a href={rootUrl + noticeData?.cv?.fileUrl}>
                        <img className="mb-1" src={downloadBtn} alt="" />
                      </a>
                    ) : null}
                  </Col>
                </FormGroup>

                <p className="section-title">Notice For </p>
                <>
                  {noticeFor?.map((notices, i) => (
                    <div key={i}>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>{notices?.name}</span>
                        </Col>
                        <Col md="6" className="ml-4">
                          <Input
                            type="checkbox"
                            onChange={(e) => handleChange(e, notices?.id)}
                          />
                        </Col>
                      </FormGroup>
                    </div>
                  ))}
                </>

                <FormGroup className="text-right">
                  <CancelButton />
                  <SaveButton
                    text="Create Notice"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                </FormGroup>
                {/* <FormGroup className="text-right">
                  <CancelButton cancel={ToBack} />
                  {permissions?.includes(permissionList?.Add_Employee) && (
                    <SaveButton
                      text="Create Staff"
                      progress={progress}
                      buttonStatus={buttonStatus}
                    />
                  )}
                </FormGroup> */}
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Notice;
