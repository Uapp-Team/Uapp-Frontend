import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import Typing from "../../../../components/form/Typing";
import get from "../../../../helpers/get";
import { useHistory, useParams } from "react-router";
import PreviewUniDocu from "../../../../components/ui/PreviewUniDocu";
import Uget from "../../../../helpers/Uget";
import Select from "react-select";
import DDByAppUrlU from "../../../../components/form/DDByAppUrlU";
import Filter from "../../../../components/Dropdown/Filter";
import TextAns from "./TextAns";
import { QuestionType } from "../Components/QuestionType";
import MultiChoiceAns from "./MultiChoiceAns";
import SingleChoiceAns from "./SingleChoiceAns";
import DateRangeAns from "./DateRangeAns";
import DateAns from "./DateAns";

const UsersAnswerForFAQ = () => {
  const { Uid } = useParams();
  const [searchStr, setSearchStr] = useState("");
  const [searchStr1, setSearchStr1] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [uniDocument, setUniDocument] = useState([]);
  const [universityList, setUniversityList] = useState([]);
  const [universityListLabel, setUniversityListLabel] =
    useState("Select University");
  const [universityListValue, setUniversityListValue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(15);
  const [currentPage1, setCurrentPage1] = useState(1);
  const [dataPerPage1, setDataPerPage1] = useState(15);
  const [category, setCategory] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState("Select Category");
  const [categoryValue, setCategoryValue] = useState(0);
  console.log(categoryValue);

  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryLabel, setSubCategoryLabel] =
    useState("Select SubCategory");
  const [subCategoryValue, setSubCategoryValue] = useState(0);

  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const [answerData, setAnswerData] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    Uget(`University/get-dd`).then((res) => {
      setUniversityList(res?.data);
      if (Uid) {
        const result = res?.data?.find((ans) => ans?.id.toString() === Uid);
        setUniversityListLabel(result?.name);
        setUniversityListValue(result?.id);
      }
    });
  }, [Uid]);

  const universityMenu = universityList.map((uappId) => ({
    label: uappId?.name,
    value: uappId?.id,
  }));

  const selectUniversity = (label, value) => {
    setUniversityListLabel(label);
    setUniversityListValue(value);
  };

  useEffect(() => {
    Uget("QuestionCategory/get-all").then((res) => {
      setCategory(res?.data);
    });

    Uget(`QuestionSubCategory/get-sub-categories/${categoryValue}`).then(
      (res) => {
        setSubCategory(res?.data);
      }
    );
  }, [categoryValue]);

  useEffect(() => {
    Uget(
      `universitydocument/get-paginated?index=${currentPage}&size=${dataPerPage}&universityId=${universityListValue}&searchText=${searchStr}`
    ).then((res) => {
      setUniDocument(res?.items);
      console.log(res?.items);
    });
  }, [currentPage, dataPerPage, searchStr, universityListValue]);

  useEffect(() => {
    if (!isTyping) {
      Uget(
        `question/get-paginated-by-university?index=${1}&size=${100}&universityId=${universityListValue}&subCategoryId=${subCategoryValue}&start=${startDate}&end=${endDate}&searchText=${searchStr1}`
      ).then((res) => {
        console.log(res?.items);
        setAnswerData(res?.items);
      });
    }
  }, [
    success,
    endDate,
    isTyping,
    searchStr,
    startDate,
    universityListValue,
    subCategoryValue,
  ]);

  return (
    <div>
      <BreadCrumb
        title="University Information sharing & FAQ"
        backTo=""
        path="/"
      />
      <Card className="px-3">
        <CardBody>
          <Row className="">
            <Col lg="6" md="3" sm="12">
              <div>
                {" "}
                <p className="section-title">{universityListLabel}</p>
              </div>
            </Col>
            <Col lg="2" md="3" sm="12">
              {" "}
              <div>
                <Select
                  options={universityMenu}
                  value={{
                    label: universityListLabel,
                    value: universityListValue,
                  }}
                  onChange={(opt) => selectUniversity(opt.label, opt.value)}
                  placeholder="UAPP ID"
                  name="name"
                  id="id"
                />
              </div>
            </Col>
            <Col lg="2" md="3" sm="12">
              <div>
                <Filter
                  data={category}
                  label={categoryLabel}
                  setLabel={setCategoryLabel}
                  value={categoryValue}
                  setValue={setCategoryValue}
                  name=""
                  error={() => {}}
                  setError={() => {}}
                  action={() => {}}
                  // isDisabled={branchId ? true : false}
                />
              </div>
            </Col>
            {categoryValue === 0 ? null : (
              <Col lg="2" md="3" sm="12">
                {" "}
                <div>
                  <Filter
                    data={subCategory}
                    label={subCategoryLabel}
                    setLabel={setSubCategoryLabel}
                    value={subCategoryValue}
                    setValue={setSubCategoryValue}
                    name=""
                    error={() => {}}
                    setError={() => {}}
                    action={() => {}}
                    // isDisabled={branchId ? true : false}
                  />
                </div>
              </Col>
            )}
          </Row>
          <hr />
          <div
            className="row"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
            }}
          >
            <div
              className="col-8 border-right"
              style={{
                height: "calc(100vh - 400px )",
                overflowY: "auto",
              }}
            >
              <div className="d-flex justify-content-between">
                <div>
                  {categoryValue === 0 ? null : (
                    <>
                      <p className="section-title">{categoryLabel}</p>
                      <p className="information-updated-on">
                        <span className="mr-2">Information Updated on</span>
                        <b>22 Aug 2024</b>
                      </p>
                    </>
                  )}
                </div>

                <div>
                  {" "}
                  <Typing
                    placeholder="search by question"
                    value={searchStr1}
                    setValue={setSearchStr1}
                    setIsTyping={setIsTyping}
                  />
                </div>
              </div>
              <hr />
              <div>
                {answerData?.map((item, i) => (
                  <div key={i}>
                    {item?.questionType === QuestionType.SingleQuestion ? (
                      <TextAns defaultData={item} />
                    ) : item?.questionType === QuestionType.MultipleQuestion ? (
                      <MultiChoiceAns defaultData={item} />
                    ) : item?.questionType === QuestionType.SingleChoice ? (
                      <SingleChoiceAns defaultData={item} />
                    ) : item?.questionType === QuestionType.DateRange ? (
                      <DateRangeAns defaultData={item} />
                    ) : item?.questionType === QuestionType.Date ? (
                      <DateAns defaultData={item} />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
            <div
              className="col-4"
              style={{
                height: "calc(100vh - 400px )",
                overflowY: "auto",
              }}
            >
              <div className="d-flex justify-content-between">
                <p className="section-title mt-2">Documents</p>
                <div>
                  {" "}
                  <Typing
                    placeholder="search by Documents"
                    value={searchStr}
                    setValue={setSearchStr}
                    setIsTyping={setIsTyping}
                  />
                </div>
              </div>
              {uniDocument?.map((item, i) => (
                <div
                  key={i}
                  className="px-3 mt-4 d-flex justify-content-between"
                >
                  <div className="d-flex">
                    <i class="far fa-file-alt" style={{ marginTop: "3px" }}></i>
                    <h6 className="ml-2">{item?.name}</h6>
                  </div>
                  <div className="d-flex">
                    <div className="mr-3">
                      <PreviewUniDocu file={item?.url} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default UsersAnswerForFAQ;
