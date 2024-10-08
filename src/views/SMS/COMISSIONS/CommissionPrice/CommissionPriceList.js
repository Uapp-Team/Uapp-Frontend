import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Card, CardBody, CardHeader } from "reactstrap";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import remove from "../../../../helpers/remove";
import Loader from "../../Search/Loader/Loader";
import AddCommissionPriceInformation from "./AddCommissionPriceInformation";
import ShowCommissionPriceListData from "./ShowCommissionPriceListData";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const CommissionPriceList = () => {
  const { id } = useParams();
  const history = useHistory();
  const [rangeName, setRangeName] = useState("");
  const [rangeNameError, setRangeNameError] = useState("");
  const [from, setFrom] = useState("");
  const [fromError, setFromError] = useState("");
  const [to, setTo] = useState("");
  const [toError, setToError] = useState("");
  const [commission, setCommission] = useState("");
  const [commissionError, setCommissionError] = useState("");
  const [success, setSuccess] = useState(false);
  const [list, setList] = useState([]);
  const [data, setData] = useState({});
  const [delData, setDelData] = useState({});
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(false);

  const { addToast } = useToasts();

  useEffect(() => {
    get(`GroupPriceRange/Index/${id}`).then((res) => {
      setList(res);
      setLoading(false);
    });
  }, [success]);

  const backToDashboard = () => {
    history.push("/commissionGroupList");
  };
  const handleRange = (e) => {
    setRangeName(e.target.value);
    if (e.target.value === "") {
      setRangeNameError("Price Range Name is required");
    } else {
      setRangeNameError("");
    }
  };
  const handleFrom = (e) => {
    setFrom(e.target.value);
    if (e.target.value === "") {
      setFromError("Student Range From is required");
    } else {
      setFromError("");
    }
  };

  const handleTo = (e) => {
    setTo(e.target.value);
    if (e.target.value === "") {
      setToError("Student Range To is required");
    } else {
      setToError("");
    }
  };

  const handleCommission = (e) => {
    setCommission(e.target.value);
    if (e.target.value === "") {
      setCommissionError("Commission Amount is required");
    } else {
      setCommissionError("");
    }
  };

  const toggleDanger = (data) => {
    setDelData(data);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    setProgress(true);
    remove(`GroupPriceRange/Delete/${delData?.id}`).then((res) => {
      setProgress(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDelData({});
      setRangeName("");
      setFrom("");
      setTo("");
      setCommission("");
      setSuccess(!success);
      setSuccess(!success);
      setDeleteModal(false);
    });
  };

  const toggleUpdate = (data) => {
    setData(data);
    setRangeName(data?.priceRangeName);
    setFrom(data?.rangeFrom);
    setTo(data?.rangeTo);
    setCommission(data?.commissionAmount);
    setRangeNameError("");
    setFromError("");
    setToError("");
    setCommissionError("");
  };

  const validateRegisterForm = () => {
    let isFormValid = true;

    if (!rangeName) {
      isFormValid = false;
      setRangeNameError("Price Range Name is required");
    }
    if (!from) {
      isFormValid = false;
      setFromError("Student Range From is required");
    }
    if (!to) {
      isFormValid = false;
      setToError("Student Range To is required");
    }
    if (commission === "") {
      isFormValid = false;
      setCommissionError("Commission Amount is required");
    }

    return isFormValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    var formIsValid = validateRegisterForm();
    if (formIsValid) {
      if (data?.id) {
        setProgress(true);
        put(`GroupPriceRange/Update`, subData).then((res) => {
          setProgress(false);
          if (res?.status == 200) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setRangeName("");
            setFrom("");
            setTo("");
            setCommission("");
            setData();
            setSuccess(!success);
          }
        });
      } else {
        setProgress(true);
        post(`GroupPriceRange/Create`, subData).then((res) => {
          setProgress(false);
          if (res?.status === 200) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setRangeName("");
            setFrom("");
            setTo("");
            setCommission("");
            setSuccess(!success);
          }
        });
      }
    }
  };

  const handleClear = () => {
    setData([]);
    setRangeName("");
    setFrom("");
    setTo("");
    setCommission("");
    setRangeNameError("");
    setFromError("");
    setToError("");
    setCommissionError("");
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <BreadCrumb
            title="Commission Price"
            backTo="Commission Groups"
            path={`/commissionGroupList`}
          />

          <Card>
            <CardBody>
              <div className="row">
                <div className="col-md-5">
                  <AddCommissionPriceInformation
                    id={id}
                    handleRange={handleRange}
                    handleFrom={handleFrom}
                    handleTo={handleTo}
                    handleCommission={handleCommission}
                    rangeName={rangeName}
                    setRangeName={setRangeName}
                    from={from}
                    setFrom={setFrom}
                    to={to}
                    setTo={setTo}
                    handleSubmit={handleSubmit}
                    commission={commission}
                    setCommission={setCommission}
                    data={data}
                    progress={progress}
                    handleClear={handleClear}
                    rangeNameError={rangeNameError}
                    fromError={fromError}
                    toError={toError}
                    commissionError={commissionError}
                  />
                </div>

                <div className="col-md-7">
                  <ShowCommissionPriceListData
                    list={list}
                    toggleUpdate={toggleUpdate}
                    toggleDanger={toggleDanger}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    confirmDelete={confirmDelete}
                    progress={progress}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CommissionPriceList;
