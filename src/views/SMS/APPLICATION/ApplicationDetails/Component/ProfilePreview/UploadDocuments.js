import React, { useEffect } from "react";
import { Table } from "reactstrap";
import get from "../../../../../../helpers/get";
import { rootUrl } from "../../../../../../constants/constants";
import Preview from "../../../../../../components/ui/Preview";
import { permissionList } from "../../../../../../constants/AuthorizationConstant";
import { Link } from "react-router-dom/cjs/react-router-dom";
import AddButton from "../../../../../../components/buttons/AddButton";
const permissions = JSON.parse(localStorage.getItem("permissions"));

const UploadDocuments = ({ sId, uploadData, setUploadData }) => {
  useEffect(() => {
    get(`StudentUploadDocument/Index/${sId}`).then((res) => {
      setUploadData(res);
      console.log(res, "uploadocu");
    });
  }, [sId, setUploadData]);
  console.log(uploadData, "docu vai");

  return (
    <>
      <Table>
        <thead className="tablehead d-flex justify-content-between align-items-center">
          <td className="border-0">
            <b>Upload Documents</b>
          </td>
          <td className="border-0 text-right">
            {" "}
            {permissions?.includes(permissionList?.Upload_Student_Document) ? (
              <Link to={`/uploadDocument/${sId}`}>
                {/* + Upload */}
                <AddButton text="Upload" />
              </Link>
            ) : null}
          </td>
        </thead>
      </Table>
      <Table borderless responsive className="mb-4">
        <tbody>
          {uploadData?.length === 0 ? (
            <p className="pl-10px">No Document found</p>
          ) : (
            <>
              {uploadData?.length > 0 &&
                uploadData?.map((item, i) =>
                  item?.documents?.map((docu, j) => (
                    <tr key={j} style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>{docu?.documentLevelName}</td>
                      <td>
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
                      <td>
                        {docu?.studentDocumentFile?.fileUrl ? (
                          <Preview file={docu?.studentDocumentFile?.fileUrl} />
                        ) : null}
                      </td>
                      {/* <td>
            
                          {permissions?.includes(
                            permissionList?.Upload_Student_Document
                          ) ? (
                            <Link to={`/uploadDocument/${sId}`}>+ Upload</Link>
                          ) : null}
                     
                      </td> */}
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
