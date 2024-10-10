import React, { createRef, useEffect, useState } from "react";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import { Button, Form, FormGroup, Col, Row, Card, CardBody } from "reactstrap";
import post from "../../../../helpers/post";
import get from "../../../../helpers/get";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const UnderProcessRolePermission = () => {
  const myForm = createRef();
  const [permissionName, setPermissionName] = useState([]);
  const [rolelabel, setRoleLabel] = useState("Select Role...");
  const [roleValue, setRoleValue] = useState("");
  const [checked, setChecked] = useState([]);
  const { addToast } = useToasts();
  const [roles, setRoles] = useState([]);
  const [progress, setProgress] = useState(false);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`UserRole/List`).then((res) => {
      setRoles(res);
    });
  }, []);

  // submitting form
  const handleSubmit = (event) => {
    event.preventDefault();
    setProgress(true);
    const subData = new FormData();
    subData.append("RoleId", roleValue);
    subData.append("CheckedArr", checked);
    //  watch form data values
    // for (var value of subData.values()) {
    // }
    setPermissionName([]);

    // posting form Data
    post(`RolePermission/Assign`, subData).then((action) => {
      setProgress(false);
      setChecked([]);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
    });
  };

  const roleName = roles?.map((role) => ({ label: role.name, value: role.id }));

  // onChange role
  const selectRole = (label, value) => {
    setPermissionName([]);
    setChecked([]);
    setRoleLabel(label);
    setRoleValue(value);
    get(`RolePermission/GetCheckBoxes/${value}`).then((action) => {
      console.log(action);
      setPermissionName(action);
      let defaultChecked = [];
      if (action.length > 0) {
        for (let i = 0; i < action.length; i++) {
          const per = action[i]?.permissions;

          for (let j = 0; j < per?.length; j++) {
            if (per[j]?.isChecked === true) {
              const id = per[j]?.id.toString();
              defaultChecked.push(id);
              setChecked([...defaultChecked]);
            }
          }
        }
      }
    });
  };

  // onChange checkbox
  const handleCheck = (e) => {
    let id = e.target.id;
    let val = e.target.checked;

    if (val === true) {
      if (!checked?.includes(id)) {
        setChecked([...checked, id]);
      }
    } else {
      const newD = id;
      const res = checked.filter((c) => c !== newD);
      setChecked(res);
    }
  };

  return (
    <>
      <div>
        <BreadCrumb title="Assign Permissions" backTo="" path="/" />

        <Card>
          <CardBody>
            <div className="test-score-div-1-style mt-1 mb-4">
              <span className="test-score-span-1-style">
                <b>Assign or Revoke Permissions for User Types.</b>
              </span>
              <br />
              <div>
                Select a user role to see the permissions of that user group.
                Checkboxes that are marked, each user from the selected can
                perform the operation. Each checkbox represents a specific
                operation/function. Please check multiple times while assigning
                permission to a user group.
              </div>
            </div>
            <Form onSubmit={handleSubmit} ref={myForm}>
              <FormGroup row>
                <Col sm="6" md="4" lg="3">
                  <Select
                    options={roleName}
                    value={{ label: rolelabel, value: roleValue }}
                    onChange={(opt) => selectRole(opt.label, opt.value)}
                    name="type"
                    id="type"
                  />
                </Col>
              </FormGroup>

              {permissionName?.map((per, i) => (
                <div key={i}>
                  <div className="hedding-titel mb-4">
                    <h5>
                      {" "}
                      <b>{per?.groupName}</b>{" "}
                    </h5>
                    <div className="bg-h"></div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      {" "}
                      <b>Retrieve</b>{" "}
                      {per?.permissions?.map((p, i) => (
                        <>
                          {p?.permissionType === 2 ? (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                onChange={(e) => handleCheck(e)}
                                type="checkbox"
                                name=""
                                id={p.id}
                                checked={
                                  checked.includes(`${p.id}`) ? true : false
                                }
                              />
                              <label className="form-check-label" htmlFor="">
                                {p.permissionName}
                              </label>
                            </div>
                          ) : null}
                        </>
                      ))}
                    </div>

                    <div className="col-md-6">
                      {" "}
                      <b>Action</b>{" "}
                      {per?.permissions?.map((p, i) => (
                        <>
                          {p?.permissionType === 1 ? (
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                onChange={(e) => handleCheck(e)}
                                type="checkbox"
                                name=""
                                id={p.id}
                                checked={
                                  checked.includes(`${p.id}`) ? true : false
                                }
                              />
                              <label className="form-check-label" htmlFor="">
                                {p.permissionName}
                              </label>
                            </div>
                          ) : null}
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <FormGroup
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Row>
                  <Col>
                    {permissions?.includes(
                      permissionList?.Role_Permission_Configuration
                    ) && permissionName.length > 0 ? (
                      <Button type="submit" className="mr-1 mt-3 badge-primary">
                        {progress ? <ButtonLoader /> : "Submit"}
                      </Button>
                    ) : null}
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default UnderProcessRolePermission;
