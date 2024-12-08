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
          isOpen ? `accordion-header-faq-open` : `accordion-header-faq`
        } d-flex justify-content-between`}
        onClick={toggleAccordion}
      >
        <span>{content?.name}</span>

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
                className="faq-sub-category mb-3 pointer"
                onClick={() => setCategoryId(item?.id)}
              >
                {categoryId === item?.id ? (
                  <b>{item?.name}</b>
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
