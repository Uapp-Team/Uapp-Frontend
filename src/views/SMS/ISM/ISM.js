import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import ButtonForFunction from "../Components/ButtonForFunction";
import Typing from "../../../components/form/Typing";
import { useHistory } from "react-router";
import Uget from "../../../helpers/Uget";
import { rootUrl } from "../../../constants/constants";
import { AdminUsers, AdmissionUsers } from "../../../components/core/User";
import GroupButton from "../../../components/buttons/GroupButton";
import Filter from "../../../components/Dropdown/Filter";

const ISM = () => {
  const [universityList, setUniversityList] = useState([]);
  const [uniTypeLabel, setUniTypeLabel] = useState("Select Type");
  const [uniTypeValue, setUniTypeValue] = useState(0);

  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tab, setTab] = useState("1");
  const history = useHistory();

  useEffect(() => {
    if (!isTyping) {
      Uget(`University/get?&searchText=${searchStr}`).then((res) => {
        setUniversityList(res?.data);
      });
    }
  }, [isTyping, searchStr]);

  const handleManageQueries = () => {
    history.push("/university-information-doc-faq");
  };

  const redirectRoute = (item) => {
    if (AdminUsers() || AdmissionUsers()) {
      history.push(`/university-information-doc-faq-by-id/${item?.id}`, {
        state: { name: item?.universityFullName, id: item?.id },
      });
    } else {
      history.push(`/users-answer-for-fAQ/${item?.id}`, {
        state: { name: item?.universityFullName, id: item?.id },
      });
    }
  };

  return (
    <div>
      <BreadCrumb
        title="University Information sharing & FAQ"
        backTo=""
        path="/"
      />

      <Card>
        <CardBody>
          {/* {(AdminUsers() || AdmissionUsers()) && (
            <div className="d-flex justify-content-between University-information-list-text mb-4">
              <p className="d-flex align-items-center mr-3">
                Manage Queries for University information manage
              </p>
              <ButtonForFunction
                func={handleManageQueries}
                className={"btn btn-uapp-add "}
                icon={<i class="fas fa-list-ul"></i>}
                name={"Manage Queries"}
              />
            </div>
          )} */}
          <h3 className="mb-4">University Information Documents & FAQ</h3>

          <GroupButton
            list={[
              { id: "1", name: "University" },
              { id: "2", name: "All Question" },
            ]}
            value={tab}
            setValue={setTab}
            action={() => {}}
          />

          {tab === "1" ? (
            <>
              <Row className="d-flex justify-content-between align-items-center">
                <Col md={6}>
                  <h5 className="Universities-text-faq">Universities</h5>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={6} className="mb-1">
                      <Filter
                        data={[
                          {
                            id: 0,
                            name: "All",
                          },
                          {
                            id: 1,
                            name: "Home",
                          },
                          {
                            id: 2,
                            name: "EU/UK",
                          },
                          {
                            id: 3,
                            name: "International",
                          },
                        ]}
                        label={uniTypeLabel}
                        setLabel={setUniTypeLabel}
                        value={uniTypeValue}
                        setValue={setUniTypeValue}
                        action={() => {}}
                      />
                    </Col>
                    <Col md={6} className="mb-1">
                      <Typing
                        name="search"
                        placeholder="Search University"
                        value={searchStr}
                        setValue={setSearchStr}
                        setIsTyping={setIsTyping}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
              <hr />

              <Row>
                {universityList?.map((item, i) => (
                  <Col key={i} lg={2} sm={6} className="pb-4 click-faq">
                    <div
                      onClick={() => redirectRoute(item)}
                      className="pointer"
                    >
                      <div className="university-card-faq">
                        <p class="text-right mt-2 mr-1 mb-0">
                          <span className="bg-fb532e text-white p-1 rounded">
                            {item?.totalQuestionCount >= 100
                              ? "99+"
                              : item?.totalQuestionCount}
                          </span>
                        </p>

                        <div className="university-card-img-faq d-flex align-items-center justify-content-center">
                          <img
                            src={rootUrl + item?.universityLogoImage}
                            alt=""
                          />
                        </div>
                        <hr className="my-2" />
                        <h6 className="text-center text-ellipsis">
                          {item?.universityFullName}
                        </h6>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default ISM;
