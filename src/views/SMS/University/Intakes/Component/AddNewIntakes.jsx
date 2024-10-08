import { FormGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Form,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useHistory, useLocation } from "react-router";
import get from '../../../../../helpers/get';
import post from '../../../../../helpers/post';
import { useToasts } from "react-toast-notifications";
import CustomButtonRipple from '../../../Components/CustomButtonRipple';
import ButtonForFunction from '../../../Components/ButtonForFunction';
import { permissionList } from '../../../../../constants/AuthorizationConstant';
import ButtonLoader from '../../../Components/ButtonLoader';
import BreadCrumb from '../../../../../components/breadCrumb/BreadCrumb';

const AddNewIntakes = () => {
  const [monthIntake, setMonthIntake] = useState([]);
  const [yearIntake, setYearIntake] = useState([]);
  const history = useHistory();
  const { addToast } = useToasts();
  const [monthTypeIntakeLabel, setMonthTypeIntakeLabel] = useState('Select Month');
  const [monthTypeIntakeValue, setMonthTypeIntakeValue] = useState(0);
  const [yearTypeIntakeLabel, setYearTypeIntakeLabel] = useState('Select Year');
  const [yearTypeValue, setYearTypeValue] = useState(0);
  const [montheIntakerror, setMonthIntakeError] = useState('');
  const [yearIntakeError, setYearIntakeError] = useState('');
  const [buttonStatus, setButtonStatus] = useState(false);
  const [progress, setProgress] = useState(false);

  const permissions = JSON.parse(localStorage.getItem('permissions'));




  useEffect(() => {

    get('MonthDD/Index').then(res => {
      setMonthIntake(res);
    })
      .catch();

    get('YearDD/Index').then(res => {
      setYearIntake(res);
    })
      .catch();
  }, [])

  const monthMenu = monthIntake.map(monthOptions => ({ label: monthOptions.name, value: monthOptions.id }));
  const yearMenu = yearIntake.map(yearOptions => ({ label: yearOptions.name, value: yearOptions.id }));



  const handleCancel = () => {
    history.push("/intake");
  }

  const selectMonthType = (label, value) => {
    setMonthIntakeError('');
    setMonthTypeIntakeLabel(label);
    setMonthTypeIntakeValue(value);
  }

  const selectYearType = (label, value) => {
    setYearIntakeError('');
    setYearTypeIntakeLabel(label);
    setYearTypeValue(value);
  }



  const validateRegisterForm = () => {
    var isFormValid = true;
    if (monthTypeIntakeValue === 0) {
      isFormValid = false;
      setMonthIntakeError('Month is required');
    }

    if (yearTypeValue === 0) {
      isFormValid = false;
      setYearIntakeError('Year is required');
    }

    return isFormValid;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const subData = new FormData(event.target);
    //   for (var value of subData.values()) {
    //       
    //     }
    var formIsValid = validateRegisterForm(subData);


    if (formIsValid) {
      setButtonStatus(true);
      setProgress(true);
      post(`Intake/Create`, subData).then(action => {
        if (action?.status == 200 && action?.data?.isSuccess == true) {
          setProgress(false);
          setButtonStatus(false);
          addToast(action?.data?.message, {
            appearance: 'success',
            autoDismiss: true,
          })

        } else {
          addToast(action?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
        history.push({
          pathname: "/intake",
        });
      });
    }
  }

  // redirect to intakeList
  const backToIntakeList = () => {
    history.push("/intake");
  };

  return (
    <div>
      <Card>

        <BreadCrumb
          title="Add Intake"
          backTo="Intake List"
          path="/intake"
        />

        <Form onSubmit={handleSubmit} className='m-3'>
          <FormGroup row>
            <Col md="4">
              <span>
                <span style={{ color: '#1e98b0', fontSize: '14px' }}>Intake Month</span> <span className="text-danger">*</span>{" "}
              </span>
            </Col>

            <Col md="4">
              <Select
                options={monthMenu}
                value={{ label: monthTypeIntakeLabel, value: monthTypeIntakeValue }}
                onChange={(opt) => selectMonthType(opt.label, opt.value)}
                name="monthId"
                id="monthId"
              />
              {
                <span className='text-danger'>{montheIntakerror}</span>
              }
            </Col>

            <Col md="4">

            </Col>
          </FormGroup>

          <FormGroup row className='mt-3'>
            <Col md="4">
              <span>
                <span style={{ color: '#1e98b0', fontSize: '14px' }}>Intake Year</span> <span className="text-danger">*</span>{" "}
              </span>
            </Col>

            <Col md="4">
              <Select
                options={yearMenu}
                value={{ label: yearTypeIntakeLabel, value: yearTypeValue }}
                onChange={(opt) => selectYearType(opt.label, opt.value)}
                name="yearId"
                id="yearId"
              />
              {
                <span className='text-danger'>{yearIntakeError}</span>
              }

              <FormGroup
                className="has-icon-left position-relative mt-3"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* <Link to="/intake"> */}


                <CustomButtonRipple
                  type={"submit"}
                  className={"mr-1 mt-3 badge-primary mx-auto"}
                  name={progress ? <ButtonLoader /> : "Submit"}
                  isDisabled={buttonStatus}
                />


                {/* </Link> */}

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

export default AddNewIntakes;