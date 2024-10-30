import React, { useState } from "react";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import Program from "./Program";
import UniversityHead from "./UniversityHead";

const University = ({
  info,
  i,
  userType,
  userTypes,
  permissions,
  permissionList,
  showLocal,
  showEU,
  showInt,
  studentDataValue,
  setModalCampus,
  setModalIntake,
  setModalDeliveryPattern,
  setCurrentData,
  setPrimaryCampus,
  campusValue,
  setModal,
  setEligibilityWhileApplying,
  setElStatus,
  setEligibleModal,
  setElAns,
  programName,
  studentTypeValue,
  departmentValue,
  subValue,
  programValue,
  intakeValue,
  setFee,
  setUnInfo,
  applicationTypes,
}) => {
  const { addToast } = useToasts();
  const [loadAll, setLoalAll] = useState(false);
  const [moreData, setMoreData] = useState([]);
  const [loading, setLoading] = useState(false);

  const showAllData = (id) => {
    setLoalAll(true);
    setLoading(true);
    handleMoreSubject(id);
  };

  const collapseALl = () => {
    setLoalAll(false);
    setMoreData([]);
  };

  const handleMoreSubject = (universityId) => {
    const programLevelName = programName === "" ? "null" : programName;

    get(
      `ApplyFilter/Subjects/${universityId}/${studentTypeValue}/${studentDataValue}/${departmentValue}/${subValue}/${programValue}/${campusValue}/${intakeValue}/${programLevelName}`
    ).then((res) => {
      setMoreData(res);
      setLoading(false);
    });
  };
  const addToWishList = (data) => {
    get(
      `wishlist/add/${
        userType === userTypes?.Student
          ? localStorage.getItem("referenceId")
          : studentDataValue
      }/${data?.subjectId}`
    ).then((res) => {
      if (res == null) {
        addToast("Course already exists in wishlist", {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (res === true) {
        addToast("Added to your wishlist", {
          appearance: "success",
          autoDismiss: true,
        });
      } else if (res === false) {
        addToast("Something went wrong", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };
  const toggleModal = (data, data2) => {
    if (studentDataValue !== "0") {
      setUnInfo([info?.logo, info?.name]);

      setModalCampus(data?.campuses);
      setModalIntake(data?.intakes);
      setModalDeliveryPattern(data?.deliveryPatterns);
      setCurrentData(data);
      setPrimaryCampus(data?.campuses.find((s) => s.campusId === campusValue));
      checkEligibilityWhileApplying(data2, data);
      setModal(true);
    } else {
      addToast("Please select student", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
  };

  const checkEligibilityWhileApplying = (info, subjectInfo) => {
    get(
      `Eligibility/CheckEligibility/${info?.universityId}/${
        subjectInfo?.subjectId
      }/${localStorage.getItem("referenceId")}`
    ).then((res) => {
      setEligibilityWhileApplying(res);
    });

    get(
      `Eligibility/ApplicationOverview/${info?.universityId}/${subjectInfo?.subjectId}/${studentDataValue}`
    ).then((res) => {
      setElStatus(res);
    });
    get(
      `Eligibility/ApplicationSummery/${studentDataValue}/${subjectInfo?.subjectId}`
    ).then((res) => {
      setFee(res);
    });
  };

  const checkEligibility = (data1, data2) => {
    setEligibleModal(true);
    get(
      `Eligibility/CheckEligibility/${data1?.universityId}/${data2?.subjectId}/${studentDataValue}`
    ).then((res) => {
      setElAns(res);
    });
    setEligibleModal(true);
  };
  return (
    <div
      key={i}
      className="custom-card-border mb-3"
      style={{
        borderBottom: `6px solid #045D5E`,
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      }}
    >
      <UniversityHead info={info} />
      <div className="overflowY-630px">
        {info?.subjects?.length < 1 ? (
          <div className="text-center mb-24px">
            <span className="nodata-found-style">No Courses found</span>
          </div>
        ) : (
          <>
            {info?.subjects.map((subjectInfo, i) => (
              <div
                style={{ border: "0.5px solid rgba(37, 37, 37, 0.12)" }}
                className="px-4 py-3 background-for-odd-even"
              >
                {" "}
                <Program
                  subjectInfo={subjectInfo}
                  i={i}
                  userType={userType}
                  userTypes={userTypes}
                  permissions={permissions}
                  permissionList={permissionList}
                  showLocal={showLocal}
                  showEU={showEU}
                  showInt={showInt}
                  studentDataValue={studentDataValue}
                  applicationTypes={applicationTypes}
                  addToWishList={() => addToWishList(subjectInfo)}
                  toggleModal={() => toggleModal(subjectInfo, info)}
                  checkEligibility={() => checkEligibility(info, subjectInfo)}
                />
              </div>
            ))}
            <div id={info?.universityId}></div>
          </>
        )}

        {moreData?.length > 0 &&
          moreData?.map((subjectInfo, i) => (
            <div
              style={{ border: "0.5px solid rgba(37, 37, 37, 0.12)" }}
              className="px-4 py-3 background-for-odd-even-more-course"
            >
              {" "}
              <Program
                subjectInfo={subjectInfo}
                i={i}
                userType={userType}
                userTypes={userTypes}
                permissions={permissions}
                permissionList={permissionList}
                showLocal={showLocal}
                showEU={showEU}
                showInt={showInt}
                studentDataValue={studentDataValue}
                applicationTypes={applicationTypes}
                addToWishList={() => addToWishList(subjectInfo)}
                toggleModal={() => toggleModal(subjectInfo, info)}
                checkEligibility={() => checkEligibility(info, subjectInfo)}
              />
            </div>
          ))}
        {/* show all span */}
      </div>
      {info?.subjectCounter > 0 ? (
        <>
          {!loadAll ? (
            <div className="text-center mb-24px">
              <span
                className="show-all-search-data-style"
                onClick={() => showAllData(info?.universityId)}
              >
                See {info?.subjectCounter} More Courses{" "}
                <i className="fas fa-angle-right mt-2"></i>
              </span>
            </div>
          ) : (
            <>
              {loading ? (
                <div className="d-flex justify-content-center mb-24px">
                  <div class="spinner-border text-primary " role="status">
                    <span class="sr-only text-center">Loading...</span>
                  </div>
                </div>
              ) : (
                <div className="text-center mb-24px">
                  <span
                    className="show-all-search-data-style"
                    onClick={collapseALl}
                  >
                    Hide {info?.subjectCounter} More Courses{" "}
                    <i className="fas fa-angle-left mt-2"></i>
                  </span>
                </div>
              )}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default University;
