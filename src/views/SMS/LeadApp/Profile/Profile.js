import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ApplicationTimeline from "./ApplicationTimeline";
import { useParams } from "react-router-dom";
// import { Get } from "../../api/method";
// import Loading from "../../components/ui/Loading";
// import ErrorMessage from "../../components/ui/ErrorMessage";
// import LeadStatus from "../lead/LeadStatus";
import LeadFields from "./LeadFields";
import Note from "./note/Note";
// import CardHeading from "../../components/ui/CardHeading";
import { TiDocumentText } from "react-icons/ti";
import ProfileInfo from "./ProfileInfo";
import Lget from "../../../../helpers/Lget";
import CardHeading from "../../../../components/ui/CardHeading";
import { Consultant } from "../../../../components/core/User";
import TextBeside from "../Common/TextBeside";
import LeadStatus from "../Common/LeadStatus";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const Profile = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [convertData, setconvertData] = useState([]);
  const [refetch, setrefetch] = useState(false);
  const [convertRefetch, setconvertRefetch] = useState(false);

  // const { data: convertData, refetch: convertRefetch } = Get(
  //   "key",
  //   `/LeadProfile/IsConvertable/${id}`
  // );

  // const { data, error, isLoading, isError, refetch } = Get(
  //   "key",
  //   `/LeadProfile?id=${id}`
  // );

  useEffect(() => {
    Lget(`LeadProfile?id=${id}`).then((res) => {
      setData(res?.data);
    });
  }, [id, refetch]);

  useEffect(() => {
    Lget(`LeadProfile/IsConvertable/${id}`).then((res) => {
      setconvertData(res?.data);
    });
  }, [id, convertRefetch]);

  // if (isLoading) return <Loading />;
  // if (isError) return <ErrorMessage message={error.message} />;
  console.log(data);
  const pageData = data;
  return (
    <>
      <BreadCrumb title="Profile" backTo="Lead List" path="/leadList" />

      <Row>
        <Col xxl="4" lg="5">
          <ProfileInfo
            pageData={pageData}
            convertData={convertData}
            refetch={() => setrefetch(!refetch)}
            convertRefetch={() => setconvertRefetch(!convertRefetch)}
          />
          {pageData?.statusName !== "Converted" && (
            <>
              {pageData?.assignedTo && (
                <LeadStatus
                  data={{
                    leadId: id,
                    status: pageData?.statusId,
                    statusName: pageData?.statusName,
                  }}
                  refetch={() => {
                    setrefetch(!refetch);
                    setconvertRefetch(!convertRefetch);
                  }}
                />
              )}
            </>
          )}

          {pageData?.leadTimeline?.length > 0 && (
            <ApplicationTimeline data={pageData?.leadTimeline} />
          )}

          {(!Consultant() || pageData?.assignedTo) && <Note id={id} />}
        </Col>
        <Col xxl="8" lg="7">
          {pageData?.sourceType === 6 && pageData?.formInfo && (
            <div className="custom-card-border p-4 mb-3 bg-ecfcfd">
              <CardHeading Icon={TiDocumentText} text="Form Information" />
              <TextBeside title="Form name" text={pageData?.formInfo.name} />
            </div>
          )}
          {pageData?.sourceType === 3 && pageData?.campainInfo && (
            <div className="custom-card-border p-4 mb-3 bg-ecfcfd">
              <CardHeading Icon={TiDocumentText} text="Form Information" />
              <TextBeside
                title="Page name"
                text={pageData?.campainInfo.pageName}
              />
              <TextBeside title="Form ID" text={pageData?.campainInfo.genId} />
              <TextBeside title="Form name" text={pageData?.campainInfo.name} />
            </div>
          )}

          {pageData?.sourceType === 5 && pageData?.eventInfo && (
            <div className="custom-card-border p-4 mb-3 bg-ecfcfd">
              <CardHeading Icon={TiDocumentText} text="Event Information" />
              <TextBeside title="Event date" text={pageData?.eventInfo.date} />
              <TextBeside title="Event name" text={pageData?.eventInfo.name} />
              <TextBeside title="Event type" text={pageData?.eventInfo.type} />
            </div>
          )}
          <LeadFields data={pageData?.leadFields} />
          {/* <StudentInfo />
          <PreviousHistory /> */}
        </Col>
      </Row>
    </>
  );
};

export default Profile;
