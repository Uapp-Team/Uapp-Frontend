import React from "react";
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Form,
  FormGroup,
  ModalFooter,
  Button,
  Table,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Input,
  ButtonGroup,
} from "reactstrap";
import ReactToPrint from "react-to-print";
import * as Icon from "react-feather";
import ReactTableConvertToXl from "../../../../ReactTableConvertToXl/ReactTableConvertToXl";
import ButtonForFunction from "../../../../Components/ButtonForFunction";
import Select from "react-select";
import Pagination from "../../../../Pagination/Pagination";
import ButtonLoader from "../../../../Components/ButtonLoader";
import ToggleSwitch from "../../../../Components/ToggleSwitch";
import CustomButtonRipple from "../../../../Components/CustomButtonRipple";
import { Upload } from "antd";
import ConfirmModal from "../../../../../../components/modal/ConfirmModal";

const AddMissionManagerAdd = ({
  permissions,
  permissionList,
  redirectToAddAdmissionmanager,
  modalOpen,
  closeModal,
  handleSubmit,
  userType,
  userTypes,
  mId,
  providerMenu,
  providerLabel2,
  providerValue2,
  selectProvider2,
  providerError,
  nameTitleMenu,
  nameTitleLabel,
  nameTitleValue,
  selectNameTitle,
  nameTitleError,
  handlePass,
  passError,
  countryDD,
  uniCountryLabel,
  uniCountryValue,
  selectUniCountry,
  countryError,
  handlePreview,
  handleChange,
  previewVisible,
  previewTitle,
  handleCancel,
  previewImage,
  error,
  progress,
  buttonStatus1,
  dataSizeName,
  dataPerPage,
  selectDataSize,
  dropdownOpen,
  toggle,
  componentRef,
  dropdownOpen1,
  toggle1,
  tableData,
  handleChecked,
  loading,
  managerList,
  serialNum,
  redirectToAssignPage,
  redirectToSub,
  redirectToAdmissionOfficerList,
  handleAccountStatus,
  handleViewAdmissionManager,
  updateAdmissionManager,
  toggleDelete,
  deleteModal,
  closeDeleteModal,
  managerName,
  buttonStatus,
  handleDelete,
  entity,
  paginate,
  currentPage,
}) => {
  return (
    <div>
      <Card className="uapp-employee-search">
        <CardBody>
          {/* new */}
          <Row className="mb-3">
            <Col lg="5" md="5" sm="12" xs="12" style={{ marginBottom: "10px" }}>
              {permissions?.includes(permissionList.Add_AdmissionManager) ? (
                <ButtonForFunction
                  func={redirectToAddAdmissionmanager}
                  className={"btn btn-uapp-add "}
                  icon={<i className="fas fa-plus"></i>}
                  name={" Add Admission Manager"}
                  permission={6}
                />
              ) : null}

              <Modal
                isOpen={modalOpen}
                toggle={closeModal}
                className="uapp-modal4"
                size="lg"
              >
                <ModalHeader style={{ backgroundColor: "#1d94ab" }}>
                  <span className="text-white">Admission Manager</span>
                </ModalHeader>
                <ModalBody>
                  <Form onSubmit={handleSubmit}>
                    {userType === userTypes?.ProviderAdmin ? (
                      <input
                        type="hidden"
                        name="providerId"
                        id="providerId"
                        value={mId}
                      />
                    ) : (
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            Provider <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Select
                            options={providerMenu}
                            value={{
                              label: providerLabel2,
                              value: providerValue2,
                            }}
                            onChange={(opt) =>
                              selectProvider2(opt.label, opt.value)
                            }
                            name="providerId"
                            id="providerId"
                          />

                          {providerError ? (
                            <span className="text-danger">
                              Provider is required
                            </span>
                          ) : null}
                        </Col>
                      </FormGroup>
                    )}

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Title <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={nameTitleMenu}
                          value={{
                            label: nameTitleLabel,
                            value: nameTitleValue,
                          }}
                          onChange={(opt) =>
                            selectNameTitle(opt.label, opt.value)
                          }
                          name="nameTittleId"
                          id="nameTittleId"
                        />

                        {nameTitleError ? (
                          <span className="text-danger">Title is required</span>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          First Name <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="Type First Name"
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Last Name <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Type Last Name"
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Email <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Type Your Email"
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Password <span className="text-danger">*</span>
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Type Your Password"
                          required
                          onChange={handlePass}
                        />
                        <span className="text-danger">{passError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Phone Number <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="Type Your Phone Number"
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Post Code <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="postCode"
                          id="postCode"
                          placeholder="Type Post Code"
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          City <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Type City Name"
                          required
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          Country <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Select
                          options={countryDD}
                          value={{
                            label: uniCountryLabel,
                            value: uniCountryValue,
                          }}
                          onChange={(opt) =>
                            selectUniCountry(opt.label, opt.value)
                          }
                          name="countryId"
                          id="countryId"
                        />
                        {countryError ? (
                          <span className="text-danger">
                            Country is required
                          </span>
                        ) : null}
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>
                          State/County <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="string"
                          name="stateName"
                          id="stateName"
                          placeholder="Type State/County"
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup row className="has-icon-left position-relative">
                      <Col md="3">
                        <span>Image</span>
                      </Col>
                      <Col md="6">
                        <div className="row">
                          <div className="col-md-3">
                            <>
                              <Upload
                                listType="picture-card"
                                multiple={false}
                                fileList={FileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={(file) => {
                                  return false;
                                }}
                              >
                                {FileList.length < 1 ? (
                                  <div
                                    className="text-danger"
                                    style={{ marginTop: 8 }}
                                  >
                                    <Icon.Upload />
                                    <br />
                                    <span>Upload Image Here</span>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Upload>
                              <Modal
                                visible={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                              >
                                <img
                                  alt="example"
                                  style={{ width: "100%" }}
                                  src={previewImage}
                                />
                              </Modal>
                              <span className="text-danger d-block">
                                {error}
                              </span>
                            </>
                          </div>
                        </div>
                      </Col>
                    </FormGroup>

                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        color="danger"
                        className="mr-1 mt-3"
                        onClick={closeModal}
                      >
                        Close
                      </Button>

                      <CustomButtonRipple
                        color={"primary"}
                        type={"submit"}
                        className={"mr-1 mt-3"}
                        name={progress ? <ButtonLoader /> : "Submit"}
                        permission={6}
                        isDisabled={buttonStatus1}
                      />
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
            </Col>

            <Col lg="7" md="7" sm="12" xs="12" className="mt-md-0 mt-sm-3">
              <div className="d-flex justify-content-md-end justify-content-sm-start">
                <div className="mr-3">
                  <div className="d-flex align-items-center">
                    <div className="mr-2">Showing :</div>
                    <div>
                      <Select
                        options={dataSizeName}
                        value={{ label: dataPerPage, value: dataPerPage }}
                        onChange={(opt) => selectDataSize(opt.value)}
                      />
                    </div>
                  </div>
                </div>

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
                        <div key={i}>
                          {i === 6 ? (
                            <>
                              {permissions?.includes(
                                permissionList.AdmissionManager_Assign_University
                              ) && (
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
                              )}
                            </>
                          ) : i === 7 ? (
                            <>
                              {permissions?.includes(
                                permissionList?.AdmissionManager_Assign_Subject
                              ) && (
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
                              )}{" "}
                            </>
                          ) : i === 11 ? (
                            <>
                              {permissions?.includes(
                                permissionList?.AdmissionManager_Account_Status
                              ) && (
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
                              )}{" "}
                            </>
                          ) : (
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
                          )}
                        </div>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* column hide unhide ends here */}
              </div>
            </Col>
          </Row>
          {permissions?.includes(permissionList?.View_AdmissionManager_list) ? (
            <>
              {loading ? (
                <div class="d-flex justify-content-center mb-5">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive" ref={componentRef}>
                  <Table id="table-to-xls" className="table-sm table-bordered">
                    <thead className="tablehead">
                      <tr style={{ textAlign: "center" }}>
                        {tableData[0]?.isActive ? <th>SL/NO</th> : null}
                        {tableData[1]?.isActive ? <th>UAPP ID</th> : null}
                        {tableData[2]?.isActive ? <th>Full Name</th> : null}
                        {tableData[3]?.isActive ? <th>Provider</th> : null}
                        {tableData[4]?.isActive ? <th>Email</th> : null}
                        {tableData[5]?.isActive ? <th>Phone No</th> : null}
                        {permissions?.includes(
                          permissionList?.AdmissionManager_Assign_University
                        ) ? (
                          <>
                            {tableData[6]?.isActive ? (
                              <th>Assigned University</th>
                            ) : null}
                          </>
                        ) : null}
                        {permissions?.includes(
                          permissionList?.AdmissionManager_Assign_Subject
                        ) ? (
                          <>
                            {tableData[7]?.isActive ? (
                              <th>Assigned Courses</th>
                            ) : null}
                          </>
                        ) : null}

                        {tableData[8]?.isActive ? (
                          <th>Admission Officers</th>
                        ) : null}

                        {tableData[9]?.isActive ? (
                          <th>Registered Student</th>
                        ) : null}

                        {tableData[10]?.isActive ? <th>Applications</th> : null}
                        {permissions?.includes(
                          permissionList?.AdmissionManager_Account_Status
                        ) ? (
                          <>
                            {tableData[11]?.isActive ? (
                              <th>Account Status</th>
                            ) : null}
                          </>
                        ) : null}
                        {tableData[12]?.isActive ? (
                          <th style={{ width: "8%" }} className="text-center">
                            Action
                          </th>
                        ) : null}
                      </tr>
                    </thead>
                    <tbody>
                      {managerList?.map((manager, i) => (
                        <tr key={manager.id} style={{ textAlign: "center" }}>
                          {tableData[0]?.isActive ? (
                            <th scope="row">{serialNum + i}</th>
                          ) : null}
                          {tableData[1]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              {" "}
                              <span
                                onClick={() => {
                                  handleViewAdmissionManager(
                                    manager?.id,
                                    manager?.provider?.id
                                  );
                                }}
                              >
                                {manager?.sequenceId}
                              </span>
                            </td>
                          ) : null}

                          {tableData[2]?.isActive ? (
                            <td className="cursor-pointer hyperlink-hover">
                              <span
                                onClick={() => {
                                  handleViewAdmissionManager(
                                    manager?.id,
                                    manager?.provider?.id
                                  );
                                }}
                              >
                                {" "}
                                {manager?.nameTittle?.name} {manager?.firstName}{" "}
                                {manager?.lastName}
                              </span>
                            </td>
                          ) : null}

                          {tableData[3]?.isActive ? (
                            <td>{manager?.provider?.name}</td>
                          ) : null}

                          {tableData[4]?.isActive ? (
                            <td>{manager?.email}</td>
                          ) : null}

                          {tableData[5]?.isActive ? (
                            <td>{manager?.phoneNumber}</td>
                          ) : null}
                          {permissions?.includes(
                            permissionList?.AdmissionManager_Assign_University
                          ) ? (
                            <>
                              {tableData[6]?.isActive ? (
                                <td>
                                  {" "}
                                  <span
                                    className="badge badge-secondary"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span
                                      onClick={() =>
                                        redirectToAssignPage(
                                          manager?.provider?.id,
                                          manager?.id
                                        )
                                      }
                                      className="text-decoration-none"
                                    >
                                      View
                                    </span>
                                  </span>{" "}
                                </td>
                              ) : null}
                            </>
                          ) : null}
                          {permissions?.includes(
                            permissionList?.AdmissionManager_Assign_Subject
                          ) ? (
                            <>
                              {tableData[7]?.isActive ? (
                                <td>
                                  {" "}
                                  <span
                                    className="badge badge-secondary"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <span
                                      onClick={() => redirectToSub(manager?.id)}
                                      className="text-decoration-none"
                                    >
                                      View
                                    </span>
                                  </span>{" "}
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {permissions?.includes(
                            permissionList?.AdmissionManager_Assign_AdmissionOfficer
                          ) ? (
                            <>
                              {tableData[8]?.isActive ? (
                                <td>
                                  <span
                                    onClick={() =>
                                      redirectToAdmissionOfficerList(
                                        manager?.providerId,
                                        manager?.id
                                      )
                                    }
                                    className="badge badge-secondary"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {`View (${manager?.totalOfficers})`}
                                  </span>
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[9]?.isActive ? (
                            <td>
                              <span className="badge badge-secondary">
                                {manager?.registeredApplication}
                              </span>
                            </td>
                          ) : null}

                          {/* Applications starts here */}
                          {tableData[10]?.isActive ? (
                            <td>
                              <span className="badge badge-secondary">
                                {manager?.totalApplication}
                              </span>
                            </td>
                          ) : null}
                          {/* Applications ends here */}

                          {permissions?.includes(
                            permissionList?.AdmissionManager_Account_Status
                          ) ? (
                            <>
                              {tableData[11]?.isActive ? (
                                <td>
                                  {
                                    <ToggleSwitch
                                      defaultChecked={
                                        manager?.isActive === false
                                          ? false
                                          : true
                                      }
                                      onChange={(e) => {
                                        handleAccountStatus(e, manager?.id);
                                      }}
                                    />
                                  }
                                </td>
                              ) : null}
                            </>
                          ) : null}

                          {tableData[12]?.isActive ? (
                            <td style={{ width: "8%" }} className="text-center">
                              <ButtonGroup variant="text">
                                {permissions?.includes(
                                  permissionList.View_AdmissionManager_Details
                                ) ? (
                                  <ButtonForFunction
                                    func={() =>
                                      handleViewAdmissionManager(
                                        manager?.id,
                                        manager?.provider?.id
                                      )
                                    }
                                    color={"primary"}
                                    className={"mx-1 btn-sm"}
                                    icon={<i className="fas fa-eye"></i>}
                                    permission={6}
                                  />
                                ) : null}

                                {manager?.email ===
                                "admissionmanager@uapp.uk" ? null : (
                                  <>
                                    {permissions?.includes(
                                      permissionList?.Update_AdmissionManager
                                    ) ? (
                                      <ButtonForFunction
                                        func={() =>
                                          updateAdmissionManager(
                                            manager?.id,
                                            manager?.provider?.id
                                          )
                                        }
                                        color={"warning"}
                                        className={"mx-1 btn-sm"}
                                        icon={<i className="fas fa-edit"></i>}
                                        permission={6}
                                      />
                                    ) : null}

                                    {permissions?.includes(
                                      permissionList?.Delete_AdmissionManager
                                    ) ? (
                                      <ButtonForFunction
                                        func={() => toggleDelete(manager)}
                                        color={"danger"}
                                        className={"mx-1 btn-sm"}
                                        icon={
                                          <i className="fas fa-trash-alt"></i>
                                        }
                                        permission={6}
                                      />
                                    ) : null}
                                  </>
                                )}
                              </ButtonGroup>
                              <ConfirmModal
                                text="Do You Want To Delete This Admission Manager? Once Deleted it can't be Undone "
                                // ${delData?.name}
                                isOpen={deleteModal}
                                toggle={closeDeleteModal}
                                cancel={closeDeleteModal}
                                buttonStatus={buttonStatus}
                                progress={progress}
                                confirm={handleDelete}
                              ></ConfirmModal>
                              {/* 
                          <Modal
                            isOpen={deleteModal}
                            toggle={closeDeleteModal}
                            className="uapp-modal"
                          >
                            <ModalBody>
                              <p>
                                Are You Sure to Delete this <b>{managerName}</b>{" "}
                                ? Once Deleted it can't be Undone!
                              </p>
                            </ModalBody>

                            <ModalFooter>
                              <Button
                                disabled={buttonStatus}
                                color="danger"
                                onClick={handleDelete}
                              >
                                {progress ? <ButtonLoader /> : "YES"}
                              </Button>
                              <Button onClick={closeDeleteModal}>NO</Button>
                            </ModalFooter>
                          </Modal> */}
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

          <Pagination
            dataPerPage={dataPerPage}
            totalData={entity}
            paginate={paginate}
            currentPage={currentPage}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default AddMissionManagerAdd;
