import { Upload, Image } from "antd";
import React from "react";
import { Col, FormGroup, Input, Modal, Button } from "reactstrap";
import * as Icon from "react-feather";
import { rootUrl } from "../../../../constants/constants";

const BankLoanFundingAssesment = ({
  previewVisible4,
  setPreviewVisible4,
  previewTitle4,
  setPreviewTitle4,
  previewImage4,
  setPreviewImage4,
  FileList4,
  setFileList4,
  handleCancel4,
  handlePreview4,
  getBase644,
  handleChange4,
  bLoanError,
  setBLoanError,
  bankFunding,
  bankAttachment,
}) => {
  return (
    <div>
      <FormGroup row className="has-icon-left position-relative">
        <Col md="2">
          <span>
            Attachment <span className="text-danger">*</span>{" "}
          </span>
          <br />
          <span>
            ( If already applied please attach prove, If not we will ask latter)
          </span>
        </Col>
        <Col md="6">
          <div className="row">
            <div className="col-md-6">
              <Upload
                listType="picture-card"
                multiple={false}
                fileList={FileList4}
                onPreview={handlePreview4}
                onChange={handleChange4}
                beforeUpload={(file) => {
                  return false;
                }}
              >
                {FileList4.length < 1 ? (
                  <div className="text-danger" style={{ marginTop: 8 }}>
                    <Icon.Upload />
                    <br />
                    <span>Upload Here</span>
                  </div>
                ) : (
                  ""
                )}
              </Upload>

              <Modal
                visible={previewVisible4}
                title={previewTitle4}
                footer={null}
                onCancel={handleCancel4}
              >
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage4}
                />
              </Modal>
              <span className="text-danger d-block">{bLoanError}</span>
            </div>
          </div>
        </Col>
      </FormGroup>
    </div>
  );
};

export default BankLoanFundingAssesment;
