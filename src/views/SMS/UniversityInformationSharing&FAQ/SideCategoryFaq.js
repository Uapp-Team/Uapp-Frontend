import React, { useState } from "react";
import CategoryAdd from "./ManageCategory/CategoryAdd";
import CategoryEdit from "./ManageCategory/CategoryEdit";

const SideCategoryFaq = ({ content, closeModal, refetch }) => {
  const [openIndex, setOpenIndex] = useState(1);

  const toggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div
        className="aff-content-modal overflowY"
        style={{
          width: "450px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center mb-5">
          <p className="side-bar-title-faq">Manage Category</p>

          <i
            onClick={() => {
              closeModal();
            }}
            class="fas fa-times ml-1 pointer fs-18px"
          ></i>
        </div>
        <CategoryAdd submitPath="QuestionCategory/save" refetch={refetch} />

        {content?.map((item, i) => (
          <div key={i}>
            <CategoryEdit
              data={item}
              submitPath="QuestionCategory/update"
              deletePath={`QuestionCategory/delete/${item?.id}`}
              refetch={refetch}
              isOpen={openIndex === item?.id}
              toggleAccordion={() => toggleAccordion(item?.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideCategoryFaq;
