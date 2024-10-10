import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { Button, ButtonGroup } from "reactstrap";
import get from "../../../../helpers/get";
import logoLg from "../../../../assets/img/Logo.svg";
import * as Icon from "react-feather";

const WithdrawPdf = ({ pdfData }) => {
  const componentRef2 = useRef();
  const [bankDetails, setBankDetails] = useState({});

  useEffect(() => {
    get(`BankDetails/GetDefaultBank/${pdfData?.id}`).then((res) => {
      setBankDetails(res);
    });
  }, [pdfData]);

  return (
    <>
      <ButtonGroup variant="text">
        <ReactToPrint
          trigger={() => (
            <Button className="me-1 btn-sm" color="primary">
              Download
            </Button>
          )}
          content={() => componentRef2.current}
        />
      </ButtonGroup>

      <div
        className="d-none d-print-block"
        ref={componentRef2}
        style={{ marginTop: "100px" }}
      >
        <div className="invoice-winthdraw-request-style">
          <img height={70} src={logoLg} alt="" />
          <h1>Remittance Advice</h1>
        </div>

        <div style={{ marginTop: "100px" }}>
          <hr />
        </div>

        <div style={{ marginTop: "100px" }}>
          <div
            style={{
              display: "flex",
              marginLeft: "100px",
              width: "100%",
            }}
          >
            <div style={{ width: "50%" }}>
              <div>
                <span
                  className="withdraw-Transaction-pdf"
                  style={{
                    color: "#1e98b0",
                    fontWeight: "500",
                    width: "50%",
                  }}
                >
                  Transaction code: {pdfData?.transactionCode}
                </span>
              </div>
              <br />
              <br />
              <div>
                <span>
                  <Icon.PhoneCall color="#1e98b0" />
                </span>
                <span
                  style={{ marginLeft: "10px" }}
                  className="withdraw-Transaction-pdf"
                >
                  +442072658478
                </span>
              </div>
              <div>
                <span>
                  <Icon.Search color="#1e98b0" />
                </span>
                <span
                  style={{ marginLeft: "10px" }}
                  className="withdraw-Transaction-pdf"
                >
                  finance@uapp.uk
                </span>
              </div>
              <div>
                <span>
                  <Icon.Map color="#1e98b0" />
                </span>
                <span
                  style={{ marginLeft: "10px" }}
                  className="withdraw-Transaction-pdf"
                >
                  80-82 Nelson Street London E1 2DY
                </span>
              </div>
              <div>
                <span className="withdraw-Transaction-pdf">
                  TC Date {pdfData?.transactionDate}
                </span>
              </div>
              <div>
                <span className="withdraw-Transaction-pdf">
                  Transaction Status: {pdfData?.transactionStatus}
                </span>
              </div>
              {pdfData?.transactionStatus !== "Pending" ? (
                <>
                  <div>
                    <span className="withdraw-Transaction-pdf">
                      Authorized Date: {pdfData?.authorizationDate}
                    </span>
                  </div>
                </>
              ) : null}
            </div>

            <div style={{ width: "50%" }}>
              <div>
                <div>
                  <span
                    className="withdraw-Transaction-pdf"
                    style={{
                      color: "#1e98b0",
                      fontWeight: "800",
                      fontSize: "25px",
                    }}
                  >
                    Date : {pdfData?.transactionDate}
                  </span>
                </div>
                <br />
                <br />
                <div>
                  <span className="withdraw-Transaction-pdf">
                    Name : {pdfData?.consultantFullName}
                  </span>
                </div>

                <div>
                  <span className="withdraw-Transaction-pdf">
                    ID : {pdfData?.consultantViewId}
                  </span>
                </div>
                <div>
                  <span className="withdraw-Transaction-pdf">
                    Payment Type : {pdfData?.paymentType}
                  </span>
                </div>
                <div>
                  <span className="withdraw-Transaction-pdf">
                    Payment Status : {pdfData?.paymentStatus}
                  </span>
                </div>
                <div>
                  <span className="withdraw-Transaction-pdf">
                    Reference No :{pdfData?.transactionCode}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "100px",
            width: "90%",
            marginLeft: "100px",
          }}
        >
          <table style={{ width: "100%" }}>
            <thead className="tablehead">
              <tr>
                <th style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">Quantity</span>
                </th>
                <th style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">Description</span>
                </th>
                <th style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">Amount</span>
                </th>
              </tr>
            </thead>

            <tbody style={{ textAlign: "center" }}>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">1</span>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">
                    Recruitment & Enrollment Support
                  </span>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">
                    £ {pdfData?.amount}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  <span></span>
                </td>
                <td style={{ borderBottom: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">Net Amount</span>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">
                    £ {pdfData?.amount}
                  </span>
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  <span></span>
                </td>
                <td style={{ borderBottom: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">Deductions</span>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">£ 0</span>
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid black" }}>
                  <span></span>
                </td>
                <td style={{ borderBottom: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">Total Amount</span>
                </td>
                <td style={{ border: "1px solid black" }}>
                  <span className="withdraw-Transaction-pdf">
                    £ {pdfData?.amount}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "100px", marginLeft: "100px" }}>
          <div>
            <span className="withdraw-Transaction-pdf text-blue">
              Bank Details
            </span>
          </div>
          <div>
            <span className="withdraw-Transaction-pdf">
              Account Name :{bankDetails?.accountName}
            </span>
          </div>
          <div>
            <span className="withdraw-Transaction-pdf">
              Account Number : {bankDetails?.accountNumber}
            </span>
          </div>
          <div>
            <span className="withdraw-Transaction-pdf">
              Short code : {bankDetails?.sortCode}
            </span>
          </div>
          <div>
            <span className="withdraw-Transaction-pdf">
              Bank Name : {bankDetails?.bankName}
            </span>
          </div>
        </div>

        <div style={{ marginTop: "100px", marginLeft: "100px" }}>
          <span
            className="withdraw-Transaction-pdf"
            style={{ fontSize: "19px" }}
          >
            I will be solely responsible for all my tax returns and payments
            required by HMRC / Tax office.
          </span>
        </div>
      </div>
    </>
  );
};

export default WithdrawPdf;
