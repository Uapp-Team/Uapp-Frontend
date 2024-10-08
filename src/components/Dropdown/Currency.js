import React, { useEffect, useState } from "react";
import Select from "react-select";
import get from "../../helpers/get";

const Currency = ({ currencyId, setCurrencyId, name, error, setError }) => {
  const [currencyDD, setCurrencyDD] = useState([]);
  const [currencyValue, setCurrencyValue] = useState("Select");

  useEffect(() => {
    get(`CurrencyDD/Index`).then((res) => {
      setCurrencyDD(res);
    });
  }, []);

  useEffect(() => {
    const filterData = currencyDD.filter((status) => {
      return status.id === currencyId;
    });

    setCurrencyValue(filterData[0]?.name);
  }, [currencyDD, currencyId]);

  const currencyList = currencyDD.map((programOptions) => ({
    label: programOptions.name,
    value: programOptions.id,
  }));

  const selectCurrency = (label, value) => {
    setCurrencyValue(label);
    setCurrencyId(value);
    setError(false);
  };

  return (
    <>
      <Select
        options={currencyList}
        value={{
          label: currencyValue ? currencyValue : "Select",
          value: currencyId,
        }}
        onChange={(opt) => selectCurrency(opt.label, opt.value)}
        name={name}
        id={name}
      />
      {error === true ? (
        <span className="text-danger">Currency is required</span>
      ) : null}
    </>
  );
};

export default Currency;
