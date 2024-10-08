import React, { useEffect, useState } from "react";
import get from "../../helpers/get";

const CurrencyValue = ({ currencyId }) => {
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

  return <span>{currencyValue}</span>;
};

export default CurrencyValue;
