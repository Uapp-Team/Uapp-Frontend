import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import { Card, CardBody, CardHeader } from "reactstrap";
import { useDispatch } from "react-redux";
import { StoreRoleData } from "../../../../redux/actions/SMS/RoleAction/RoleAction";
import { useHistory } from "react-router";
import get from "../../../../helpers/get";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const Roles = (props) => {
  const roles = props.roleList[0];
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    get(`UserRole/List`).then((action) => {
      dispatch(StoreRoleData(action));
    });
  }, [success]);

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  return (
    <div>
    
      <BreadCrumb
        title="User Roles"
        backTo=""
        path=""
      />
      <Card>
        <CardHeader className="d-flex justify-content-end">
          <div>
            {" "}
            <b>
              {" "}
              Total <span className="badge badge-primary">
                {roles?.length}
              </span>{" "}
              Roles Found{" "}
            </b>
          </div>
        </CardHeader>
        <CardBody>
          <div>
            <div></div>
          </div>
          <div className="table-responsive">
            <Table className="table-bordered text-center">
              <thead className="tablehead">
                <tr>
                  <th>SL/NO</th>
                  <th>Role Name</th>
                  <th className="text-center">Permissions</th>
                </tr>
              </thead>
              <tbody>
                {props.roleList[0]?.map((role, i) => (
                  <tr key={role.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{role.name}</td>
                    <td className="text-center">
                      <span className="badge badge-pill badge-primary">
                        {" "}
                        {role.countPermissions}{" "}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  roleList: state.roleDataReducer.roles,
});

export default connect(mapStateToProps)(Roles);
