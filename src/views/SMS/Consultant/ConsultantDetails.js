import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  NavLink,
  NavItem,
  Nav,
} from "reactstrap";
import { useHistory, useLocation } from "react-router";
import get from "../../../helpers/get";
import { rootUrl } from "../../../constants/constants";
import ButtonForFunction from "../Components/ButtonForFunction";
import { userTypes } from "../../../constants/userTypeConstant";
import { permissionList } from "../../../constants/AuthorizationConstant";
import SpanButton from "../Components/SpanButton";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import EmergencyContactFormConsultant from "./EmergencyContactFormConsultant";

const ConsultantDetails = () => {
  const { consultantRegisterId } = useParams();
  const [priceRangeList, setPriceRangeList] = useState([]);
  const [activetab, setActivetab] = useState("1");

  const [commissionGroupList, setCommissionGrouplist] = useState([]);

  const permissions = JSON.parse(localStorage.getItem("permissions"));

  const location = useLocation();
  const history = useHistory();

  const userTypeId = localStorage.getItem("userType");

  const [consultantData, setConsultantData] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [eligibility, setEligibility] = useState({});
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [viewModalOpen1, setViewModalOpen1] = useState(false);
  const [viewModalOpen2, setViewModalOpen2] = useState(false);
  const [viewModalOpen3, setViewModalOpen3] = useState(false);
  const [loading, setLoading] = useState(true);

  const { addToast } = useToasts();
  const [progress, setProgress] = useState(false);
  const [emergencyInfo, setEmergencyInfo] = useState({});
  console.log("ID ID ID", consultantRegisterId);

  useEffect(() => {
    get(`Consultant/Profile/${consultantRegisterId}`).then((res) => {
      setConsultantData(res);
      console.log(consultantData, "res");
      setContactInfo(res?.consultantContact);
      setEligibility(res?.consultantProfileEligibility);

      setLoading(false);
    });

    get(`GroupPriceRange/ByConsultant/${consultantRegisterId}`).then((res) => {
      setPriceRangeList(res);
      setLoading(false);
    });

    get(`ConsultantCommissionGroup/Index/${consultantRegisterId}`).then(
      (res) => {
        setCommissionGrouplist(res);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    get(`ConsultantEmergency/GetByConsultant/${consultantRegisterId}`).then(
      (action) => {
        setEmergencyInfo(action);
        console.log(action, "emergency");
      }
    );
  }, []);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  const handleUpdateBankDetailsFromProfile = () => {
    history.push(`/consultantBankInformation/${consultantRegisterId}`);
  };

  // on Close Modal
  const closeViewModal = () => {
    setViewModalOpen(false);
  };

  const closeViewModal1 = () => {
    setViewModalOpen1(false);
  };

  const closeViewModal2 = () => {
    setViewModalOpen2(false);
  };

  const closeViewModal3 = () => {
    setViewModalOpen3(false);
  };

  // redirect to dashboard
  const backToConsultantList = () => {
    history.push(`/consultantProfile/${consultantRegisterId}`);
  };

  const toggle = (tab) => {
    setActivetab(tab);
    if (tab == "1") {
      history.push(`/consultantDetails/${consultantRegisterId}`);
    }

    if (tab == "2") {
      history.push(`/consultantTermsandConditions/${consultantRegisterId}`);
    }
  };

  const handleEdit = () => {
    history.push(`/consultantInformation/${consultantRegisterId}`);
  };

  return (
    <>
      <div className="">
        <BreadCrumb
          title="Consultant Details"
          backTo={
            !(userTypeId == userTypes?.Consultant) ? "Consultant Profile" : null
          }
          path={
            !(userTypeId == userTypes?.Consultant)
              ? `/consultantProfile/${consultantRegisterId}`
              : null
          }
        />

        <Card className="p-4">
          <h5 className="mb-4">Consultant Details</h5>
          {/* General Information */}
          <span
            className="app-style-const p-2"
            style={{ backgroundColor: "#DFEEEE" }}
          >
            General Information
          </span>
          <Table borderless responsive className="mb-4">
            <tbody>
              <tr className="tr-border-bottom">
                <td width="40%">Name:</td>

                <td width="60%">
                  {consultantData?.nameTitle?.name} {consultantData?.firstName}{" "}
                  {consultantData?.lastName}
                </td>
              </tr>

              <tr className="tr-border-bottom">
                <td width="40%">Consultant Type:</td>

                <td width="60%">{consultantData?.consultantType?.name}</td>
              </tr>

              <tr className="tr-border-bottom">
                <td width="40%">Recruitment Type:</td>

                <td width="60%">
                  {/* {consultantData?.isAcceptedHome == true  ? "Home, " : null}{" "}{consultantData?.isAcceptedEU_UK == true ? "EU/UK, " : null}{" "}
                              {consultantData?.isAcceptedInternational == true ? "International" : null} */}

                  {consultantData?.isAcceptedHome == true &&
                  consultantData?.isAcceptedEU_UK == true &&
                  consultantData?.isAcceptedInternational == true
                    ? "Home, EU/UK, International"
                    : consultantData?.isAcceptedHome == true &&
                      consultantData?.isAcceptedEU_UK == true &&
                      consultantData?.isAcceptedInternational == false
                    ? "Home, EU/UK"
                    : consultantData?.isAcceptedHome == true &&
                      consultantData?.isAcceptedEU_UK == false &&
                      consultantData?.isAcceptedInternational == false
                    ? "Home"
                    : consultantData?.isAcceptedHome == false &&
                      consultantData?.isAcceptedEU_UK == true &&
                      consultantData?.isAcceptedInternational == true
                    ? "EU/UK, International"
                    : consultantData?.isAcceptedHome == false &&
                      consultantData?.isAcceptedEU_UK == false &&
                      consultantData?.isAcceptedInternational == true
                    ? "International"
                    : consultantData?.isAcceptedHome == true &&
                      consultantData?.isAcceptedEU_UK == false &&
                      consultantData?.isAcceptedInternational == true
                    ? "Home, International"
                    : "EU/UK"}
                </td>
              </tr>

              <tr className="tr-border-bottom">
                <td width="40%">Branch:</td>

                <td width="60%">{consultantData?.branch?.name}</td>
              </tr>
              <tr className="tr-border-bottom">
                <td width="40%">Account Status:</td>

                <td width="60%">{consultantData?.accountStatus?.statusName}</td>
              </tr>

              <tr className="tr-border-bottom">
                <td width="40%">Registration Date:</td>

                <td width="60%">{consultantData?.createdOn}</td>
              </tr>
              <tr className="tr-border-bottom">
                <td width="40%">Have Right To Work:</td>

                <td width="60%">
                  {consultantData?.haveRightToWork == null ? "No" : "Yes"}
                </td>
              </tr>
            </tbody>
          </Table>
          {/* General Information */}

          {/* Contact Information */}

          <span
            className="app-style-const p-2"
            style={{ backgroundColor: "#DFEEEE" }}
          >
            Contact Information
          </span>

          <Table borderless responsive className="mb-4">
            <tbody>
              <tr className="tr-border-bottom">
                <td width="40%">Phone Number:</td>

                <td width="60%">{contactInfo?.cellPhoneNumber}</td>
              </tr>

              <tr className="tr-border-bottom">
                <td width="40%">House No:</td>

                <td width="60%">{contactInfo?.houseNo}</td>
              </tr>

              <tr className="tr-border-bottom">
                <td width="40%">Address Line:</td>

                <td width="60%">{contactInfo?.addressLine}</td>
              </tr>

              <tr className="tr-border-bottom">
                <td width="40%">Country:</td>

                <td width="60%">{contactInfo?.country?.name}</td>
              </tr>

              <tr className="tr-border-bottom">
                <td width="40%">City:</td>

                <td width="60%">{contactInfo?.city}</td>
              </tr>
              <tr className="tr-border-bottom">
                <td width="40%">State/County:</td>

                <td width="60%">{contactInfo?.state}</td>
              </tr>
              <tr className="tr-border-bottom">
                <td width="40%">Zip/Post Code:</td>

                <td width="60%">{contactInfo?.zipCode}</td>
              </tr>
            </tbody>
          </Table>

          {/* Contact Information */}

          {/* Emergency Information */}
          <EmergencyContactFormConsultant emergencyInfo={emergencyInfo} />

          {/* Emergency Information */}

          {/* Bank Information */}

          <span
            className="app-style-const p-2"
            style={{ backgroundColor: "#DFEEEE" }}
          >
            Bank Details
          </span>
          {consultantData?.bankDetails?.map((data, i) => (
            <Table borderless responsive className="mb-4">
              <tbody>
                <tr className="tr-border-bottom">
                  <td width="40%">Account Name:</td>

                  <td width="60%">{data?.accountName}</td>
                </tr>

                <tr className="tr-border-bottom">
                  <td width="40%">Account Number:</td>

                  <td width="60%">{data?.accountNumber}</td>
                </tr>

                <tr className="tr-border-bottom">
                  <td width="40%">Bank Address:</td>

                  <td width="60%">{data?.bankAddress}</td>
                </tr>

                <tr className="tr-border-bottom">
                  <td width="40%">Bank Name:</td>

                  <td width="60%">{data?.bankName}</td>
                </tr>

                <tr className="tr-border-bottom">
                  <td width="40%">BIC:</td>

                  <td width="60%">{data?.bic}</td>
                </tr>
                <tr className="tr-border-bottom">
                  <td width="40%">Sort Code:</td>

                  <td width="60%">{data?.sortCode}</td>
                </tr>
                <tr className="tr-border-bottom">
                  <td width="40%">Swift:</td>
                  <td width="60%">{data?.swift}</td>
                </tr>
              </tbody>
            </Table>
          ))}

          {/* Bank Information */}

          {/* Current Information */}

          <h5>
            Current Commission Group
            {priceRangeList.length > 0 ? (
              <>: {priceRangeList[0]?.commissionGroup?.name}</>
            ) : null}
          </h5>

          <div className="table-responsive  mt-3">
            <Table id="table-to-xls">
              <thead className="tablehead">
                <tr style={{ textAlign: "center" }}>
                  <th>Sl/No</th>
                  <th>Price Range</th>
                  <th>Range From</th>
                  <th>Range To</th>
                  <th>Commission Amount</th>
                </tr>
              </thead>
              <tbody>
                {priceRangeList?.map((range, i) => (
                  <tr key={range.id} style={{ textAlign: "center" }}>
                    <th scope="row">{1 + i}</th>

                    <td>{range?.priceRangeName}</td>

                    <td>{range?.rangeFrom}</td>

                    <td>{range?.rangeTo}</td>

                    <td>{range?.commissionAmount}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {/* Current commission Information */}
        </Card>
      </div>
    </>
  );
};

export default ConsultantDetails;
