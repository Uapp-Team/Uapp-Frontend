import React, { useEffect, useState } from "react";
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
import get from "../../../../../helpers/get";
import BreadCrumb from "../../../../../components/breadCrumb/BreadCrumb";

const ProviderAdminProfileInfo = () => {
  const [providerId, setProviderId] = useState(0);

  const userType = localStorage.getItem("userType");
  // const userId = localStorage.getItem('referenceId');
  const history = useHistory();
  const { providerAdminId } = useParams();

  useEffect(() => {
    get(`ProviderAdminProfile/Provider/${providerAdminId}`).then((res) => {
      console.log("providerAAAAAAAAAA", res);
      setProviderId(res?.id);
    });
  }, []);

  const backToConsultantList = () => {
    history.push(`/providerDetails/${providerId}`);
  };
  return (
    <div>
      <BreadCrumb
        title="Provider Admin Profile"
        backTo="Provider Details"
        path={`/providerDetails/${providerId}`}
      />

      <div className="row">
        <div className="col-md-8 col-sm-12">
          <ProviderAdminProfileHeadcard providerAdminId={providerAdminId} />
          <ProviderAdminDetails
            providerAdminId={providerAdminId}
            // userId={userId}
          />

          {/* <AssignedUniversities officerId={officerId} />

          <AssignedSubjects officerId={officerId} /> */}

          {/* <ProfileStatistics id={id}/> */}

          {/* <ProfileReview id={id}/> */}
        </div>

        <div className="col-md-4 col-sm-12">
          {userType == userTypes?.ProviderAdmin ? null : (
            <ProviderCardForProviderAdmin providerAdminId={providerAdminId} />
          )}

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

export default ProviderAdminProfileInfo;
