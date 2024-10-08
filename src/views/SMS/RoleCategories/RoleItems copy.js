import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Table,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Select from "react-select";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import get from "../../../helpers/get";
import ButtonForFunction from "../Components/ButtonForFunction";
import ButtonLoader from "../Components/ButtonLoader";
import remove from "../../../helpers/remove";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import ConfirmModal from "../../../components/modal/ConfirmModal";

const RoleItems = () => {
  const history = useHistory();
  const [role, setRole] = useState([]);
  const [roleLabel, setRoleLabel] = useState("Select Parent Role");
  const [roleValue, setRoleValue] = useState("");
  const { addToast } = useToasts();
  const [name, setName] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [delData, setDelData] = useState({});
  const [progress, setProgress] = useState(false);
  const [buttonStatus1, setButtonStatus1] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    get(`Role/Index`).then((res) => {
      console.log(res);
      setRole(res);
    });
  }, [success]);

  const backToDashboard = () => {
    history.push("/");
  };

  // on Close Delete Modal
  const closeDeleteModal = () => {
    setDelData({});
    setDeleteModal(false);
  };

  const toggleDanger = (data) => {
    setDeleteModal(true);
    setDelData(data);
  };

  const handleDelete = () => {
    setButtonStatus1(true);
    setProgress(true);
    remove(`Role/Delete?id=${delData?.id}`).then((res) => {
      setButtonStatus1(false);
      setProgress(false);
      setDeleteModal(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setSuccess(!success);
    });
  };

  const redirectToEditDepartment = (data) => {
    history.push(`/editRole/${data?.id}`);
  };

  return (
    <div className="">
      <BreadCrumb title=" Role Items" backTo="" path="" />

      <Card>
        <CardBody>
          <div className="mb-3">
            <Button
              color="primary"
              onClick={() => {
                history.push(`/addRole`);
              }}
            >
              <i className="fas fa-plus"></i> Add New
            </Button>
          </div>

          <Table className="table-sm table-bordered">
            <thead className="thead-uapp-bg">
              <tr style={{ textAlign: "center" }}>
                <th>Serial</th>
                <th>Name</th>
                <th>Parent</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {role.map((dept, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <th scope="row">{index + 1}</th>
                  <td>{dept?.name}</td>
                  <td>{dept?.parentName}</td>
                  <td>
                    <ButtonGroup variant="text">
                      {dept?.isFixed ? null : (
                        <>
                          <ButtonForFunction
                            func={() => redirectToEditDepartment(dept)}
                            className={"btn-sm"}
                            color={"warning"}
                            icon={<i className="fas fa-edit"></i>}
                          />

                          <ButtonForFunction
                            func={() => toggleDanger(dept)}
                            className={"btn-sm mx-2"}
                            color={"danger"}
                            icon={<i className="fas fa-trash-alt"></i>}
                          />
                        </>
                      )}
                    </ButtonGroup>

                    <ConfirmModal
                      text="Do You Want To Delete This Document?"
                      isOpen={deleteModal}
                      toggle={closeDeleteModal}
                      confirm={handleDelete}
                      cancel={closeDeleteModal}
                    />

                    {/* modal for delete */}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default RoleItems;
