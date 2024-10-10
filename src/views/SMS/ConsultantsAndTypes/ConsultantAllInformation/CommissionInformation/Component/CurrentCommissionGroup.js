import React from "react";
import { Table } from "reactstrap";
import SaveButton from "../../../../../../components/buttons/SaveButton";

const CurrentCommissionGroup = ({
  priceRangeList,
  permissions,
  permissionList,
  setShowForm,
  showForm,
}) => {
  return (
    <div className="mt-4 mx-1">
      {/* className="col-md-12 col-sm-12 " */}
      <div>
        <p className="section-title">
          Current Commission Group : {priceRangeList[0]?.commissionGroup?.name}
        </p>

        {permissions?.includes(permissionList.Assign_Commission_Group) ? (
          <div className="mt-1 mb-4 d-flex justify-content-between cardborder">
            <div className="mt-1">
              Do you want to change this commission structure?
              <span> </span>
            </div>
            <div>
              <div>
                <SaveButton
                  text="Assign New"
                  action={() => setShowForm(!showForm)}
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className=" mt-2">
          <Table>
            <thead className="tablehead">
              <tr>
                {/* <th>SL/No</th> */}
                <th>Price Range</th>
                <th>Range From</th>
                <th>Range To</th>
                <th>Standard Commission Rate </th>
              </tr>
            </thead>
            <tbody>
              {priceRangeList?.map((range, i) => (
                <tr key={range.id}>
                  {/* <th scope="row">{1 + i}</th> */}
                  <td>{range?.priceRangeName}</td>
                  <td>{range?.rangeFrom}</td>
                  <td>{range?.rangeTo}</td>
                  <td>{range?.commissionAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default CurrentCommissionGroup;
