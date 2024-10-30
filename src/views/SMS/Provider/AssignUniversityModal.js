import React, { useEffect, useState } from "react";
import { Input, Form, FormGroup, Table } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";

const AssignUniversityModal = ({
  managerId,
  setModalOpen,
  success,
  setSuccess,
}) => {
  const { addToast } = useToasts();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [searchStr, setSearchStr] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [callApi, setCallApi] = useState(false);
  const [assign, setAssign] = useState({});

  const [showUniversity, setShowUniversity] = useState({});
  console.log(showUniversity, "university name");

  useEffect(() => {
    get(`AdmissionManagerUniversity/Unassigned/${managerId}`).then((res) => {
      setAssign(res);
      setShowUniversity(res);
    });
  }, [managerId]);

  useEffect(() => {
    if (searchStr) {
      const filterData = assign?.filter((search) => {
        return search?.universityName
          .toLowerCase()
          .includes(searchStr.toLowerCase());
      });

      setShowUniversity(filterData);
    }
  }, [searchStr, assign]);

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonStatus(true);
    setProgress(true);
    post(`AdmissionManagerUniversity/AssignUniversities`, assign).then(
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

    console.log(assign, checkItem[0].universityId, checkItem, i);
    const values = [...assign];
    values[i].isAcceptHome = e.target.checked;
    setAssign(values);
  };
  const handleisAcceptEu = (e, id) => {
    const checkItem = assign.filter((obj) => obj.universityId === id);
    let i = assign.findIndex(
      (obj) => obj.universityId === checkItem[0].universityId
    );

    const values = [...assign];
    values[i].isAcceptEu = e.target.checked;
    setAssign(values);
  };
  const handleisAcceptInternational = (e, id) => {
    const checkItem = assign.filter((obj) => obj.universityId === id);
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
      setCallApi((prev) => !prev);
    }
  };

  return (
    <>
      <Input
        className="mb-2"
        style={{ height: "2.7rem" }}
        type="text"
        // name="search"
        value={searchStr}
        // id="search"
        placeholder="Search University"
        onChange={searchValue}
        onKeyDown={handleKeyDown}
      />
      <Form onSubmit={handleSubmit}>
        <div className="table-responsive mb-3">
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
            <tbody className="border-buttom">
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
                        defaultChecked={
                          item?.isAcceptEu === true ? true : false
                        }
                      />
                    </td>
                    <td className="text-center">
                      <input
                        // className="form-check-input"
                        type="checkbox"
                        onChange={(e) => {
                          handleisAcceptInternational(e, item?.universityId);
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
        </div>

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

export default AssignUniversityModal;
