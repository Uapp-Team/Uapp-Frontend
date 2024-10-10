import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../constants/userTypeConstant";
import { Card, CardBody, Col, Row } from "reactstrap";
import manageQueries from "../../../assets/icon/MangageQuerries.svg";
import ButtonForFunction from "../Components/ButtonForFunction";
import Typing from "../../../components/form/Typing";
import faqUniversityImg from "../../../assets/img/faq-university-img.svg";
import { useHistory, useParams } from "react-router";
import Uget from "../../../helpers/Uget";
import { rootUrl } from "../../../constants/constants";

const UniversityListForSharingFAQ = () => {
  const [searchStr, setSearchStr] = useState("");
  const [universityList, setUniversityList] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Uget(`University/get?&searchText=${searchStr}`).then((res) => {
      setUniversityList(res?.data);
    });
  }, [searchStr]);

  const handleManageQueries = () => {
    history.push("/university-information-doc-faq");
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
                <a href="affiliate-List" target="">
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
                </a>
              </Col>
            ))}
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default UniversityListForSharingFAQ;
