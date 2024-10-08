import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import get from "../../../helpers/get";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
  InputGroup,
  Table,
  TabContent,
  TabPane,
  Nav,
  NavLink,
  NavItem,
  UncontrolledTooltip,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { permissionList } from "../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const Details = () => {
  const { id } = useParams();
  const history = useHistory();
  const [info, setInfo] = useState({});
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`BonusTransaction/Details/${id}`).then((res) => {
      setInfo(res);
    });
  }, [id]);

  const editInfo = () => {
    history.push(`/inFlow/Update/${id}`);
  };

  return (
    <div>
      <BreadCrumb
        title="Inflow Transaction Details"
        backTo="Inflow Transaction"
        path={`/inFlowTransaction`}
      />

      <div className="row">
        <div className="col-md-8">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between">
                <div>
                  <p className="section-title">
                    Details Of: {info?.consultant}
                  </p>
                  <Table className="table-bordered mt-4">
                    <tbody>
                      <tr>
                        <td>
                          <b>Transaction Code:</b>
                        </td>

                        <td>{info?.transactionCode}</td>
                      </tr>

                      <tr>
                        <td>
                          <b>Transaction Date:</b>
                        </td>

                        <td>{info?.transactionDate}</td>
                      </tr>

                      <tr>
                        <td>
                          <b>Transaction Type:</b>
                        </td>

                        <td>{info?.transactionType}</td>
                      </tr>

                      <tr>
                        <td>
                          <b>Transaction Note:</b>
                        </td>

                        <td>{info?.transactionNote}</td>
                      </tr>

                      <tr>
                        <td>
                          <b>Reference:</b>
                        </td>

                        <td>{info?.reference}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div>
                  {permissions?.includes(
                    permissionList.Add_Inflow_Transaction
                  ) ? (
                    <Button color="warning" onClick={editInfo}>
                      Edit
                    </Button>
                  ) : null}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Details;
