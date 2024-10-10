import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";

const SideModal = ({ title = "Content", details, isDetails, closeModal }) => {
  const [imageTitle, setImageTitle] = useState("");
  const [imageTitleError, setImageTitleError] = useState("");
  const [imageDetails, setImageDetails] = useState("");
  const [imageDetailsError, setImageDetailsError] = useState("");

  const handleImageTitle = (e) => {
    let data = e.target.value.trimStart();
    setImageTitle(data);
    if (data === "") {
      setImageTitleError("Title is required");
    } else {
      setImageTitleError("");
    }
  };

  const handleImageDetails = (e) => {
    let data = e.target.value.trimStart();
    setImageDetails(data);
    if (data === "") {
      setImageDetailsError("Details is required");
    } else {
      setImageDetailsError("");
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <div className="aff-content-modal overflowY">
        <div className="d-flex justify-content-between mb-30px">
          <h3>{title}</h3>
          <div>
            <span className="search-key bg-orange-light">
              Delete
              <i class="far fa-trash-alt ml-2"></i>
            </span>

            <p
              onClick={() => closeModal(false)}
              className="search-key mr-0 pointer"
            >
              Close <i class="fas fa-times ml-2"></i>
            </p>
          </div>
        </div>

        <img
          className="h-350px mb-30px"
          src={`https://uapp.uk/home-hero.svg`}
          alt=""
        />
        <hr className="mb-30px" />
        <h3>Facebook banner.jpg</h3>
        <Form onSubmit={handleSubmit} className="w-75">
          <FormGroup row>
            <span>
              <span className="text-danger">*</span>Image Title
            </span>
            <Input
              className="form-mt"
              type="text"
              name="title"
              id="title"
              onChange={(e) => {
                handleImageTitle(e);
              }}
              placeholder="Enter Image Title"
              value={imageTitle}
            />
            <span className="text-danger">{imageTitleError}</span>
          </FormGroup>{" "}
          <FormGroup row>
            <span>Image Details</span>
            <Input
              className="form-mt"
              type="textarea"
              name="details"
              id="details"
              onChange={(e) => {
                handleImageDetails(e);
              }}
              placeholder="Enter Image Details"
              value={imageDetails}
            />
            <span className="text-danger">{imageDetailsError}</span>
          </FormGroup>
        </Form>
      </div>
    </>
  );
};

export default SideModal;
