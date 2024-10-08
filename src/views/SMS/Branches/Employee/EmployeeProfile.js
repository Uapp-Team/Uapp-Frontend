import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Card, Form, 
  FormGroup, CardBody, CardHeader, Col, Row, Table, Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter } from 'reactstrap';
import get from '../../../../helpers/get';
import ReactToPrint from 'react-to-print';
import { rootUrl } from '../../../../constants/constants';
import put from '../../../../helpers/put';
import { useToasts } from 'react-toast-notifications';

import { Image } from 'antd';
import { Upload } from "antd";
import * as Icon from "react-feather";

const EmployeeProfile = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [buttonStatus,setButtonStatus] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const [FileList, setFileList] = useState([]);
    const [error, setError] = useState(false);

    const [text, setText] = useState('');

    const [buttonStatus1, setButtonStatus1] = useState(false);
    const [previewVisible1, setPreviewVisible1] = useState(false);
    const [previewImage1, setPreviewImage1] = useState("");
    const [previewTitle1, setPreviewTitle1] = useState("");
    const [FileList1, setFileList1] = useState([]);
    const [error1, setError1] = useState(false);

    const [text1, setText1] = useState('');

    const [success, setSuccess] = useState(false);

    const {branchId, employeeId} = useParams();
    const [info,setInfo] = useState({});
    const history = useHistory();
    const componentRef = useRef();
    const {addToast} = useToasts();
    


    useEffect(()=>{

        get(`BranchEmployee/Get/${employeeId}`)
        .then(res => {
            
            setInfo(res);
        })

    },[employeeId, success])

    const backToDashboard = () => {
        history.push(`/branchProfile/${info?.branchId}`);
    }

    const redirect = () => {
        history.push(`/branchEmployeeInformation/${info?.branchId}/${employeeId}`);
    }
    
    const updateCoverPhoto = () => {
      setModalOpen(true);
    }

    // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
    setFileList([]);
  };

  const closeModal1 = () => {
    setModalOpen2(false);
    setFileList1([]);
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList }) => {
    // setFileList(fileList);

    if(fileList.length > 0 && fileList[0]?.type !== 'image/jpeg' && fileList[0]?.type !== 'image/jpg' && fileList[0]?.type !== 'image/png'){
      setFileList([]);
      setText('Only jpeg, jpg, png image is allowed');
    }
    else{
      setFileList(fileList);
      setText('');
      setError(false);
      setButtonStatus(false);
    }

  };

  const handleSubmitCoverPhoto = event =>{
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("coverImage", FileList[0]?.originFileObj);

    // for(var x of subData.values()){
    //     
    // }
    setButtonStatus(true);

    if (FileList.length < 1) {
      setError(true);
    }
    else{
      put(`BranchEmployee/UpdateCoverPhoto`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList([]);
          setModalOpen(false);
          setSuccess(!success);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }

  }

  const handleCancel1 = () => {
    setPreviewVisible1(false);
  };

  const handlePreview1 = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage1(file.url || file.preview);
    setPreviewVisible1(true);
    setPreviewTitle1(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange1 = ({ fileList }) => {
    // setFileList(fileList);

    if(fileList.length > 0 && fileList[0]?.type !== 'image/jpeg' && fileList[0]?.type !== 'image/jpg' && fileList[0]?.type !== 'image/png'){
      setFileList1([]);
      setText1('Only jpeg, jpg, png image is allowed');
    }
    else{
      setFileList1(fileList);
      setText1('');
      setError1(false);
      setButtonStatus1(false);
    }

  };

  const updateProfilePic = () => {
    setModalOpen2(true);
    setFileList1([]);
  }

  const handleSubmitProfilePhoto = event => {
    event.preventDefault();

    const subData = new FormData(event.target);

    subData.append("profileImage", FileList1[0]?.originFileObj);

    // for(var x of subData.values()){
    //     
    // }
    setButtonStatus1(true);

    if (FileList1.length < 1) {
      setError1(true);
    }
    else{
      put(`BranchEmployee/UpdateProfilePhoto`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoDismiss: true,
          });
          setFileList1([]);
          setModalOpen2(false);
          setSuccess(!success);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  }

    return (
        <div>
              <Card className="uapp-card-bg">
        <CardHeader className="page-header">

        <div className='d-flex align-items-center'>
              <div className='mt-1'>
                <h3 className="text-white">Branch Employee Profile</h3>
              </div>
              <div className='ml-2'>
              <ReactToPrint
                trigger={() => <span className="text-white cursor-pointer" title="Print to pdf"><i className="fas fa-print"></i></span>}
                content={() => componentRef.current}
              />
              </div>
            </div>

            <div className="page-header-back-to-home" >
              <span onClick={backToDashboard} className="text-white"> <i className="fas fa-arrow-circle-left"></i> Back to Branch Profile</span>
            </div>

        </CardHeader>
      </Card>


      <div className="uapp-employee-profile">
        <Row>

          <Col md="12">
            <div className="uapp-employee-profile-left">
            <Card>
              <CardBody>
                  <div className="uapp-employee-cover-image">
                    <div className="bg-image">   
                    <div className="uplode-cover-image">
                      <img src={rootUrl+info?.coverImageMedia?.fileUrl}  alt='cover_img'/>
                      <div className="uplode-cover-image">
                      <span onClick={updateCoverPhoto}> <i className="fas fa-camera" style={{cursor: "pointer"}} > </i ></span>
                      </div>
                    </div>               
                  </div>
                </div>

                {/* cover photo edit modal starts here */}
                <Modal isOpen={modalOpen} toggle={closeModal} className="uapp-modal">
                  <ModalHeader>Update Cover Photo</ModalHeader>
                      
                  <ModalBody>
                    <form onSubmit={handleSubmitCoverPhoto}>
                      <input type="hidden" name="id" id="id" value={employeeId} />
                      
                      {/* <input type="hidden" name="id" id="id" value={adminData?.id} /> */}
                      
                      <FormGroup row className="has-icon-left position-relative">
                        <Col className='ml-5' md="4">
                          <span>
                            Cover Photo <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <div className="row d-flex">
                            {/* {consultantData?.consultantCoverImageMedia !== null ? (
                              <div className="col-md-6">
                                <Image
                                  width={104}
                                  height={104}
                                  src={
                                    rootUrl + consultantData?.consultantCoverImageMedia?.thumbnailUrl
                                  }
                                />
                              </div>
                            ) : null} */}
          
                            <div className="col-md-6">
                              <>
                                <Upload
                                  listType="picture-card"
                                  multiple={false}
                                  fileList={FileList}
                                  onPreview={handlePreview}
                                  onChange={handleChange}
                                  beforeUpload={(file) => {
                                    return false;
                                  }}
                                >
                                  {FileList.length < 1 ? (
                                    <div className="text-danger" style={{ marginTop: 8 }}>
                                      <Icon.Upload />
                                      <br />
                                      <span>Upload Image Here</span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </Upload>
                                <Modal
                                  visible={previewVisible}
                                  title={previewTitle}
                                  footer={null}
                                  onCancel={handleCancel}
                                >
                                  <img
                                    alt="example"
                                    style={{ width: "100%" }}
                                    src={previewImage}
                                  />
                                </Modal>
                                  
                                <span className="text-danger d-block">{text}</span>

                                {error && (
                                  <span className="text-danger">
                                    Cover photo is required
                                  </span>
                                )}
                                  
                              </>
                            </div>
                          </div>
                        </Col>
                      </FormGroup>
                                  
                      <FormGroup row>
                        <Col md="12">
                          <div className="d-flex justify-content-end">
                            <Button color='danger' onClick={closeModal} className='mr-1 mt-3'>
                                  Cancel
                            </Button>
                            <Button className="ml-1 mt-3" color="primary" disabled={buttonStatus}>
                              Update
                            </Button>
                          </div>
                        </Col>
                      </FormGroup>
                    </form>
                  </ModalBody>
                </Modal>
                {/* cover photo edit modal ends here */}

                <div className="uapp-employee-profile-image-edit">
                  <Row>
                    <Col> 
                  <div className="uapp-employee-profile-image">
                  <div className="text-left">
                     <div className='profile-pic'>
                       <img className="empProfileImg"  src={rootUrl+info?.profileImageMedia?.fileUrl} alt='profile_img'/>

                       <div class="edit"><span onClick={updateProfilePic}><i className="fas fa-camera" style={{cursor: "pointer"}} > </i ></span></div>
                     </div>

                     {/* profile photo edit modal starts here */}
                     <Modal isOpen={modalOpen2} toggle={closeModal1} className="uapp-modal">
                       <ModalHeader>Update Profile Photo</ModalHeader>

                       <ModalBody>
                         <form onSubmit={handleSubmitProfilePhoto}>
                           <input type="hidden" name="id" id="id" value={employeeId} />

                           {/* <input type="hidden" name="id" id="id" value={adminData?.id} /> */}

                           <FormGroup row className="has-icon-left position-relative">
                             <Col className='ml-5' md="4">
                               <span>
                                 Profile Photo <span className="text-danger">*</span>{" "}
                               </span>
                             </Col>
                             <Col md="6">
                               <div className="row d-flex">
                                 {/* {consultantData?.consultantCoverImageMedia !== null ? (
                                   <div className="col-md-6">
                                     <Image
                                       width={104}
                                       height={104}
                                       src={
                                         rootUrl + consultantData?.consultantCoverImageMedia?.thumbnailUrl
                                       }
                                     />
                                   </div>
                                 ) : null} */}

                                 <div className="col-md-6">
                                   <>
                                     <Upload
                                       listType="picture-card"
                                       multiple={false}
                                       fileList={FileList1}
                                       onPreview={handlePreview1}
                                       onChange={handleChange1}
                                       beforeUpload={(file) => {
                                         return false;
                                       }}
                                     >
                                       {FileList1.length < 1 ? (
                                         <div className="text-danger" style={{ marginTop: 8 }}>
                                           <Icon.Upload />
                                           <br />
                                           <span>Upload Image Here</span>
                                         </div>
                                       ) : (
                                         ""
                                       )}
                                     </Upload>
                                     <Modal
                                       visible={previewVisible1}
                                       title={previewTitle1}
                                       footer={null}
                                       onCancel={handleCancel1}
                                     >
                                       <img
                                         alt="example"
                                         style={{ width: "100%" }}
                                         src={previewImage1}
                                       />
                                     </Modal>

                                     <span className="text-danger d-block">{text1}</span>

                                     {error1 && (
                                       <span className="text-danger">
                                         Profile photo is required
                                       </span>
                                     )}

                                   </>
                                 </div>
                               </div>
                             </Col>
                           </FormGroup>

                           <FormGroup row>
                             <Col md="12">
                               <div className="d-flex justify-content-end">
                                 <Button color='danger' onClick={closeModal1} className='mr-1 mt-3'>
                                       Cancel
                                 </Button>
                                 <Button type="submit" className="ml-1 mt-3" color="primary" disabled={buttonStatus1}>
                                   Update
                                 </Button>
                               </div>
                             </Col>
                           </FormGroup>
                         </form>
                       </ModalBody>
                     </Modal>
                 {/* profile photo edit modal ends here */}

                  </div>
                  </div>  
                  </Col>

                  <Col> 
                 

               
                   
                   <div className='text-right'>

                   <div className="uapp-employee-profile-Edit" onClick={redirect}>
                    
                    <span> <i className="fas fa-pencil-alt pencil-style"></i> </span>
                    </div>
                   </div>
                 

                      </Col> 
                  </Row>            
                 </div>     


                    <div className="uapp-employee-profile-generalInfo"> 
                     <Row>
                       <Col md="6"> 

                        <ul className="uapp-ul text-left">
                          <li> 
                            <h4>{info?.firstName} {info?.lastName}</h4>
                          </li>

                        </ul>

                    </Col> 

                    <Col md="6"> 
                   <ul className="uapp-ul text-right1">
                          <li> 
                            <span> Email : {info?.email}</span>
                          </li>
                          
                          <li> 
                            <span> Phone Number : {info?.phoneNumber}</span>
                          </li>

                        </ul>
                    </Col> 
                  </Row> 
                  </div> 
              </CardBody>
              </Card>

          
      </div>
    </Col>

        </Row>

      </div>

      <div className=" info-item mt-4">
          <Card>  
               <CardBody>
                  <div className="hedding-titel">
                    <h5> <b>General Information</b> </h5>
                    <div className="bg-h"></div>
                  </div>
                    <Table className="table-bordered mt-4" >
                    <tbody>
                      <tr>
                        <td width="40%">
                          <b>Name:</b>
                        </td>

                        <td width="60%">
                          {info?.firstName} {info?.lastName}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Employee type:</b>
                        </td>

                        <td width="60%">
                          {info?.employeType?.name}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Email:</b>
                        </td>

                        <td width="60%">
                          {info?.email}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Phone Number:</b>
                        </td>

                        <td width="60%">
                          {info?.phoneNumber}
                        </td>
                      </tr>

                      <tr>
                        <td width="40%">
                          <b>Nationality:</b>
                        </td>

                        <td width="60%">
                          {info?.nationality?.name}
                        </td>
                      </tr>
                      </tbody>
                    </Table>
               </CardBody>
            </Card>
        </div>

            
        </div>
    );
};

export default EmployeeProfile;