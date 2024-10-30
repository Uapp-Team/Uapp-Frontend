import React from "react";
import { FormGroup } from "reactstrap";
import ButtonForFunction from "../../../../Components/ButtonForFunction";

const AddBankDetails = ({ addNewData }) => {
  return (
    <FormGroup
      className="has-icon-left position-relative"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <ButtonForFunction
        func={addNewData}
        className={"mr-1 mt-3 badge-primary"}
        name={"Add Bank Details"}
        permission={6}
      />
    </FormGroup>
  );
};

export default AddBankDetails;
