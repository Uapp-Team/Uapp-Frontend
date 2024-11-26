import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";

import { Card, CardBody, Form, FormGroup, Row, Col, Input } from "reactstrap";
import icon_info from "../../../assets/img/icons/icon_info.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import get from "../../../helpers/get";
import post from "../../../helpers/post";
import { userTypes } from "../../../constants/userTypeConstant";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import CancelButton from "../../../components/buttons/CancelButton";
import SaveButton from "../../../components/buttons/SaveButton";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import Uget from "../../../helpers/Uget";
import Filter from "../../../components/Dropdown/Filter";

const AddMenuForm = ({}) => {
  const [typeList, setTypeList] = useState([
    {
      id: "item",
      name: "Item",
    },
    {
      id: "collapse",
      name: "Collapse",
    },
  ]);

  const [typeLabel, setTypeLabel] = useState("Select Type");
  const [typeValue, setTypeValue] = useState(0);
  const [parentList, setParentList] = useState([]);
  const [parentLabel, setParentLabel] = useState("Select Parent");
  const [parentValue, setParentValue] = useState(0);

  // const [consultantError, setConsultantError] = useState(false);
  const [icon, setIcon] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");

  // const [parentError, setParentError] = useState(false);

  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const history = useHistory();
  const [titleError, setTitleError] = useState("");
  const [title, setTitle] = useState("");
  const [navLink, setNavLink] = useState("");
  const [navLinkError, setNavLinkError] = useState("");

  useEffect(() => {
    get("MenuItem/GetMenuItems").then((res) => {
      setParentList(res);
    });
  }, []);

  const parentName = parentList?.map((cons) => ({
    label: cons?.title,
    value: cons?.id,
  }));
  const selectParent = (label, value) => {
    // setConsultantError(false);
    setParentLabel(label);
    setParentValue(value);
  };

  const typeName = typeList?.map((cons) => ({
    label: cons?.name,
    value: cons?.id,
  }));

  const selectType = (label, value) => {
    setTypeLabel(label);
    setTypeValue(value);
  };

  const handleTitleChange = (e) => {
    let data = e.target.value.trimStart();
    setTitle(data);
    if (data === "") {
      setTitleError("First Name is required");
    } else {
      setTitleError("");
    }
  };

  const handleNavLinkChange = (e) => {
    let data = e.target.value.trimStart();
    setNavLink(data);
    if (data === "") {
      setNavLinkError("Last Name is required");
    } else {
      setNavLinkError("");
    }
  };

  const ValidateForm = () => {
    var isValid = true;

    if (!title) {
      isValid = false;
      setTitleError("First Name is required");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    for (var value of subdata) {
      console.log(value);
    }

    if (ValidateForm()) {
      setButtonStatus(true);
      setProgress(true);
      setTitleError("");

      post("MenuItem/Create", subdata).then((res) => {
        setProgress(false);
        setButtonStatus(false);
        if (res.status === 200 && res.data.isSuccess === true) {
          history.push(`/menu-list`);
          setNavLink("");
          setIcon("");
        } else {
          return;
        }
      });
    }
  };

  const ToMenuList = () => {
    history.push("/menu-list");
  };

  return (
    <div>
      <BreadCrumb title="Add Menu" backTo={"Menu List"} path={"/menu-list"} />

      <Card>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <p className="section-title"> Menu Details </p>

            <div className="mt-1 mb-4 d-flex justify-between cardborder">
              <img style={{ height: "100%" }} src={icon_info} alt="" />{" "}
              <div className="pl-3">
                <span>Menu Information Below To Create A Menu.</span>
              </div>
            </div>
            <Row>
              <Col lg="6" md="6">
                <FormGroup>
                  <span>
                    <span className="text-danger">*</span>Title
                  </span>

                  <Input
                    className="form-mt"
                    onChange={(e) => {
                      handleTitleChange(e);
                    }}
                    type="text"
                    name="title"
                    id="title"
                    value={title}
                    placeholder="Enter Title"
                  />
                  <span className="text-danger">{titleError}</span>
                </FormGroup>

                <FormGroup>
                  <span>NavLink</span>

                  <Input
                    className="form-mt"
                    onChange={(e) => {
                      handleNavLinkChange(e);
                    }}
                    type="text"
                    name="navLink"
                    id="navLink"
                    value={navLink}
                    placeholder="Enter NavLink"
                  />
                  <span className="text-danger">{navLinkError}</span>
                </FormGroup>

                <FormGroup>
                  <span>Type</span>
                  <Select
                    options={typeName}
                    value={{
                      label: typeLabel,
                      value: typeValue,
                    }}
                    onChange={(opt) => selectType(opt.label, opt.value)}
                    name="type"
                    id="Type"
                  />
                </FormGroup>

                {typeValue === "collapse" ? (
                  <FormGroup>
                    <span>
                      <span className="text-danger">*</span> Parent Name
                    </span>

                    <Select
                      options={parentName}
                      value={{
                        label: parentLabel,
                        value: parentValue,
                      }}
                      onChange={(opt) => selectParent(opt.label, opt.value)}
                      name="parentId"
                      id="parentId"
                    />
                  </FormGroup>
                ) : null}

                <FormGroup>
                  <span>Icon</span>

                  <Input
                    className="form-mt"
                    type="text"
                    name="icon"
                    id="icon"
                    placeholder="Enter Icon"
                    onChange={(e) => setIcon(e.target.value)}
                    defaultValue={icon}
                  />
                </FormGroup>

                <FormGroup>
                  <span>Display Order</span>

                  <Input
                    className="form-mt"
                    type="number"
                    name="displayOrder"
                    id="displayOrder"
                    onChange={(e) => setIcon(e.target.value)}
                    defaultValue={displayOrder}
                    placeholder="Enter Display Order"
                  />
                </FormGroup>

                <FormGroup className="text-right">
                  <CancelButton cancel={ToMenuList} />

                  {/* {permissions?.includes(permissionList?.Add_Consultant) && ( */}
                  <SaveButton
                    text="Create Menu"
                    progress={progress}
                    buttonStatus={buttonStatus}
                  />
                  {/* )} */}
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddMenuForm;
