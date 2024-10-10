import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import get from "../../../../../helpers/get";
import InvitationAction from "../../../Affiliate/AffiliateInvitation/InvitationAction";

const RecentInvitations = ({ count }) => {
  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-flex">
          <h5 className="mb-0">Recent invitations</h5>
        </div>

        {count?.affiliateInfos?.length === 0 ? (
          <p className="text-center">No Recent invitations</p>
        ) : (
          <>
            <div className="overflowY-300px">
              <Table responsive className="mt-3">
                <thead className="tablehead">
                  <tr>
                    <td className="border-0">Date</td>
                    <td className="border-0">Email</td>
                    <td className="border-0">Status</td>
                    <td className="border-0">Action</td>
                  </tr>
                </thead>
                <tbody>
                  {count?.affiliateInfos?.map((item, i) => (
                    <tr key={i} className="border-buttom">
                      <td>{item?.createdOn}</td>
                      <td>{item?.email}</td>
                      <td>{item?.invitationStatusString}</td>
                      <td className="text-id hover">
                        {" "}
                        <InvitationAction
                          text={
                            item?.inviationStatus === 1 ? "Resend" : "Timeline"
                          }
                          email={item?.email}
                          data={item?.affiliateInvitationTimeline}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecentInvitations;
