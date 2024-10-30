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

const Application = () => {
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `ApplicationBin?index=${currentPage}&size=${dataPerPage}&query=${searchStr}`
      ).then((res) => {
        setDataList(res?.items);
        setEntity(res?.totalFiltered);
      });
    }
  }, [success, currentPage, dataPerPage, searchStr, isTyping]);

  return (
    <>
      <BreadCrumb title="Application" backTo="Recycle Bin" path="/recycle" />
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
                <th>View ID</th>
                <th>Student</th>
                <th>Consultant</th>
                <th>University</th>
                <th>Subject</th>
                <th>Intake</th>
                <th>Account Intake</th>
                <th>Deleted On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {dataList?.length > 0 &&
                dataList?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td>{item?.viewId}</td>
                    <td>{item?.studentName}</td>
                    <td>{item?.consultantName}</td>
                    <td>{item?.universityName}</td>
                    <td>{item?.subjectName}</td>
                    <td>{item?.intake}</td>
                    <td>{item?.deletedOn}</td>
                    <td> {dateFormate(item?.deletedOn)} </td>
                    <td>
                      <RecoveryButton
                        url={`ApplicationBin/Restore?applicationId=${item?.id}`}
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
  );
};

export default Application;
