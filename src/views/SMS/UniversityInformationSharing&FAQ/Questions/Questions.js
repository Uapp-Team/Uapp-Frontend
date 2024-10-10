import React, { useState } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import ButtonForFunctionNonSolid from "../../Components/ButtonForFunctionNonSolid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SaveButton from "../../../../components/buttons/SaveButton";
import ToggleSwitch from "../../Components/ToggleSwitch";
import CategorySubCategoryDropdown from "../Components/CategorySubCategoryDropdown";
import CancelButton from "../../../../components/buttons/CancelButton";
import TopicDivider from "../../Components/TopicDivider";
import Filter from "../../../../components/Dropdown/Filter";
import QuestionTypesFaq from "../Components/QuestionTypesFaq";
import DefaultDropdownU from "../../../../components/Dropdown/DefaultDropdownU";
import SingleTitle from "./SingleTitle";
import QuestionForSingleAndMultiple from "../Components/QuestionForSingleAndMultiple";

const Questions = () => {
  const [activetab, setActivetab] = useState("1");
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [value, setValue] = useState("");
  const [check, setCheck] = useState(false);

  const [radioEvening, setRadioEvening] = useState(false);
  const [radioEveningWeekend, setRadioEveningWeekend] = useState(false);
  const [radioStandard, setRadioStandard] = useState(false);
  const [radioWeekend, setRadioWeekend] = useState(false);

  const [categoryList, setCategoryList] = useState([]);
  const [categoryLabel, setCategoryLabel] = useState("Select Category");
  const [categoryValue, setCategoryValue] = useState(0);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [subCategoryLabel, setSubCategoryLabel] = useState(
    "Select Sub Category"
  );
  const [subCategoryValue, setSubCategoryValue] = useState(0);

  const [universityList, setUniversityList] = useState([]);
  const [universityListLabel, setUniversityListLabel] =
    useState("Select University");
  const [universityListValue, setUniversityListValue] = useState(0);

  const handleSubmit = (event) => {};
  const onChangeEvening = (event) => {
    console.log(event.target.checked);
    setRadioEvening(event.target.checked);
  };
  const onChangeEveningWeekend = (event) => {
    setRadioEveningWeekend(event.target.checked);
  };

  const onChangeStandard = (event) => {
    setRadioStandard(event.target.checked);
  };

  const onChangeWeekend = (event) => {
    setRadioWeekend(event.target.checked);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { list: "ordered" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
    ],
  };

  const categoryName = categoryList?.map((depart) => ({
    label: depart.name,
    value: depart.id,
  }));

  const selectCategoryName = (label, value) => {
    setCategoryLabel(label);
    setCategoryValue(value);
  };

  const subCategoryName = subCategoryList?.map((depart) => ({
    label: depart.name,
    value: depart.id,
  }));

  const selectSubCategoryName = (label, value) => {
    setSubCategoryLabel(label);
    setSubCategoryValue(value);
  };

  return (
    <>
      <div className="px-3 pt-3">
        <ButtonForFunctionNonSolid
          className={"btn btn-faq-add py-3"}
          func={() => setModalOpen(true)}
          icon={<i className="fas fa-plus"></i>}
          name={" Add Questions"}
        />
      </div>

      <div className="px-3 mt-3">
        <p className="section-title">General Queries</p>
      </div>
      <div className="bg-answer-card-faq p-3 m-4">
        <div className="d-flex justify-content-between mb-4">
          <span className="card-heading">How to reply to a message</span>
          <span>
            <span
              className="pointer"
              // onClick={() => handleUpdate(edu.id)}
            >
              <i class="far fa-edit"></i>
            </span>

            <span
              className="mx-3"
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-trash"></i>
            </span>
            <span
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-info-circle"></i>
            </span>
          </span>
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            <p className="section-title">Funding</p>
            <FormGroup row className="has-icon-left position-relative my-0">
              <Col md="12" style={{ height: "370px" }}>
                <ReactQuill
                  theme="snow"
                  value={value}
                  modules={modules}
                  className="editor-input"
                  onChange={setValue}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="12" className="d-flex justify-content-start">
                <SaveButton
                  text="Save"
                  progress={progress}
                  buttonStatus={buttonStatus}
                />
              </Col>
            </FormGroup>
          </form>
        </div>
      </div>
      <div className="bg-answer-card-faq p-3 m-4">
        <div className="d-flex justify-content-between mb-4">
          <span className="card-heading">How to reply to a message</span>
          <span>
            <span
              className="pointer"
              // onClick={() => handleUpdate(edu.id)}
            >
              <i class="far fa-edit"></i>
            </span>

            <span
              className="mx-3"
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-trash"></i>
            </span>
            <span
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-info-circle"></i>
            </span>
          </span>
        </div>
        <div className="mb-5">
          <Form onSubmit={handleSubmit}>
            <div className="d-flex mb-3">
              <span className="mr-3 same-answer">Same Answer for all type</span>
              <ToggleSwitch
              // defaultChecked={
              //   student?.blacklisted == null
              //     ? false
              //     : student?.blacklisted === false
              //     ? false
              //     : true
              // }
              // onChange={(e) => {
              //   handleBlacklist(e, student?.id);
              // }}
              />
            </div>

            <FormGroup row className="has-icon-left position-relative ml-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="evening"
                // name="evening"
                onChange={(e) => {
                  onChangeEvening(e);
                }}
                value={radioEvening}
                checked={radioEvening === true ? true : false}
              />
              <span>Buenos Aires</span>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="eveningweekend"
                // name="eveningweekend"
                onChange={(e) => {
                  onChangeEveningWeekend(e);
                }}
                value={radioEveningWeekend}
                checked={radioEveningWeekend === true ? true : false}
              />
              <span>Sidney</span>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="standard"
                // name="standard"
                onChange={(e) => {
                  onChangeStandard(e);
                }}
                value={radioStandard}
                checked={radioStandard === true ? true : false}
              />
              <span>San Francisco</span>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="weekend"
                // name="standard"
                onChange={(e) => {
                  onChangeWeekend(e);
                }}
                value={radioWeekend}
                checked={radioWeekend === true ? true : false}
              />
              <span>London</span>
            </FormGroup>
          </Form>
        </div>
      </div>
      <div className="bg-answer-card-faq p-3 m-4">
        <div className="d-flex justify-content-between mb-4">
          <span className="card-heading">How to reply to a message</span>
          <span>
            <span
              className="pointer"
              // onClick={() => handleUpdate(edu.id)}
            >
              <i class="far fa-edit"></i>
            </span>

            <span
              className="mx-3"
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-trash"></i>
            </span>
            <span
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-info-circle"></i>
            </span>
          </span>
        </div>
        <div className="mb-5">
          <Form onSubmit={handleSubmit}>
            <div className="d-flex mb-3">
              <span className="mr-3 same-answer">Same Answer for all type</span>
              <ToggleSwitch
              // defaultChecked={
              //   student?.blacklisted == null
              //     ? false
              //     : student?.blacklisted === false
              //     ? false
              //     : true
              // }
              // onChange={(e) => {
              //   handleBlacklist(e, student?.id);
              // }}
              />
            </div>
            <h5 className="text-gray">Uk</h5>

            <FormGroup row className="has-icon-left position-relative ml-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="evening"
                // name="evening"
                onChange={(e) => {
                  onChangeEvening(e);
                }}
                value={radioEvening}
                checked={radioEvening === true ? true : false}
              />
              <span>Evening</span>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="eveningweekend"
                // name="eveningweekend"
                onChange={(e) => {
                  onChangeEveningWeekend(e);
                }}
                value={radioEveningWeekend}
                checked={radioEveningWeekend === true ? true : false}
              />
              <span>Evening Weekend</span>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="standard"
                // name="standard"
                onChange={(e) => {
                  onChangeStandard(e);
                }}
                value={radioStandard}
                checked={radioStandard === true ? true : false}
              />
              <span>Standard</span>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <Input
                className="form-check-input"
                type="checkbox"
                id="weekend"
                // name="standard"
                onChange={(e) => {
                  onChangeWeekend(e);
                }}
                value={radioWeekend}
                checked={radioWeekend === true ? true : false}
              />
              <span>Weekend</span>
            </FormGroup>
          </Form>
        </div>
        <div className="mb-5">
          <h5 className="text-gray">International</h5>

          <FormGroup row className="has-icon-left position-relative ml-4">
            <Input
              className="form-check-input"
              type="checkbox"
              id="evening"
              // name="evening"
              onChange={(e) => {
                onChangeEvening(e);
              }}
              value={radioEvening}
              checked={radioEvening === true ? true : false}
            />
            <span>Evening</span>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative ml-4">
            <Input
              className="form-check-input"
              type="checkbox"
              id="eveningweekend"
              // name="eveningweekend"
              onChange={(e) => {
                onChangeEveningWeekend(e);
              }}
              value={radioEveningWeekend}
              checked={radioEveningWeekend === true ? true : false}
            />
            <span>Evening Weekend</span>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative ml-4">
            <Input
              className="form-check-input"
              type="checkbox"
              id="standard"
              // name="standard"
              onChange={(e) => {
                onChangeStandard(e);
              }}
              value={radioStandard}
              checked={radioStandard === true ? true : false}
            />
            <span>Standard</span>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative ml-4">
            <Input
              className="form-check-input"
              type="checkbox"
              id="weekend"
              // name="standard"
              onChange={(e) => {
                onChangeWeekend(e);
              }}
              value={radioWeekend}
              checked={radioWeekend === true ? true : false}
            />
            <span>Weekend</span>
          </FormGroup>
        </div>
        <div className="">
          <h5 className="text-gray">EU/EEA</h5>

          <FormGroup row className="has-icon-left position-relative ml-4">
            <Input
              className="form-check-input"
              type="checkbox"
              id="evening"
              // name="evening"
              onChange={(e) => {
                onChangeEvening(e);
              }}
              value={radioEvening}
              checked={radioEvening === true ? true : false}
            />
            <span>Evening</span>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative ml-4">
            <Input
              className="form-check-input"
              type="checkbox"
              id="eveningweekend"
              // name="eveningweekend"
              onChange={(e) => {
                onChangeEveningWeekend(e);
              }}
              value={radioEveningWeekend}
              checked={radioEveningWeekend === true ? true : false}
            />
            <span>Evening Weekend</span>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative ml-4">
            <Input
              className="form-check-input"
              type="checkbox"
              id="standard"
              // name="standard"
              onChange={(e) => {
                onChangeStandard(e);
              }}
              value={radioStandard}
              checked={radioStandard === true ? true : false}
            />
            <span>Standard</span>
          </FormGroup>
          <FormGroup row className="has-icon-left position-relative ml-4">
            <Input
              className="form-check-input"
              type="checkbox"
              id="weekend"
              // name="standard"
              onChange={(e) => {
                onChangeWeekend(e);
              }}
              value={radioWeekend}
              checked={radioWeekend === true ? true : false}
            />
            <span>Weekend</span>
          </FormGroup>
        </div>
      </div>
      <div className="bg-answer-card-faq p-3 m-4">
        <div className="d-flex justify-content-between mb-4">
          <span className="card-heading">How to reply to a message</span>
          <span>
            <span
              className="pointer"
              // onClick={() => handleUpdate(edu.id)}
            >
              <i class="far fa-edit"></i>
            </span>

            <span
              className="mx-3"
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-trash"></i>
            </span>
            <span
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-info-circle"></i>
            </span>
          </span>
        </div>
        <div className="">
          <h5 className="text-gray">Select</h5>
          <Form>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <input
                type="radio"
                name="genderId"
                id="genderId"
                // value={tt?.id}
                onClick={() => {
                  // setGenderValue(tt?.id);
                  // setGenderError(false);
                }}
                // checked={genderValue === tt?.id ? true : false}
              />

              <label
                className="mt-1"
                style={{ fontWeight: 500, fontSize: "14px" }}
              >
                sakib
              </label>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <input
                type="radio"
                name="genderId"
                id="genderId"
                // value={tt?.id}
                onClick={() => {
                  // setGenderValue(tt?.id);
                  // setGenderError(false);
                }}
                // checked={genderValue === tt?.id ? true : false}
              />

              <label
                className="mt-1"
                style={{ fontWeight: 500, fontSize: "14px" }}
              >
                sakib
              </label>
            </FormGroup>
            <FormGroup row className="has-icon-left position-relative ml-4">
              <input
                type="radio"
                name="genderId"
                id="genderId"
                // value={tt?.id}
                onClick={() => {
                  // setGenderValue(tt?.id);
                  // setGenderError(false);
                }}
                // checked={genderValue === tt?.id ? true : false}
              />

              <label
                className="mt-1"
                style={{ fontWeight: 500, fontSize: "14px" }}
              >
                sakib
              </label>
            </FormGroup>
          </Form>
        </div>
      </div>
      <div className="bg-answer-card-faq p-3 m-4">
        <div className="d-flex justify-content-between mb-4">
          <span className="card-heading">Probable Deadline</span>
          <span>
            <span
              className="pointer"
              // onClick={() => handleUpdate(edu.id)}
            >
              <i class="far fa-edit"></i>
            </span>

            <span
              className="mx-3"
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-trash"></i>
            </span>
            <span
              style={{ cursor: "pointer" }}
              // onClick={() => toggleDanger(edu)}
            >
              <i class="fas fa-info-circle"></i>
            </span>
          </span>
        </div>
        <div className="">
          <Form>
            <FormGroup>
              <div className="d-flex">
                <input
                  style={{
                    border: "1px solid rgba(0,0,0,.1)",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                  type="date"
                  name="date"
                  id="date"
                  // onChange={(e) => {
                  //   dateHandle(e);
                  // }}
                  // value={date}
                />
                <i class="fas fa-arrow-right arrow-faq"></i>
                <input
                  style={{
                    border: "1px solid rgba(0,0,0,.1)",
                    borderRadius: "4px",
                    padding: "8px",
                  }}
                  type="date"
                  name="date"
                  id="date"
                  // onChange={(e) => {
                  //   dateHandle(e);
                  // }}
                  // value={date}
                />
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>

      <Modal
        isOpen={modalOpen}
        toggle={() => setModalOpen(false)}
        className="university-faq-modal"
      >
        {/* <ModalHeader> */}
        {/* </ModalHeader> */}
        <ModalBody>
          <div className="d-flex justify-content-between mb-3">
            <h3> Question</h3>
            <i
              onClick={() => setModalOpen(false)}
              class="fas fa-times ml-1 pointer fs-18px"
            ></i>
          </div>

          {/* <Form onSubmit={handleSubmit}> */}
          {/* <div className="bg-answer-card-faq p-3 mb-4">
            <FormGroup row>
              <Col>
                <p>Category</p>
                <DefaultDropdownU
                  label={categoryLabel}
                  setLabel={setCategoryLabel}
                  value={categoryValue}
                  setValue={setCategoryValue}
                  url="QuestionCategory/get-all"
                />
              </Col>
              <Col>
                <p>Sub Category</p>
                <DefaultDropdownU
                  label={subCategoryLabel}
                  setLabel={setSubCategoryLabel}
                  value={subCategoryValue}
                  setValue={setSubCategoryValue}
                  url={`QuestionSubCategory/get-sub-categories/${categoryValue}`}
                />
              </Col>
            </FormGroup>
          </div> */}

          <SingleTitle />
          {/* <CategorySubCategoryDropdown
              categoryLabel={categoryLabel}
              categoryName={categoryName}
              categoryValue={categoryValue}
              selectCategoryName={selectCategoryName}
              selectSubCategoryName={selectSubCategoryName}
              subCategoryLabel={subCategoryLabel}
              subCategoryValue={subCategoryValue}
              subCategoryName={subCategoryName}
            /> */}

          {/* <div className="bg-answer-card-faq p-3">
            <QuestionTypesFaq
              activetab={activetab}
              setActivetab={setActivetab}
            />

            <div className="mt-4">
              {activetab === "1" ? (
                <SingleTitle />
              ) : activetab === "2" ? (
                <QuestionForSingleAndMultiple />
              ) : activetab === "3" ? (
                <QuestionForSingleAndMultiple />
              ) : activetab === "4" ? (
                <SingleTitle />
              ) : (
                <SingleTitle />
              )}
            </div>
          </div> */}
          {/* <div className="ml-2 my-4">
              <input
                onChange={(e) => {
                  setCheck(e.target.checked);
                }}
                type="checkbox"
                name=""
                value=""
                checked={check}
              />{" "}
              <span className="bold-text">Mandatory for all universities?</span>
            </div>
            <TopicDivider text="Or" />
            <FormGroup row className="my-4">
              <Col lg="5" md="5">
                <Filter
                  data={universityList}
                  label={universityListLabel}
                  setLabel={setUniversityListLabel}
                  value={universityListValue}
                  setValue={setUniversityListValue}
                  name=""
                  error={() => {}}
                  setError={() => {}}
                  action={() => {}}
                />
              </Col>
            </FormGroup>
            <FormGroup className="d-flex mt-3">
              <CancelButton cancel={() => setModalOpen(false)} />
              <SaveButton
                text="Add Question"
                progress={progress}
                buttonStatus={buttonStatus}
              /> */}
          {/* </FormGroup> */}
          {/* </Form> */}
        </ModalBody>
      </Modal>
    </>
  );
};

export default Questions;
