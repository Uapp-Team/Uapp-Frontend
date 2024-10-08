import React from "react";
import { Card } from "reactstrap";

const ProfileNotice = () => {
  return (
    <Card className="p-4">
      <h5>Notice</h5>
      <hr />
      <div>
        <p>Super Admin</p>
        <p className="text-gray-70">
          University of Suffolk admissions open for September 2022 intake. View
        </p>
        <p className="text-gray">02:14 PM 19/07/22</p>
      </div>
    </Card>
  );
};

export default ProfileNotice;
