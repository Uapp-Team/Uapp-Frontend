import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import ButtonForFunction from "../Components/ButtonForFunction";
import Typing from "../../../components/form/Typing";
import { useHistory } from "react-router";
import Uget from "../../../helpers/Uget";
import { rootUrl } from "../../../constants/constants";
import { AdminUsers, AdmissionUsers } from "../../../components/core/User";

const UniversityListForSharingFAQ = () => {
  const [universityList, setUniversityList] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [isTyping, setIsTyping] = useState(false);
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
          {(AdminUsers() || AdmissionUsers()) && (
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
          )}
          <div className="d-flex justify-content-between align-items-center px-4">
            <h5 className="Universities-text-faq">Universities</h5>
            <div>
              <Typing
                name="search"
                placeholder="Search University"
                value={searchStr}
                setValue={setSearchStr}
                setIsTyping={setIsTyping}
              />
            </div>
          </div>
          <hr />

          <Row>
            {universityList?.map((item, i) => (
              <Col key={i} lg={2} sm={6} className="pb-4 click-faq">
                <div onClick={() => redirectRoute(item)} className="pointer">
                  {" "}
                  <div className="university-card-faq">
                    {/* <div className="university-card-faq" onClick={setIsTyping}> */}
                    <div className="ml-2 mt-2">
                      <span className="mr-1 green-count-answer">
                        {item?.totalAnswerCount}
                      </span>
                      <span className="blue-count-answer ">
                        {item?.totalQuestionCount}
                      </span>
                    </div>
                    <div className="university-card-img-faq d-flex align-items-center justify-content-center">
                      <img src={rootUrl + item?.universityLogoImage} alt="" />
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
        </CardBody>
      </Card>
    </div>
  );
};

export default UniversityListForSharingFAQ;
