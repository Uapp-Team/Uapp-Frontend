import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import get from "../../../../helpers/get";
import { Card, CardBody, CardHeader, Form, Input } from "reactstrap";
import { useState } from "react";
import ButtonForFunction from "../../Components/ButtonForFunction";
import Select from "react-select";
import post from "../../../../helpers/post";
import { useToasts } from "react-toast-notifications";

const CommissionForm = () => {
  const [levelList, setLevelList] = useState([]);
  const [amount, setAmount] = useState("");
  const [installment, setInstallment] = useState("");
  const { addToast } = useToasts();

  const commissionTypeList = [
    {
      id: 1,
      name: "Amount",
    },
    {
      id: 2,
      name: "Percentage",
    },
  ];

  const commissionOptions = commissionTypeList?.map((type) => ({
    label: type?.name,
    value: type?.id,
  }));

  const { applicationType, uniId } = useParams();

  useEffect(() => {
    get(`EducationLevelDD/Index`).then((res) => {
      const defaultCommissionType = { label: "Commission Type", value: 0 };
      const fields = res?.map((p) => ({
        ...p,
        commissionType: defaultCommissionType,
        installment: 0,
        value: 0,
      }));
      setLevelList(fields);
    });
  }, []);

  const selectCommissionType = (value, i) => {
    setLevelList((prevState) => {
      const newList = [...prevState];
      newList[i].commissionType = value;
      return newList;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);
    let value = 0;

    for (value of subdata) {
      console.log("valuesss", value);
    }

    post(`UniversityComission/Create`, subdata).then((res) => {
      console.log("res", res);
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
      } else {
        addToast(res?.data?.message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    });
  };

  console.log("levelList", levelList);

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">
            {applicationType == 1
              ? "Home/UK"
              : applicationType == 2
              ? "EU/EEU"
              : "International"}{" "}
            Application Commissions
          </h3>
          <div className="page-header-back-to-home">
            {/* <span onClick={backToUniList} className="text-white">
                        {" "}
                        <i className="fas fa-arrow-circle-left"></i> Back to University
                        List
                    </span> */}
          </div>
        </CardHeader>
      </Card>

      {levelList?.map((level, i) => (
        <Card key={i} className="CampusCard">
          <CardBody className="shaodw">
            <Form onSubmit={handleSubmit}>
              <input type="hidden" name="universityId" value={uniId} />
              <input
                type="hidden"
                name="applicationTypeId"
                value={applicationType}
              />
              <input type="hidden" name="educationLevelId" value={level?.id} />

              <div className="row">
                <div className="col-md-3">
                  <span>{level?.name}</span>
                </div>
                <div className="col-md-3">
                  <Select
                    options={commissionOptions}
                    defaultValue={{ label: "Amount", value: 1 }}
                    onChange={(opt) => selectCommissionType(opt.value, i)}
                    name="comissionType"
                    id="comissionType"
                  />
                </div>
                <div className="col-md-3">
                  <Input
                    type="number"
                    name="comissionInstallment"
                    id="comissionInstallment"
                    placeholder="Installment"
                    required
                  />
                </div>
                <div className="col-md-2">
                  <Input
                    type="number"
                    name="comissionAmount"
                    id="comissionAmount"
                    placeholder="Amount"
                    required
                  />
                </div>
                <div className="col-md-1">
                  <ButtonForFunction
                    color={"primary"}
                    type={"submit"}
                    className={"ml-lg-3 ml-sm-1"}
                    name={"Save"}
                    permission={6}
                  />
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default CommissionForm;
