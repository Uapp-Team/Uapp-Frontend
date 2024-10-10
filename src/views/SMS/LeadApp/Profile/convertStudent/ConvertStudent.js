import React, { useState } from "react";
import ConvertStudentForm from "./ConvertStudentForm";
import SaveButton from "../../../../../components/buttons/SaveButton";
import CardHeading from "../../../../../components/ui/CardHeading";
import { Modal, ModalBody } from "reactstrap";

const ConvertStudent = ({ id, student, isConvert, refetch }) => {
  const [modalForConvertStudent, setModalForConvertStudent] = useState(false);

  const defaultData = {
    consultantId: student?.consultantId ? student?.consultantId : 1,
    universityCountryId: 1,
    firstName: student?.name,
    lastName: "",
    email: student?.email,
  };

  return (
    <>
      {/* {isConvert && ( */}
      <div className="custom-card-border p-4 mb-0">
        <CardHeading text="Do you want to convert as a student ?" />
        <SaveButton
          text="Convert"
          action={() => setModalForConvertStudent(true)}
        />
      </div>
      {/* )} */}

      <Modal
        isOpen={modalForConvertStudent}
        toggle={() => setModalForConvertStudent(false)}
        centered
      >
        <ModalBody>
          <ConvertStudentForm
            id={id}
            defaultData={defaultData}
            refetch={refetch}
            action={() => setModalForConvertStudent(false)}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConvertStudent;
