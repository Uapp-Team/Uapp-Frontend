import React, { useState } from "react";
import GroupButton from "../../../../components/buttons/GroupButton";
import CloseBtn from "../../../../components/buttons/CloseBtn";
import ChangeFormConsultant from "./ChangeFormConsultant";

const ChangeManager = ({ branchId, modalClose, refetch }) => {
  const [userValue, setUserValue] = useState("1");

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <h4>Change Branch Manager</h4>
        <CloseBtn action={modalClose} />
      </div>

      <GroupButton
        list={[
          { id: "1", name: "Select Form Staff" },
          { id: "2", name: "Select Form Consultant" },
        ]}
        value={userValue}
        setValue={setUserValue}
        action={() => {}}
      />
      {userValue === "1" ? (
        <ChangeFormConsultant
          branchId={branchId}
          refetch={refetch}
          action={modalClose}
        />
      ) : (
        <ChangeFormConsultant
          branchId={branchId}
          refetch={refetch}
          action={modalClose}
        />
      )}
    </>
  );
};

export default ChangeManager;
