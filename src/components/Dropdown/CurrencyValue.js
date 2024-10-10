import React, { useEffect, useState } from "react";
import get from "../../helpers/get";

const CurrencyValue = ({ currencyList, currencyId }) => {
  const [currencyDD, setCurrencyDD] = useState(
    currencyList ? currencyList : []
  );
  const [currencyValue, setCurrencyValue] = useState("Select");

  useEffect(() => {
    if (!currencyList) {
      get(`CurrencyDD/Index`).then((res) => {
        console.log(res);
        setCurrencyDD(res);
      });
    }
  }, [currencyList]);

  useEffect(() => {
    const filterData = currencyDD.filter((status) => {
      return status.id === currencyId;
    });

    setCurrencyValue(filterData[0]?.name);
  }, [currencyDD, currencyId]);

  return <span>{currencyValue}</span>;
};

export default CurrencyValue;
