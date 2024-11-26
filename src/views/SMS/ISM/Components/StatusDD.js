import React, { useEffect, useState } from "react";
import Select from "react-select";
import { AdminUsers, AdmissionUsers } from "../../../../components/core/User";
import Status from "./Status";
import { Form } from "reactstrap";

const StatusDD = ({
  value,
  setValue,
  className = "mb-3",
  isDisabled = false,
  isAns = true,
}) => {
  const [label, setLabel] = useState("");

  const adminAns = [
    {
      label: "Draft",
      value: 2,
    },
    {
      label: "Pending",
      value: 3,
    },
    {
      label: "Published",
      value: 4,
    },
    {
      label: "Rejected",
      value: 5,
    },
  ];

  const adminQue = [
    {
      label: "Draft",
      value: 2,
    },
    {
      label: "Pending",
      value: 3,
    },
    {
      label: "Published",
      value: 4,
    },
  ];

  const userAns = [
    {
      label: "Draft",
      value: 2,
    },
    {
      label: "Pending",
      value: 3,
    },
  ];

  const userQue = [
    {
      label: "Draft",
      value: 2,
    },
    {
      label: "Pending",
      value: 3,
    },
  ];

  const options =
    isAns && AdminUsers()
      ? adminAns
      : isAns && AdmissionUsers()
      ? userAns
      : !isAns && AdminUsers()
      ? adminQue
      : !isAns && AdmissionUsers()
      ? userQue
      : [
          {
            label: "Pending",
            value: 3,
          },
        ];

  useEffect(() => {
    if (label === "") {
      const labelBYValue = adminAns?.filter((item) => item.value === value);
      console.log(labelBYValue);
      setLabel(labelBYValue[0].label);
    }
  }, [adminAns, label, value]);

  const select = (label, value) => {
    setLabel(label);
    setValue(value);
  };

  return (
    <>
      {isAns && AdmissionUsers() ? (
        <Status statusId={value} className="mr-3" />
      ) : (
        <div className={className}>
          {!isAns && <span className="d-block">Status</span>}
          <Select
            // className={className}
            styles={{ height: "33px !important" }}
            options={options}
            value={{
              label: label,
              value: value,
            }}
            onChange={(opt) => select(opt.label, opt.value)}
            isDisabled={isDisabled}
          />
        </div>
      )}
    </>
  );
};

export default StatusDD;
