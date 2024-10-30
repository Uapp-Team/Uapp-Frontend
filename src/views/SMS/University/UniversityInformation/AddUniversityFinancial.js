import Axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Select from "react-select";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Col,
  TabContent,
  TabPane,
} from "reactstrap";
import { rootUrl } from "../../../../constants/constants";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get";
import put from "../../../../helpers/put";
import UniversityNavbar from "../Components/UniversityNavbar";
import Loader from "../../Search/Loader/Loader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import PreviousButton from "../../../../components/buttons/PreviousButton";
import SaveButton from "../../../../components/buttons/SaveButton";
import Currency from "../../../../components/Dropdown/Currency";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const AddUniversityFinancial = (props) => {
  const activetab = "3";
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // const [financialData, setFinancialData] = useState({});
  const [financialId, setFinancialId] = useState(undefined);
  // const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const { univerId } = useParams();
  const history = useHistory();
  const myForm = createRef();
  const [tuitionFee, setTuitionFee] = useState("");
  const [tuitionFeeError, setTuitionFeeError] = useState("");
  const [livingCost, setLivingCost] = useState("");
  const [livingCostError, setLivingCostError] = useState("");
  const [totalCost, setTotalCost] = useState("");
  const [totalCostError, setTotalCostError] = useState("");
  const [foundation, setFoundation] = useState("");
  const [foundationError, setFoundationError] = useState("");
  const [undergraduate, setUndergraduate] = useState("");
  const [undergraduateError, setUndergraduateError] = useState("");
  const [postgraduate, setPostgraduate] = useState("");
  const [postgraduateError, setPostgraduateError] = useState("");
  const [research, setResearch] = useState("");
  const [researchError, setResearchError] = useState("");
  const [average, setAverage] = useState("");
  const [averageError, setAverageError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);

  // const [currencyDD, setCurrencyDD] = useState([]);
  // const [currencyValue, setCurrencyValue] = useState("@");
  const [currencyId, setCurrencyId] = useState(0);
  const [CurrencyIdError, setCurrencyIdError] = useState(false);

  // useEffect(() => {
  //   get(`CurrencyDD/Index`).then((res) => {
  //     setCurrencyDD(res);
  //   });
  // }, []);

  useEffect(() => {
    get(`FinancialInformation/GetByUniversity/${univerId}`).then((res) => {
      setLoading(false);
      console.log(res);
      // setFinancialData(res);
      setCurrencyId(res?.currencyId);
      setTuitionFee(res?.avarageTutionFee);
      setLivingCost(res?.avarageLivingCost);
      setTotalCost(res?.estimatedTotalCost);
      setFoundation(res?.foundationAverageApplicationFee);
      setUndergraduate(res?.undergraduateAverageApplicationFee);
      setPostgraduate(res?.postgraduateAverageApplicationFee);
      setResearch(res?.researchAverageApplicationFee);
      setAverage(res?.defaultAverageApplicationFee);
      setFinancialId(res?.id);
    });
  }, [univerId]);

  // useEffect(() => {
  //   const initialStatus = currencyDD.filter((status) => {
  //     return status.id === currencyId;
  //   });

  //   setCurrencyValue(initialStatus[0]?.name);
  // }, [currencyDD, currencyId]);
  // console.log(currencyValue);

  const AuthStr = localStorage.getItem("token");

  // const currencyList = currencyDD.map((programOptions) => ({
  //   label: programOptions.name,
  //   value: programOptions.id,
  // }));

  // const selectCurrency = (label, value) => {
  //   setCurrencyValue(label);
  //   setCurrencyId(value);
  // };

  const handleTuitionFee = (e) => {
    let data = e.target.value.trimStart();
    setTuitionFee(data);
    if (data === "") {
      setTuitionFeeError("Average Tuition Fee is required");
    } else {
      setTuitionFeeError("");
    }
  };

  const handleLivingCost = (e) => {
    let data = e.target.value.trimStart();
    setLivingCost(data);
    if (data === "") {
      setLivingCostError("Average Living Cost is required");
    } else {
      setLivingCostError("");
    }
  };

  const handleTotalCost = (e) => {
    let data = e.target.value.trimStart();
    setTotalCost(data);
    if (data === "") {
      setTotalCostError("Estimated Total Cost is required");
    } else {
      setTotalCostError("");
    }
  };

  const handleFoundation = (e) => {
    let data = e.target.value.trimStart();
    setFoundation(data);
    if (data === "") {
      setFoundationError("Foundation is required");
    } else {
      setFoundationError("");
    }
  };

  const handleUndergraduate = (e) => {
    let data = e.target.value.trimStart();
    setUndergraduate(data);
    if (data === "") {
      setUndergraduateError("Undergraduate is required");
    } else {
      setUndergraduateError("");
    }
  };

  const handlePostgraduate = (e) => {
    let data = e.target.value.trimStart();
    setPostgraduate(data);
    if (data === "") {
      setPostgraduateError("Postgraduate is required");
    } else {
      setPostgraduateError("");
    }
  };

  const handleResearch = (e) => {
    setResearch(e.target.value);
    if (e.target.value === "") {
      setResearchError("Research is required");
    } else {
      setResearchError("");
    }
  };

  const handleAverage = (e) => {
    let data = e.target.value.trimStart();
    setAverage(data);
    if (data === "") {
      setAverageError("Average is required");
    } else {
      setAverageError("");
    }
  };

  const goPrevious = () => {
    history.push(`/addUniversityCampus/${univerId}`);
  };

  const validateRegisterForm = () => {
    var isFormValid = true;
    console.log(currencyId);
    if (!currencyId) {
      isFormValid = false;
      setCurrencyIdError(true);
    }

    if (!tuitionFee) {
      isFormValid = false;
      setTuitionFeeError("Average Tuition Fee is required");
    }
    if (!livingCost) {
      isFormValid = false;
      setLivingCostError("Average Living Cost is required");
    }
    if (!totalCost) {
      isFormValid = false;
      setTotalCostError("Estimated Total Cost is required");
    }
    if (!foundation) {
      isFormValid = false;
      setFoundationError("Foundation is required");
    }
    if (!undergraduate) {
      isFormValid = false;
      setUndergraduateError("Undergraduate is required");
    }
    if (!postgraduate) {
      isFormValid = false;
      setPostgraduateError("Postgraduate is required");
    }
    if (!research) {
      isFormValid = false;
      setResearchError("Research is required");
    }
    if (!average) {
      isFormValid = false;
      setAverageError("Average is required");
    }
    return isFormValid;
  };

  // on submit form
  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    if (validateRegisterForm()) {
      if (financialId === undefined) {
        setButtonStatus(true);
        setProgress(true);
        Axios.post(`${rootUrl}FinancialInformation/Create`, subdata, {
          headers: {
            authorization: AuthStr,
          },
        }).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          const uniID = res.data.result.universityId;

          if (res.status === 200 && res.data.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push({
              pathname: `/addUniversityFeaturesGallery/${univerId}`,
              id: uniID,
            });
          } else {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        setProgress(true);
        put("FinancialInformation/Update", subdata).then((res) => {
          setButtonStatus(false);
          setProgress(false);
          if (res?.status === 200 && res?.data?.isSuccess === true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push(`/addUniversityFeaturesGallery/${univerId}`);

            // history.push({
            //   pathname: `/addUniversityFeatures/${univerId}`,
            //   id: localStorage.getItem("editUniId"),
            // });
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  return (
    <div>
      <BreadCrumb
        title="University Financial Information"
        backTo="University"
        path="/universityList"
      />

      <UniversityNavbar activetab={activetab} univerId={univerId} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardBody>
              <TabContent activeTab={activetab}>
                <TabPane tabId="3">
                  <Form ref={myForm} onSubmit={handleSubmit}>
                    <p className="section-title">Financial Information</p>

                    {financialId !== undefined ? (
                      <>
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={financialId}
                        />
                      </>
                    ) : null}

                    <FormGroup row>
                      <Input
                        type="hidden"
                        id="UniversityId"
                        name="UniversityId"
                        value={univerId}
                      />
                    </FormGroup>

                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>
                          Currency
                        </span>
                        <Currency
                          currencyId={currencyId}
                          setCurrencyId={setCurrencyId}
                          name="currencyId"
                          error={CurrencyIdError}
                          setError={setCurrencyIdError}
                        />
                        {/* <Select
                          options={currencyList}
                          value={{
                            label: currencyValue,
                            value: currencyId,
                          }}
                          onChange={(opt) =>
                            selectCurrency(opt.label, opt.value)
                          }
                          name="currencyId"
                          id="currencyId"
                        /> */}
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>
                          Avg. Tution Fee{" "}
                        </span>

                        <Input
                          type="number"
                          min="0"
                          name="AvarageTutionFee"
                          id="AvarageTutionFee"
                          value={tuitionFee}
                          placeholder="Avarage Tution Fee"
                          onChange={(e) => {
                            handleTuitionFee(e);
                          }}
                        />
                        <span className="text-danger">{tuitionFeeError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span> Avg. Living
                          Cost{" "}
                        </span>

                        <Input
                          type="number"
                          min="0"
                          name="AvarageLivingCost"
                          id="AvarageLivingCost"
                          value={livingCost}
                          placeholder="Avarage Living Cost"
                          onChange={(e) => {
                            handleLivingCost(e);
                          }}
                        />
                        <span className="text-danger">{livingCostError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>
                          Est. Total Cost{" "}
                        </span>

                        <Input
                          type="number"
                          min="0"
                          name="EstimatedTotalCost"
                          id="EstimatedTotalCost"
                          value={totalCost}
                          placeholder="Estimated Total Cost"
                          onChange={(e) => {
                            handleTotalCost(e);
                          }}
                        />
                        <span className="text-danger">{totalCostError}</span>
                      </Col>
                    </FormGroup>

                    <p className="section-title">Application Fee</p>
                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>
                          Foundation{" "}
                        </span>

                        <Input
                          type="number"
                          min="0"
                          name="FoundationAverageApplicationFee"
                          id="FoundationAverageApplicationFee"
                          placeholder="Foundation"
                          value={foundation}
                          onChange={(e) => {
                            handleFoundation(e);
                          }}
                        />
                        <span className="text-danger">{foundationError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>
                          Undergraduate{" "}
                        </span>

                        <Input
                          type="number"
                          min="0"
                          name="UndergraduateAverageApplicationFee"
                          id="UndergraduateAverageApplicationFee"
                          placeholder="Undergraduate"
                          value={undergraduate}
                          onChange={(e) => {
                            handleUndergraduate(e);
                          }}
                        />
                        <span className="text-danger">
                          {undergraduateError}
                        </span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>
                          Post Graduate{" "}
                        </span>

                        <Input
                          type="number"
                          min="0"
                          name="postgraduateAverageApplicationFee"
                          id="postgraduateAverageApplicationFee"
                          placeholder="Post Graduate"
                          value={postgraduate}
                          onChange={(e) => {
                            handlePostgraduate(e);
                          }}
                        />
                        <span className="text-danger">{postgraduateError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>
                          Research{" "}
                        </span>

                        <Input
                          type="number"
                          min="0"
                          name="researchAverageApplicationFee"
                          id="researchAverageApplicationFee"
                          placeholder="Research"
                          value={research}
                          onChange={(e) => {
                            handleResearch(e);
                          }}
                        />

                        <span className="text-danger">{researchError}</span>
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Col md="5">
                        <span>
                          <span className="text-danger">*</span>
                          Average{" "}
                        </span>

                        <Input
                          type="number"
                          min="0"
                          name="defaultAverageApplicationFee"
                          id="defaultAverageApplicationFee"
                          placeholder="Average"
                          onChange={(e) => {
                            handleAverage(e);
                          }}
                          value={average}
                        />
                        <span className="text-danger">{averageError}</span>
                      </Col>
                    </FormGroup>
                    <FormGroup row className=" mt-4">
                      <Col md="5" className="d-flex justify-content-between">
                        <PreviousButton action={goPrevious} />

                        {permissions?.includes(
                          permissionList.Edit_University
                        ) && (
                          <SaveButton
                            text="Save and Next"
                            progress={progress}
                            buttonStatus={buttonStatus}
                          />
                        )}
                      </Col>
                    </FormGroup>
                  </Form>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AddUniversityFinancial;
