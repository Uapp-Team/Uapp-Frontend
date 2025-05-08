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
      {checkEu?.length === 1 &&
      item?.eU_TutionFeeCurrencyId > 0 &&
      item?.internationalTutionFee === 0 &&
      item?.localTutionFee === 0 ? (
        <>
          {currency(item?.eU_TutionFeeCurrencyId)} {item?.eU_TutionFee}
        </>
      ) : checkHome?.length === 1 &&
        item?.localTutionFeeCurrencyId > 0 &&
        item?.internationalTutionFee === 0 ? (
        <>
          {currency(item?.localTutionFeeCurrencyId)} {item?.localTutionFee}
        </>
      ) : checkInt?.length === 1 ? (
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
      ) : null}
      {/* {checkInt?.length === 1 ? (
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
      )} */}
    </>
  );
};

export default TuitionFee;
