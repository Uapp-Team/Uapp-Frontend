import React, { useEffect } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import get from "../../../../../helpers/get";
import { rootUrl } from "../../../../../constants/constants";
import { permissionList } from "../../../../../constants/AuthorizationConstant";

const UploadDocuments = ({ sId, UploadData, setUploadData, activity }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  useEffect(() => {
    get(`StudentUploadDocument/Index/${sId}`).then((res) => {
      setUploadData(res);
    });
  }, [sId, setUploadData]);

  return (
    <>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Upload Documents</b>
          </td>
          <td className="border-0 text-right">
            {permissions?.includes(permissionList.Edit_Student) && activity ? (
              <Link to={`/uploadDocument/${sId}`}> Edit</Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          {UploadData?.length === 0 ? (
            <p className="pl-10px">No Document found</p>
          ) : (
            <>
              {UploadData?.length > 0 &&
                UploadData?.map((item, i) =>
                  item?.documents?.map((docu, j) => (
                    <tr key={j} style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td width="60%">{docu?.documentLevelName}</td>
                      <td width="40%">
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
                  ))
                )}
            </>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default UploadDocuments;
