import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import ismhero from "../../../../assets/img/ismhero.png";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";
import Typing from "../../../../components/form/Typing";
import { Card, CardBody, Col, Row } from "reactstrap";
import Uget from "../../../../helpers/Uget";
import BackIcon from "../../../../components/buttons/BackIcon";
import PreviewUniDocu from "../../../../components/ui/PreviewUniDocu";
import { AiOutlineFileText } from "react-icons/ai";
import Answer from "../Answers/Answer";
import Loader from "../../Search/Loader/Loader";
import Pagination from "../../Pagination/Pagination";

const UserViewUniversity = () => {
  const history = useHistory();
  const data = history?.location?.state?.state;
  const [isDocTyping, setIsDocTyping] = useState(false);
  const [searchStr, setSearchStr] = useState("");
  const [uniDocument, setUniDocument] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noFilter, setNoFilter] = useState(true);
  const [uniLable, setUniLable] = useState(data?.name);
  const [uniValue, setUniValue] = useState(data?.id);
  const [isTyping, setIsTyping] = useState(false);
  const [keyword, setKeyword] = useState("");
  // const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [subCategoryId, setSubCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("Select Category");
  const [subCategoryName, setSubCategoryName] = useState("Select Sub Category");
  const [res, setRes] = useState({});
  const [answerData, setAnswerData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    if (!isTyping) {
      Uget(
        `question/get-paginated-public-view?index=${currentPage}&size=${30}&universityId=${uniValue}&categoryId=${categoryId}&subCategoryId=${subCategoryId}&status=${4}&searchText=${keyword}`
      ).then((res) => {
        setRes(res);
        setAnswerData(res?.items);
        setLoading(false);
      });
    }
  }, [categoryId, currentPage, isTyping, keyword, subCategoryId, uniValue]);

  useEffect(() => {
    if (!isDocTyping) {
      Uget(
        `universitydocument/get-paginated?index=${1}&size=${100}&universityId=${uniValue}&searchText=${searchStr}`
      ).then((res) => {
        setUniDocument(res?.items);
      });
    }
  }, [isDocTyping, searchStr, uniValue]);

  useEffect(() => {
    keyword === "" && categoryId === 0 ? setNoFilter(true) : setNoFilter(false);
  }, [categoryId, keyword]);

  return (
    <>
      <BreadCrumb title={uniLable + " Information"} backTo="" path="/" />

      <Card>
        <CardBody>
          <div
            className="bg-cover-img py-5 mb-5 px-5"
            style={{
              background: "url(" + ismhero + ")",
            }}
          >
            <div className="d-flex">
              <BackIcon url="informationView" />

              <div className="ml-3">
                <h2 className="text-white fw-600">{uniLable}</h2>
                {/* <p className="text-white">
                  <span className="mr-2">Category (12)</span>
                  <span className="mr-2">Sub-category (12)</span>
                  <span className="mr-2">Documents (30)</span>
                </p> */}
              </div>
            </div>
          </div>

          <Row className="px-5">
            <Col md={3}>
              <DefaultDropdownU
                label={uniLable}
                setLabel={setUniLable}
                value={uniValue}
                setValue={setUniValue}
                url="University/get-dd"
                className="mb-3"
              />
            </Col>
            <Col md={3}>
              <DefaultDropdownU
                label={categoryName}
                setLabel={setCategoryName}
                value={categoryId}
                setValue={setCategoryId}
                url="QuestionCategory/get-all"
                className="mb-3"
                action={() => {
                  setSubCategoryName("Select Sub Category");
                  setSubCategoryId(0);
                }}
              />
            </Col>
            <Col md={3}>
              <DefaultDropdownU
                label={subCategoryName}
                setLabel={setSubCategoryName}
                value={subCategoryId}
                setValue={setSubCategoryId}
                url={`QuestionSubCategory/get-sub-categories/${categoryId}`}
                className="mb-3"
              />
            </Col>
            {/* <Col md={3}>
              <Typing
                name=""
                placeholder="Search here ..."
                setValue={setKeyword}
                setIsTyping={setIsTyping}
                isIcon={true}
              />
            </Col> */}
          </Row>

          <hr />

          <Row>
            <Col md={8}>
              <div className="custom-card-border mb-3">
                {/* <div className="d-flex justify-content-between align-items-center px-3 pt-3">
                  <span className="section-title mr-5">
                    {categoryName !== "Select Category" && categoryName}
                    {subCategoryName !== "Select Sub Category" && " > "}
                    {subCategoryName !== "Select Sub Category" &&
                      subCategoryName}
                  </span>

                  <Typing
                    placeholder="Search Documents"
                    value={searchStr}
                    setValue={setSearchStr}
                    setIsTyping={setIsDocTyping}
                  />
                </div> */}

                <Row className="px-3 pt-3 align-items-center">
                  <Col>
                    <span className="section-title mr-5 d-inline-block">
                      {categoryName !== "Select Category" && categoryName}
                      {subCategoryName !== "Select Sub Category" && " > "}
                      {subCategoryName !== "Select Sub Category" &&
                        subCategoryName}
                    </span>
                  </Col>
                  <Col>
                    <Typing
                      placeholder="Search"
                      value={keyword}
                      setValue={setKeyword}
                      setIsTyping={setIsTyping}
                    />
                  </Col>
                </Row>
                <hr />
                <div
                  className="overflowY"
                  style={{ height: "calc(100vh - 300px)" }}
                >
                  {/* {answerData?.map((item, i) => (
                    <div key={i}>
                      <Answer defaultData={item} refetch={() => {}} />
                    </div>
                  ))} */}

                  {loading ? (
                    <Loader />
                  ) : answerData?.length > 0 ? (
                    <>
                      {answerData?.map((item, i) => (
                        <div key={i}>
                          <Answer
                            defaultData={item}
                            refetch={() => {}}
                            isPublic={true}
                          />
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-center fw-600 my-5">No Data Found</p>
                  )}

                  <div className="mx-4">
                    <Pagination
                      dataPerPage={30}
                      totalData={res?.totalFiltered}
                      paginate={setCurrentPage}
                      currentPage={currentPage}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="custom-card-border mb-3">
                <div className="d-flex justify-content-between align-items-center px-3 pt-3">
                  <span className="section-title mr-5">Documents</span>

                  <Typing
                    placeholder="Search Documents"
                    value={searchStr}
                    setValue={setSearchStr}
                    setIsTyping={setIsDocTyping}
                  />
                </div>
                <hr />
                <div
                  className="overflowY"
                  style={{ height: "calc(100vh - 300px)" }}
                >
                  {uniDocument?.map((item, i) => (
                    <div
                      key={i}
                      className="px-3 py-2 d-flex justify-content-between"
                    >
                      <div className="d-flex">
                        <AiOutlineFileText size={18} />
                        <span className="ml-2">{item?.name}</span>
                      </div>
                      {item?.url && <PreviewUniDocu file={item?.url} />}
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          {/* <div className="w-75 mx-auto">
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
          </div> */}
        </CardBody>
      </Card>
    </>
  );
};

export default UserViewUniversity;
