import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row,
  Table,
  FormGroup,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import get from "../../../../helpers/get";
import remove from "../../../../helpers/remove";
import { useToasts } from "react-toast-notifications";
import ReactTableConvertToXl from "../../ReactTableConvertToXl/ReactTableConvertToXl";
import ReactToPrint from "react-to-print";
import LinkButton from "../../Components/LinkButton";
import ButtonForFunction from "../../Components/ButtonForFunction";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import Loader from "../../Search/Loader/Loader";
import put from "../../../../helpers/put";
import { tableIdList } from "../../../../constants/TableIdConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../../components/modal/ConfirmModal";

const BranchList = () => {
  const { addToast } = useToasts();
  const [deleteModal, setDeleteModal] = useState(false);
  const [branchList, setBranchList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serialNum, setSerialNum] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpen1, setDropdownOpen1] = useState(false);
  const [delData, setDelData] = useState(null);
  const [success, setSuccess] = useState(false);

  // for hide/unhide table column
  const [check, setCheck] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const history = useHistory();

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`Branch/Index`).then((res) => {
      setBranchList(res);
      setLoading(false);
    });

    get(`TableDefination/Index/${tableIdList?.Branch_List}`).then((res) => {
      setTableData(res);
      console.log("table data", res);
    });
  }, [success]);

  const handleUpdate = (id) => {
    history.push(`/branchInformation/${id}`);
  };

  const handleDeletebranch = () => {
    setButtonStatus(true);
    setProgress(true);
    remove(`Branch/Delete/${delData}`).then((res) => {
      setProgress(false);
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };

  const toggleDanger = (id) => {
    setDelData(id);
    setDeleteModal(true);
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  // toggle dropdown
  const toggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // toggle1 dropdown
  const toggle1 = () => {
    setDropdownOpen1((prev) => !prev);
  };

  const componentRef = useRef();

  const redirectToBranchProfile = (branchId) => {
    history.push(`/branchProfile/${branchId}`);
  };

  // for hide/unhide column
  const handleChecked = (e, columnId) => {
    setCheck(e.target.checked);
    put(`TableDefination/Update/${tableIdList?.Branch_List}/${columnId}`).then(
      (res) => {
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          setSuccess(!success);
        }
      }
    );
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb title="Branch List" backTo="" path="/" />

          <Card className="uapp-employee-search">
            <CardBody>
              <Row className="mb-3">
                <Col
                  lg="6"
                  md="6"
                  sm="12"
                  xs="12"
                  style={{ marginBottom: "10px" }}
                >
                  {permissions?.includes(permissionList?.Add_Branch) ? (
                    <LinkButton
                      url={"/branchInformation"}
                      className={"btn btn-uapp-add "}
                      icon={<i className="fas fa-plus"></i>}
                      name={"Add Branch"}
                    />
                  ) : null}
                </Col>

                <Col lg="6" md="6" sm="12" xs="12">
                  <div className="d-flex justify-content-end">
                    <div className="mr-3">
                      <Dropdown
                        className="uapp-dropdown"
                        style={{ float: "right" }}
                        isOpen={dropdownOpen}
                        toggle={toggle}
                      >
                        <DropdownToggle caret>
                          <i className="fas fa-print fs-7"></i>
                        </DropdownToggle>
                        <DropdownMenu className="bg-dd-4">
                          {/* <DropdownItem> */}
                          <div className="d-flex justify-content-around align-items-center mt-2">
                            <div className="cursor-pointer">
                              <ReactTableConvertToXl
                                id="test-table-xls-button"
                                table="table-to-xls"
                                filename="tablexls"
                                sheet="tablexls"
                                icon={<i className="fas fa-file-excel"></i>}
                              />
                            </div>
                            <div className="cursor-pointer">
                              <ReactToPrint
                                trigger={() => (
                                  <p>
                                    <i className="fas fa-file-pdf"></i>
                                  </p>
                                )}
                                content={() => componentRef.current}
                              />
                            </div>
                          </div>
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide starts here */}

                    <div className="">
                      <Dropdown
                        className="uapp-dropdown"
                        style={{ float: "right" }}
                        isOpen={dropdownOpen1}
                        toggle={toggle1}
                      >
                        <DropdownToggle caret>
                          <i className="fas fa-bars"></i>
                        </DropdownToggle>
                        <DropdownMenu className="bg-dd-1">
                          {tableData.map((table, i) => (
                            <div className="d-flex justify-content-between">
                              <Col md="8" className="">
                                <p className="">{table?.collumnName}</p>
                              </Col>

                              <Col md="4" className="text-center">
                                <FormGroup check inline>
                                  <Input
                                    className="form-check-input"
                                    type="checkbox"
                                    id=""
                                    name="isAcceptHome"
                                    onChange={(e) => {
                                      handleChecked(e, table?.id);
                                    }}
                                    defaultChecked={table?.isActive}
                                  />
                                </FormGroup>
                              </Col>
                            </div>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </div>

                    {/* column hide unhide ends here */}
                  </div>
                </Col>
              </Row>
              {permissions?.includes(permissionList?.View_Branch_List) ? (
                <>
                  {" "}
                  {loading ? (
                    <h2 className="text-center">Loading...</h2>
                  ) : (
                    <div className="table-responsive" ref={componentRef}>
                      <Table
                        id="table-to-xls"
                        className="table-sm table-bordered"
                      >
                        <thead className="tablehead">
                          <tr style={{ textAlign: "center" }}>
                            {tableData[0]?.isActive ? <th>SL/NO</th> : null}

                            {tableData[1]?.isActive ? <th>Name</th> : null}
                            {tableData[2]?.isActive ? <th>Email</th> : null}
                            {tableData[3]?.isActive ? <th>Phone No</th> : null}

                            {tableData[4]?.isActive ? (
                              <th
                                style={{ width: "8%" }}
                                className="text-center"
                              >
                                Action
                              </th>
                            ) : null}
                          </tr>
                        </thead>
                        <tbody>
                          {branchList?.map((singleBranch, i) => (
                            <tr
                              key={singleBranch?.id}
                              style={{ textAlign: "center" }}
                            >
                              {tableData[0]?.isActive ? (
                                <td>{serialNum + i}</td>
                              ) : null}

                              {tableData[1]?.isActive ? (
                                <td>{singleBranch?.name}</td>
                              ) : null}
                              {tableData[2]?.isActive ? (
                                <td>{singleBranch?.email}</td>
                              ) : null}
                              {tableData[3]?.isActive ? (
                                <td>{singleBranch?.phoneNumber}</td>
                              ) : null}

                              {tableData[4]?.isActive ? (
                                <td
                                  style={{ width: "8%" }}
                                  className="text-center"
                                >
                                  <ButtonGroup variant="text">
                                    {permissions?.includes(
                                      permissionList?.View_Branch
                                    ) ? (
                                      <ButtonForFunction
                                        color={"primary"}
                                        className={"mx-1 btn-sm"}
                                        func={() =>
                                          redirectToBranchProfile(
                                            singleBranch?.id
                                          )
                                        }
                                        icon={<i className="fas fa-eye"></i>}
                                        permission={6}
                                      />
                                    ) : null}

                                    {permissions?.includes(
                                      permissionList.Edit_Branch
                                    ) ? (
                                      <>
                                        {singleBranch?.email !==
                                        "info@smsheg.co.uk" ? (
                                          <ButtonForFunction
                                            color={"warning"}
                                            className={"mx-1 btn-sm"}
                                            func={() =>
                                              handleUpdate(singleBranch?.id)
                                            }
                                            icon={
                                              <i className="fas fa-edit"></i>
                                            }
                                            permission={6}
                                          />
                                        ) : null}
                                      </>
                                    ) : null}

                                    {permissions?.includes(
                                      permissionList?.Delete_Branch
                                    ) ? (
                                      <>
                                        {singleBranch?.email !==
                                        "info@smsheg.co.uk" ? (
                                          <ButtonForFunction
                                            color={"danger"}
                                            func={() =>
                                              toggleDanger(singleBranch?.id)
                                            }
                                            className={"mx-1 btn-sm"}
                                            icon={
                                              <i className="fas fa-trash-alt"></i>
                                            }
                                            permission={6}
                                          />
                                        ) : null}
                                      </>
                                    ) : null}

                                    <ConfirmModal
                                      text="Do You Want To Delete This Branch? Once Deleted it can't be Undone!"
                                      isOpen={deleteModal}
                                      toggle={closeDeleteModal}
                                      confirm={handleDeletebranch}
                                      cancel={closeDeleteModal}
                                    />
                                  </ButtonGroup>
                                </td>
                              ) : null}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  )}
                </>
              ) : null}

              <div className="d-flex justify-content-end mt-3">
                <h5>Total Results Found: {branchList.length}</h5>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BranchList;
