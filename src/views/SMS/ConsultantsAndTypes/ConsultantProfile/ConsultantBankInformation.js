import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row, Table } from "reactstrap";
import get from "../../../../helpers/get";
import { dateFormate } from "../../../../components/date/calenderFormate";

const ConsultantBankInformation = ({ id }) => {
  const [consultantBankInformation, setConsultantBankInformation] = useState(
    {}
  );

  useEffect(() => {
    get(`BankDetails/Index/${id}`).then((res) => {
      setConsultantBankInformation(res);
      console.log(res, "bank information");
    });
  }, [id, setConsultantBankInformation]);
  return (
    <div>
      <Table>
        <thead className="tablehead">
          <td className="border-0">
            <b>Bank Information</b>
          </td>
        </thead>
      </Table>
      {consultantBankInformation &&
        consultantBankInformation?.length > 0 &&
        consultantBankInformation?.map((bankInfo, i) => (
          <div
            className="col-12 border p-2 rounded mb-3"
            key={bankInfo.id}
            style={{ textAlign: "left" }}
          >
            <Card>
              <CardBody>
                <span className="card-heading">{bankInfo?.bankName}</span>

                <hr />
                <Row className="text-gray">
                  <Col md="4">
                    <p>
                      <span>Account Holder name</span>
                      <br />
                      <b>{bankInfo?.accountName}</b>
                    </p>
                    <p>
                      <span>Account number</span>
                      <br />
                      <b>{bankInfo?.accountNumber}</b>
                    </p>
                  </Col>
                  <Col md="4">
                    <p>
                      <span>Sort code</span>
                      <br />
                      <b>{bankInfo?.sortCode}</b>
                    </p>
                    <p>
                      <span>Bank Address</span>
                      <br />
                      <b> {bankInfo?.bankAddress}</b>
                    </p>
                  </Col>
                  <Col md="4">
                    <p>
                      <span>BIC</span>
                      <br />
                      <b>{bankInfo?.bic}</b>
                    </p>
                    <p>
                      <span>Swift</span>
                      <br />
                      <b>{bankInfo?.swift}</b>
                    </p>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        ))}
      {consultantBankInformation.length === 0 && (
        <p className="pl-10px">Bank Information Is Not Added.</p>
      )}
    </div>
  );
};

export default ConsultantBankInformation;
