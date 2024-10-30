import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { Card, CardBody, Col, Row } from "reactstrap";
import ButtonForFunction from "../Components/ButtonForFunction";
import ManageCategory from "./ManageCategory/ManageCategory";
import AccordionForFaqCategory from "./Components/AccordionForFaqCategory";
import Uget from "../../../helpers/Uget";
import DocumentsRequestFaq from "./Components/DocumentsRequestFaq";
import Questions from "./Questions/Questions";
import { useHistory, useParams } from "react-router";
import { AdminUsers } from "../../../components/core/User";
import QuestionsAdmin from "./Questions/QuestionsAdmin";

const UniversityInformationDocumentsFAQ = () => {
  const { Uid } = useParams();

  const history = useHistory();
  const data = history?.location?.state?.state;
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
            {data?.name ? data?.name : "University Information Documents & FAQ"}
          </p>
          <div className="custom-card-border pr-3">
            <Row>
              <Col lg={3} sm={4} className="p-3">
                {AdminUsers() && (
                  <div className="ml-3">
                    <ButtonForFunction
                      func={() => setCategoryModal(!categoryModal)}
                      className={"btn btn-uapp-add py-3 w-100"}
                      icon={<i class="fas fa-search"></i>}
                      name={"Manage Category"}
                    />
                  </div>
                )}

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
              <Col lg={6} sm={8} className="border-left p-0">
                {!Uid ? (
                  <QuestionsAdmin categoryId={categoryId} />
                ) : (
                  <Questions categoryId={categoryId} Uid={Uid} />
                )}
              </Col>
              {Uid && (
                <Col lg={3} sm={4} className="border-left p-0">
                  <DocumentsRequestFaq Uid={Uid} />
                </Col>
              )}
            </Row>
          </div>
        </CardBody>
      </Card>
      {categoryModal && (
        <ManageCategory
          closeModal={() => setCategoryModal(false)}
          content={content}
          refetch={() => setCategoryFetch(!categoryFetch)}
        />
      )}
    </div>
  );
};

export default UniversityInformationDocumentsFAQ;
