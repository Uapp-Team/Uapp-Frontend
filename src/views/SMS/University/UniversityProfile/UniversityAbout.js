import React, { useEffect, useState } from "react";
import get from "../../../../helpers/get";
import { useParams } from "react-router-dom";
import { rootUrl } from "../../../../constants/constants";

const UniversityAbout = ({
  programLevel,
  programLength,
  livingCost,
  tutionCost,
  placement,
  language,
  accomodation,
  letter,
  right,
  wrong,
  uniData,
}) => {
  const { id } = useParams();
  const [gallery, setGallery] = useState([]);
  const [FileList, setFileList] = useState([]);
  useEffect(() => {
    get(`UniversityGallery/GetByUniversity/${id}`).then((res) => {
      setGallery(res);
    });
  }, [id]);
  return (
    <>
      <div className="mt-3 ">
        <div className="aboutContentHeader mb-2">{uniData?.name}</div>
        <p className="description">{uniData?.description}</p>

        {/* <button
          style={{ marginTop: "24px" }}
          className="contactBtn contactBtnText"
        >
          CONTACT US
        </button> */}
      </div>
      <div class="universityOtherInfo px-4 pt-4 mt-5">
        <div className="">
          <div className="row">
            <div className="col-12 col-md-12 col-lg-6 mb-4">
              <div className="infoAndCostCard">
                <div
                  style={{ padding: "10px" }}
                  className="d-flex align-items-center mt-4"
                >
                  <div className="">
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={programLevel}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="universityOtherInfoText">
                      3-Year Bachelor's Degree
                    </div>
                    <div className="universityOtherInfoSubText">
                      Course Level
                    </div>
                  </div>
                </div>

                <div
                  style={{ padding: "10px" }}
                  className="d-flex align-items-center"
                >
                  <div>
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={programLength}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="universityOtherInfoText">
                      3-Year Bachelor's Degree
                    </div>
                    <div className="universityOtherInfoSubText">
                      Course Length
                    </div>
                  </div>
                </div>

                <div
                  style={{ padding: "10px" }}
                  className="d-flex align-items-center"
                >
                  <div>
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={livingCost}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="universityOtherInfoText">
                      £9,135.00 GBP/Year
                    </div>
                    <div className="universityOtherInfoSubText">
                      Cost of Living
                    </div>
                  </div>
                </div>

                <div
                  style={{ padding: "10px" }}
                  className="d-flex align-items-center"
                >
                  <div>
                    <img
                      style={{ width: "40px", height: "40px" }}
                      src={tutionCost}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="universityOtherInfoText">
                      £17,700.00 GBP/Year
                    </div>
                    <div className="universityOtherInfoSubText">Tuition</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-12 col-lg-6">
              <div className="row">
                <div className="col-6 mb-4">
                  <div className="otherCard">
                    <div className="d-flex justify-content-around mt-1">
                      <img src={placement} alt="" />
                      <img src={right} alt="" />
                    </div>
                    <div className="ml-2 otherCardText my-2">
                      Placement Opportunities
                    </div>
                  </div>
                </div>
                <div className="col-6  mb-4">
                  <div className="otherCard">
                    <div className="d-flex justify-content-around mt-1">
                      <img src={language} alt="" />
                      <img src={right} alt="" />
                    </div>
                    <div className="ml-2 otherCardText my-2">
                      English <br />
                      requirements
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="otherCard">
                    <div className="d-flex justify-content-around mt-1">
                      <img src={letter} alt="" />
                      <img src={right} alt="" />
                    </div>
                    <div className="ml-2 otherCardText my-2">
                      Conditional <br /> Offer Letter
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="otherCard">
                    <div className="d-flex justify-content-around mt-1">
                      <img src={accomodation} alt="" />
                      <img src={wrong} alt="" />
                    </div>
                    <div className="otherCardText my-2">Accommodations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5">
        {gallery.length > 0 ? (
          <div className="row">
            {gallery.map((gall, i) => (
              <div className="col-12 col-sm-2 col-md-4 mb-3">
                <div key={i} className="containerCustom">
                  <img
                    src={rootUrl + gall?.mediaFileMedia?.thumbnailUrl}
                    alt="Avatar"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>There is no gallery item added here.</p>
        )}
      </div>
    </>
  );
};

export default UniversityAbout;
