import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Table } from "reactstrap";
import get from "../../../../../../../helpers/get";
import ProviderCard from "../../ProfileComponent/ProviderCard";
import { rootUrl } from "../../../../../../../constants/constants";
import ProfileHead from "../AdmissionManagerForAdministrator/Componet/ProfileHead";
import BreadCrumb from "../../../../../../../components/breadCrumb/BreadCrumb";
import { dateFormate } from "../../../../../../../components/date/calenderFormate";

const AdmissionManagerOwnProfile = () => {
  const [headData, setHeadData] = useState({});

  const { admissionManagerId } = useParams();

  const userId = localStorage.getItem("referenceId");
  const [data, setData] = useState({});

  useEffect(() => {
    if (admissionManagerId === undefined) {
      get(`AddmissionManagerProfile/Profile/${userId}`).then((res) => {
        console.log(res);
        setData(res);
      });
    } else {
      get(`AddmissionManagerProfile/Profile/${admissionManagerId}`).then(
        (res) => {
          console.log(res);
          setData(res);
        }
      );
    }
  }, [admissionManagerId, userId]);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  return (
    <div>
      <BreadCrumb title="Profile" backTo="" path={`/`} />

      <div className="row">
        <div className="col-md-8">
          <ProfileHead
            admissionManagerId={admissionManagerId}
            setHeadData={setHeadData}
            headData={headData}
          />
          {/* <ProviderHeadForOwnProfile admissionManagerId={admissionManagerId} /> */}
          {/* <ProfileHead admissionManagerId={admissionManagerId} /> */}

          <div>
            <>
              {/* General Information */}
              <Card className="p-4">
                <h5 className="mb-4">Admission Manager Details</h5>
                <span
                  className="app-style-const p-2"
                  style={{ backgroundColor: "#DFEEEE" }}
                >
                  General Information
                </span>

                <Table borderless responsive className="mb-4">
                  <tbody>
                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Name</td>

                      <td width="60%">
                        {data?.admissionManagerGeneralInfo?.firstName}{" "}
                        {data?.dmissionManagerGeneralInfo?.lastName}
                      </td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Email</td>

                      <td width="60%">
                        {data?.admissionManagerGeneralInfo?.email}
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* General Information */}

                {/* Personal Information */}

                <span
                  className="app-style-const p-2"
                  style={{ backgroundColor: "#DFEEEE" }}
                >
                  Personal Information
                </span>

                <Table borderless responsive className="mb-4">
                  <tbody>
                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Date of Birth</td>

                      <td width="60%">
                        {dateFormate(
                          data?.admissionManagerPersonalInfo?.dateOfBirth
                        )}
                      </td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Passport/ID</td>

                      <td width="60%">
                        {data?.admissionManagerPersonalInfo?.passportId}
                      </td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Gender</td>

                      <td width="60%">
                        {data?.admissionManagerPersonalInfo?.gender?.name}
                      </td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Marital Status</td>

                      <td width="60%">
                        {
                          data?.admissionManagerPersonalInfo?.maritalStatus
                            ?.name
                        }
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Phone Number</td>

                      <td width="60%">
                        {data?.admissionManagerPersonalInfo?.phoneNumber}
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* Personal Information */}

                {/* Contact Information */}

                <span
                  className="app-style-const p-2"
                  style={{ backgroundColor: "#DFEEEE" }}
                >
                  Contact Information
                </span>

                <Table borderless responsive className="mb-4">
                  <tbody>
                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">House No</td>

                      <td width="60%">
                        {data?.admissionManagerAddress?.houseNo}
                      </td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Address Line</td>

                      <td width="60%">
                        {data?.admissionManagerAddress?.addressLine}
                      </td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Country</td>

                      <td width="60%">
                        {data?.admissionManagerAddress?.country?.name}
                      </td>
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">City</td>

                      <td width="60%">{data?.admissionManagerAddress?.city}</td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">State/County</td>

                      <td width="60%">
                        {data?.admissionManagerAddress?.state}
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td width="40%">Zip/Post Code</td>

                      <td width="60%">
                        {data?.admissionManagerAddress?.zipCode}
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* Contact Information */}

                {/* Eligibility */}

                <span
                  className="app-style-const p-2"
                  style={{ backgroundColor: "#DFEEEE" }}
                >
                  Eligibility
                </span>

                <Table borderless responsive className="mb-4">
                  <tbody>
                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td>Country of Citizenship</td>
                      <td>
                        {
                          data?.admissionManagerEligibility
                            ?.countryOfCitizenShip?.name
                        }
                      </td>
                    </tr>
                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      <td>Residence</td>
                      <td>
                        {
                          data?.admissionManagerEligibility?.countryOfResidence
                            ?.name
                        }
                      </td>
                    </tr>

                    {data?.admissionManagerEligibility?.countryOfCitizenShip
                      ?.id ===
                    data?.admissionManagerEligibility?.countryOfResidence
                      ?.id ? null : (
                      <tr
                        style={{
                          borderBottom: "1px solid #2525251F",
                        }}
                      >
                        <td>Residency Status</td>
                        <td>
                          {
                            data?.admissionManagerEligibility?.residencyStatus
                              ?.name
                          }
                        </td>
                      </tr>
                    )}

                    {data?.admissionManagerEligibility?.countryOfCitizenShip
                      ?.id !==
                      data?.admissionManagerEligibility?.countryOfResidence
                        ?.id &&
                    data?.admissionManagerEligibility?.residencyStatus?.id ===
                      2 ? (
                      <>
                        <tr
                          style={{
                            borderBottom: "1px solid #2525251F",
                          }}
                        >
                          <td>Visa Type</td>
                          <td>{data?.admissionManagerEligibility?.visaType}</td>
                        </tr>
                        <tr
                          style={{
                            borderBottom: "1px solid #2525251F",
                          }}
                        >
                          <td>Expiry Date of Your BRP/TRP or Visa</td>
                          <td>
                            {handleDate(
                              data?.admissionManagerEligibility?.expireDate
                            )}
                          </td>
                        </tr>
                        <tr
                          style={{
                            borderBottom: "1px solid #2525251F",
                          }}
                        >
                          <td>Do You Have Right to Work?</td>
                          <td>
                            {data?.admissionManagerEligibility
                              ?.haveRightToWork !== false
                              ? "Yes"
                              : "No"}
                          </td>
                        </tr>
                      </>
                    ) : null}

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      {data?.admissionManagerEligibility?.idOrPassport !==
                      null ? (
                        <>
                          <td width="40%">Id or Passport</td>

                          <td width="60%" className="border-0">
                            {data?.admissionManagerEligibility === null ? (
                              "-"
                            ) : (
                              <a
                                href={
                                  rootUrl +
                                  data?.admissionManagerEligibility
                                    ?.idOrPassport?.fileUrl
                                }
                                target="blank"
                              >
                                {
                                  data?.admissionManagerEligibility
                                    ?.idOrPassport?.fileName
                                }
                              </a>
                            )}
                          </td>
                        </>
                      ) : null}
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      {data?.admissionManagerEligibility?.proofOfAddress !==
                      null ? (
                        <>
                          <td width="40%">Proof of Address</td>

                          <td width="60%" className="border-0">
                            {data?.admissionManagerEligibility === null ? (
                              "-"
                            ) : (
                              <a
                                href={
                                  rootUrl +
                                  data?.admissionManagerEligibility
                                    ?.proofOfAddress?.fileUrl
                                }
                                target="blank"
                              >
                                {
                                  data?.admissionManagerEligibility
                                    ?.proofOfAddress?.fileName
                                }
                              </a>
                            )}
                          </td>
                        </>
                      ) : null}
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      {data?.admissionManagerEligibility?.brp !== null ? (
                        <>
                          <td width="40%">BRP/TRP</td>

                          <td width="60%" className="border-0">
                            {data?.admissionManagerEligibility === null ? (
                              "-"
                            ) : (
                              <a
                                href={
                                  rootUrl +
                                  data?.admissionManagerEligibility?.brp
                                    ?.fileUrl
                                }
                                target="blank"
                              >
                                {
                                  data?.admissionManagerEligibility?.brp
                                    ?.fileName
                                }
                              </a>
                            )}
                          </td>
                        </>
                      ) : null}
                    </tr>

                    <tr
                      style={{
                        borderBottom: "1px solid #2525251F",
                      }}
                    >
                      {data?.admissionManagerEligibility?.cv !== null ? (
                        <>
                          <td width="40%">CV</td>

                          <td width="60%" className="border-0">
                            {data?.admissionManagerEligibility === null ? (
                              "-"
                            ) : (
                              <a
                                href={
                                  rootUrl +
                                  data?.admissionManagerEligibility?.cv?.fileUrl
                                }
                                target="blank"
                              >
                                {
                                  data?.admissionManagerEligibility?.cv
                                    ?.fileName
                                }
                              </a>
                            )}
                          </td>
                        </>
                      ) : null}
                    </tr>
                  </tbody>
                </Table>
              </Card>
              {/* Eligibility */}
            </>
          </div>
        </div>

        <div className="col-md-4">
          <ProviderCard admissionManagerId={admissionManagerId} />
        </div>
      </div>
    </div>
  );
};

export default AdmissionManagerOwnProfile;
