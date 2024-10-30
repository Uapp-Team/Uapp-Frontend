import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import SaveButton from "../../../components/buttons/SaveButton";
import post from "../../../helpers/post";
import put from "../../../helpers/put";
import ConfirmModal from "../../../components/modal/ConfirmModal";
import Uremove from "../../../helpers/Uremove";
import CancelButton from "../../../components/buttons/CancelButton";
import Uget from "../../../helpers/Uget";

const SideCategory = ({ userType, closeModal }) => {
  const { addToast } = useToasts();
  const [category, setCategory] = useState([]);
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [details, setDetails] = useState(false);
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [titleU, setTitleU] = useState("");
  const [titleUError, setTitleUError] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);
  const [buttonStatus2, setButtonStatus2] = useState(false);
  // const [buttonStatus3, setButtonStatus3] = useState(false);

  useEffect(() => {
    Uget(`Tag/all`).then((res) => {
      setCategory(res?.data);
    });
  }, [success, userType]);

  const handleTitle = (e) => {
    let data = e.target.value.trimStart();
    setTitle(data);
    if (data === "") {
      setTitleError("Please input file category name");
    } else {
      setTitleError("");
    }
  };
  const handleTitleU = (e) => {
    let data = e.target.value.trimStart();
    setTitleU(data);
    if (data === "") {
      setTitleUError("Please input file category name");
    } else {
      setTitleUError("");
    }
  };

  const ValidateForm = () => {
    var isValid = true;

    if (!title) {
      isValid = false;
      setTitleError("Please input file category name");
    }

    return isValid;
  };

  const ValidateFormU = () => {
    var isValid = true;

    if (!titleU) {
      isValid = false;
      setTitleUError("Please input file category name");
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    if (ValidateForm()) {
      setButtonStatus(true);
      post("Tag/save", subData).then((res) => {
        setButtonStatus(false);
        addToast(res?.data?.title, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setTitle("");
        res?.data?.isSuccess === true && setSuccess(!success);
      });
    }
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const subData = new FormData(e.target);
    if (ValidateFormU()) {
      setButtonStatus2(true);
      put("Tag/update", subData).then((res) => {
        console.log(res);
        setButtonStatus2(false);
        addToast(res?.data?.title, {
          appearance: res?.data?.isSuccess === true ? "success" : "error",
          autoDismiss: true,
        });
        setTitleU("");
        setEditModal(!editModal);
        res?.data?.isSuccess === true && setSuccess(!success);
      });
    }
  };

  const handleDeleteData = () => {
    Uremove(`Tag/delete/${details?.id}`).then((res) => {
      addToast(res?.data?.message, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal(false);
      setSuccess(!success);
    });
  };
  return (
    <>
      <div className="aff-content-modal overflowY">
        <div className="d-flex justify-content-between mb-30px">
          <h3>Manage Category</h3>
          <span
            onClick={() => {
              closeModal();
            }}
            className="search-key mr-0 pointer"
          >
            Close <i class="fas fa-times ml-1"></i>
          </span>
        </div>

        <hr className="mb-30px" />
        <div className="category-overflow">
          {category.length > 0 &&
            category.map((item, i) => (
              <div
                className="d-flex justify-content-between category-card"
                key={i}
              >
                <span>
                  {item?.name} ({item?.tagCount})
                </span>
                <span>
                  <i
                    className="fas fa-pen ml-3 pointer"
                    onClick={() => {
                      setEditModal(true);
                      setDetails(item);
                      setTitleU(item?.name);
                    }}
                  ></i>
                  <i
                    className="fas fa-trash ml-3 pointer"
                    onClick={() => {
                      setDeleteModal(true);
                      setDetails(item);
                    }}
                  ></i>
                </span>
              </div>
            ))}
        </div>

        <>
          <Form onSubmit={handleSubmit} className="w-75">
            <input name="id" value={0} type="hidden" />

            <FormGroup>
              <span>
                <span className="text-danger">*</span>Add new Category
              </span>
              <Input
                className="form-mt"
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  handleTitle(e);
                }}
                placeholder="Write a category name"
                value={title}
              />

              <span className="text-danger">{titleError}</span>
            </FormGroup>
            <FormGroup>
              <SaveButton
                text="Save"
                progress={buttonStatus}
                buttonStatus={buttonStatus}
              />
            </FormGroup>
          </Form>
        </>
      </div>

      <Modal
        isOpen={editModal}
        toggle={() => setEditModal(!editModal)}
        className="uapp-modal"
      >
        <ModalBody style={{ padding: "30px" }}>
          <div className="mb-3">
            <b>Update Category</b>
          </div>

          <Form onSubmit={handleUpdate} className="w-75">
            <input
              name="id"
              value={details?.id ? details?.id : 0}
              type="hidden"
            />

            <FormGroup>
              <Input
                className="form-mt"
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  handleTitleU(e);
                }}
                placeholder="Write a category name"
                value={titleU}
              />

              <span className="text-danger">{titleUError}</span>
            </FormGroup>
            <FormGroup>
              <CancelButton
                text="Close"
                cancel={() => setEditModal(!editModal)}
              />
              <SaveButton
                text="Update"
                progress={buttonStatus2}
                buttonStatus={buttonStatus2}
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      <ConfirmModal
        text="Do you sure delete this category"
        text2="Please make sure no content here otherwise can’t delete this category"
        isOpen={deleteModal}
        toggle={() => setDeleteModal(!deleteModal)}
        confirm={handleDeleteData}
        cancel={() => setDeleteModal(false)}
        // buttonStatus={buttonStatus3}
        // progress={buttonStatus3}
      />
    </>
  );
};

export default SideCategory;
