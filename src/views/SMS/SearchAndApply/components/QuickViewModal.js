import { Button, Modal } from "antd";
import React from "react";

const QuickViewModal = ({ open, onClose, onReload }) => {
  return (
    <Modal
      title={<p>Loading Modal</p>}
      footer={
        <Button type="primary" onClick={onReload}>
          Reload
        </Button>
      }
      open={open}
      onCancel={onClose}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default QuickViewModal;
