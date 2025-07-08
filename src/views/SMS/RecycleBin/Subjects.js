import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Table } from "reactstrap";
import Typing from "../../../components/form/Typing";
import DataShow from "../../../components/Dropdown/DataShow";
import { dateFormate } from "../../../components/date/calenderFormate";
import Pagination from "../Pagination/Pagination";
import DeleteButton from "../../../components/buttons/DeleteButton";
import RecoveryButton from "../../../components/buttons/RecoveryButton";
import Uget from "../../../helpers/Uget";
import { permissionList } from "../../../constants/AuthorizationConstant";

const Subjects = () => {
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dataList, setDataList] = useState([]);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `SubjectBin?index=${currentPage}&size=${dataPerPage}&query=${searchStr}`
      ).then((res) => {
        setDataList(res?.items);
        setEntity(res?.totalFiltered);
      });
    }
  }, [success, currentPage, dataPerPage, searchStr, isTyping]);

  return (
    <>
      <BreadCrumb title="Subjects" backTo="Recycle Bin" path="/recycle" />
      {permissions?.includes(permissionList?.DashRestore_Subjectboard) ? (
        <>
          {" "}
          <Card className="zindex-100">
            <CardBody>
              <Typing
                name="search"
                placeholder="Name"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
              />
            </CardBody>
          </Card>
          <div className="custom-card-border p-4 mb-30px">
            <div className="d-flex justify-content-end">
              <DataShow
                dataPerPage={dataPerPage}
                setDataPerPage={setDataPerPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
            <div className="table-responsive fixedhead mb-3">
              <Table className="table-bordered">
                <thead className="tablehead">
                  <tr>
                    <th>Name</th>
                    <th>University</th>
                    <th>Deleted On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.length > 0 &&
                    dataList?.map((item, i) => (
                      <tr key={i} className="border-buttom">
                        <td>{item?.name}</td>
                        <td>{item?.university}</td>
                        <td> {dateFormate(item?.deletedOn)} </td>
                        <td>
                          <RecoveryButton
                            url={`SubjectBin/Restore?subjectId=${item?.id}`}
                            success={success}
                            setSuccess={setSuccess}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </div>

            <Pagination
              dataPerPage={dataPerPage}
              totalData={entity}
              paginate={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </>
      ) : null}
    </>
  );
};

export default Subjects;
