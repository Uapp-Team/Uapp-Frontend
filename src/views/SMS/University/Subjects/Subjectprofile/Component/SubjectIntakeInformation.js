import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Input,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
} from "reactstrap";

const SubjectIntakeInformation = () => {
  const [data, setData] = useState([]);
  const { subjId } = useParams();
  useEffect(() => {
    get(`SubjectIntake/GetAllCampusWithIntake?subjectId=${subjId}`).then(
      (res) => {
        console.log("subject intake campuses", res);
        setData(res);
      }
    );
  }, []);
  return (
    <div className="custom-card-border p-4">
      <Table className="table-bordered">
        <thead className="tablehead">
          <tr>
            <th>Intake</th>
            <th>Campuses</th>
            {/* <th>Intake Status</th>
     <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {data?.map((ls, i) => (
            <tr>
              <td>{ls?.intakeName}</td>
              <td>
                <Table className="table-sm">
                  <tbody>
                    {ls?.campusWithIntakeStatusViewModels?.map((l) => (
                      <tr>
                        <td style={{ border: "none" }}>{l?.campusName}</td>
                        <td style={{ border: "none" }}>
                          {l?.intakeStatusName}
                        </td>
                        {l?.intakeStatusName === "Open" && (
                          <td style={{ border: "none" }}>
                            {l?.applicationDeadLine}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SubjectIntakeInformation;
