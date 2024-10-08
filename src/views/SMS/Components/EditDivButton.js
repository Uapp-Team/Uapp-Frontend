import React from 'react';

const EditDivButton = (props) => {
    const {className, func, permission} = props;

 

    return (
        <>
          
           
            <div className={className}>
              <div className="text-right">
                  <span style={{cursor: "pointer"}}  onClick={func}> <i className="fas fa-pencil-alt pencil-style"></i> </span>
              </div>
            </div>
           
       
        </>
    );
};

export default EditDivButton;