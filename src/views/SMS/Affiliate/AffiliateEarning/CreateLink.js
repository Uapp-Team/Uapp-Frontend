import React from "react";
import CopyButton from "../../../../components/Refer/CopyButton";
import SaveButton from "../../../../components/buttons/SaveButton";

const CreateLink = () => {
  const url = "https://portal.uapp.uk/";

  return (
    <>
      <div className="custom-card-border p-4 h-100">
        <p className="aff-card-title">Create Link</p>
        <p>Promote UAPP with a simple link </p>
        <div className="mb-30px">
          <SaveButton text="Create" action={() => {}} />
        </div>
        <div className="d-flex justify-content-between align-items-center copy-aff-link ">
          <p className="mb-0 text-ellipsis mr-1">{url}</p>
          <CopyButton text={url} />
        </div>
      </div>
    </>
  );
};

export default CreateLink;
