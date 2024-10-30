import React from "react";
import Text from "../UI/Text";
import Status from "../../components/ui/Status";
import { Row } from "react-bootstrap";
import SubHeading from "../../components/ui/SubHeading";
import CloseBtn from "../../components/buttons/CloseBtn";
import TextBeside from "../UI/TextBeside";

const HistoryDetails = ({ action }) => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <SubHeading text="History Details" />
        <CloseBtn action={action} />
      </div>
      <Row>
        <TextBeside title="Date" text="10/3/2023" />

        <TextBeside title="Branch" text="Bluebay" />

        <TextBeside title="Consultant" text="Towkir" />

        <div className="d-flex">
          <div className="w-50">
            <TextBeside title="Status" />
          </div>
          <div>
            <Status text="In Progress" />
          </div>
        </div>
      </Row>

      <TextBeside title="Note" />

      <Text text="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)." />
    </div>
  );
};

export default HistoryDetails;
