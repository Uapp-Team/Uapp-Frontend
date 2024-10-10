import React, { useEffect, useState } from "react";
import Select from "react-select";
import get from "../../helpers/get";

const MultiSelect = ({ url, value, setValue }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    get(url).then((res) => {
      setData(res);
    });
  }, [url]);

  const dataOptions = data?.map((b) => ({
    label: b.name,
    value: b.id,
  }));
  return (
    <>
      <Select
        isMulti
        onChange={(e) => {
          setValue(e);
        }}
        options={dataOptions}
        value={value}
        className="d-block"
      />
    </>
  );
};

export default MultiSelect;
