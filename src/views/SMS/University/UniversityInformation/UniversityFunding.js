import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  FormGroup,
  Col,
  TabContent,
  TabPane,
} from "reactstrap";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UniversityNavbar from "../Components/UniversityNavbar";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const UniversityFunding = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const history = useHistory();
  const { univerId } = useParams();
  const activetab = "6";
  const [value, setValue] = useState("");
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [fundingId, setFundingId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`UniversityFunding/GetByUniversityId/${univerId}`).then((res) => {
      setLoading(false);
      setValue(res?.fundingDetails === "undefined" ? "" : res?.fundingDetails);
      setFundingId(res === null ? 0 : res?.id);
    });
  }, [univerId]);

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

  const goPrevious = () => {
    history.push(`/addUniversityTemplateDocument/${univerId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("fundingDetails", value);
    subData.append("universityId", univerId);
    subData.append("id", fundingId);

    setButtonStatus(true);
    setProgress(true);
    post(`UniversityFunding/Create`, subData).then((res) => {
      setButtonStatus(false);
      setProgress(false);
      setSuccess(!success);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setValue("");
        history.push(`/addUniversityRequirements/${univerId}`);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  return (
    <div>
      <BreadCrumb
        title="University Funding"
        backTo="University"
        path="/universityList"
      />

      <UniversityNavbar activetab={activetab} univerId={univerId} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="6">
                  <div className="">
                    <form onSubmit={handleSubmit}>
                      <p className="section-title">Funding</p>
                      <FormGroup
                        row
                        className="has-icon-left position-relative my-4"
                      >
                        <Col md="8" style={{ height: "370px" }}>
                          <ReactQuill
                            theme="snow"
                            value={value}
                            modules={modules}
                            className="editor-input"
                            onChange={setValue}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col
                          md="8"
                          className="d-flex justify-content-between mt-4"
                        >
                          <PreviousButton action={goPrevious} />
                          {permissions?.includes(
                            permissionList.Edit_University
                          ) && (
                            <SaveButton
                              text="Save and Next"
                              progress={progress}
                              buttonStatus={buttonStatus}
                            />
                          )}
                        </Col>
                      </FormGroup>
                    </form>
                  </div>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>

          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default UniversityFunding;
