import React from "react";
import { Button } from "reactstrap";

const ShowCommissionSettingData = ({
  handleUpdateButton,
  data,
  firstData,
  createMarkup,
  reqDetails,
}) => {
  return (
    <div>
      <div>
        <div className="hedding-titel d-flex justify-content-between mb-4">
          <div>
            <h5>
              {" "}
              <b>Commission setting and policy</b>{" "}
            </h5>

            <div className="bg-h"></div>
          </div>
        </div>

        <div className="my-5">
          <div className="mb-5 d-flex">
            <h5 className="mr-3">
              Do you want to change the commission setting and policy?
            </h5>
            <Button
              type="button"
              color="primary"
              className="btn btn-sm btn-primary"
              onClick={() => handleUpdateButton(data?.id)}
            >
              Edit
            </Button>
          </div>
          <h4 className="text-secondary my-5">Commission settings:</h4>
          <div className="row">
            <div className="col-5">
              <p>Maximum commission amount to calculate lower commission:</p>
            </div>
            <div className="col-5">
              <p>
                <b>{firstData?.lowerCommissionLimit}</b>
              </p>
            </div>
            <div className="col-5">
              Default consultant lower commission percentage:
            </div>
            <div className="col-5">
              <p>
                <b>{firstData?.defaultCommissionPercentage}</b>
              </p>
            </div>
          </div>
        </div>
        <div className="my-5">
          <h4 className="text-secondary">Uapp commission policy:</h4>
          <div className="mx-5">
            <span
              style={{ marginTop: -5, marginLeft: 5 }}
              dangerouslySetInnerHTML={createMarkup(reqDetails)}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCommissionSettingData;
