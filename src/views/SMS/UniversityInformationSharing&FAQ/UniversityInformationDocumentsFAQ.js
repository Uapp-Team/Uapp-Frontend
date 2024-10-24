import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import ButtonForFunction from "../Components/ButtonForFunction";
import SideCategoryFaq from "./SideCategoryFaq";
import AccordionForFaqCategory from "./Components/AccordionForFaqCategory";
import Uget from "../../../helpers/Uget";
import DocumentsRequestFaq from "./Components/DocumentsRequestFaq";
import Questions from "./Questions/Questions";

const UniversityInformationDocumentsFAQ = () => {
  const [openIndex, setOpenIndex] = useState(1);
  const [categoryModal, setCategoryModal] = useState(false);
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [content, setContent] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryFetch, setCategoryFetch] = useState(false);

  useEffect(() => {
    Uget(`QuestionCategory/get-all`).then((res) => {
      console.log(res?.data);
      setContent(res?.data);
    });
  }, [categoryFetch]);

  return (
    <div>
      <BreadCrumb
        title="University Information sharing & FAQ"
        backTo=""
        path="/"
      />
      <Card>
        <CardBody>
          <p className="section-title">
            University Information Documents & FAQ
          </p>
          <div className="custom-card-border pr-3">
            <Row>
              <Col lg={3} sm={6} className="p-3">
                <ButtonForFunction
                  func={() => setCategoryModal(!categoryModal)}
                  className={"btn btn-uapp-add py-3 ml-3 mr-3 w-100"}
                  icon={<i class="fas fa-search"></i>}
                  name={"Manage Category"}
                />

                <div className="mt-4 ml-4">
                  {content?.map((item, i) => (
                    <AccordionForFaqCategory
                      key={i}
                      content={item}
                      categoryId={categoryId}
                      setCategoryId={setCategoryId}
                      isOpen={openIndex === item?.id}
                      toggleAccordion={() => toggleAccordion(item?.id)}
                    />
                  ))}
                </div>
              </Col>
              <Col lg={6} sm={6} className="border-left border-right p-0">
                <Questions />
              </Col>
              <Col lg={3} sm={6} className="p-0">
                <DocumentsRequestFaq />
              </Col>
            </Row>
          </div>
          <div></div>
        </CardBody>
      </Card>
      {categoryModal && (
        <SideCategoryFaq
          closeModal={() => setCategoryModal(false)}
          content={content}
          refetch={() => setCategoryFetch(!categoryFetch)}
        />
      )}
    </div>
  );
};

export default UniversityInformationDocumentsFAQ;
