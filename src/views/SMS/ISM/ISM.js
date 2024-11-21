import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import Typing from "../../../components/form/Typing";
import Uget from "../../../helpers/Uget";
import { rootUrl } from "../../../constants/constants";
import GroupButton from "../../../components/buttons/GroupButton";
import ISMDocuments from "./ISMDocuments";
import { AdminUsers, AdmissionUsers } from "../../../components/core/User";
import ButtonForFunction from "../Components/ButtonForFunction";

const ISM = () => {
  const [universityList, setUniversityList] = useState([]);
  const [uniValue, setUniValue] = useState(0);
  const [uniLable, setUniLable] = useState("Select University");
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [tab, setTab] = useState("2");

  useEffect(() => {
    if (!isTyping) {
      Uget(`University/get?&searchText=${searchStr}`).then((res) => {
        setUniversityList(res?.data);
      });
    }
  }, [isTyping, searchStr]);

  const redirectRoute = (item) => {
    setUniValue(item?.id);
    setUniLable(item?.universityFullName);
    setTab("2");
  };
  // const redirectRoute = (item) => {
  //   if (AdminUsers() || AdmissionUsers()) {
  //     history.push(`/university-information-doc-faq-by-id/${item?.id}`, {
  //       state: { name: item?.universityFullName, id: item?.id },
  //     });
  //   } else {
  //     history.push(`/users-answer-for-fAQ/${item?.id}`, {
  //       state: { name: item?.universityFullName, id: item?.id },
  //     });
  //   }
  // };

  return (
    <div>
      <BreadCrumb
        title="University Information sharing & FAQ"
        backTo=""
        path="/"
      />

      <Card>
        <CardBody>
          {(AdminUsers() || AdmissionUsers()) && (
            <div className="d-flex justify-content-between align-items-center University-information-list-text mb-4">
              <p className="d-flex align-items-center mr-3 mb-0">
                Manage Queries for University information manage
              </p>
              <ButtonForFunction
                // func={handleManageQueries}
                className={"btn btn-uapp-add p-2"}
                icon={<i class="fas fa-list-ul"></i>}
                name={"Manage Queries"}
              />
            </div>
          )}

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
                <Col xs={7}>
                  <span className="Universities-text-faq fs-24px">
                    Universities
                  </span>
                </Col>
                <Col xs={5} className="mb-1">
                  <Typing
                    name="search"
                    placeholder="Search University"
                    value={searchStr}
                    setValue={setSearchStr}
                    setIsTyping={setIsTyping}
                  />
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
          ) : (
            <ISMDocuments
              uniValue={uniValue}
              setUniValue={setUniValue}
              uniLable={uniLable}
              setUniLable={setUniLable}
            />
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ISM;
