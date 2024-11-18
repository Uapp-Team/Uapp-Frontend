import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Row, Col, Card, CardBody } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";
import DesignationsCommissionForm from "./DesignationsCommissionForm";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import TagButton from "../../../../components/buttons/TagButton";
import Filter from "../../../../components/Dropdown/Filter";
import Loader from "../../Search/Loader/Loader";

const DesignationsCommissionList = () => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [consultantType, setConsultantType] = useState([]);
  const [consultant, setConsultant] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [dataList, setDataList] = useState([]);
  console.log(dataList, "dataList");
  const [currEditData, setCurrEditData] = useState({});
  const [currDeleteData, setCurrDeleteData] = useState({});

  const [filterbranch, setFilterBranch] = useState([]);
  const [filterbranchLabel, setFilterBranchLabel] = useState("Select Branch");
  const [filterbranchValue, setFilterBranchValue] = useState(0);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setFilterBranch(res);
      setFilterBranchValue(res[0]?.id);
      setFilterBranchLabel(res[0]?.name);
    });
  }, []);

  useEffect(() => {
    get(`ConsultantTypeDD/Index`).then((res) => {
      setConsultantType(res);
      setConsultant(res[0]);
    });
  }, []);

  useEffect(() => {
    get(`Designation/Index/${consultant?.id}/${filterbranchValue}`).then(
      (res) => {
        console.log(res);
        setDataList(res);
      }
    );
  }, [success, consultant, filterbranchValue]);

  const closeModal = () => {
    setModalOpen(false);
  };

  // const openModal = () => {
  //   setModalOpen(true);
  // };

  const openEditModal = (data) => {
    setModalOpen(true);
    setCurrEditData(data);
  };

  // const toggleDanger = (data) => {
  //   setCurrDeleteData(data);
  //   setDeleteModal(true);
  // };

  const handleDeleteData = () => {
    remove(`Designation/Delete/${currDeleteData?.id}`).then((res) => {
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  return (
    <>
      <BreadCrumb title="Designations Commission List" backTo="" path="/" />
      {filterbranch.length > 1 && (
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-md-12">
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <Filter
                      data={filterbranch}
                      label={filterbranchLabel}
                      setLabel={setFilterBranchLabel}
                      value={filterbranchValue}
                      setValue={setFilterBranchValue}
                      action={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
      <div className="custom-card-border p-4">
        <Row>
          <Col md={2} className="border-right">
            <p className="fw-600 fs-16px">Consultant types</p>
            {consultantType?.map((item, i) => (
              <p
                key={i}
                className={`${
                  consultant.id === item.id
                    ? `designation-commission-type-btn-active`
                    : `designation-commission-type-btn`
                }`}
                onClick={() => setConsultant(item)}
              >
                {item?.name}
              </p>
            ))}
          </Col>
          <Col md={10}>
            <div className="d-flex justify-content-between my-3">
              <p className="fw-500 fs-16px">Designations list</p>
              {/*<Button className="btn btn-uapp-add" onClick={openModal}>*/}
              {/*  <i className="fas fa-plus"></i> Add New*/}
              {/*</Button>*/}
            </div>

            <Table className="">
              <thead className="tablehead">
                <tr>
                  <th>Level</th>
                  <th>Designations</th>
                  <th>Target For Bonus</th>
                  <th>Target For Promotion</th>
                  <th>Bonus</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataList?.length > 0 &&
                  dataList?.map((item, i) => (
                    <tr key={i} className="border-buttom">
                      {/* <th scope="row">{i + 1}</th> */}
                      <td>{item?.levelValue}</td>

                      <td>{item?.title}</td>

                      <td>
                        <li className="designation-commission-list">
                          <span>Direct Students</span>
                          <b>{item?.personalStudentTarget}</b>
                        </li>
                        <li className="designation-commission-list">
                          <span>
                            {i === 4
                              ? dataList[i]?.title
                              : dataList[i + 1]?.title}
                          </span>
                          <b>{item?.consultantTarget}</b>
                        </li>
                        <li className="designation-commission-list">
                          <span>Students From Team</span>
                          <b>{item?.studentFromTeam}</b>
                        </li>
                      </td>
                      {/* 
                      <td>
                        {dataList?.map((item, i) => (
                          <>
                            <li className="designation-commission-list">
                              <span>Direct sakib</span>
                              <b>{item?.personalStudentTarget}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span>Number Of Consultants</span>
                              <b>{item?.consultantTarget}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span>Students From Team</span>
                              <b>{item?.studentFromTeam}</b>
                            </li>
                          </>
                        ))}
                      </td> */}

                      <td>
                        {dataList[i - 1] ? (
                          <>
                            <li className="designation-commission-list">
                              <span>Direct Students</span>
                              <b>{dataList[i - 1]?.personalStudentTarget}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span>{dataList[i]?.title}</span>
                              <b>{dataList[i - 1]?.consultantTarget}</b>
                            </li>
                            <li className="designation-commission-list">
                              <span>Students From Team</span>
                              <b>{dataList[i - 1]?.studentFromTeam}</b>
                            </li>
                          </>
                        ) : null}
                      </td>

                      <td>
                        <li className="designation-commission-list">
                          <span>For Team </span>
                          <b>{item?.teamBonus}</b>
                        </li>
                        <li className="designation-commission-list">
                          <span>For Consultant </span>
                          <b>{item?.personalBonus}</b>
                        </li>
                      </td>

                      <td>
                        {permissions?.includes(
                          permissionList.Edit_Designation
                        ) && (
                          <span
                            className="text-info pointer mr-3"
                            onClick={() => openEditModal(item)}
                          >
                            Edit
                          </span>
                        )}

                        {/*<span*/}
                        {/*  className="text-danger pointer"*/}
                        {/*  onClick={() => toggleDanger(item)}*/}
                        {/*>*/}
                        {/*  Delete*/}
                        {/*</span>*/}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
      <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal2">
        <DesignationsCommissionForm
          consultant={consultant}
          data={currEditData}
          setData={setCurrEditData}
          success={success}
          setSuccess={setSuccess}
          closeModal={closeModal}
        />
      </Modal>

      <ConfirmModal
        text="Do You Want To Delete This Promotional Commission ? Once Deleted it can't be Undone!"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeleteData}
        cancel={() => setDeleteModal(false)}
      />
    </>
  );
};

export default DesignationsCommissionList;
