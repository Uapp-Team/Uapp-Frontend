import React from "react";
import { AiOutlineProfile } from "react-icons/ai";
import CardHeading from "../../../../components/ui/CardHeading";
import Pointer from "../../../../components/ui/Pointer";

const ApplicationTimeline = ({ data }) => {
  return (
    <div className="custom-card-border p-4 mb-3">
      <CardHeading Icon={AiOutlineProfile} text="Application Timeline" />
      <ul className="profile-timeline">
        {data?.map((timeline, i) => (
          <li className="border-left" key={i}>
            <div className="mb-8px d-flex align-items-center">
              <span className="teal-500">{timeline.status}</span>
              <span className="mr-6px ml-6px mb-2px">
                <Pointer color="#64748B" />
              </span>
              <span> {timeline.date}</span>
            </div>
            <div className="bg-gray-100 gray-500 p-8px rounded">
              {timeline.details}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationTimeline;
