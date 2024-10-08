import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  Table,
  TabContent,
  TabPane,
  Form,
  FormGroup,
  Col,
} from "reactstrap";

import get from "../../../../../../helpers/get";

const SubjectInCampuses = () => {
  const activetab = "5";
  const [campusList, setCampusList] = useState([]);
  const history = useHistory();
  const { id, subjId } = useParams();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  useEffect(() => {
    get(`SubjectCampus/index?subjectid=${subjId}`).then((res) => {
      setCampusList(res);
    });
  }, [subjId]);

  return (
    <div className="custom-card-border p-4">
      <Table className="table-bordered">
        <thead className="tablehead">
          <td className="border-0">
            <b>Campus</b>
          </td>
          <td className="border-0 text-center">
            <b>Home</b>
          </td>
          <td className="border-0 text-center">
            <b>EU</b>
          </td>
          <td className="border-0 text-center">
            <b>International</b>
          </td>
        </thead>
        <tbody>
          {campusList.length > 0 &&
            campusList?.map((item, i) => (
              <tr key={i}>
                <td>{item?.name}</td>
                <td className="text-center">
                  {item?.isAcceptHomeAvailable &&
                    (item?.isAcceptHome === true ? "Yes" : "No")}
                </td>
                <td className="text-center">
                  {item?.isAcceptEU_UKAvailable &&
                    (item?.isAcceptEU_UK === true ? "Yes" : "No")}
                </td>
                <td className="text-center">
                  {item?.isAcceptInternationalAvailable &&
                    (item?.isAcceptInternational === true ? "Yes" : "No")}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SubjectInCampuses;
