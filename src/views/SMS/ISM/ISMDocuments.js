import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import ManageCategory from "./ManageCategory/ManageCategory";
import CategoryAccordion from "./Components/CategoryAccordion";
import Uget from "../../../helpers/Uget";
import DocumentsRequestFaq from "./Components/DocumentsRequestFaq";
import QuestionsAdmin from "./Questions/QuestionsAdmin";
import DefaultDropdownU from "../../../components/Dropdown/DefaultDropdownU";

const ISMDocuments = ({ uniValue, setUniValue, uniLable, setUniLable }) => {
  // const [uniLable, setUniLable] = useState("Select University");

  const [openIndex, setOpenIndex] = useState(1);
  const [categoryModal, setCategoryModal] = useState(false);
  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const [content, setContent] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [categoryFetch, setCategoryFetch] = useState(false);

  useEffect(() => {
    Uget(`QuestionCategory/get-all`).then((res) => {
      setContent(res?.data);
    });
  }, [categoryFetch]);

  return (
    <>
      <div className="custom-card-border pr-3">
        <Row>
          <Col lg={3} sm={4} className="p-3">
            {/* {AdminUsers() && (
              <div className="ml-3">
                <ButtonForFunction
                  func={() => setCategoryModal(!categoryModal)}
                  className={"btn btn-uapp-add py-3 w-100"}
                  icon={<i class="fas fa-bars"></i>}
                  name={"Manage Category"}
                />
              </div>
            )} */}
            <div className="ml-3 mt-3">
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
          <Col lg={6} sm={8} className="border-left p-0">
            <QuestionsAdmin
              categoryId={categoryId}
              categoryName={categoryName}
              setCategoryId={setCategoryId}
              setCategoryName={setCategoryName}
            />
          </Col>
          {uniValue > 0 && (
            <Col lg={3} sm={4} className="border-left p-0">
              <DocumentsRequestFaq Uid={uniValue} />
            </Col>
          )}
        </Row>
      </div>

      {categoryModal && (
        <ManageCategory
          closeModal={() => setCategoryModal(false)}
          content={content}
          refetch={() => setCategoryFetch(!categoryFetch)}
        />
      )}
    </>
  );
};

export default ISMDocuments;
