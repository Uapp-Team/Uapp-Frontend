import React from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { userTypes } from "../../../../../constants/userTypeConstant";
import ProviderAdminProfileHeadcard from "./ProfileComponents/ProviderAdminProfileHeadcard";
import ProviderCardForProviderAdmin from "./ProfileComponents/ProviderCardForProviderAdmin";
import ProviderAdminDetails from "./ProfileComponents/ProviderAdminDetails";

const ProviderAdminOwnProfile = ({userId}) => {

  const userType = localStorage.getItem("userType");
  const history = useHistory();

  const backToConsultantList = () => {
    history.push("/admissionOfficerList");
  };

  console.log("ProId2", userId);

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">Provider Admin Profile</h3>
          {/* {userType == userTypes?.SystemAdmin ||
          userType == userTypes?.ProviderAdmin ||
          userType == userTypes?.Admin ||
          userType == userTypes?.AdmissionManager ? ( */}
          {/* <div className="page-header-back-to-home">
            <span onClick={backToConsultantList} className="text-white">
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to Provider
              Details
            </span>
          </div> */}
          {/* ) : null */}
        </CardHeader>
      </Card>

      <div className="row">
        <div className="col-md-8 col-sm-12">
          <ProviderAdminProfileHeadcard userId={userId} />
          <ProviderAdminDetails
            userId={userId}
          />

          {/* <AssignedUniversities officerId={officerId} />

          <AssignedSubjects officerId={officerId} /> */}

          {/* <ProfileStatistics id={id}/> */}

          {/* <ProfileReview id={id}/> */}
        </div>

        <div className="col-md-4 col-sm-12">
          {/* {userType == userTypes?.ProviderAdmin ? null : ( */}
            <ProviderCardForProviderAdmin userId={userId} />
          {/* )} */}

          {/* {userType == userTypes?.AdmissionManager ? null : (
            <AdmissionManagerCard officerId={officerId} />
          )} */}

          {/* <ProfileRecruitingType id={id} /> */}

          {/* <ProfileRecruitingForFrom id={id} /> */}

          {/* <ProfileImportantLinks/> */}

          {/* <ProfileRatingsBreakdown id={id} /> */}

          {/* <ProfileNotice/> */}
        </div>
      </div>
    </div>
  );
};

export default ProviderAdminOwnProfile;
