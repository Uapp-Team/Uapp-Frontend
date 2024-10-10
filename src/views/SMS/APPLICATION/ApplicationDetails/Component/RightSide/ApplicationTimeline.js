import React from "react";

const ApplicationTimeline = ({ applicationTimeline, id }) => {
  return (
    <div className="custom-card-border p-4 mb-3 ">
      <div id={id}>
        <h5>Application Timeline</h5>

        <div className="overflowY-300p">
          <ul className="pt-3 pl-2">
            {applicationTimeline?.map((timeline, i) => (
              <li className="list" key={i}>
                <div class="text-green">{timeline?.date}</div>
                <span>
                  <b>{timeline?.statusName}</b>
                </span>
                {timeline?.subStatusName?.length !== 0 ? (
                  <>
                    <br />
                    <span className="text-gray-70">
                      {timeline?.subStatusName}
                    </span>
                  </>
                ) : null}
                {timeline?.note != null ? (
                  <>
                    <br />
                    <span>
                      <i>{timeline?.note}</i>
                    </span>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        {/* application timeline ends here */}
      </div>
    </div>
  );
};

export default ApplicationTimeline;
