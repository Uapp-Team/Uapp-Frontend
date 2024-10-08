import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";

import put from "../../../helpers/put";
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
  NavItem,
  NavLink,
  ButtonGroup,
} from "reactstrap";
import Select from "react-select";
import { rootUrl } from "../../../constants/constants";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { useToasts } from "react-toast-notifications";
import remove from "../../../helpers/remove";
import ButtonForFunction from "../Components/ButtonForFunction";
import { userTypes } from "../../../constants/userTypeConstant";
import CustomButtonRipple from "../Components/CustomButtonRipple";

const PromotionalCommission = ({ promotionalList }) => {
  return (
    <>
      <div className="mt-5 mx-1">
        <p className="section-title">Promotional Commission List</p>

        <div className=" mt-3">
          <Table>
            <thead className="tablehead">
              <tr style={{ textAlign: "center" }}>
                <th>SL/No</th>
                <th>University Name</th>
                <th>Intake</th>
                <th>Minimum Student Requirement</th>
                <th>Commission Amount</th>
              </tr>
            </thead>
            <tbody>
              {promotionalList?.map((data, i) => (
                <tr key={data?.id} style={{ textAlign: "center" }}>
                  <th scope="row">{1 + i}</th>
                  <td>{data?.university?.name}</td>

                  <td>{data?.accountIntake?.intakeName}</td>

                  <td>{data?.minumumStudentRequirement}</td>

                  <td>{data?.commissionAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default PromotionalCommission;
