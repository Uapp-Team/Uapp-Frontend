import React, { useEffect, useState } from "react";
import Select from "react-select";
import { permissionList } from "../../../../constants/AuthorizationConstant";

const StatusDD = ({
  value,
  setValue,
  className = "mb-3",
  isDisabled = false,
  isAns = true,
}) => {
  const [label, setLabel] = useState("");
  const permissions = JSON.parse(localStorage.getItem("permissions"));
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
    isAns && permissions?.includes(permissionList?.ApproveOrReject_Answer)
      ? adminAns
      : isAns
      ? userAns
      : !isAns && permissions?.includes(permissionList?.ApproveOrReject_Answer)
      ? adminQue
      : !isAns
      ? userQue
      : [
          {
            label: "Pending",
            value: 3,
          },
        ];

  useEffect(() => {
    const filterData = allStatus?.filter((item) => item.value === value);
    filterData.length === 1 && setLabel(filterData[0].label);
  }, [allStatus, value]);

  const select = (label, value) => {
    setLabel(label);
    setValue(value);
  };
  return (
    <>
      <div className={className}>
        {!isAns && <span className="d-block">Status</span>}
        <Select
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
    </>
  );
};

export default StatusDD;
