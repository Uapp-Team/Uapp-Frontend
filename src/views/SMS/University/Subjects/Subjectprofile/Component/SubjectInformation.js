import React from "react";
import { Card, CardBody, Table } from "reactstrap";
import Select from "react-select";

const SubjectInformation = (uniData) => {
  return (
    <div>
      <div>
        <h1 className="subject-profile-text">
          Bachelor of Science (Honours) - Architectural Technology
        </h1>
      </div>

      <div className="w-sm-75-90 mx-auto  relative-top-20">
        <div className="row">
          <div className="col-lg-7 col-md-6 col-sm-12">
            <h3 className="courses" style={{ fontWeight: 600 }}>
              Courses Summary
            </h3>
            <p className="paragraph">{uniData?.description}</p>
          </div>
          <div className="col-lg-5 col-md-6 col-sm-12">
            <Card style={{ paddingTop: 15 }}>
              <CardBody className="">
                <div>
                  <h5>Course Duration :</h5>
                  <p>{uniData?.duration}</p>
                </div>
                <div>
                  <h5>Academic Course Level :</h5>
                  <p>{uniData?.educationLevel?.name}</p>
                </div>
                <div>
                  <h5>Tuition Fee :</h5>
                  <p>
                    Int. : {uniData?.subjectFee?.internationalTutionFee}
                    <br /> Local : {uniData?.subjectFee?.localTutionFee}
                  </p>
                </div>
                <div className="mb-3">
                  <h5>Location :</h5>
                  <Select
                    // options={deptDD}

                    // value={{ label: deptLabel, value: deptValue }}
                    // onChange={(opt) => selectDept(opt.label, opt.value)}
                    name="UniversityTypeId"
                    id="UniversityTypeId"
                    // isDisabled={univerTypeId !== undefined ? true : false}
                  />
                </div>
                <div>
                  <h5>Available Intake :</h5>
                  <Select
                    // options={deptDD}

                    // value={{ label: deptLabel, value: deptValue }}
                    // onChange={(opt) => selectDept(opt.label, opt.value)}
                    name="UniversityTypeId"
                    id="UniversityTypeId"
                    // isDisabled={univerTypeId !== undefined ? true : false}
                  />
                </div>
                <div className="mt-3">
                  <button type="submit" className="subject-profile-btn">
                    Apply Now
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectInformation;
