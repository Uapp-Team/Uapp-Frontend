import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import SideModal from "./SideModal";
import Uremove from "../../../helpers/Uremove";
import { useToasts } from "react-toast-notifications";
import { rootUrl } from "../../../constants/constants";
import { userTypes } from "../../../constants/userTypeConstant";

const ContentCard = ({
  item,
  checkData,
  handleChange,
  success,
  setSuccess,
  permission = false,
}) => {
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  const [details, setDetails] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleDeleteContent = () => {
    Uremove(`MarketingContent/delete/${item?.id}`).then((res) => {
      addToast(res?.data?.title, {
        appearance: "error",
        autoDismiss: true,
      });
      setDetailsModal(false);
      setEdit(false);
      setDropdownOpen(false);
      setSuccess(!success);
    });
  };

  const closeModal = () => {
    setDetailsModal(false);
    setEdit(false);
  };
  return (
    <>
      <Card className="custom-card-border">
        <CardHeader className="d-flex justify-content-between p-2">
          <div>
            <input
              id={item.id}
              value={item.id}
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
                <p
                  className="aff-card-menu"
                  onClick={() => setDropdownOpen(false)}
                >
                  <a
                    style={{ textDecoration: "none", color: "black" }}
                    href={rootUrl + item?.content?.fileUrl}
                    target="blank"
                  >
                    Download
                  </a>
                </p>

                {(permission === true ||
                  userType === userTypes?.SystemAdmin.toString() ||
                  userType === userTypes?.Admin.toString()) && (
                  <>
                    <p
                      className="aff-card-menu"
                      onClick={() => {
                        setDetails(item);
                        setDetailsModal(true);
                        setDropdownOpen(false);
                        setEdit(true);
                      }}
                    >
                      Edit
                    </p>

                    <p className="aff-card-menu" onClick={handleDeleteContent}>
                      Delete
                    </p>
                  </>
                )}
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
          <div
            className="bg-cover-img h-120px pointer"
            style={{
              background: "url(" + rootUrl + item?.content?.fileUrl + ")",
            }}
            onClick={() => {
              setDetails(item);
              setDetailsModal(true);
              setDropdownOpen(false);
            }}
          ></div>
        </CardBody>
        <CardFooter
          className="p-2 bg-white"
          style={{ borderRadius: `0 0 10px 10px` }}
        >
          <span
            className="pointer"
            onClick={() => {
              setDetails(item);
              setDetailsModal(true);
              setDropdownOpen(false);
            }}
          >
            {item?.contentTitle}
          </span>
        </CardFooter>
      </Card>

      {detailsModal && details && (
        <SideModal
          title="Details"
          closeModal={closeModal}
          details={item}
          isDetails={true}
          edit={edit}
          setEdit={setEdit}
          success={success}
          setSuccess={setSuccess}
          handleDeleteContent={handleDeleteContent}
          permission={permission}
        />
      )}
    </>
  );
};

export default ContentCard;
