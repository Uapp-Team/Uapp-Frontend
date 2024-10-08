import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardHeader, CardBody, Input, Button } from "reactstrap";
import Select from "react-select";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import put from "../../../helpers/put";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const EditRole = () => {
  const history = useHistory();
  const [role, setRole] = useState([]);
  const [roleLabel, setRoleLabel] = useState("Select Parent Role");
  const [roleValue, setRoleValue] = useState("");
  const { addToast } = useToasts();
  const [name, setName] = useState("");
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    get(`RoleDD/Index`).then((res) => {
      setRole(res);
    });

    get(`Role/Get/${id}`).then((res) => {
      setData(res);
      console.log(res);
      setRoleLabel(
        res?.parentName != null ? res?.parentName : "Select Parent Role"
      );
      setRoleValue(res?.parentId != null ? res?.parentId : "");
      setName(res?.name);
    });
  }, []);

  const backToDashboard = () => {
    history.push("/");
  };

  const roleOptions = role?.map((r) => ({
    label: r?.name,
    value: r?.id,
  }));

  const SelectRole = (label, value) => {
    console.log(value);
    setRoleLabel(label);
    setRoleValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);

    put(`Role/Update`, subData).then((res) => {
      if (res?.status == 200 && res?.data?.isSuccess == true) {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: "true",
        });
        setRoleLabel("Select Parent Role");
        setRoleValue("");
        setName("");
        history.push(`/roleItems`);
      } else {
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: "error",
        });
      }
    });
  };

  return (
    <div>
      <BreadCrumb title="Edit Role Item" backTo="" path="" />

      <Card>
        <CardBody>
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <input type="hidden" name="id" id="id" value={id} />

              <div className="hedding-titel d-flex justify-content-between">
                <div>
                  <h5>
                    {" "}
                    <b>Edit Role Item</b>{" "}
                  </h5>

                  <div className="bg-h"></div>
                </div>
              </div>

              <div className="row my-4">
                <div className="col-md-2">Parent Role</div>

                <div className="col-md-6">
                  <Select
                    options={roleOptions}
                    value={{ label: roleLabel, value: roleValue }}
                    onChange={(opt) => SelectRole(opt.label, opt.value)}
                    name="parentId"
                    id="parentId"
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-2">
                  Role Name <span className="text-danger">*</span>
                </div>

                <div className="col-md-6">
                  <Input
                    type="text"
                    required
                    name="name"
                    id="name"
                    placeholder="Enter Role Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <div className="d-flex justify-content-end">
                    <Button
                      color="danger"
                      className="mr-1"
                      onClick={() => {
                        history.push("/roleItems");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button color="primary" type="submit" className="mr-l">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EditRole;
