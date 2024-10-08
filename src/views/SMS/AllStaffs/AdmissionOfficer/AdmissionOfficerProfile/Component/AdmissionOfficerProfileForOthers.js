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
import { userTypes } from "../../../../../../constants/userTypeConstant";
import AdmissionOfficerProfileHeadCard from "../ProfileComponent/AdmissionOfficerProfileHeadCard";
import AdmissionManagerCard from "../ProfileComponent/AdmissionManagerCard";
import AssignedUniversities from "../ProfileComponent/AssignedUniversities";
import AssignedSubjects from "../ProfileComponent/AssignedSubjects";
import ProviderCard from "../ProfileComponent/ProviderCard";
import BreadCrumb from "../../../../../../components/breadCrumb/BreadCrumb";

const AdmissionOfficerProfileForOthers = () => {
  const userType = localStorage.getItem("userType");
  const history = useHistory();
  const { officerId } = useParams();

  return (
    <div>
      <BreadCrumb
        title="Admission Officer Profile"
        backTo={
          userType == userTypes?.SystemAdmin ||
          userType == userTypes?.ProviderAdmin ||
          userType == userTypes?.Admin ||
          userType == userTypes?.AdmissionManager
            ? "Admission Officer"
            : ""
        }
        path={
          userType == userTypes?.SystemAdmin ||
          userType == userTypes?.ProviderAdmin ||
          userType == userTypes?.Admin ||
          userType == userTypes?.AdmissionManager
            ? "/admissionOfficerList"
            : ""
        }
      />

      <div className="row">
        <div className="col-md-8 col-sm-12">
          <AdmissionOfficerProfileHeadCard officerId={officerId} />

          {/* <AssignedUniversities officerId={officerId} />

          <AssignedSubjects officerId={officerId} /> */}

          {/* <ProfileStatistics id={id}/> */}

          {/* <ProfileReview id={id}/> */}
        </div>

        <div className="col-md-4 col-sm-12">
          {userType == userTypes?.ProviderAdmin ? null : (
            <ProviderCard officerId={officerId} />
          )}

          {userType == userTypes?.AdmissionManager ? null : (
            <AdmissionManagerCard officerId={officerId} />
          )}

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

export default AdmissionOfficerProfileForOthers;
