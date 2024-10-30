import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import SideModal from "./SideModal";

const CompanionContentCard = ({ item, i, checkData, setCheckData }) => {
  const [details, setDetails] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    // setLoading(true);
    let data = checkData;
    if (e.target.checked) {
      data.push(e.target.value);
    } else {
      let index = data.indexOf(e.target.value);
      data.splice(index, 1);
    }
    console.log(data);
    setCheckData(data);
    console.log(checkData.length);
    // setLoading(false);
  };

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
  console.log(detailsModal);
  return (
    <>
      <Card className="custom-card-border">
        <CardHeader className="d-flex justify-content-between p-2">
          <div>
            <input
              id={`${item}-${i}`}
              value={item}
              type="checkbox"
              onChange={handleChange}
              defaultChecked={checkData?.includes(item)}
            />
          </div>
          <div>
            <Dropdown
              isOpen={dropdownOpen}
              toggle={() => setDropdownOpen(!dropdownOpen)}
              direction={"left"}
            >
              <DropdownToggle color="white" className="p-0">
                <i class="fas fa-ellipsis-h"></i>
              </DropdownToggle>
              <DropdownMenu>
                <p className="aff-card-menu">Download</p>
                <p className="aff-card-menu">Delete</p>
                <p
                  className="aff-card-menu"
                  onClick={() => {
                    setDetails(item);
                    setDetailsModal(true);
                    setDropdownOpen(false);
                  }}
                >
                  Details
                </p>
              </DropdownMenu>
            </Dropdown>
          </div>
        </CardHeader>
        <CardBody className="text-center">
          <img
            className="h-120px"
            src={`https://uapp.uk/home-hero.svg`}
            alt=""
          />
        </CardBody>
        <CardFooter
          className="p-2 bg-white"
          style={{ borderRadius: `0 0 10px 10px` }}
        >
          Banner.Pdf
        </CardFooter>
      </Card>

      {detailsModal && (
        <SideModal
          closeModal={setDetailsModal}
          details={details}
          isDetails={true}
        />
      )}
    </>
  );
};

export default CompanionContentCard;
