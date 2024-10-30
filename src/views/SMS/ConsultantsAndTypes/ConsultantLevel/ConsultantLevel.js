import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import Typing from "../../../../components/form/Typing";
import DataShow from "../../../../components/Dropdown/DataShow";
import get from "../../../../helpers/get";
import Pagination from "../../Pagination/Pagination";
import Loader from "../../Search/Loader/Loader";
import Uget from "../../../../helpers/Uget";

const ConsultantLevel = () => {
  const [data, setData] = useState([]);
  //   const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);

  const handleKeyDown = (event) => {
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!isTyping) {
      //   setLoading(!loading);
      get(
        `ConsultantLevelReport?&page=${currentPage}&pagesize=${dataPerPage}&search=${searchStr}`
      ).then((action) => {
        console.log("data", action);
        setData(action?.items);
        setEntity(action?.totalFiltered);
        // setLoading(!loading);
      });
    }
  }, [currentPage, dataPerPage, isTyping, searchStr]);

  return (
    <>
      <BreadCrumb title="Consultant Level" backTo="" path="/" />

      <Card className="uapp-employee-search zindex-100">
        <CardBody>
          <Row>
            <Col className="uapp-mb mb-2" md="4" sm="12">
              <span>Consultant Name or Email</span>
              <Typing
                name="search"
                placeholder="Enter Name or Email"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
                onKeyDown={() => setCurrentPage(1)}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="uapp-employee-search">
        <CardBody>
          <div className="d-flex justify-content-end">
            <DataShow
              dataPerPage={dataPerPage}
              setDataPerPage={setDataPerPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
          {/* {loading === true ? (
            <Loader />
          ) : ( */}
          <>
            {!data || data?.length === 0 ? (
              <p className="text-center my-5">No Recent invitations</p>
            ) : (
              <>
                <div className="table-responsive fixedhead mb-3">
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr>
                        <th>Con ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Level - 1</th>
                        <th>Level - 2</th>
                        <th>Level - 3</th>
                        <th>Level - 4</th>
                        <th>Level - 5</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.map((item, i) => (
                        <tr key={i} className="border-buttom">
                          <td>{item?.viewId} </td>
                          <td>{item?.fullName} </td>
                          <td>{item?.email}</td>
                          <td>
                            <span className="Count-first noPointer">
                              {item?.level1}
                            </span>
                          </td>
                          <td>
                            <span className="Count-second noPointer">
                              {item?.level2}
                            </span>
                          </td>
                          <td>
                            <span className="Count-third noPointer">
                              {item?.level3}
                            </span>
                          </td>
                          <td>
                            <span className="Count-fourth noPointer">
                              {item?.level4}
                            </span>
                          </td>
                          <td>
                            <span className="Count-fifth noPointer">
                              {item?.level5}
                            </span>
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
              </>
            )}
          </>
          {/* )} */}
        </CardBody>
      </Card>
    </>
  );
};

export default ConsultantLevel;
