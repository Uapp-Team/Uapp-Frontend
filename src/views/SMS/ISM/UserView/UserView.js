import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ismhero from "../../../../assets/img/ismhero.png";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Typing from "../../../../components/form/Typing";
import { Card, CardBody, Col, Row } from "reactstrap";
import UserViewAns from "./UserViewAns";
import Uget from "../../../../helpers/Uget";

const UserView = () => {
  const history = useHistory();
  const [noFilter, setNoFilter] = useState(true);
  const [uniLable, setUniLable] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);
  const [uniModal, setUniModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [openIndex, setOpenIndex] = useState(0);
  const [answerData, setAnswerData] = useState([]);

  const redirectRoute = (label, value) => {
    history.push(`/informationViewUniversity`, {
      state: { name: label, id: value },
    });
  };

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `question/get-paginated-by-university?index=${1}&size=${100}&universityId=${uniValue}&subCategoryId=${categoryId}&searchText=${keyword}`
      ).then((res) => {
        console.log(res?.items);
        setAnswerData(res?.items);
      });
    }
  }, [categoryId, isTyping, keyword, uniValue]);

  useEffect(() => {
    Uget(`QuestionCategory/get-all`).then((res) => {
      setCategory(res?.data);
    });
  }, []);

  useEffect(() => {
    keyword === "" && categoryId === 0 ? setNoFilter(true) : setNoFilter(false);
  }, [categoryId, keyword]);
  return (
    <>
      <BreadCrumb title="Information Search" backTo="" path="/" />

      <Card>
        <CardBody>
          <div
            className="bg-cover-img py-5 mb-5"
            style={{
              background: "url(" + ismhero + ")",
            }}
          >
            <h2 className="text-white text-center fw-600">
              How can we help you?
            </h2>
            {noFilter && (
              <p className="text-white text-center">
                Search or browse through the category below to find answers.
              </p>
            )}
            <div className="w-50 my-3 mx-auto">
              <Typing
                name=""
                placeholder="Search here ..."
                setValue={setKeyword}
                setIsTyping={setIsTyping}
                isIcon={true}
              />
            </div>

            {noFilter && (
              <div>
                {uniModal ? (
                  <div
                    className="w-50 mx-auto"
                    onMouseLeave={() => setUniModal(!uniModal)}
                  >
                    <DefaultDropdownU
                      label={uniLable}
                      setLabel={setUniLable}
                      value={uniValue}
                      setValue={setUniValue}
                      url="University/get-dd"
                      className="w-100"
                      action={(label, value) => redirectRoute(label, value)}
                    />
                  </div>
                ) : (
                  <p className="text-white text-center pointer">
                    <span onClick={() => setUniModal(!uniModal)}>
                      University wise information <FaRegArrowAltCircleRight />
                    </span>
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="w-75 mx-auto">
            {noFilter ? (
              <Row>
                {category.map((item, i) => (
                  <>
                    {item?.subCategories[0]?.id && (
                      <Col xl={2} lg={3} md={4} xs={6} key={i}>
                        <div
                          onClick={() => {
                            setCategoryId(item?.subCategories[0]?.id);
                            setCategoryName(item?.subCategories[0]?.name);
                            setOpenIndex(item?.id);
                          }}
                          className="ism-category-card pointer"
                        >
                          {item?.name}
                        </div>
                      </Col>
                    )}
                  </>
                ))}
              </Row>
            ) : (
              <UserViewAns
                answerData={answerData}
                uniLable={uniLable}
                setUniLable={setUniLable}
                uniValue={uniValue}
                setUniValue={setUniValue}
                category={category}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UserView;
