import React from "react";
import { currency } from "../../../../constants/presetData";

const TuitionFee = ({ applicationTypeSelected, item }) => {
  const checkHome = applicationTypeSelected?.filter(
    (item) => item?.name === "Home/UK"
  );
  const checkEu = applicationTypeSelected?.filter(
    (item) => item?.name === "EU/EEA"
  );
  const checkInt = applicationTypeSelected?.filter(
    (item) => item?.name === "International"
  );

  return (
    <>
      {checkInt?.length === 1 ? (
        <>
          {currency(item?.internationalTutionCurrencyId)}{" "}
          {item?.internationalTutionFee}
        </>
      ) : checkHome?.length === 1 ? (
        <>
          {currency(item?.localTutionFeeCurrencyId)} {item?.localTutionFee}
        </>
      ) : checkEu?.length === 1 ? (
        <>
          {currency(item?.eU_TutionFeeCurrencyId)} {item?.eU_TutionFee}
        </>
      ) : (
        <>
          {currency(item?.localTutionFeeCurrencyId)} {item?.localTutionFee}
        </>
      )}
    </>
  );
};

export default TuitionFee;
