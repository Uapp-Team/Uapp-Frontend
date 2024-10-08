import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Card, CardBody, TabContent, TabPane } from "reactstrap";

import AddUniversityFeatures from "./AddUniversityFeatures";
import UniversityNavbar from "../Components/UniversityNavbar";
import AddUniversityGallery from "./AddUniversityGallery";
import BreadCrumb from "../../../../components/breadCrumb/BreadCrumb";

const AddUniversityFeaturesGallery = () => {
  const activetab = "4";

  const { univerId } = useParams();

  return (
    <div>
      <BreadCrumb
        title="University Features and Gallery Information"
        backTo="University"
        path="/universityList"
      />

      <UniversityNavbar activetab={activetab} univerId={univerId} />
      <Card>
        <CardBody>
          <TabContent activeTab={activetab}>
            <TabPane tabId="4">
              <AddUniversityFeatures />
              <AddUniversityGallery />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    </div>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps)(AddUniversityFeaturesGallery);
