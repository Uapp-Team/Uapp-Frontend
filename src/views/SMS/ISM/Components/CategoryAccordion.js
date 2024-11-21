import React from "react";

const CategoryAccordion = ({
  key,
  content,
  categoryId,
  setCategoryId,
  setCategoryName,
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
          {/* <span
            className={`${isOpen ? `bg-white` : `bg-f2f2f2`} category-count`}
          >
            00
          </span> */}
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
          <div className="faq-category-list">
            {content?.subCategories?.map((item, i) => (
              <li
                key={i}
                className={`py-2 pl-3 pointer ${
                  categoryId === item?.id
                    ? "border-left-367D7E"
                    : "border-left-e9e9e9"
                }`}
                onClick={() => {
                  setCategoryId(item?.id);
                  setCategoryName && setCategoryName(item?.name);
                }}
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
