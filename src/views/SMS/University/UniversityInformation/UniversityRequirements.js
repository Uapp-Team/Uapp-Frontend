import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  FormGroup,
  Col,
  TabContent,
  TabPane,
  Row,
} from "reactstrap";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";
import ButtonLoader from "../../Components/ButtonLoader";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UniversityNavbar from "../Components/UniversityNavbar";
import Loader from "../../Search/Loader/Loader";
import UniversityEnglishRequirements from "./UniversityEnglishRequirements";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const UniversityRequirements = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const history = useHistory();
  const { univerId } = useParams();
  const activetab = "7";
  const [value, setValue] = useState("");

  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [requirementId, setRequirementId] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(`GeneralRequirement/GetByUniversityId/${univerId}`).then((res) => {
      setLoading(false);
      setValue(
        res?.requirementDetails === "undefined" ? "" : res?.requirementDetails
      );
      setRequirementId(res === null ? 0 : res?.id);
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
    history.push(`/addUniversityFunding/${univerId}`);
  };
  const goForward = () => {
    history.push(`/addUniversityRecruitmentType/${univerId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("requirementDetails", value);
    subData.append("universityId", univerId);
    subData.append("id", requirementId);

    setProgress(true);
    post(`GeneralRequirement/Create`, subData).then((res) => {
      setProgress(false);
      setSuccess(!success);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
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
        title="University General Requirements"
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
                <TabPane tabId="7">
                  <div>
                    <form onSubmit={handleSubmit}>
                      <p className="section-title">
                        General admission requirements
                      </p>
                      <FormGroup row>
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

                      <FormGroup row className="text-right">
                        <Col md="8">
                          {permissions?.includes(
                            permissionList.Edit_University
                          ) && <SaveButton progress={progress} />}
                        </Col>
                      </FormGroup>
                    </form>
                    <UniversityEnglishRequirements />
                  </div>
                  <Row className="mt-4">
                    <Col className="d-flex justify-content-between mt-4">
                      <PreviousButton action={goPrevious} />
                      <SaveButton text="Next" action={goForward} />
                    </Col>
                  </Row>
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

export default UniversityRequirements;
