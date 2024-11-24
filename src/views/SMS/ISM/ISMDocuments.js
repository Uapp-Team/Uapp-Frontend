import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import CategoryAccordion from "./Components/CategoryAccordion";
import Uget from "../../../helpers/Uget";
import DocumentsRequestFaq from "./Components/DocumentsRequestFaq";
import DefaultDropdownU from "../../../components/Dropdown/DefaultDropdownU";
import AnswersArea from "./Answers/AnswersArea";

const ISMDocuments = ({ uniValue, setUniValue, uniLable, setUniLable }) => {
  const [openIndex, setOpenIndex] = useState(1);
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [content, setContent] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    Uget(`QuestionCategory/get-all`).then((res) => {
      setContent(res?.data);
    });
  }, []);

  return (
    <>
      <div className="custom-card-border pr-3">
        <Row>
          <Col lg={3} sm={4} className="p-3">
            <div className="ml-3">
              <DefaultDropdownU
                label={uniLable}
                setLabel={setUniLable}
                value={uniValue}
                setValue={setUniValue}
                url="University/get-dd"
                className="mb-3"
              />
            </div>

            <div className="mt-4 ml-4">
              {content?.map((item, i) => (
                <CategoryAccordion
                  key={i}
                  content={item}
                  categoryId={categoryId}
                  setCategoryId={setCategoryId}
                  setCategoryName={setCategoryName}
                  isOpen={openIndex === item?.id}
                  toggleAccordion={() => toggleAccordion(item?.id)}
                />
              ))}
            </div>
          </Col>

          {uniValue > 0 ? (
            <Col lg={6} sm={8} className="border-left p-0">
              <AnswersArea
                categoryId={categoryId}
                categoryName={categoryName}
                setCategoryId={setCategoryId}
                setCategoryName={setCategoryName}
              />
            </Col>
          ) : (
            <Col lg={9} sm={8} className="border-left p-0">
              <AnswersArea
                categoryId={categoryId}
                categoryName={categoryName}
                setCategoryId={setCategoryId}
                setCategoryName={setCategoryName}
              />
            </Col>
          )}

          {uniValue > 0 && (
            <Col lg={3} sm={12} className="ism-doc">
              <DocumentsRequestFaq Uid={uniValue} />
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default ISMDocuments;
