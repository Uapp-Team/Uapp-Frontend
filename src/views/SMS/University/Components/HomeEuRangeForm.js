import React, { useState } from "react";
import { Input } from "reactstrap";

const HomeEuRangeForm = (type) => {
  const [formcounter, setformcounter] = useState(1);
  const addNewForm = () => {
    setformcounter(formcounter + 1);
  };
  return (
    <>
      <div className="d-flex">
        <FormComponent />
        {/* {...rest} */}
        <button onClick={() => addNewForm()}>+</button>
      </div>
    </>
  );
};
const FormComponent = () => {
  return (
    <>
      <div className="d-flex">
        <div className="d-flex mt-2">
          <h5 className="pr-3">From</h5>
          <Input type="number" name="fromAmount" id="fromAmount" required />
          <h5 className="pr-3">To</h5>
          <Input type="number" name="toAmount" id="toAmount" required />
          <h5 className="pr-3">Amount</h5>
          <Input
            type="number"
            name="comissionAmount"
            id="comissionAmount"
            placeholder="Amount"
            required
          />
        </div>
      </div>
    </>
  );
};
export default HomeEuRangeForm;
