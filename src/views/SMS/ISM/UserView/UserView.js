import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ismhero from "../../../../assets/img/ismhero.png";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Typing from "../../../../components/form/Typing";
import { Card, CardBody, Col, Row } from "reactstrap";
import UserViewAns from "./UserViewAns";
import Uget from "../../../../helpers/Uget";

const UserView = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [noFilter, setNoFilter] = useState(true);
  const [uniLable, setUniLable] = useState("Select University");
  const [uniValue, setUniValue] = useState(0);
  const [uniModal, setUniModal] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState([]);
  const [university, setUniversity] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [openIndex, setOpenIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [res, setRes] = useState({});
  const [answerData, setAnswerData] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [search, setSearch] = useState([]);

  const redirectRoute = (label, value) => {
    history.push(`/informationViewUniversity`, {
      state: { name: label, id: value },
    });
  };

  useEffect(() => {
    Uget(`QuestionCategory/get-all`).then((res) => {
      setCategory(res?.data);
    });
    Uget(`University/get-dd`).then((res) => {
      setUniversity(res?.data);
    });
  }, []);

  useEffect(() => {
    if (!isTyping) {
      setLoading(true);
      Uget(
        `question/get-paginated-public-view?index=${currentPage}&size=${30}&universityId=${uniValue}&subCategoryId=${categoryId}&status=${4}&searchText=${keyword}`
      ).then((res) => {
        setRes(res);
        setAnswerData(res?.items);
        setLoading(false);
      });
    }
  }, [categoryId, currentPage, isTyping, keyword, uniValue]);

  useEffect(() => {
    Uget(
      `question/get-paginated-titles?index=${1}&size=${5}&status=${4}&searchText=${keyword}`
    ).then((res) => {
      setSearch(res?.items);
    });
  }, [keyword]);

  const handleKeyword = (e) => {
    e.key === "Enter" ? setIsSearch(false) : setIsSearch(true);
  };

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
            <div className="w-50 my-3 mx-auto relative">
              <Typing
                placeholder="Search here ..."
                value={keyword}
                setValue={setKeyword}
                setIsTyping={setIsTyping}
                isIcon={true}
                onKeyDown={(e) => handleKeyword(e)}
                onBlur={() =>
                  setTimeout(() => {
                    setIsSearch(false);
                  }, 500)
                }
              />

              <div className="absolute zindex-100 w-100">
                {isSearch &&
                  search?.map((item, i) => (
                    <p
                      key={i}
                      onClick={() => {
                        setKeyword(item.title);
                        setIsSearch(false);
                      }}
                      className="search-help mx-5"
                    >
                      {item.title}
                    </p>
                  ))}
              </div>
            </div>

            {noFilter && (
              <div
                className="w-50 my-3 mx-auto relative"
                onMouseLeave={() => setUniModal(false)}
              >
                <p className="text-white text-center pointer mb-0">
                  <span onClick={() => setUniModal(!uniModal)}>
                    University wise information <FaRegArrowAltCircleRight />
                  </span>
                </p>

                {uniModal && (
                  <div className="absolute zindex-100 w-100 overflowY-300px">
                    {university?.map((item, i) => (
                      <p
                        key={i}
                        onClick={() => redirectRoute(item.name, item.id)}
                        className="search-help"
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
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
                loading={loading}
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
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                res={res}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UserView;
