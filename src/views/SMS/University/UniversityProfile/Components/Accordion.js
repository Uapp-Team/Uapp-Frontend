import React, { useState } from "react";
import DOMPurify from "dompurify";

const Accordion = ({ dataCollection }) => {
  const [accordion, setActiveAccordion] = useState(-1);

  function toggleAccordion(index) {
    if (index === accordion) {
      setActiveAccordion(-1);
      return;
    }
    setActiveAccordion(index);
  }

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  console.log("accordion data", dataCollection);

  return (
    <>
      <div>
        <div className="accordion__faq">
          {dataCollection?.map((item, index) => (
            <div key={index} onClick={() => toggleAccordion(index)}>
              <div className="accordion__faq-heading">
                <h5 className={accordion === index ? "active" : ""}>
                  {item.question}
                </h5>
                <div>
                  {accordion === index ? (
                    <span className="verticle"><i class="fas fa-chevron-up"></i></span>
                  ) : (
                    <span className="horizental"><i class="fas fa-chevron-down"></i></span>
                  )}
                </div>
              </div>
              <div>
                <p
                  className={accordion === index ? "active" : "inactive"}
                  dangerouslySetInnerHTML={createMarkup(item.answer)}
                >
                  {/* {item.answer} */}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Accordion;
