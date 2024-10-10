import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";
import get from "../../../../helpers/get";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Card, CardBody } from "reactstrap";
import { rootUrl } from "../../../../constants/constants";

const NoticeDetails = () => {
  const [noticeDetails, setNoticeDetails] = useState({});
  const { id } = useParams();
  console.log(id, "notice id");

  useEffect(() => {
    get(`Notice/Details/${id}`).then((res) => {
      setNoticeDetails(res);
      console.log("details", res);
    });
  }, [id]);

  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <div>
      <BreadCrumb
        title="Notice Details"
        backTo="Notice List"
        path="/NoticeList"
      />
      <Card>
        <CardBody>
          <h1 className="text-secondary fs-30px mb-3">
            {noticeDetails?.title}
          </h1>
          <span className="date-tag ">
            Created On : {noticeDetails?.createdOn}
          </span>
          <div className="my-4">
            {noticeDetails?.noticeForUsers?.map((users, i) => (
              <p className="user-type-tag">{users?.name}</p>
            ))}
          </div>
          <div className="mt-3 mb-5">
            {noticeDetails?.attachment !== null ? (
              <>
                {noticeDetails === null ? (
                  "-"
                ) : (
                  <a href={rootUrl + noticeDetails?.attachment} target="blank">
                    <span className="attachment-view-file">
                      View Attachment
                    </span>
                  </a>
                )}
              </>
            ) : null}
          </div>
          <div className="mt-3">
            <div
              dangerouslySetInnerHTML={createMarkup(noticeDetails?.content)}
            ></div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default NoticeDetails;
