import React, { useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import { Col, Row } from "reactstrap";
import CompanionContentCard from "./CompanionContentCard";

const CompanionContent = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [checkData, setCheckData] = useState([]);
  const [loading, setLoading] = useState(false);

  // function getFavicon({ linkElements }) {
  //   let faviconUrl = "";

  //   // Try to find the favicon link element in the document head
  //   // const linkElements = document.head.getElementsByTagName("link");
  //   // const linkElements = `https://portal.uapp.uk/`;
  //   for (let i = 0; i < linkElements.length; i++) {
  //     const rel = linkElements[i].getAttribute("rel");
  //     if (rel === "icon" || rel === "shortcut icon") {
  //       faviconUrl = linkElements[i].getAttribute("href");
  //       break;
  //     }
  //   }

  //   // If the favicon URL is relative, convert it to an absolute URL
  //   if (faviconUrl && !faviconUrl.startsWith("http")) {
  //     const baseUrl = window.location.origin;
  //     if (faviconUrl.startsWith("/")) {
  //       faviconUrl = baseUrl + faviconUrl;
  //     } else {
  //       faviconUrl = baseUrl + "/" + faviconUrl;
  //     }
  //   }
  //   // setLoading(faviconUrl);
  //   return faviconUrl;
  // }

  // getFavicon();

  return (
    <>
      {/* {getFavicon(`https://portal.uapp.uk/`)} */}
      <BreadCrumb title="Content" backTo="" path="/" />
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-flex justify-content-between mb-30px">
          <div>
            <span className="search-key">Promotional post</span>
            <span className="search-key">Social media cover</span>
            <span className="search-key">Email </span>
          </div>
          <div>
            <span className="search-key">
              {checkData.length} Download
              <i className="fas fa-arrow-down text-dark-green ml-2"></i>
            </span>
            <span className="search-key bg-orange-light mr-0">
              {checkData.length} Delete
              <i class="far fa-trash-alt ml-2"></i>
            </span>
          </div>
        </div>

        <Row>
          {data?.map((item, i) => (
            <Col lg={2} md={3} sm={4} xs={6} key={i}>
              <CompanionContentCard
                item={item}
                i={i}
                checkData={checkData}
                setCheckData={setCheckData}
              />
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default CompanionContent;
