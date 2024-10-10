import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { permissionList } from "../../../../../constants/AuthorizationConstant";
import post from "../../../../../helpers/post";

const PersonalStatementCard = ({
  sId,
  studentStatement,
  setStudentStatement,
  scanId,
  setScanId,
  result,
  setResult,
  activity,
}) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`PersonalStatement/GetByStudentId/${sId}`).then((res) => {
      setStudentStatement(res);
      setScanId(res?.scanId);
    });
  }, [sId, setStudentStatement, setScanId]);

  useEffect(() => {
    if (scanId) {
      post(`${scanId}/checkResult`).then((res) => {
        setResult(res?.data?.completedCallback?.results);
      });
    }
  }, [scanId, setResult]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b> Personal Statement</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList?.Edit_Student) && activity ? (
              <Link to={`/addPersonalStatement/${sId}/${1}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      {result && (
        <div className="custom-card-border p-20px mb-4 d-flex justify-content-between">
          <div>
            <p className="mb-0">
              Identical Words: {result?.score?.identicalWords}
            </p>
            <p className="mb-0">
              Related Words: {result?.score?.relatedMeaningWords}
            </p>
            <p className="mb-0">
              Minor Words: {result?.score?.minorChangedWords}
            </p>
          </div>
          <div className="text-center">
            <h3
              className={
                result?.score?.aggregatedScore < 25
                  ? `text-success fw-600`
                  : result?.score?.aggregatedScore < 50
                  ? `text-warning fw-600`
                  : `text-danger fw-600`
              }
            >
              {result?.score?.aggregatedScore}%
            </h3>
            <h6
              className={
                result?.score?.aggregatedScore < 25
                  ? `text-success fw-600`
                  : result?.score?.aggregatedScore < 50
                  ? `text-warning fw-600`
                  : `text-danger fw-600`
              }
            >
              Plagiarism
            </h6>
          </div>
        </div>
      )}
      <p className="pl-10px text-justify">{studentStatement?.statement}</p>
    </>
  );
};

export default PersonalStatementCard;
