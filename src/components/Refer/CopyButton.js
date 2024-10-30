import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useToasts } from "react-toast-notifications";

const CopyButton = ({ text }) => {
  const { addToast } = useToasts();

  const onCopyText = () => {
    setTimeout(() => 2000);
    addToast("Copied!");
  };

  return (
    <>
      <CopyToClipboard text={text} onCopy={onCopyText}>
        <button className="copy-link">
          <i class="fa-regular fa-clone" style={{ color: "#076461" }}></i>
        </button>
      </CopyToClipboard>
    </>
  );
};

export default CopyButton;
