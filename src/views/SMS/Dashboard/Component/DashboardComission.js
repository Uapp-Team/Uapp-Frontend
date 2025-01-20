import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { Table } from "reactstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Select from "react-select";

const DashboardComission = ({ id }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [details, setDetails] = useState(null);
  const [branch, setBranch] = useState([]);
  const [branchLabel, setBranchLabel] = useState("Select Branch");
  const [branchValue, setBranchValue] = useState(0);

  useEffect(() => {
    get(`BranchDD/Index`).then((res) => {
      setBranch(res);
    });
  }, []);

  const branchOptions = branch?.map((br) => ({
    label: br?.name,
    value: br?.id,
  }));

  const selectBranch = (label, value) => {
    setBranchLabel(label);
    setBranchValue(value);
    // handleSearch();
  };

  useEffect(() => {
    get(`AdminDashboard/DesignationReport/${id}/${branchValue}`).then((res) => {
      console.log(res);
      setDetails(res);
    });
  }, [id, branchValue]);

  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-flex flex-wrap justify-content-between">
          <h5>Consultant performance </h5>
          <div className="zindex-100 w-160px">
            {" "}
            <Select
              options={branchOptions}
              value={{ label: branchLabel, value: branchValue }}
              onChange={(opt) => selectBranch(opt.label, opt.value)}
              name="branchId"
              id="branchId"
            />
          </div>
        </div>
        <hr />
        {details?.length > 0 ? (
          <div className="table-responsive fixedhead mb-3 overflowY-300px">
            <Table className="table-bordered">
              <thead className="tablehead">
                <tr>
                  <th>Consultant</th>
                  <th>Branch</th>
                  <th>Target</th>
                  <th>Remaining</th>
                  <th>Bonus</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {details?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td>
                      <Link
                        className="text-id hover"
                        to={`/consultantProfile/${item?.consultantId}`}
                      >
                        {item?.consultantName}
                      </Link>
                      <br />({item?.designation}) <br />
                      <b> {item?.type}</b>
                    </td>
                    <td>{item?.branchName}</td>

                    <td>
                      <li className="designation-commission-list">
                        <span>Student </span>
                        <b>{item?.studentTarget}</b>
                      </li>
                      <li className="designation-commission-list">
                        <span>Consultant </span>
                        <b>{item?.consultantTarget}</b>
                      </li>
                      <li className="designation-commission-list">
                        <span>Team </span>
                        <b>{item?.teamTarget}</b>
                      </li>
                    </td>
                    <td>
                      <li className="designation-commission-list">
                        <span>Student </span>
                        <b>{item?.studentRemaining}</b>
                      </li>
                      <li className="designation-commission-list">
                        <span>Consultant </span>
                        <b>{item?.consultantRemaining}</b>
                      </li>
                      <li className="designation-commission-list">
                        <span>Team </span>
                        <b>{item?.teamRemaining}</b>
                      </li>
                    </td>
                    <td>
                      <li className="designation-commission-list">
                        <span>Team </span>
                        <b>{item?.teamBonus}</b>
                      </li>
                      <li className="designation-commission-list">
                        <span>Personal </span>
                        <b>{item?.personalBonus}</b>
                      </li>
                    </td>

                    <td>
                      {item?.isPromotable === true ? (
                        <>
                          {permissions?.includes(
                            permissionList.Change_Consultant_designation
                          ) && (
                            <a
                              className="text-id hover"
                              href={`/consultantProfile/${item?.consultantId}/promote`}
                            >
                              Promote
                            </a>
                          )}
                        </>
                      ) : (
                        <span>Not Eligible</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <>
            <p className="text-center">No data found </p>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardComission;
