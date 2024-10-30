import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Form, Input, Row, Table } from "reactstrap";
import Select from "react-select";
import TagButton from "../../../../components/buttons/TagButton";
import get from "../../../../helpers/get";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import Pagination from "../../Pagination/Pagination.jsx";
import SaveButton from "../../../../components/buttons/SaveButton";
import post from "../../../../helpers/post.js";
import { useToasts } from "react-toast-notifications";

const BulkCommissionGroup = () => {
  const { addToast } = useToasts();
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);
  console.log(branchValue, "branchValue");
  const [commissionDD, setCommissionDD] = useState([]);
  const [commissionLabel, setCommissionLabel] = useState(
    "Set Commission Group"
  );
  const [commissionValue, setCommissionValue] = useState(0);
  const [commissionAssignList, setCommissionAssignList] = useState([]);
  console.log(commissionAssignList[0]?.consultantId);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [entity, setEntity] = useState(0);

  const [callApi, setCallApi] = useState(false);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState([]);
  console.log(working, "working");
  const [check, setCheck] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    get(`CommissionGroup/ByBranch/${branchValue}`).then((res) => {
      setCommissionDD(res);
    });
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });
  }, [branchValue]);

  useEffect(() => {
    get(
      `ConsultantCommissionGroup/GetConsultants?page=${currentPage}&pageSize=${dataPerPage}&id=${branchValue}`
    ).then((res) => {
      setCommissionAssignList(res?.models);

      setEntity(res?.totalEntity);
      setLoading(false);
      console.log(res?.models);
    });
  }, [branchValue, currentPage, dataPerPage, callApi, loading, success]);

  const branchOptions = branch?.map((br) => ({
    label: br?.name,
    value: br?.id,
  }));

  const selectBranch = (label, value) => {
    setBranchLabel(label);
    setBranchValue(value);
    // handleSearch();
  };

  const commissionMenu = commissionDD?.map((commission) => ({
    label: commission?.name,
    value: commission?.id,
  }));

  const selectCommission = (label, value) => {
    setCommissionLabel(label);
    setCommissionValue(value);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setCallApi((prev) => !prev);
  };

  const selectDataSize = (value) => {
    setCurrentPage(1);
    setDataPerPage(value);
    setCallApi((prev) => !prev);
  };

  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const handleChange = (e, id) => {
    let isChecked = e.target.checked;

    if (isChecked === true) {
      setWorking([...working, id]);
    } else {
      const res = working.filter((c) => c !== id);
      setWorking(res);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    subData.append("CommissionGroupId", commissionValue);
    subData.append("IsApplicable", check);
    subData.append("ConsultantIds", working);
    setButtonStatus(true);
    setProgress(true);
    post(`ConsultantCommissionGroup/Assign`, subData).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  const handleReset = () => {
    setCurrentPage(1);
    setBranchLabel("Select Branch");
    setBranchValue(0);
    setCommissionLabel("Set Commission Group");
    setCommissionValue(0);
    setCallApi((prev) => !prev);
  };

  return (
    <div>
      <BreadCrumb title="Bulk Commission Assign" backTo="" path="/" />
      <Card className="uapp-employee-search zindex-100">
        <CardBody>
          <Row>
            <Col className="uapp-mb mb-2" md="4" sm="12">
              <Select
                options={branchOptions}
                value={{ label: branchLabel, value: branchValue }}
                onChange={(opt) => selectBranch(opt.label, opt.value)}
                name="branchId"
                id="branchId"
                // isDisabled={type ? true : false}
              />
            </Col>
            <Col className="uapp-mb mb-2" md="4" sm="12">
              <Select
                options={commissionMenu}
                value={{ label: commissionLabel, value: commissionValue }}
                onChange={(opt) => selectCommission(opt.label, opt.value)}
                name="commissionGroupId"
                id="commissionGroupId"
              />
            </Col>
          </Row>

          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <div className="mt-1 mx-1" style={{ display: "flex" }}>
                  {branchValue !== 0 || commissionValue !== 0 ? "" : ""}
                  {branchValue !== 0 ? (
                    <TagButton
                      label={branchLabel}
                      setValue={() => setBranchValue(0)}
                      setLabel={() => setBranchLabel("Select Branch")}
                    ></TagButton>
                  ) : (
                    ""
                  )}

                  {branchValue !== 0 && commissionValue !== 0 ? "" : ""}

                  {commissionValue !== 0 ? (
                    <TagButton
                      label={commissionLabel}
                      setValue={() => setCommissionValue(0)}
                      setLabel={() =>
                        setCommissionLabel("Set Commission Group")
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>

                <div className="mt-1 mx-0 d-flex btn-clear">
                  {branchValue !== 0 || commissionValue !== 0 ? (
                    <button className="tag-clear" onClick={handleReset}>
                      Clear All
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {branchValue !== 0 ? (
        <Form onSubmit={handleSubmit}>
          <Card>
            <CardBody>
              <Row className="mb-3">
                <Col
                  lg="5"
                  md="5"
                  sm="12"
                  xs="12"
                  style={{ marginBottom: "10px" }}
                >
                  <div className="d-flex">
                    {" "}
                    <div className="pt-2">
                      <input
                        onChange={(e) => {
                          setCheck(e.target.checked);
                        }}
                        type="checkbox"
                        name=""
                        value=""
                        checked={check}
                      />{" "}
                      <span>Is Applicable?</span>
                    </div>
                    <div className="ml-2">
                      {working?.length !== 0 && commissionValue !== 0 && (
                        <>
                          <SaveButton
                            text="Apply Bulk Assign"
                            progress={progress}
                            buttonStatus={buttonStatus}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </Col>

                <Col lg="7" md="7" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
                    {/* Dropdown number start */}
                    <div className="mr-3">
                      <div className="d-flex align-items-center">
                        <div className="mr-2">Showing :</div>
                        <div className="ddzindex">
                          <Select
                            options={dataSizeName}
                            value={{ label: dataPerPage, value: dataPerPage }}
                            onChange={(opt) => selectDataSize(opt.value)}
                          />
                        </div>
                      </div>
                    </div>
                    {/* Dropdown number end */}
                  </div>
                </Col>
              </Row>
              <div className="table-responsive fixedhead mb-3">
                <Table className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "start" }}>
                      <th>Consultant Name</th>
                      <th>Current Commission Group</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionAssignList?.map((assignList, i) => (
                      <tr key={i} style={{ textAlign: "start" }}>
                        <td>
                          <div className="d-flex justify-content-start">
                            <Input
                              className="ml-1"
                              type="checkbox"
                              onChange={(e) =>
                                handleChange(e, assignList?.consultantId)
                              }
                            />

                            <p className="ml-5">{assignList?.consultantName}</p>
                          </div>
                        </td>

                        <td>
                          {assignList?.currentCommissionGroup ? (
                            assignList?.currentCommissionGroup
                          ) : (
                            <span style={{ color: "#ff8484" }}>
                              No commission group
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </CardBody>
          </Card>
        </Form>
      ) : null}
    </div>
  );
};

export default BulkCommissionGroup;
