import React, { useEffect, useState } from "react";
import { Table, Row, Col, Card, CardBody, Modal, ModalBody } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import TargetData from "./TargetData";
import DefaultDropdown from "../../../../components/Dropdown/DefaultDropdown";
import Pagination from "../../Pagination/Pagination";
import TagButton from "../../../../components/buttons/TagButton";
import put from "../../../../helpers/put";
import CancelButton from "../../../../components/buttons/CancelButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const DesignationReport = () => {
  const { addToast } = useToasts();
  const [success, setSuccess] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currPromoteData, setCurrPromoteData] = useState({});
  const [targetData, settargetData] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = "20";
  const [entity, setEntity] = useState(0);

  const [conTypeValue, setconTypeValue] = useState(0);
  const [conTypeLable, setconTypeLable] = useState("Select Consultant");
  const [designationValue, setDesignationValue] = useState(0);
  const [designationLable, setDesignationLable] =
    useState("Select Designation");

  useEffect(() => {
    get(`Designation/Get/${designationValue}`).then((res) => {
      settargetData(res);
    });
  }, [designationValue]);

  useEffect(() => {
    if (conTypeValue === 0) {
      setDataList();
    } else {
      get(
        `ConsultantDesignation/Consultants?page=${currentPage}&pagesize=${dataPerPage}&typeid=${conTypeValue}`
      ).then((res) => {
        setDataList(res?.models);
        setEntity(res?.totalEntity);
      });
    }
  }, [success, currentPage, dataPerPage, conTypeValue]);

  const handleClearSearch = () => {
    setconTypeValue(0);
    setconTypeLable("Select Consultant");
    setDesignationValue(0);
    setDesignationLable("Select Designation");
    setDataList();
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleAssign = (data) => {
    setCurrPromoteData(data);
    setOpenModal(true);
  };

  const handlePromoteData = () => {
    put(
      `ConsultantDesignation/Assign/${currPromoteData?.consultantId}/${designationValue}`
    ).then((res) => {
      if (res?.status === 200 && res?.data?.isSuccess === true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccess(!success);
        setOpenModal(false);
      }
    });
  };

  return (
    <div>
      <BreadCrumb title="Consultant Designation Report" backTo="" path="/" />

      <Card>
        <CardBody>
          <div className="row">
            <div className="col-sm-12">
              <DefaultDropdown
                label={conTypeLable}
                setLabel={setconTypeLable}
                value={conTypeValue}
                setValue={setconTypeValue}
                url="ConsultantTypeDD/Index"
                name="consultant"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
            </div>
          </div>

          <div className="d-flex justify-content-start mt-3">
            <div className="d-flex mt-1">
              {conTypeValue !== 0 ? (
                <TagButton
                  label={conTypeLable}
                  setValue={() => setconTypeValue(0)}
                  setLabel={() => setconTypeLable("Select Consultant")}
                />
              ) : (
                ""
              )}
            </div>
            <div className="mt-1 mx-1 d-flex btn-clear">
              {conTypeValue !== 0 ? (
                <button className="tag-clear" onClick={handleClearSearch}>
                  Clear All
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </CardBody>
      </Card>

      <Row>
        <Col md={12}>
          {dataList?.length > 0 && (
            <div className="custom-card-border p-4 mb-30px">
              <Table responsive>
                <thead className="tablehead">
                  <tr>
                    <th>Uapp ID</th>
                    <th>Name</th>
                    <th>Designation</th>
                  </tr>
                </thead>
                <tbody>
                  {dataList?.length > 0 &&
                    dataList?.map((item, i) => (
                      <tr key={i} className="border-buttom">
                        <td>{item?.consultantId}</td>
                        <td>{item?.name}</td>

                        <td>
                          {item?.designationId === 0 ? (
                            <span
                              className="text-info pointer"
                              onClick={() => handleAssign(item)}
                            >
                              Not Assign
                            </span>
                          ) : (
                            <span>{item?.designationTitle}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Pagination
                dataPerPage={dataPerPage}
                totalData={entity}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          )}
        </Col>
      </Row>

      <Modal
        isOpen={openModal}
        toggle={() => setOpenModal(false)}
        className="uapp-modal2"
      >
        <ModalBody>
          <Row className="fs-16px fw-500">
            <Col xs={10}>
              <span>Assign {currPromoteData?.name} Designation</span>
            </Col>
            <Col xs={2} className="text-right">
              <i
                className="fas fa-times pointer"
                onClick={() => setOpenModal(false)}
              ></i>
            </Col>
          </Row>
          <hr />

          <Row>
            <Col>
              <span>Select Designation</span>
              <DefaultDropdown
                label={designationLable}
                setLabel={setDesignationLable}
                value={designationValue}
                setValue={setDesignationValue}
                url={`Designation/ByConsultantType/${conTypeValue}`}
                name="designation"
                error={() => {}}
                setError={() => {}}
                action={() => {}}
              />
              <br />

              {targetData && (
                <div className="custom-card-border p-4">
                  {targetData?.personalStudentTarget > 0 && (
                    <>
                      <TargetData
                        text="Student target"
                        value={targetData?.personalStudentTarget}
                      />
                      <hr />
                    </>
                  )}
                  {targetData?.studentFromTeam > 0 && (
                    <>
                      <TargetData
                        text="Team target"
                        value={targetData?.studentFromTeam}
                      />
                      <hr />
                    </>
                  )}

                  <TargetData
                    text="Consultant"
                    value={targetData?.consultantTarget}
                  />
                </div>
              )}

              <div className="d-flex justify-content-between mt-3">
                <CancelButton cancel={() => setOpenModal(false)} />
                {targetData && (
                  <SaveButton text="Assign" action={handlePromoteData} />
                )}
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DesignationReport;
