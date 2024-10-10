import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import get from "../../../helpers/get";
import Select from "react-select";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import TagButton from "../../../components/buttons/TagButton";
import Year from "../../../components/date/Year";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ApplicationReport = () => {
  const monthlist = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [consultant, setConsultant] = useState([]);
  const [overview, setOverview] = useState([]);
  const [consultantType, setConsultantType] = useState([]);
  const [month, setMonth] = useState();
  const [monthLabel, setMonthLabel] = useState(
    monthlist[new Date().getMonth()]
  );
  const [monthValue, setMonthValue] = useState(new Date().getMonth() + 1);
  const [yearLable, setYearLable] = useState(new Date().getFullYear());
  const [yearValue, setYearValue] = useState(new Date().getFullYear());
  const [offer, setOffer] = useState([]);
  const [consultantLabel, setConsultantLabel] = useState(
    "All Consultant Types"
  );
  const [consultantValue, setConsultantValue] = useState(0);

  const [offerLabel, setOfferLabel] = useState("All Offer Status");
  const [offerValue, setOfferValue] = useState(0);

  const handleClearSearch = () => {
    setMonthLabel("Month");
    setMonthValue(0);
    setYearLable("Year");
    setYearValue(0);
    setOfferLabel("All Offer Status");
    setOfferValue(0);
    setConsultantLabel("All Consultant Types");
    setConsultantValue(0);
  };

  useEffect(() => {
    get(`Month/Getall`).then((res) => {
      setMonth(res);
    });

    get(`ConsultantTypeDD/Index`).then((res) => {
      setConsultantType([{ id: 0, name: "All Consultant Types" }, ...res]);
    });

    get(`OfferStatusDD/Index`).then((res) => {
      res.pop();
      setOffer([{ id: 0, name: "All Offer Status" }, ...res]);
    });
  }, []);

  useEffect(() => {
    get(
      `ApplicationReport/Consultants?monthid=${monthValue}&yearid=${yearValue}&offerid=${offerValue}&typeid=${consultantValue}`
    ).then((res) => {
      setConsultant(res);
      setOverview([]);
    });
  }, [monthValue, yearValue, offerValue, consultantValue]);

  const overviewHandle = (id) => {
    get(
      `ApplicationReport/Overview?monthid=${monthValue}&yearid=${yearValue}&offerid=${offerValue}&consultantid=${id}`
    ).then((res) => {
      setOverview(res);
    });
  };

  const consultantOptions = consultantType?.map((con) => ({
    label: con?.name,
    value: con?.id,
  }));

  const monthList = month?.map((key) => ({
    label: key.name,
    value: key.id,
  }));

  const offerOptions = offer?.map((os) => ({
    label: os?.name,
    value: os?.id,
  }));

  const selectConsultant = (label, value) => {
    setConsultantLabel(label);
    setConsultantValue(value);
  };

  const selectMonth = (label, value) => {
    setMonthLabel(label);
    setMonthValue(value);
  };

  const selectOfferStatus = (label, value) => {
    setOfferLabel(label);
    setOfferValue(value);
  };

  return (
    <div>
      <BreadCrumb title="Application Report" backTo="" path="/" />

      <Card>
        <CardBody>
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <Select
                options={monthList}
                value={{ label: monthLabel, value: monthValue }}
                onChange={(opt) => selectMonth(opt.label, opt.value)}
                name="month"
                id="month"
                required
              />
            </div>

            <div className="col-md-3 col-sm-12">
              <Year
                border="border"
                lable={yearLable}
                setLable={setYearLable}
                yearValue={yearValue}
                setYearValue={setYearValue}
                action={() => {}}
              />
            </div>

            <div className="col-md-3 col-sm-12">
              <Select
                options={offerOptions}
                value={{
                  label: offerLabel,
                  value: offerValue,
                }}
                onChange={(opt) => selectOfferStatus(opt.label, opt.value)}
                name="offerStatusId"
                id="offerStatusId"
              />
            </div>

            <div className="col-md-3 col-sm-12">
              <Select
                options={consultantOptions}
                value={{
                  label: consultantLabel,
                  value: consultantValue,
                }}
                onChange={(opt) => selectConsultant(opt.label, opt.value)}
                name="consultantId"
                id="consultantId"
              />
            </div>
          </div>

          <div className="d-flex justify-content-start mt-3">
            <div className="d-flex mt-1">
              {monthValue !== 0 ? (
                <TagButton
                  label={monthLabel}
                  setValue={() => setMonthValue(0)}
                  setLabel={() => setMonthLabel("Month")}
                />
              ) : (
                ""
              )}
              {yearValue !== 0 ? (
                <TagButton
                  label={yearLable}
                  setValue={() => setYearValue(0)}
                  setLabel={() => setYearLable("Year")}
                />
              ) : (
                ""
              )}
              {offerValue !== 0 ? (
                <TagButton
                  label={offerLabel}
                  setValue={() => setOfferValue(0)}
                  setLabel={() => setOfferLabel("All Offer Status")}
                />
              ) : (
                ""
              )}
              {consultantValue !== 0 ? (
                <TagButton
                  label={consultantLabel}
                  setValue={() => setConsultantValue(0)}
                  setLabel={() => setConsultantLabel("All Consultant Types")}
                />
              ) : (
                ""
              )}
            </div>
            <div className="mt-1 mx-1 d-flex btn-clear">
              {monthValue !== 0 ||
              yearValue !== 0 ||
              offerValue !== 0 ||
              consultantValue !== 0 ? (
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
        <Col md={5}>
          {consultant.length === 0 ? null : (
            <Card>
              <CardBody>
                <Table responsive className="mt-3">
                  <thead className="tablehead">
                    <tr>
                      <td className="text-center">Consultant</td>
                      <td className="text-center">Applications </td>
                      <td className="text-center">Unconditionals</td>
                    </tr>
                  </thead>
                  <tbody>
                    {consultant?.map((item, i) => (
                      <tr
                        key={i}
                        className="border-buttom pointer"
                        onClick={() => overviewHandle(item?.consultantId)}
                      >
                        <td className="text-center">{item?.consultantName}</td>
                        <td className="text-center">
                          {item?.applicationCount}
                        </td>
                        <td className="text-center">{item?.unconditionals}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </Col>
        <Col md={7}>
          {consultant.length !== 0 && overview.length === 0 ? (
            <Card>
              <CardBody>
                <p className="text-center">Select Consultant to view report</p>
              </CardBody>
            </Card>
          ) : (
            <>
              {overview.length === 0 ? null : (
                <Card>
                  <CardBody>
                    <Table responsive className="mt-3">
                      <thead className="tablehead">
                        <tr>
                          <td className="text-center">Uapp ID</td>
                          <td className="text-center">Name </td>
                          {/* <td>University</td>
                          <td>Course </td> */}
                          <td className="text-center">Total Application </td>
                          <td className="text-center">
                            Total Unconditionals No
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        {overview?.map((item, i) => (
                          <tr key={i} className="border-buttom pointer">
                            <td className="text-center">
                              <Link to={`/studentProfile/${item?.studentId}`}>
                                {item?.uappId}
                              </Link>
                            </td>
                            <td className="text-center">{item?.studentName}</td>
                            {/* <td>
                              <Link
                                to={`/universityDetails/${item?.universityId}`}
                              >
                                {item?.universityName}
                              </Link>
                            </td>
                            <td>
                              <Link to={`/subjectProfile/${item?.subjectId}`}>
                                {item?.subjectName}
                              </Link>
                            </td> */}

                            <td className="text-center">
                              {item?.totalApplication}
                            </td>
                            <td className="text-center">
                              {item?.unconditionalCount}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              )}
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ApplicationReport;
