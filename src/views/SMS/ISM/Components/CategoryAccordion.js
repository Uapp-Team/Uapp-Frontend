import React from "react";

const CategoryAccordion = ({
  key,
  content,
  categoryId,
  setCategoryId,
  isOpen,
  toggleAccordion,
}) => {
  return (
    <>
      <div
        key={key}
        className={`${
          isOpen ? `bg-f2f2f2` : `bg-white`
        } d-flex justify-content-between category-accordian`}
        onClick={toggleAccordion}
      >
        <div>
          <span>{content?.name}</span>
          <span
            className={`${isOpen ? `bg-white` : `bg-f2f2f2`} category-count`}
          >
            00
          </span>
        </div>

        <span>
          {isOpen ? (
            <i class="fas fa-chevron-up"></i>
          ) : (
            <i class="fas fa-chevron-down"></i>
          )}
        </span>
      </div>
      {isOpen && (
        <>
          <div className="faq-category-list pl-3 border-left">
            {content?.subCategories?.map((item, i) => (
              <li
                key={i}
                className="mb-3 pointer border-left"
                onClick={() => setCategoryId(item?.id)}
              >
                {categoryId === item?.id ? (
                  <span className="fw-500">{item?.name}</span>
                ) : (
                  <span>{item?.name}</span>
                )}
              </li>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default CategoryAccordion;
