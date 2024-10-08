import { FormGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    ButtonGroup,
  
    Button,
  
    Input,
  
    Col,
    Row,
    Table,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
  } from "reactstrap";
  import Select from "react-select";
  import { useHistory, useLocation } from "react-router";
import get from '../../../helpers/get';
import { useToasts } from "react-toast-notifications";
import { useParams } from 'react-router-dom';

import put from '../../../helpers/put';
import CustomButtonRipple from '../Components/CustomButtonRipple';
import ButtonForFunction from '../Components/ButtonForFunction';
import { permissionList } from '../../../constants/AuthorizationConstant';
import ButtonLoader from '../Components/ButtonLoader';
import BreadCrumb from '../../../components/breadCrumb/BreadCrumb';

const UpdateIntake = () => {

    const [month, setMonth] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [monthId, setMonthId] = useState('');
    const [yearId, setYearId] = useState('');
    const [intake, setIntake] = useState({});
    const [year, setYear] = useState([]);

    const [buttonStatus,setButtonStatus] = useState(false);
    const [progress, setProgress] = useState(false);

    const history = useHistory();

    const permissions = JSON.parse(localStorage.getItem('permissions'));

    
    const {id} = useParams();
    const { addToast } = useToasts();

    useEffect(()=>{

      get(`Intake/Get/${id}`).then(res=> {
          setIntake(res);
          setSelectedMonth(res?.month?.name);
          setSelectedYear(res?.year?.name);
          setMonthId(res?.month?.id);
          setYearId(res?.year?.id);
      })
      .catch(); 
      },[id])


      useEffect(()=>{

        get('Month/GetAll').then(res=> {
          setMonth(res);
        })
        .catch();

        get('Year/GetAll').then(res=> {
            setYear(res);
          })
          .catch();
      },[])


      const monthMenu = month.map(monthOptions =>({label:monthOptions.name, value:monthOptions.id}));
      const yearMenu = year.map(yearOptions =>({label:yearOptions.name, value:yearOptions.id}));



    const handleCancel = () =>{
        history.push("/intake");
    }

    const selectMonthType = (label, value) => {
        setSelectedMonth(label);
        
        setMonthId(value); 
      }

      const selectYearType = (label, value) => {
        setSelectedYear(label);
        
        setYearId(value); 
      }

      const handleUpdate = (event) =>{
        event.preventDefault();
        const subData = new FormData(event.target);
        // for(let i of subData.values()){
        
        // }
        setButtonStatus(true);
        setProgress(true);
        put(`Intake/Update`, subData).then(action => {
          setButtonStatus(true);
          setProgress(false);
          // 
          addToast(action?.data?.message, {
            appearance: 'success',
            autoDismiss: true,
          })
          history.push({
            pathname: "/intake",
          });
        });
      }

      const backToIntakeList = () => {
        history.push("/intake");
      }

    return (
        <div>
            <Card>
               <BreadCrumb title="Update Intake" backTo=" Intake List" path="/intake" />

                <Form onSubmit={handleUpdate} className='m-3'>

                   <input type='hidden'
                    name='id'
                    id='id'
                    value={id} />

                    <FormGroup row>
                        <Col md="4">
                            <span>
                               <span style={{color: '#1e98b0', fontSize: '14px'}}>Intake Month</span> <span className="text-danger">*</span>{" "}
                            </span>
                        </Col>

                        <Col md="4">
                        <Select
                            options={monthMenu}
                            value={{ label: selectedMonth, value: monthId }}
                            onChange={(opt) => selectMonthType(opt.label, opt.value)}
                            name="monthId"
                            id="monthId"
                        />
                        </Col>

                        <Col md="4">

                        </Col>
                    </FormGroup>

                    <FormGroup row className='mt-3'>
                        <Col md="4">
                            <span>
                               <span style={{color: '#1e98b0', fontSize: '14px'}}>Intake Year</span> <span className="text-danger">*</span>{" "}
                            </span>
                        </Col>

                        <Col md="4">
                        <Select
                            options={yearMenu}
                            value={{ label: selectedYear, value: yearId }}
                            onChange={(opt) => selectYearType(opt.label, opt.value)}
                            name="yearId"
                            id="yearId"
                        />

                        <FormGroup
                            className="has-icon-left position-relative mt-3"
                            style={{ display: "flex", justifyContent: "space-between" }}
                     >
                       
                    
                          <CustomButtonRipple
                          type={"submit"}
                          className={"mr-1 mt-3 badge-primary mx-auto"}
                          name={progress? <ButtonLoader/> :"Update"}
                          isDisabled={buttonStatus}
                        />
                       
                     </FormGroup>

                        </Col>

                        <Col md="4" className="d-flex justify-content-end align-items-end">
                            <div>
                                
                                <ButtonForFunction
                                  func={handleCancel}
                                  className={'mt-md-3'}
                                  color={'danger'}
                                  name={"Cancel"}
                                  permission={6}
                                />

                            </div>
                        </Col>
                    </FormGroup>

                    
                </Form>


            </Card>
        </div>
    );
};

export default UpdateIntake;