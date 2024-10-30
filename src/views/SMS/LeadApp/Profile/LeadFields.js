import React from "react";
import { HiOutlineDocumentText } from "react-icons/hi2";
import CardHeading from "../../../../components/ui/CardHeading";
import Text from "../Common/Text";

const LeadFields = ({ data }) => {
  return (
    <div className="custom-card-border p-4 mb-3">
      <CardHeading Icon={HiOutlineDocumentText} text="Lead Fields" />

      {data?.map((item, i) => (
        <div key={i}>
          {item.values && <Text title={item.name} text={item.values} />}
        </div>
      ))}
    </div>
  );
};

export default LeadFields;
