import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import studyLevel from "../../../../assets/img/pages/studyLevel.png";
import booknark from "../../../../assets/icon/bookmarkBg.png";
import AddButton from "../../../../components/buttons/AddButton";

const UniversityProgram = ({
  subjectInfo,
  i,
  userType,
  userTypes,
  permissions,
  permissionList,
  studentDataValue,
  addToWishList,
  toggleModal,
  UniversityId,
  courseList,
}) => {
  console.log(subjectInfo);

  return (
    <>
      <div className=" mt-4">
        {userType === userTypes?.Consultant ||
        userType === userTypes?.Student ? (
          <>
            {courseList?.map((subjectInfo, i) => (
              <div>
                <Link
                  className="subjectNameText"
                  to={`/subjectProfile/${subjectInfo?.subjectId}`}
                >
                  {subjectInfo?.title}
                </Link>
                <br />
                {subjectInfo?.campuses.length !== 0 && (
                  <span className="text-gray-70">
                    Available in:{" "}
                    {subjectInfo?.campuses?.map((item, i) => (
                      <Link to={`/campusDetails/${item?.campusId}`}>
                        {item?.campusName}
                        {subjectInfo?.campuses.length !== i + 1 && ", "}
                      </Link>
                    ))}
                  </span>
                )}
                <div className="row justify-content-between mt-2">
                  <div className="col-12 col-md-9">
                    <div className="table-responsive">
                      <Table
                        borderless
                        style={{ overflowX: "scroll" }}
                        className="mb-0"
                      >
                        <thead className="bg-yellow">
                          <tr>
                            <th>
                              <div className="d-flex align-items-center">
                                <i class="fas fa-pound-sign text-orange mr-1"></i>
                                <span className="d-lg-block d-none">
                                  Tution Fee
                                </span>
                                <span className="d-lg-none d-block">Fees</span>
                              </div>
                            </th>
                            <th>
                              <div className="d-flex align-items-center">
                                <i class="far fa-clock text-orange mr-1"></i>
                                <span>Duration</span>
                              </div>
                            </th>
                            <th>
                              <div className="d-flex align-items-center">
                                <img
                                  style={{ width: "15px" }}
                                  className="mr-1"
                                  src={studyLevel}
                                  alt=""
                                />

                                <span className="d-lg-block d-none">
                                  Level of Study
                                </span>
                                <span className="d-lg-none d-block">
                                  {" "}
                                  Level
                                </span>
                              </div>
                            </th>
                            <th>
                              <div className="d-flex align-items-center">
                                <i class="far fa-calendar-alt text-orange mr-1"></i>
                                <span className="d-lg-block d-none">
                                  {" "}
                                  Next Intake
                                </span>
                                <span className="d-lg-none d-block">
                                  {" "}
                                  Intake
                                </span>
                              </div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>
                              {subjectInfo?.home_Fee ? (
                                <>Local - £{subjectInfo?.home_Fee}</>
                              ) : null}
                              <br />
                              {subjectInfo?.eu_Fee ? (
                                <>EU - £{subjectInfo?.eu_Fee} </>
                              ) : null}
                              <br />
                              {subjectInfo?.international_Fee ? (
                                <>
                                  International - £
                                  {subjectInfo?.international_Fee}{" "}
                                </>
                              ) : null}
                              <br />
                              <span className="text-green">
                                {subjectInfo?.avarageApplicationFee !== 0 ? (
                                  <>
                                    Application Fee: £
                                    {subjectInfo?.international_Fee}{" "}
                                  </>
                                ) : (
                                  "Free to Apply"
                                )}
                              </span>
                            </td>
                            <td> {subjectInfo?.duration} </td>
                            <td> {subjectInfo?.educationLevelName} </td>
                            <td>
                              {subjectInfo?.intakes?.length < 1 ? (
                                <div className="text-center">
                                  <span className="">-</span>
                                </div>
                              ) : (
                                <>
                                  {subjectInfo?.intakes?.map((int, i) => (
                                    <ul style={{ paddingLeft: "0px" }} key={i}>
                                      {int?.intakeName}
                                    </ul>
                                  ))}
                                </>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>

                  <div className="col-12 col-md-3">
                    <div className="text-right">
                      {studentDataValue !== 0 &&
                      permissions?.includes(permissionList.Add_Application) ? (
                        <span
                          className="btn-apply mb-1"
                          onClick={() => toggleModal(subjectInfo, courseList)}
                        >
                          Apply Now
                        </span>
                      ) : null}

                      {userType === userTypes?.Student.toString() ? (
                        <img
                          src={booknark}
                          alt=""
                          className="btn-bookmark ml-3"
                        />
                      ) : null}
                    </div>

                    <div className="mt-3 text-right">
                      {studentDataValue !== 0 ? (
                        <span
                          className="btn-eligibility"
                          onClick={() => addToWishList(subjectInfo)()}
                        >
                          Check eligibility
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div>
              <div className="d-flex justify-content-between mb-3">
                <span className="app-style-const">Courses list</span>
                {permissions?.includes(permissionList.Add_Subjects) && (
                  <Link to={`/add-University-course/${UniversityId}`}>
                    <AddButton className="mb-1" />
                  </Link>
                )}
              </div>

              <div>
                <Table responsive>
                  <thead className="tablehead">
                    <tr>
                      <td>Course name</td>
                      <td>Campuses</td>
                      <td>Education level</td>
                      <td>Duration</td>
                    </tr>
                  </thead>
                  <tbody>
                    {courseList?.map((subjectInfo, i) => (
                      <tr key={i} className="border-buttom">
                        <td>
                          {" "}
                          <Link
                            className="text-body"
                            to={`/subjectProfile/${subjectInfo?.subjectId}`}
                          >
                            {subjectInfo?.title}
                          </Link>
                        </td>
                        <td>
                          {" "}
                          {subjectInfo?.campuses?.map((item, i) => (
                            <Link to={`/campusDetails/${item?.campusId}`}>
                              {item?.campusName}
                              {subjectInfo?.campuses.length !== i + 1 && ", "}
                            </Link>
                          ))}
                        </td>
                        <td> {subjectInfo?.educationLevelName} </td>
                        <td> {subjectInfo?.duration} </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UniversityProgram;
