import React, { useEffect, useState } from "react";
import get from "../../../../../../helpers/get";
import { rootUrl } from "../../../../../../constants/constants";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Department = () => {
  const [departmentInfo, setDepartmentInfo] = useState([]);

  useEffect(() => {
    get(`Department/index`).then((res) => {
      setDepartmentInfo(res);
    });
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector(".scroll-content");
    const scrollLeftButton = document.getElementById("scroll-left");
    const scrollRightButton = document.getElementById("scroll-right");
    console.log("scrollContainer", scrollContainer.scrollLeft);
    console.log(
      "scrollRightButton",
      scrollContainer.scrollLeft,
      scrollContainer.clientWidth,
      scrollContainer.scrollWidth
    );
    function checkScrollButtons() {
      if (scrollContainer.scrollLeft === 0) {
        scrollLeftButton.classList.add("hidden");
      } else {
        scrollLeftButton.classList.remove("hidden");
      }

      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollRightButton.classList.add("hidden");
      } else {
        scrollRightButton.classList.remove("hidden");
      }
    }
    scrollLeftButton.addEventListener("click", () => {
      scrollContainer.scrollLeft -= 400; // Adjust the value as needed
      checkScrollButtons();
    });

    scrollRightButton.addEventListener("click", () => {
      scrollContainer.scrollLeft += 400; // Adjust the value as needed
      checkScrollButtons();
    });

    scrollContainer.addEventListener("scroll", checkScrollButtons);
    // Initial check
    checkScrollButtons();
  }, [departmentInfo]);

  console.log(departmentInfo?.length, departmentInfo);

  return (
    <>
      <div className="custom-card-border p-4">
        <h5 className="mb-4">Explore Fields Of Studies</h5>

        <div className="row align-items-center">
          <div className="col-12">
            <div class="scroll-container">
              <div id="scroll-left" className="scroll-left">
                <button class="scroll-button ms-2">&#10094;</button>
              </div>
              <div class="scroll-content">
                {departmentInfo?.length > 0 &&
                  departmentInfo?.map((item, i) => (
                    <div class="item" key={i}>
                      <div className="dep-card">
                        <div className="w-100 text-center">
                          <Link to={`/searchBydepartment/${item.id}`}>
                            <img
                              src={rootUrl + item?.departmentImage?.fileUrl}
                              alt=""
                              // className="dep-img"
                            />
                          </Link>
                        </div>
                        <Link
                          to={`/searchBydepartment/${item.id}`}
                          className="dep-title pt-2"
                        >
                          {item?.name?.slice(0, 25)}
                          {item?.name?.length > 25 && "..."}
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>

              <div id="scroll-right" className="scroll-right">
                <button class="scroll-button me-2">&#10095;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Department;
