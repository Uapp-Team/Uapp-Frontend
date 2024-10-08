import React from 'react';
import { Col, FormGroup, Input } from 'reactstrap';

const GovernmentLoan = ({govtFunding}) => {
    return (
        <div>
              <FormGroup row className="has-icon-left position-relative">
              <Col md="2">
                <span>
                Government Loan/Fund <span className="text-danger">*</span>{" "}
                </span>
               
              </Col>
              <Col md="6">
               
                <Input
                type='textarea'
                placeholder='Add loan amount in the box'
                required
                name='details'
                id='details'
                defaultValue={govtFunding?.details}
                />

             
                     
                 

              </Col>
            </FormGroup>
            
        </div>
    );
};

export default GovernmentLoan;