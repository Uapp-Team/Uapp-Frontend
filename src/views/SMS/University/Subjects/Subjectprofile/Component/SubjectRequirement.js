import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Col,
  TabContent,
  TabPane,
  Row,
  Button,
  ModalFooter,
  ModalBody,
  Modal,
  Table,
} from "reactstrap";
import get from "../../../../../../helpers/get";

const SubjectRequirement = () => {
  const activetab = "4";
  const [eduLevelDD, setEduLevelDD] = useState([]);
  const [eduLabel, setEduLabel] = useState("Select Education Level");
  const [eduValue, setEduValue] = useState(0);
  const [eduError, setEduError] = useState(false);
  const [requiredRes, setRequiredRes] = useState("");
  const [isEducationRequired, setIsEducationRequired] = useState(false);
  const [requiredId, setRequiredId] = useState(0);

  const [docuDD, setDocuDD] = useState([]);
  const [docuLabel, setDocuLabel] = useState("Select Document Group");
  const [docuValue, setDocuValue] = useState(0);
  const [docuError, setDocuError] = useState(false);
  const [applicationTypeDD, setApplicationTypeDD] = useState([]);
  const [appliLabel, setAppliLabel] = useState("Select Application type");
  const [appliValue, setAppliValue] = useState(0);
  const [appliError, setAppliError] = useState(false);
  const [documentGrpList, setDocumentGrpList] = useState([]);
  const [success, setSuccess] = useState(false);
  const [update, setUpdate] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);
  const [delRequiredDocuId, setDelRequiredDocuId] = useState(0);
  const [delRequiredDocuName, setDelRequiredDocuName] = useState("");

  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  const [progress, setProgress] = useState(false);
  const [progress1, setProgress1] = useState(false);
  const [progress2, setProgress2] = useState(false);
  const [progress3, setProgress3] = useState(false);
  const history = useHistory();

  const [document, setDocument] = useState([]);
  const [docLabel, setDocLabel] = useState("Select Document");
  const [docValue, setDocValue] = useState(0);
  const [docError, setDocError] = useState("");
  const [docList, setDocList] = useState([]);
  const [mand, setMand] = useState(false);

  const { id, subjId } = useParams();
  const [delData, setDelData] = useState({});
  const [resultInPercent, setResultInPercent] = useState("");
  const [resultInPercentError, setResultInPercentError] = useState("");
  useEffect(() => {
    get("EducationLevelDD/Index").then((res) => {
      setEduLevelDD(res);
    });

    get(`SubjectRequirement/GetBySubject/${subjId}`).then((res) => {
      console.log(res);
      setIsEducationRequired(res?.isEducationRequired);
      setEduLabel(
        res?.id !== undefined
          ? res?.educationLevel?.name
          : "Select Education Level"
      );
      setEduValue(res?.id !== undefined ? res?.educationLevel?.id : 0);
      setRequiredId(res?.id);
      setResultInPercent(res?.requiredResultInPercent);
    });
  }, [subjId]);
  useEffect(() => {
    get("DocumentGroupDD/Index").then((res) => {
      setDocuDD(res);
    });
    get("ApplicationTypeDD/Index").then((res) => {
      setApplicationTypeDD(res);
    });
    get(`SubjectDocumentRequirement/GetBySubject/${subjId}`).then((res) => {
      setDocumentGrpList(res);
    });

    get(`AdditionalDocumentRequirement/GetBySubject/${subjId}`).then((res) => {
      setDocList(res);
    });

    get(`DocumentDD/Index`).then((res) => {
      setDocument(res);
    });
  }, [subjId, success]);
  return (
    <div>
      <div>
        <p className="section-title">General requirement</p>
        <Card
          className="p-4"
          style={{ border: "0.5px solid rgba(37, 37, 37, 0.12)" }}
        >
          <span
            className="app-style-const p-2"
            style={{ backgroundColor: "#DFEEEE" }}
          >
            Education Required
          </span>
          <Table borderless responsive className="mb-4 ">
            <tbody>
              <tr
                style={{
                  borderBottom: "1px solid #2525251F",
                }}
              >
                <td width="40%">Education Level</td>

                <td width="60%">{eduLabel}</td>
              </tr>

              <tr
                style={{
                  borderBottom: "1px solid #2525251F",
                }}
              >
                <td width="40%">Required Result In Percent</td>

                <td width="60%">{resultInPercent}</td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </div>
      <div>
        <p className="section-title">Document requirement</p>
        {documentGrpList < 1 ? (
          <div className="mb-3">No data available</div>
        ) : (
          <div className="custom-card-border p-4 mb-4">
            <Table className="table-bordered">
              <thead className="tablehead">
                <tr>
                  {/* <th>SL/NO</th> */}
                  <th>Document Group</th>
                  <th>Documents</th>
                </tr>
              </thead>
              <tbody>
                {documentGrpList?.map((document, i) => (
                  <tr key={document.id}>
                    {/* <th scope="row">{i + 1}</th> */}
                    <td>
                      {document?.documentGroup?.title} -{" "}
                      {document?.applicationTypeId === 1
                        ? "Home"
                        : document?.applicationTypeId === 2
                        ? "EU/UK"
                        : "International"}
                    </td>
                    <td className="">
                      {document?.documents?.map((dc) => (
                        <li>{dc?.name}</li>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <div>
        <p className="section-title">Additional document requirement</p>
        <div className="custom-card-border p-4">
          {" "}
          <Table className=" table-bordered">
            <thead className="tablehead">
              <tr>
                {/* <th>SL/NO</th> */}
                <th>Document</th>
                <th>Application Type</th>
              </tr>
            </thead>
            <tbody>
              {docList?.map((document, i) => (
                <tr key={document.id}>
                  {/* <th scope="row">{i + 1}</th> */}
                  <td>{document?.document?.name}</td>
                  <td>
                    {document?.applicationTypeId === 1
                      ? "Home"
                      : document?.applicationTypeId === 2
                      ? "EU/UK"
                      : "International"}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SubjectRequirement;
