import React from "react";

const SubCategoryListUnderCategory = ({ isManageCategory }) => {
  return (
    <div>
      <>
        {/* {" "}
                        <p className="faq-category">university</p> */}
        <div
          className="faq-category-list pl-3"
          style={{ borderLeft: "1px solid #D3D3D3" }}
        >
          {isManageCategory === false ? (
            <>
              <li className="faq-sub-category mb-3">General Queries</li>
              <li className="faq-sub-category mb-3">Admissions</li>
              <li className="faq-sub-category mb-3">Demographics</li>
              <li className="faq-sub-category mb-3">Work Experience</li>
              <li className="faq-sub-category mb-3">Courses</li>
              <li className="faq-sub-category mb-3">General Requirements</li>
              <li className="faq-sub-category mb-3">Demographics</li>
              <li className="faq-sub-category mb-3">Untitled sub category</li>
            </>
          ) : (
            <>
              {" "}
              <li className="faq-sub-category mb-3">
                General Queries{" "}
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    // onClick={title}
                    // onClick={() => {
                    //   setEditModal(true);
                    //   setDetails(item);
                    //   setTitleU(item?.name);
                    // }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    // onClick={() => {
                    //   setDeleteModal(true);
                    //   setDetails(item);
                    // }}
                  ></i>
                </span>
              </li>{" "}
              <li className="faq-sub-category mb-3">
                Admissions{" "}
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    // onClick={title}
                    // onClick={() => {
                    //   setEditModal(true);
                    //   setDetails(item);
                    //   setTitleU(item?.name);
                    // }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    // onClick={() => {
                    //   setDeleteModal(true);
                    //   setDetails(item);
                    // }}
                  ></i>
                </span>
              </li>
              <li className="faq-sub-category mb-3">
                Demographics{" "}
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    // onClick={title}
                    // onClick={() => {
                    //   setEditModal(true);
                    //   setDetails(item);
                    //   setTitleU(item?.name);
                    // }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    // onClick={() => {
                    //   setDeleteModal(true);
                    //   setDetails(item);
                    // }}
                  ></i>
                </span>
              </li>
              <li className="faq-sub-category mb-3">
                Work Experience{" "}
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    // onClick={title}
                    // onClick={() => {
                    //   setEditModal(true);
                    //   setDetails(item);
                    //   setTitleU(item?.name);
                    // }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    // onClick={() => {
                    //   setDeleteModal(true);
                    //   setDetails(item);
                    // }}
                  ></i>
                </span>
              </li>
              <li className="faq-sub-category mb-3">
                Courses{" "}
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    // onClick={title}
                    // onClick={() => {
                    //   setEditModal(true);
                    //   setDetails(item);
                    //   setTitleU(item?.name);
                    // }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    // onClick={() => {
                    //   setDeleteModal(true);
                    //   setDetails(item);
                    // }}
                  ></i>
                </span>
              </li>
              <li className="faq-sub-category mb-3">
                General Requirements{" "}
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    // onClick={title}
                    // onClick={() => {
                    //   setEditModal(true);
                    //   setDetails(item);
                    //   setTitleU(item?.name);
                    // }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    // onClick={() => {
                    //   setDeleteModal(true);
                    //   setDetails(item);
                    // }}
                  ></i>
                </span>
              </li>
              <li className="faq-sub-category mb-3">
                Demographics{" "}
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    // onClick={title}
                    // onClick={() => {
                    //   setEditModal(true);
                    //   setDetails(item);
                    //   setTitleU(item?.name);
                    // }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    // onClick={() => {
                    //   setDeleteModal(true);
                    //   setDetails(item);
                    // }}
                  ></i>
                </span>
              </li>
              <li className="faq-sub-category mb-3">
                Untitled sub category{" "}
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    // onClick={title}
                    // onClick={() => {
                    //   setEditModal(true);
                    //   setDetails(item);
                    //   setTitleU(item?.name);
                    // }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    // onClick={() => {
                    //   setDeleteModal(true);
                    //   setDetails(item);
                    // }}
                  ></i>
                </span>
              </li>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default SubCategoryListUnderCategory;
