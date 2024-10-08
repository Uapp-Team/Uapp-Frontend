import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const UploadDocuments = ({ sId }) => {
  const [data, setData] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`StudentUploadDocument/Index/${sId}`).then((res) => {
      setData(res);
    });
  }, [sId]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Upload Documents</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList.Edit_Student) ? (
              <Link to={`/uploadDocument/${sId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <p className="pl-10px">No Document found</p>
          ) : (
            <>
              {data?.length > 0 &&
                data?.map((docu, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td className="border-0">{docu?.documentLevelName}</td>
                    <td className="border-0">
                      {docu?.studentDocumentFile === null ? (
                        "-"
                      ) : (
                        <a
                          href={rootUrl + docu?.studentDocumentFile?.fileUrl}
                          target="blank"
                        >
                          {docu?.studentDocumentFile?.fileName}
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UploadDocuments;
