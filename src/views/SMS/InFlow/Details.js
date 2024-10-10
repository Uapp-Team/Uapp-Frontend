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
        <div className="col-md-7">
          <Card className="p-4">
            <div
              className="d-flex justify-content-between p-2"
              style={{ backgroundColor: "#DFEEEE" }}
            >
              <span className="app-style-const p-2">
                Details Of : {info?.consultant}
              </span>
              <div>
                {permissions?.includes(
                  permissionList.Add_Inflow_Transaction
                ) ? (
                  <Button color="primary" onClick={editInfo}>
                    Edit
                  </Button>
                ) : null}
              </div>
            </div>
            <Table borderless responsive className="mb-4">
              <tbody>
                <tr
                  style={{
                    borderBottom: "1px solid #2525251F",
                  }}
                >
                  <td width="40%">Transaction Code:</td>

                  <td width="60%">{info?.transactionCode}</td>
                </tr>

                <tr
                  style={{
                    borderBottom: "1px solid #2525251F",
                  }}
                >
                  <td width="40%">Transaction Date:</td>

                  <td width="60%">{info?.transactionDate}</td>
                </tr>
                <tr
                  style={{
                    borderBottom: "1px solid #2525251F",
                  }}
                >
                  <td width="40%">Transaction Type:</td>

                  <td width="60%">{info?.transactionType}</td>
                </tr>
                <tr
                  style={{
                    borderBottom: "1px solid #2525251F",
                  }}
                >
                  <td width="40%">Transaction Note:</td>

                  <td width="60%">{info?.transactionNote}</td>
                </tr>
                <tr
                  style={{
                    borderBottom: "1px solid #2525251F",
                  }}
                >
                  <td width="40%">Amount:</td>

                  <td width="60%">{info?.amount}</td>
                </tr>
                <tr
                  style={{
                    borderBottom: "1px solid #2525251F",
                  }}
                >
                  <td width="40%">Reference:</td>

                  <td width="60%">{info?.reference}</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Details;
