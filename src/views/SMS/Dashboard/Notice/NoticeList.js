import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import LinkButton from "../../Components/LinkButton";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { useHistory } from "react-router";
import get from "../../../../helpers/get";
import { Select } from "antd";
import PrintFile from "../../ConsultantsAndTypes/ConsultantList/Component/PrintFile";
import ConsultantColumnHide from "../../ConsultantsAndTypes/ConsultantList/Component/ConsultantColumnHide";
import DOMPurify from "dompurify";

const NoticeList = () => {
  const history = useHistory();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [noticeList, setNoticeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [success, setSuccess] = useState(false);
  const [callApi, setCallApi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [serialNum, setSerialNum] = useState(0);

  useEffect(() => {
    get(`Notice/Index?page=${currentPage}&pagesize = ${dataPerPage}`).then(
      (res) => {
        setNoticeList(res?.models);
        setSerialNum(res?.firstSerialNumber);
        console.log("noticeList", res);
      }
    );
  }, [success]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setLoading(true);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const redirectToConsultantProfile = (noticeId) => {
    history.push(`/NoticeDetail/${noticeId}`);
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div>
      <BreadCrumb title="Notice List" backTo="" path="/" />
      <Card>
        <CardBody>
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              {permissions?.includes(permissionList?.Add_Consultant) ? (
                <LinkButton
                  url={"/Notice"}
                  className={"btn btn-uapp-add "}
                  name={"Add Notice"}
                  icon={<i className="fas fa-plus"></i>}
                />
              ) : null}
            </Col>
          </Row>

          <div className="table-responsive mb-2">
            <Table id="table-to-xls" className="table-sm table-bordered">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  {/* <th>SL/NO</th> */}
                  <th>Date</th>
                  <th>Title </th>
                  <th>Description</th>
                  <th>To Users</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {noticeList?.map((notice, i) => (
                  <tr key={notice?.id} style={{ textAlign: "center" }}>
                    {/* <td>{serialNum + i}</td> */}
                    <td>{notice?.createdOn}</td>
                    <td>{notice?.title}</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={createMarkup(notice?.content)}
                      ></div>
                    </td>
                    <td>
                      {notice?.noticeForUsers?.map((item, i) => (
                        <>
                          {item?.name}
                          <br />
                        </>
                      ))}
                    </td>
                    <td>
                      {" "}
                      <ButtonForFunction
                        func={() => redirectToConsultantProfile(notice?.id)}
                        color={"primary"}
                        className={"mx-1 btn-sm"}
                        icon={<i className="fas fa-eye"></i>}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NoticeList;
