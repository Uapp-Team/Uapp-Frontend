import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Col,
  Table,
} from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { useDispatch } from "react-redux";
import { StoreUniversitytypeData } from "../../../../redux/actions/SMS/UniversityAction/UniversityTypeAction";
import { Link } from "react-router-dom";
import get from "../../../../helpers/get";
import post from "../../../../helpers/post";
import put from "../../../../helpers/put";
import LinkSpanButton from "../../Components/LinkSpanButton";
import Loader from "../../Search/Loader/Loader";
import { permissionList } from "../../../../constants/AuthorizationConstant";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AddUniversityType = (props) => {
  const universityTypes = props.univerSityTypeList[0];
  const [uniTypeId, setUniTypeId] = useState(0);
  const [universityType, setUniversityType] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const { addToast } = useToasts();
  const [universityList, setUniversityList] = useState([]);
  const [updateState, setUpdateState] = useState({});
  const [loading, setLoading] = useState(true);
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  useEffect(() => {
    get(`UniversityType/Index`).then((action) => {
      setUniversityList(action);
      setUniTypeId(action?.id);

      dispatch(StoreUniversitytypeData(action));
      setLoading(false);
    });
  }, [success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const subdata = new FormData(event.target);

    if (!updateState?.id) {
      setUpdateState({});
      post(`UniversityType/Create`, subdata).then((res) => {
        setSuccess(!success);
        addToast(res?.data?.message, {
          appearance: "success",
          autoDismiss: true,
        });
        setModalOpen(false);
        setUniversityType("");
        setUpdateState({});
      });
    } else {
      put(`UniversityType/Update`, subdata).then((action) => {
        setSuccess(!success);
        setModalOpen(false);
        addToast(action?.data?.message, {
          appearance: "warning",
          autoDismiss: true,
        });
        setUpdateState({});
      });
    }
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setUpdateState({});
  };

  // redirect to dashboard
  const backToDashboard = () => {
    history.push("/");
  };

  return (
    <div>
      <BreadCrumb title="University Types" backTo="" path="/" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Card>
            <CardHeader>
              <br />

              <div>
                {" "}
                <b>
                  {" "}
                  Total{" "}
                  <span className="badge badge-primary">
                    {universityList.length}
                  </span>{" "}
                  University Types Found{" "}
                </b>
              </div>
            </CardHeader>

            <CardBody>
              <Link to="/newform"></Link>

              <div>
                <Modal
                  isOpen={modalOpen}
                  toggle={closeModal}
                  className="uapp-modal"
                >
                  <ModalHeader>Add University Type</ModalHeader>
                  <ModalBody>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        {updateState?.id ? (
                          <Input
                            type="hidden"
                            name="id"
                            id="id"
                            defaultValue={updateState?.id}
                          />
                        ) : null}
                      </FormGroup>
                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="4">
                          <span>Name</span>
                        </Col>
                        <Col md="8">
                          <Input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={updateState?.name}
                            placeholder="Create University Type"
                            onChange={(e) => setUniversityType(e.target.value)}
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        className="has-icon-left position-relative"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          color="danger"
                          className="mr-1 mt-3"
                          onClick={closeModal}
                        >
                          Close
                        </Button>

                        <Button.Ripple
                          color="warning"
                          type="submit"
                          className="mr-1 mt-3"
                        >
                          Submit
                        </Button.Ripple>
                      </FormGroup>
                    </Form>
                  </ModalBody>
                </Modal>
                <div></div>
              </div>

              <div className="table-responsive">
                <Table className="table-sm table-bordered">
                  <thead className="tablehead">
                    <tr style={{ textAlign: "center" }}>
                      {/* <th>SL/NO</th> */}
                      <th>Name</th>
                      {permissions?.includes(
                        permissionList?.View_University_List
                      ) ? (
                        <th className="text-center">Universities</th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {universityTypes?.map((uniType, i) => (
                      <tr key={uniType.id} style={{ textAlign: "center" }}>
                        {/* <th scope="row">{i + 1}</th> */}
                        <td>{uniType?.name}</td>
                        {permissions?.includes(
                          permissionList?.View_University_List
                        ) ? (
                          <td className="text-center">
                            <LinkSpanButton
                              url={{
                                pathname: `/universityListFromUniversityTypes/${uniType?.id}`,
                                universityType: uniType?.id,
                                universityName: uniType?.name,
                              }}
                              className={"badge badge-pill badge-secondary"}
                              data={`View (${uniType?.universityCount})`}
                              permission={6}
                            />
                          </td>
                        ) : null}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  univerSityTypeList: state.universityTypeDataReducer.universityTypes,
});
export default connect(mapStateToProps)(AddUniversityType);
