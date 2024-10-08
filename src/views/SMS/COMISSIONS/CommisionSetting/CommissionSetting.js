import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, CardBody, CardHeader } from "reactstrap";
import get from "../../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
import AddCommissionSetting from "./AddCommissionSetting";
import UpdateCommissionSetting from "./UpdateCommissionSetting";
import ShowCommissionSettingData from "./ShowCommissionSettingData";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const CommissionSetting = () => {
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [progress1, setProgress1] = useState(false);

  const [success, setSuccess] = useState(false);
  const [firstData, setFirstData] = useState(null);
  const [data, setData] = useState(null);
  const [value, setValue] = useState("");
  const [reqDetails, setReqDetails] = useState("");
  const history = useHistory();
  const { addToast } = useToasts();
  const [showForm, setShowForm] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get("CommissionSetting/GetValue").then((res) => {
      console.log("response", res);
      setReqDetails(res?.commissionPolicyDetails);
      setFirstData(res);
    });
  }, [success]);

  console.log("data", data);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "ordered" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    subdata.append("CommissionPolicyDetails", value);

    setButtonStatus(true);
    setProgress(true);
    post("CommissionSetting/Create", subdata).then((res) => {
      setProgress(false);
      setSuccess(!success);

      addToast(res?.data?.message, {
        appearance: res?.data?.isSuccess == true ? "success" : "error",
        autoDismiss: true,
      });
      setButtonStatus(false);
    });
  };

  const handleUpdateButton = (id) => {
    setShowForm(true);
    get("CommissionSetting/GetValue").then((res) => {
      console.log("handleUpdate", res);
      setValue(res?.commissionPolicyDetails);
      setData(res);
    });
  };

  const handleSubmitCommission = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("CommissionPolicyDetails", value);

    setButtonStatus1(true);
    setProgress1(true);
    put("CommissionSetting/Update", subData).then((res) => {
      setButtonStatus1(false);
      setProgress1(false);

      addToast(res?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setValue("");
      setSuccess(!success);
      setShowForm(false);
      setData(null);
    });
  };

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  if (showForm == true) {
    const element = document.getElementById("scrollDown");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const closeShowForm = () => {
    setData(null);

    setShowForm(false);
  };

  const backToDashboard = () => {
    history.push("/");
  };

  return (
    <div>
      <BreadCrumb title="Commission Settings" backTo="" path="" />
      <Card>
        <CardBody>
          {/* update and particular add form starts here*/}
          {showForm ? (
            <UpdateCommissionSetting
              handleSubmitCommission={handleSubmitCommission}
              data={data}
              value={value}
              modules={modules}
              setValue={setValue}
              closeShowForm={closeShowForm}
              permissions={permissions}
              permissionList={permissionList}
              buttonStatus1={buttonStatus1}
              progress1={progress1}
            />
          ) : (
            <>
              {firstData !== null ? (
                <ShowCommissionSettingData
                  handleUpdateButton={handleUpdateButton}
                  data={data}
                  firstData={firstData}
                  createMarkup={createMarkup}
                  reqDetails={reqDetails}
                ></ShowCommissionSettingData>
              ) : (
                <AddCommissionSetting
                  progress={progress}
                  handleSubmit={handleSubmit}
                  value={value}
                  setValue={setValue}
                  buttonStatus={buttonStatus}
                  success={success}
                  modules={modules}
                  setSuccess={setSuccess}
                />
              )}
            </>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default CommissionSetting;
