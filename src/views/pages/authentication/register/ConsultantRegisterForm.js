import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import {
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import notify from "../../../../assets/img/notify.png";
import UploadButton from "../../../../components/buttons/UploadButton";
import { rootUrl } from "../../../../constants/constants";
import containsDigit from "../../../../helpers/nameContainDigit";
import { signupWithJWT } from "../../../../redux/actions/auth/registerActions";

const ConsultantRegisterForm = () => {
  const [parameter, setParameter] = useState("");
  const { invitationcode } = useParams();
  const [title, setTitle] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [names, setNames] = useState([]);
  const [consultants, setConsultants] = useState([]);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { addToast } = useToasts();
  const history = useHistory();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referCode, setReferCode] = useState("");
  const [linkedFacebook, setLinkedFacebook] = useState("");
  const [linkedFacebookError, setLinkedFacebookError] = useState("");
  const [checked, setChecked] = useState(null);
  const [cvFile, setCvFile] = useState([]);
  const [cvError, setCvError] = useState("");
  const [loansForEu, setLoansForEu] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewFileType, setPreviewFileType] = useState("");

  useEffect(() => {
    setParameter(invitationcode);
  }, [invitationcode]);

  useEffect(() => {
    fetch(`${rootUrl}NameTittleDD/index`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNames(data?.result);
      });

    fetch(`${rootUrl}ConsultantTypeDD/index`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConsultants(data?.result);
      });
  }, []);

  const handleFile = ({ fileList }) => {
    setCvFile(fileList);
    setCvError("");
  };

  const SetNameTitleFromDD = (e) => {
    setTitle(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value === "") {
      setLastNameError("Last name is required");
    } else if (containsDigit(e.target.value)) {
      setLastNameError("Last name cannot contain digits");
    } else {
      setLastNameError("");
    }
  };
  const handleLinkedFacebookChange = (e) => {
    setLinkedFacebook(e.target.value);
    if (e.target.value === "") {
      setLinkedFacebookError("LinkedIn or Facebook is required");
    } else {
      setLinkedFacebookError("");
    }
  };

  const handleradio = (e) => {
    setChecked("radio");
  };
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value === "") {
      setFirstNameError("First name is required");
    } else if (containsDigit(e.target.value)) {
      setFirstNameError("First name cannot contain digits");
    } else {
      setFirstNameError("");
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("Email is required");
    } else {
      setEmailError("");
    }
  };
  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);

    // Define validation conditions
    const errors = [];
    if (password === "") {
      errors.push("Password is required");
    } else {
      if (password.length < 8) {
        errors.push("At least 8 characters");
      }
      if (!/[A-Z]/.test(password)) {
        errors.push("One uppercase letter");
      }
      if (!/[a-z]/.test(password)) {
        errors.push("One lowercase letter");
      }
      if (!/\d/.test(password)) {
        errors.push("One number");
      }
      if (!/[@$!%*?&]/.test(password)) {
        errors.push("One special character");
      }
    }

    // Join errors into a single message or clear the error
    if (errors.length > 0) {
      setPasswordError(errors.join(" & "));
    } else {
      setPasswordError(""); // Clear the error if everything is valid
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible((prevState) => !prevState);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === "") {
      setConfirmPasswordError("Confirm your password");
    } else {
      setConfirmPasswordError("");
    }
    if (password && e.target.value !== password) {
      setConfirmPasswordError("Passwords doesn't match.");
    } else {
      setConfirmPasswordError("");
    }
  };

  function validateRegisterForm(subData) {
    var isFormValid = true;

    if (firstName === "") {
      isFormValid = false;
      setFirstNameError("First name is required");
    }

    if (containsDigit(firstName)) {
      isFormValid = false;
      setFirstNameError("First name cannot contain digits");
    }

    if (lastName === "") {
      isFormValid = false;
      setLastNameError("Last name is required");
    }

    if (containsDigit(lastName)) {
      isFormValid = false;
      setLastNameError("Last name cannot contain digits");
    }
    if (linkedFacebook === "") {
      isFormValid = false;
      setLinkedFacebookError("LinkedIn or Facebook is required");
    }
    if (email === "") {
      isFormValid = false;
      setEmailError("Email is required");
    }

    if (password == "") {
      isFormValid = false;
      setPasswordError("Provide a valid password");
    }
    if (confirmPassword == "") {
      isFormValid = false;
      setConfirmPasswordError("Confirm your password");
    }
    if (confirmPassword !== password) {
      isFormValid = false;
      setConfirmPasswordError("Password doesn't match");
    }

    // }

    if (cvFile.length < 1) {
      isFormValid = false;
      setCvError("CV file is required");
    }
    return isFormValid;
  }

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview = async (file) => {
    // Infer file type if it's not provided
    const inferFileType = (file) => {
      const extension = file.url ? file.url.split(".").pop().toLowerCase() : "";
      switch (extension) {
        case "jpg":
        case "jpeg":
        case "png":
        case "gif":
          return "image/jpeg";
        case "pdf":
          return "application/pdf";
        case "doc":
          return "application/msword";
        case "docx":
          return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        default:
          return "unknown";
      }
    };

    const fileType = file.type || inferFileType(file);
    if (fileType.startsWith("image")) {
      // If it's an image
      file.preview = await getBase64(file.originFileObj || file.url);
      setPreviewImage(file.preview || file.url);
      setPreviewFileType(fileType);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
    } else if (fileType === "application/pdf") {
      // If it's a PDF
      const pdfPreview = file.url || URL.createObjectURL(file.originFileObj);
      setPreviewImage(pdfPreview);
      setPreviewVisible(true);
      setPreviewFileType(fileType);
      setPreviewTitle(file.name);
    } else if (
      fileType === "application/msword" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // For DOC or DOCX files
      const googleViewer = `https://docs.google.com/viewer?url=${
        file.url || URL.createObjectURL(file.originFileObj)
      }&embedded=true`;
      setPreviewImage(googleViewer);
      setPreviewVisible(true);
      setPreviewTitle(file.name);
      setPreviewFileType(fileType);
    } else {
      // Handle unsupported file types
      alert("Preview not available for this file type");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    subData.append("consultantTypeId", 2);
    subData.append("nameTittleId", title);
    subData.append("firstName", firstName);
    subData.append("lastName", lastName);
    subData.append("email", email);
    subData.append("invitationCode", referCode);
    subData.append("linkedIn_Facebook", linkedFacebook);
    subData.append(
      "cvfile",
      cvFile.length === 0 ? null : cvFile[0]?.originFileObj
    );
    subData.append("password", password);
    subData.append("linkTypeId", loansForEu);

    // const subData = {
    //   ConsultantTypeId: 2,
    //   NameTittleId: title,
    //   FirstName: firstName,
    //   LastName: lastName,
    //   Email: email,
    //   Password: password,
    //   InvitationCode: referCode,
    //   LinkedIn_Facebook: linkedFacebook,
    // };
    console.log("subdata", subData);

    for (var x of subData.values()) {
      console.log("subdata", x);
    }

    var formIsValid = validateRegisterForm(subData);
    if (formIsValid) {
      // clearAllErrors();

      // fetch(`${rootUrl}ConsultantRegister/Register`, {
      //   method: "POST",
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
      //   body: subData,
      // })
      axios
        .post(`${rootUrl}ConsultantRegister/Register`, subData)
        .then((res) => {
          if (res?.data?.isSuccess == true) {
            console.log("data", res);
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            history.push("/consultantAccountCreated");
          } else {
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
    }
  };

  return (
    <>
      <Form onSubmit={handleRegister} className="mb-5">
        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left d-flex"
            style={{ marginTop: "-6px" }}
          >
            <Label for="exampleSelect">Select</Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              onChange={(e) => SetNameTitleFromDD(e)}
              style={{
                height: "calc(1.5em + 1.3rem + 2px)",
                width: "30%",
                borderRightStyle: "double",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px",
              }}
            >
              {names.map((item, i) => (
                <option value={item?.id}>{item.name}</option>
              ))}
            </Input>
            <span class="info-icon">
              <span
                className="info-cursor"
                data-toggle="tooltip"
                data-placement="top"
                title="First name as identity/passport"
              >
                <i class="fas fa-info-circle"></i>
              </span>
            </span>

            <Input
              className="inside-placeholder"
              type="text"
              placeholder="First Name"
              onChange={(e) => handleFirstNameChange(e)}
              style={{
                height: "calc(1.5em + 1.3rem + 2px)",
                width: "70%",
                borderLeftStyle: "none",
                borderTopLeftRadius: "0px",
                borderBottomLeftRadius: "0px",
              }}
            />
          </FormGroup>
        </div>
        <span
          className="text-danger"
          style={{ position: "relative", top: "-20px" }}
        >
          {firstNameError}
        </span>

        <FormGroup
          className="form-label-group position-relative has-icon-left"
          style={{ marginTop: "-12px", marginBottom: "9px" }}
        >
          <span class="info-icon">
            <span
              className="info-cursor"
              data-toggle="tooltip"
              data-placement="top"
              title="Last name as identity/passport"
            >
              <i class="fas fa-info-circle"></i>
            </span>
          </span>
          <Input
            className="inside-placeholder"
            type="text"
            placeholder="Last Name"
            onChange={(e) => handleLastNameChange(e)}
            style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
          />
          <span className="text-danger">{lastNameError}</span>
        </FormGroup>

        <FormGroup
          className="has-icon-left position-relative"
          style={{ marginBottom: "5px" }}
        >
          <span>Social Media</span>
          <br />

          <FormGroup check inline className="form-mt">
            <input
              className="form-check-input"
              type="radio"
              name="loanfromStudentLoansCompanyForEU"
              value={true}
              checked={loansForEu === true}
              onChange={() => setLoansForEu(!loansForEu)}
            />
            <Label
              className="form-check-label"
              check
              htmlFor="loanfromStudentLoansCompanyForEU"
            >
              LinkedIn
            </Label>
          </FormGroup>

          <FormGroup check inline>
            <input
              className="form-check-input"
              type="radio"
              name="loanfromStudentLoansCompanyForEU"
              value={false}
              checked={loansForEu === false}
              onChange={() => setLoansForEu(!loansForEu)}
            />
            <Label
              className="form-check-label"
              check
              htmlFor="loanfromStudentLoansCompanyForEU"
            >
              Facebook
            </Label>
          </FormGroup>
        </FormGroup>

        {loansForEu === true || loansForEu === false ? (
          <div className="mb-3">
            <FormGroup className="form-label-group position-relative has-icon-left">
              <Input
                className="inside-placeholder"
                type="text"
                placeholder="LinkedIn/Facebook (Mandatory)"
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
                onChange={(e) => handleLinkedFacebookChange(e)}
              />
              <span className="text-danger">{linkedFacebookError}</span>
            </FormGroup>
          </div>
        ) : null}

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            <Input
              className="inside-placeholder"
              type="email"
              placeholder="Enter the email"
              onChange={(e) => handleEmail(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            />
            <span className="text-danger">{emailError}</span>
          </FormGroup>
        </div>
        <div className="mb-3">
          <img
            src={notify}
            className="img-fluid"
            alt=""
            style={{
              position: " relative",
              bottom: "2px",
              marginRight: "6.33px",
            }}
          />
          <span
            style={{ color: " #B2B3BD", fontSize: "12px", fontWeight: 400 }}
          >
            {" "}
            This email will be used as your user ID
          </span>
        </div>

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            {/* <Input
              className="inside-placeholder"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => handlePassword(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            /> */}
            <InputGroup>
              <Input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={handlePassword}
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              />
              <InputGroupText
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
              </InputGroupText>
            </InputGroup>
            <span className="text-danger">{passwordError}</span>
          </FormGroup>
        </div>

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{ marginBottom: "-6px" }}
          >
            {/* <Input
              className="inside-placeholder"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => handleConfirmPassword(e)}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
            /> */}
            <InputGroup>
              <Input
                className="inside-placeholder"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  handleConfirmPassword(e);
                }}
                style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              />
              <InputGroupText
                onClick={toggleConfirmPasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {isConfirmPasswordVisible ? (
                  <EyeOutlined />
                ) : (
                  <EyeInvisibleOutlined />
                )}
              </InputGroupText>
            </InputGroup>
            <span className="text-danger">{confirmPasswordError}</span>
          </FormGroup>
        </div>

        <FormGroup>
          <div className="d-flex align-items-center">
            <Col sm={4} style={{ paddingLeft: "1px" }}>
              <span>
                <span className="text-danger">*</span>CV File :
              </span>
            </Col>
            <Col sm={8}>
              <Upload
                onPreview={handlePreview}
                multiple={false}
                fileList={cvFile}
                onChange={handleFile}
                beforeUpload={(file) => {
                  return false;
                }}
                itemRender={(originNode, file) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        flex: 1,
                      }}
                    >
                      {originNode}
                    </div>
                    <EyeOutlined
                      style={{
                        marginLeft: "4px",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                      onClick={() => handlePreview(file)}
                    />
                  </div>
                )}
              >
                {cvFile.length < 1 ? <UploadButton /> : ""}
              </Upload>

              {previewVisible && (
                <Modal
                  title={previewTitle}
                  visible={previewVisible}
                  footer={null}
                  onCancel={() => setPreviewVisible(false)}
                >
                  {previewFileType === "application/pdf" ? (
                    <iframe
                      src={previewImage}
                      style={{ width: "100%", height: "80vh" }}
                      frameBorder="0"
                    ></iframe>
                  ) : (
                    <img
                      alt={previewTitle}
                      src={previewImage}
                      style={{ width: "100%" }}
                    />
                  )}
                </Modal>
              )}
            </Col>
          </div>
          <span className="text-danger">{cvError}</span>
        </FormGroup>

        <div className="mb-3">
          <FormGroup className="form-label-group position-relative has-icon-left">
            <Input
              disabled={invitationcode}
              className="inside-placeholder"
              type="text"
              placeholder="Invitation code (optional)"
              defaultValue={invitationcode}
              style={{ height: "calc(1.5em + 1.3rem + 2px)" }}
              onChange={(event) => setReferCode(event.target.value)}
            />
          </FormGroup>
        </div>

        <div className="mb-3">
          <FormGroup
            className="form-label-group position-relative has-icon-left"
            style={{
              paddingLeft: "20px",
              fontSize: "13px",
              fontWeight: 400,
            }}
          >
            <Input
              type="radio"
              name=""
              className="color"
              onChange={handleradio}
              checked={checked === "radio"}
            />
            <p style={{ color: " #7D8287" }}>
              Agree our <span style={{ color: "#045D5E" }}>terms</span> and{" "}
              <span style={{ color: "#045D5E" }}>conditions</span>
            </p>
          </FormGroup>
        </div>

        <div className="mb-3">
          <div>
            <span className="text-danger">{error}</span>
          </div>
          <button className="btn-register-lg" type="submit" disabled={!checked}>
            Register Now
          </button>
        </div>
        <Link to={"/"} className="already-registered mb-5">
          I am already registered
        </Link>
        {/* <div className="mb-5">
          <Link to={"/"} className="already-registered">
            I am already registered
          </Link>
         
        </div> */}
      </Form>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    values: state.auth.register,
  };
};
export default connect(mapStateToProps, { signupWithJWT })(
  ConsultantRegisterForm
);
