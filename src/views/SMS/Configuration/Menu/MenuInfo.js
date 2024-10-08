import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  ButtonGroup,
  Col,
  Row,
  Table,
} from "reactstrap";
import { useHistory, useLocation } from "react-router";
import { useToasts } from "react-toast-notifications";
import get from "../../../../helpers/get.js";
import remove from "../../../../helpers/remove.js";
import LinkButton from "../../Components/LinkButton.js";
import ButtonForFunction from "../../Components/ButtonForFunction.js";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb.js";

const EmployeeList = (props) => {
  const history = useHistory();
  const [employeeName, setEmployeeName] = useState("Select Employee Type...");
  const [serialNum, setSerialNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const employeeTypeList = props.employeeTypeList[0];
  const location = useLocation();
  const { addToast } = useToasts();
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    if (location.id != undefined) {
      localStorage.setItem("locationId", location.id);
      setEmployeeName(location.name);
    }
  }, []);

  useEffect(() => {
    get(`MenuItem/Index`).then((res) => {
      setMenuList(res);
    });
  }, []);

  const handleDeleteMenu = (menuId) => {
    remove(`MenuItem/Delete/${menuId}`).then((res) => {
      addToast(res, {
        appearance:
          res == "Employee has been created successfully!"
            ? "success"
            : "error",
      });
      const newMenuList = menuList.filter((em) => em.id != menuId);
      setMenuList(newMenuList);
    });
  };

  // add staff handler
  const handleAddStaff = () => {
    history.push("/addMenu");
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  return (
    <div>
      <BreadCrumb title="Menu" backTo="" path="" />

      <Card>
        <CardBody>
          <Row className="mb-3">
            <Col lg="6" md="5" sm="6" xs="4">
              <ButtonForFunction
                func={handleAddStaff}
                className={"btn btn-uapp-add "}
                icon={<i className="fas fa-plus"></i>}
                name={" Add Menu"}
                permission={6}
              />
            </Col>
          </Row>

          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <div className="table-responsive">
              <Table className="table-sm table-bordered">
                <thead className="thead-uapp-bg">
                  <tr style={{ textAlign: "center" }}>
                    <th>SL/NO</th>
                    <th>Title</th>
                    <th>Icon</th>
                    <th>Type</th>
                    <th>Display Order</th>

                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menuList?.map((men, i) => (
                    <tr key={men.id} style={{ textAlign: "center" }}>
                      <th scope="row">{serialNum + i}</th>
                      <td>{men.title}</td>
                      <td>{men.icon}</td>
                      <td>{men.type}</td>
                      <td>{men.displayOrder}</td>

                      <td className="text-center">
                        <ButtonGroup variant="text">
                          <ButtonForFunction
                            color={"danger"}
                            func={() => handleDeleteMenu(men.id)}
                            className={"mr-2 btn-sm"}
                            icon={<i className="fas fa-trash-alt"></i>}
                            permission={6}
                          />

                          <LinkButton
                            url={"/employeeGeneralInfo/"}
                            color={"warning"}
                            className={" btn-sm"}
                            icon={<i className="fas fa-edit"></i>}
                          ></LinkButton>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  employeeTypeList: state.employeeTypeDataReducer.employeeType,
});
export default connect(mapStateToProps)(EmployeeList);
