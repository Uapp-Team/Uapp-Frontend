import React, { useEffect, useState } from "react";
import Select from "react-select";
import get from "../../helpers/get";
import { userTypes } from "../../constants/userTypeConstant";
import Uget from "../../helpers/Uget";

const Student = ({ data, setData, name, error, setError, action }) => {
  const userType = localStorage.getItem("userType");
  const [studentData, setStudentData] = useState([]);
  const [dataLabel, setDataLabel] = useState("Select Student");

  useEffect(() => {
    get(`SearchFilter/Students`).then((res) => {
      setStudentData([{ id: "0", name: "Select Student" }, ...res]);
    });
  }, []);

  const studentOptions = studentData?.map((std) => ({
    label: std?.name,
    value: std?.id,
  }));

  const selectStudent = (label, value) => {
    setError(false);
    setDataLabel(label);
    setData(value);
    action(value);
  };

  return (
    <>
      {userType === userTypes?.Student.toString() ? (
        <input
          type="hidden"
          value={data}
          name="providerTypeId"
          id="providerTypeId"
        />
      ) : (
        <Select
          options={studentOptions}
          value={{
            label: dataLabel,
            value: data,
          }}
          onChange={(opt) => selectStudent(opt.label, opt.value)}
          name={name}
          id={name}
        />
      )}
      {error === true ? (
        <span className="text-danger">Student is required</span>
      ) : null}
    </>
  );
};

export default Student;
