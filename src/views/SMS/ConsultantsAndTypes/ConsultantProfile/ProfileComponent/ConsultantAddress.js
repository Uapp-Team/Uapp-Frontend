import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import get from "../../../../../helpers/get";

const ConsultantAddress = ({ id }) => {
  const [branch, setConsultantBranch] = useState({});
  // const [success, setSuccess] = useState(false);

  useEffect(() => {
    get(`ConsultantProfile/GetBranch/${id}`).then((res) => {
      setConsultantBranch(res);
    });
  }, [id]);

  return (
    <div>
      {branch === null ? null : (
        <Card className="p-4">
          <h5 className="mb-4">Consultant at</h5>
          <span>{branch?.branchName}</span>
          <span className="text-gray-70">{branch?.address}</span>
        </Card>
      )}
    </div>
  );
};

export default ConsultantAddress;
