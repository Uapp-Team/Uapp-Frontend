import React, { useEffect, useState } from "react";
import Select from "react-select";
import { AdminUsers, AdmissionUsers } from "../../../../components/core/User";
import Status from "./Status";

const StatusDD = ({
  value,
  setValue,
  className = "mb-3",
  isDisabled = false,
  isAns = true,
}) => {
  const [label, setLabel] = useState("");

  const allStatus = [
    {
      label: "No Answer",
      value: 1,
    },
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
    const filterData = allStatus?.filter((item) => item.value === value);
    console.log(filterData);
    filterData.length === 1 && setLabel(filterData[0].label);
  }, [allStatus, label, value]);

  const select = (label, value) => {
    setLabel(label);
    setValue(value);
  };
  console.log("value", value);
  return (
    <>
      {/* {isAns && AdmissionUsers() ? (
        <Status statusId={value} className="mr-3" />
      ) : ( */}
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
      {/* )} */}
    </>
  );
};

export default StatusDD;
