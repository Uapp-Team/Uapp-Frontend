import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { Drawer } from "antd";
import { Link, useHistory } from "react-router-dom";
import get from "../../../../helpers/get";
import Vectorbeat from "../../../../assets/img/Vectorbeat.svg";
import { rootUrl } from "../../../../constants/constants";
import { useParams } from "react-router-dom";

export default function UserNotices() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [userNoticeList, setUserNoticeList] = useState([]);

  useEffect(() => {
    // get(`SystemAdminDashboard/Counting`).then((res) => {
    get(`Notice/NoticeSidebar`).then((res) => {
      setUserNoticeList(res);
      console.log(res, "user notice");
    });
  }, []);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ cursor: "pointer" }}>
        <div className="std-dashboard-style6" onClick={showDrawer}></div>

        <div onClick={function noRefCheck() {}}>
          <img
            src={Vectorbeat}
            className="img-fluid dashbard-img-style2"
            onClick={showDrawer}
            alt=""
          />
          <Drawer placement="right" onClose={onClose} open={open}>
            <h1 className="news-feed-title mb-15px">NOTICE</h1>

            {userNoticeList?.map((userNotice, i) => (
              <div className="notice-card">
                <div className="mt-2">
                  <span className="notice-time-style">
                    {userNotice?.createdOn}
                  </span>
                </div>
                <div className="notice-image-style mb-2">
                  <span className="notice-user-name">{userNotice?.title}</span>

                  <div className="mt-3 mb-3">
                    {userNotice?.attachment !== null ? (
                      <>
                        {userNotice === null ? (
                          "-"
                        ) : (
                          <a
                            href={rootUrl + userNotice?.attachment}
                            target="blank"
                          >
                            <span className="view-notice-file">
                              View Attachment
                            </span>
                          </a>
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3 d-flex justify-content-end">
                  <Link to={`/view-notice/${userNotice?.id}`}>
                    <span className="link-view-notice">
                      <i className="fas fa-eye"></i>View
                    </span>
                  </Link>
                </div>
              </div>
            ))}

            <Link to="/notices" className="notice-view-all">
              {" "}
              See All<i className="fas fa-angles-right ml-3"></i>
            </Link>
          </Drawer>
        </div>
      </div>
    </>
  );
}
