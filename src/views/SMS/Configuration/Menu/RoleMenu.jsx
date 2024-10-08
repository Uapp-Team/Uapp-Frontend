import React, { createRef, useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { useToasts } from "react-toast-notifications";
import {
  Button,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Col,
  Row,
  Card,
  CardBody,
} from "reactstrap";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import { useEffect } from "react";
import ButtonLoader from "../../Components/ButtonLoader";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const RoleMenu = (props) => {
  const myForm = createRef();

  const [modalOpen, setModalOpen] = useState(false);
  const [rolelabel, setRoleLabel] = useState("Select Role...");
  const [roleValue, setRoleValue] = useState("");
  const [menus, setMenus] = useState([]);
  let [checked, setChecked] = useState([]);
  const { addToast } = useToasts();
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const [roles, setRoles] = useState([]);
  const [progress, setProgress] = useState(false);

  // submitting form
  const handleSubmit = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  useEffect(() => {
    get(`UserRole/List`).then((res) => {
      setRoles(res);
    });
  }, []);

  // on Select Role
  const selectRole = (label, value) => {
    setMenus([]);
    checked = [];
    setRoleLabel(label);
    setRoleValue(value);

    get(`RoleMenuItem/GetCheckBoxes/${value}`).then((action) => {
      setMenus(action);

      let defaultChecked = checked;
      if (action.length > 0) {
        for (let i = 0; i < action.length; i++) {
          const menu = action[i];
          if (menu.isChecked === true) {
            const id = menu.id.toString();
            defaultChecked.push(id);
            setChecked([...defaultChecked]);
          }
          menu.childMenus.map((child) => {
            if (child.isChecked === true) {
              const childid = child.id.toString();
              defaultChecked.push(childid);
              setChecked([...defaultChecked]);
            }
          });
        }
      }
    });
  };

  // handling checkbox
  const handleCheck = (e) => {
    let id = e.target.id;
    let val = e.target.checked;

    if (val === true) {
      let checkedData = [...checked];
      if (!checked?.includes(id)) {
        checkedData.push(id);
      }

      setChecked(checkedData);
    } else {
      let checkedData = [...checked];
      const newD = id;
      const child = checkedData.filter((c) => c != newD);
      checkedData = [...child];

      setChecked(checkedData);
    }
  };


  // on Select All Checkbox
  const handleSelectAll = (e) => {
    let newChecked = [];
    const val = e.target.checked;

    if (val === true) {
      menus.map((menu) => {
        const menuId = menu.id.toString();
        newChecked.push(menuId);
        document.getElementById(menu?.id).checked = true;

        menu.childMenus.map((child) => {
          const childmenu = child.id.toString();
          newChecked.push(childmenu);
          document.getElementById(child?.id).checked = true;
        });
      });
      setChecked([...newChecked]);
    }

    if (val === false) {
      menus.map((menu) => {
        document.getElementById(menu.id).checked = false;
      });
      setChecked([]);
    }
  };

  const handleConfirm = () => {
    setProgress(true);

    setMenus([]);
    const subData = new FormData();
    subData.append("RoleId", roleValue);
    subData.append("CheckedArr", checked);
    // posting form Data
    post(`RoleMenuItem/Assign`, subData).then((action) => {
      setProgress(false);
      setChecked([]);
      addToast(action?.data?.message, {
        appearance: "success",
        autoDismiss: true,
      });
      setModalOpen(false);
    });
  };

  const roleName = roles?.map((role) => ({ label: role.name, value: role.id }));
  return (
    <div>
      <BreadCrumb title="Assign Menu" backTo="" path="/" />

      <Card>
        <CardBody>
          <div className="test-score-div-1-style mt-1 mb-4">
            <span className="test-score-span-1-style">
              <b>Assign or Revoke Menu for User Types.</b>
            </span>

            <br />
            <div>
              Select a user role to see the assigned menu items for that user.
              Checkboxes can contain cascading menus. If the parent is not
              selected, the submenu will not be shown in the menu bar. Please
              discuss this with the developers before assigning the menu to the
              user. Or contact the administrator.
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

            <FormGroup style={{ marginBottom: "-6px" }}>
              <Row>
                <Col sm="12" className="mb-4">
                  {menus.length > 0 && (
                    <div className="form-check mb-4">
                      <input
                        className="form-check-input"
                        onChange={(e) => handleSelectAll(e)}
                        type="checkbox"
                        name=""
                        checked={
                          menus.every((value) =>
                            checked.includes(value.id.toString())
                          ) === true
                            ? true
                            : false
                        }
                        // checked={
                        //   checked?.length === subjectIds?.length ? true : false
                        // }
                      />
                      <label className="form-check-label" htmlFor="">
                        Select All
                      </label>
                    </div>
                  )}
                </Col>
                {roleValue &&
                  menus?.map((menu, i) => (
                    <Col sm="12" key={menu.id} className="mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          onChange={(e) => handleCheck(e)}
                          name=""
                          id={menu.id}
                          checked={
                            checked.includes(`${menu?.id}`) ? true : false
                          }
                          // checked={
                          //   menu.childMenus.every((value) =>
                          //     checked.includes(value.id.toString())
                          //   ) === true
                          //     ? true
                          //     : false
                          // }
                        />
                        <label className="form-check-label" htmlFor="">
                          <strong>{menu.menuItem}</strong>
                        </label>
                      </div>
                      <div className="ml-4">
                        {menu.childMenus?.map((child) => (
                          <div className="form-check" key={child.id}>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              onChange={(e) => handleCheck(e)}
                              name=""
                              id={child.id}
                              checked={
                                checked.includes(`${child?.id}`) ? true : false
                              }
                            />
                            <label className="form-check-label" htmlFor="">
                              {child.menuItem}
                            </label>
                          </div>
                        ))}
                      </div>
                    </Col>
                  ))}
              </Row>
            </FormGroup>

            <FormGroup
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Row>
                <Col>
                  {menus.length > 0 &&
                  permissions?.includes(permissionList?.Role_Menu_Configuration) ? (
                    <Button.Ripple
                      type="submit"
                      className="mr-1 mt-3 badge-primary"
                    >
                      Submit
                    </Button.Ripple>
                  ) : null}
                </Col>
              </Row>
            </FormGroup>
          </Form>
          <Modal
            isOpen={modalOpen}
            toggle={() => setModalOpen(!modalOpen)}
            className="uapp-modal"
          >
            <ModalBody>
              <p>Are You Sure to Assign Selected Menus?</p>
              <Row className="mt-3">
                <Col md="6" className="text-left">
                  <Button color="primary" onClick={handleConfirm}>
                    {progress ? <ButtonLoader /> : "Yes"}
                  </Button>
                </Col>
                <Col md="6" className="text-right">
                  <Button color="danger" onClick={() => setModalOpen(false)}>
                    Cancel
                  </Button>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        </CardBody>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({
  roleList: state.roleDataReducer.roles,
});
export default connect(mapStateToProps)(RoleMenu);
