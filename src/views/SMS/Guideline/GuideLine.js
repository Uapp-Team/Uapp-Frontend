import React from "react";
import { useHistory } from "react-router-dom";
import { Card, CardBody, CardHeader } from "reactstrap";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";

const GuideLine = () => {
  const history = useHistory();

  return (
    <div>
      <BreadCrumb title="Guidelines" backTo="" path="" />

      <Card>
        <CardBody>
          <div>
            <h5 className="text-center">
              Overview of Complete Website for User Assistance
            </h5>
          </div>

          <div>
            <h6>Configuration</h6>
            <ul>
              <li>Role Permissions</li>
              <li>Role Menu</li>
            </ul>
          </div>

          <div>
            <h6>Dashboard</h6>
          </div>

          <div>
            <h6>Staff</h6>
            <ul>
              <li>Staff Type</li>
              <li>Staff Listr</li>
            </ul>
          </div>

          <div>
            <h6>Admission Manager</h6>
          </div>

          <div>
            <h6>Admission Officer</h6>
          </div>

          <div>
            <h6>Consultant</h6>
            <ul>
              <li>Consultant List</li>
              <li>Consultant Type</li>
            </ul>
          </div>

          <div>
            <h6>Student</h6>
            <ul>
              <li>Student List</li>
              <li>Student Registration</li>
              <li>Student Type</li>
            </ul>
          </div>

          <div>
            <h6>University</h6>
            <ul>
              <li>University List</li>
              <li>Course List</li>
              <li>Department</li>
              <li>Sub Department</li>
              <li>Intakes</li>
              <li>Document Group</li>
            </ul>
          </div>

          <div>
            <h6>Search & Apply</h6>
          </div>

          <div>
            <h6>Applications</h6>
          </div>

          <div>
            <h6>Commission</h6>
            <ul>
              <li>Account Intakes</li>
              <li>Commission Group</li>
              <li>Distribution Settings</li>
            </ul>
          </div>

          <div>
            <h6>Application Transaction</h6>
          </div>

          <div>
            <h6>Account Transaction</h6>
          </div>

          <div>
            <h6>Withdraw Transaction</h6>
          </div>

          <div>
            <h6>Withdraw Request</h6>
          </div>

          <div>
            <h6>Providers</h6>
          </div>

          <div>
            <h6>Branch</h6>
          </div>

          <div>
            <h6>Common</h6>
            <ul>
              <li>Document List</li>
              <li>Document Category</li>
              <li>University Types</li>
              <li>Education Level List</li>
              <li>Degree List</li>
              <li>Education Level</li>
            </ul>
          </div>

          <div>
            <h6>Settings</h6>
            <ul>
              <li>University Countries</li>
              <li>University States</li>
              <li>Exam Test Types</li>
              <li>Countries</li>
              <li>States</li>
              <li>Nationalities</li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default GuideLine;
