import React, { useEffect, useState } from "react";
import { Col, Form, FormGroup, Input, Row, Table } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import Select from "react-select";
import get from "../../../../../helpers/get";
import post from "../../../../../helpers/post";
import CancelButton from "../../../../../components/buttons/CancelButton";
import SaveButton from "../../../../../components/buttons/SaveButton";
import { userTypes } from "../../../../../constants/userTypeConstant";
import TagButton from "../../../../../components/buttons/TagButton";

const AssignOfficerUniversityModal = ({
  officerId,
  setModalOpen,
  success,
  setSuccess,
}) => {
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const [admissionManager, setAdmissionManager] = useState([]);
  const [managerLabel, setManagerLabel] = useState("Select Admission Manager");
  const [managerValue, setManagerValue] = useState(0);
  const [assign, setAssign] = useState({});

  const [searchStr, setSearchStr] = useState("");
  const [showUniversity, setShowUniversity] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [callApi, setCallApi] = useState(false);

  useEffect(() => {
    get(`AdmissionManagerDD/AdmissionOfficer/${officerId}`).then((res) => {
      setAdmissionManager(res);
    });
  }, [officerId]);

  useEffect(() => {
    if (userType === userTypes?.AdmissionManager) {
      setManagerValue(referenceId);
    }
  }, [referenceId, userType]);

  useEffect(() => {
    get(
      `AdmissionOfficerUniversity/Unassigned/${officerId}/${managerValue}`
    ).then((res) => {
      setAssign(res);
      setShowUniversity(res);
    });
  }, [managerValue, officerId]);

  useEffect(() => {
    if (searchStr) {
      console.log(searchStr);
      console.log(assign);
      const filterData = assign?.filter((search) =>
        search?.universityName.toLowerCase().includes(searchStr.toLowerCase())
      );

      console.log(filterData);
      setShowUniversity(filterData);
    }
  }, [searchStr, assign]);

  const admissionmanagerOptions = admissionManager.map((uni) => ({
    label: uni?.name,
    value: uni?.id,
  }));

  const selectAdmissionManager = (label, value) => {
    setManagerLabel(label);
    setManagerValue(value);
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonStatus(true);
    setProgress(true);
    post(`AdmissionOfficerUniversity/AssignUniversities`, assign).then(
      (res) => {
        setButtonStatus(false);
        setProgress(false);
        if (res?.status === 200 && res?.data?.isSuccess === true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setModalOpen(false);
          setSuccess(!success);
        } else {
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    );
  };

  const handleisAcceptHome = (e, id) => {
    const checkItem = showUniversity.filter((obj) => obj.universityId === id);
    let i = assign.findIndex(
      (obj) => obj.universityId === checkItem[0].universityId
    );
    const values = [...assign];
    values[i].isAcceptHome = e.target.checked;
    setAssign(values);
  };

  const handleisAcceptEu = (e, id) => {
    const checkItem = showUniversity.filter((obj) => obj.universityId === id);
    let i = assign.findIndex(
      (obj) => obj.universityId === checkItem[0].universityId
    );
    const values = [...assign];
    values[i].isAcceptEu = e.target.checked;
    setAssign(values);
  };

  const isAcceptInternational = (e, id) => {
    const checkItem = showUniversity.filter((obj) => obj.universityId === id);
    let i = assign.findIndex(
      (obj) => obj.universityId === checkItem[0].universityId
    );
    const values = [...assign];
    values[i].isAcceptInternational = e.target.checked;
    setAssign(values);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setCallApi((prev) => !prev);
  };

  const searchValue = (e) => {
    setSearchStr(e.target.value);
    handleSearch();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setCurrentPage(1);
      // setCallApi((prev) => !prev);
    }
  };

  const handleClearSearch = () => {
    setManagerLabel("Select Admission Manager");
    setManagerValue(0);
    setCallApi((prev) => !prev);
    setSearchStr("");
    setCurrentPage(1);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        {userType === userTypes?.AdmissionManager.toString() ? null : (
          <>
            <FormGroup>
              <span>Admission Manager</span>

              <Select
                options={admissionmanagerOptions}
                value={{
                  label: managerLabel,
                  value: managerValue,
                }}
                onChange={(opt) => selectAdmissionManager(opt.label, opt.value)}
              />
            </FormGroup>
          </>
        )}
        <Input
          className="mb-2"
          style={{ height: "2.7rem" }}
          type="text"
          name="search"
          value={searchStr}
          id="search"
          placeholder="Search University"
          onChange={searchValue}
          onKeyDown={handleKeyDown}
        />

        <Row className="mb-2">
          <Col lg="12" md="12" sm="12" xs="12">
            <div style={{ display: "flex", justifyContent: "start" }}>
              <div className="mt-1">
                {managerValue !== 0 && (
                  <TagButton
                    label={managerLabel}
                    setValue={() => setManagerValue(0)}
                    setLabel={() => setManagerLabel("Select Admission Manager")}
                  ></TagButton>
                )}
              </div>
              <div className="mt-1 mx-1 d-flex btn-clear">
                {managerValue !== 0 ? (
                  <button className="tag-clear" onClick={handleClearSearch}>
                    Clear All
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Col>
        </Row>

        <Table>
          <thead className="tablehead">
            <td className="border-0">
              <b>University</b>
            </td>
            <td className="border-0 text-center">
              <b>Home</b>
            </td>
            <td className="border-0 text-center">
              <b>EU</b>
            </td>
            <td className="border-0 text-center">
              <b>International</b>
            </td>
          </thead>
          <tbody style={{ borderBottom: "1px solid #dee2e6" }}>
            {showUniversity.length > 0 &&
              showUniversity?.map((item, i) => (
                <tr key={i}>
                  <td>{item?.universityName}</td>
                  <td className="text-center">
                    <input
                      // className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        handleisAcceptHome(e, item?.universityId);
                      }}
                      value={item?.isAcceptHome}
                      defaultChecked={
                        item?.isAcceptHome === true ? true : false
                      }
                    />
                  </td>
                  <td className="text-center">
                    <input
                      // className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        handleisAcceptEu(e, item?.universityId);
                      }}
                      value={item?.isAcceptEu}
                      defaultChecked={item?.isAcceptEu === true ? true : false}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      // className="form-check-input"
                      type="checkbox"
                      onChange={(e) => {
                        isAcceptInternational(e, item?.universityId);
                      }}
                      value={item?.isAcceptInternational}
                      defaultChecked={
                        item?.isAcceptInternational === true ? true : false
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <FormGroup>
          <CancelButton cancel={closeModal} />
          <SaveButton
            text="Submit"
            progress={progress}
            buttonStatus={buttonStatus}
          />
        </FormGroup>
      </Form>
    </>
  );
};

export default AssignOfficerUniversityModal;
