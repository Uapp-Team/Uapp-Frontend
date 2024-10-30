import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import ContentCard from "./ContentCard";
import SideModal from "./SideModal";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../constants/userTypeConstant";
import Uget from "../../../helpers/Uget";
import { Link } from "react-router-dom/cjs/react-router-dom";
import GroupButton from "../../../components/buttons/GroupButton";
import Pagination from "../Pagination/Pagination";
import { rootUrl } from "../../../constants/constants";

const ContentHub = () => {
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const [data, setData] = useState([]);
  const [statusValue, setStatusValue] = useState("1");
  const [checkData, setCheckData] = useState([]);
  const [checkLength, setCheckLength] = useState(0);
  const [FileList, setFileList] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 15;
  const searchStr = "";
  // const [dataPerPage, setDataPerPage] = useState(15);
  // const [searchStr, setSearchStr] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelect, setTagsSelect] = useState([]);

  useEffect(() => {
    Uget(
      `MarketingContent/get-tag-selects?userTypeId=${userType}&status=${statusValue}`
    ).then((res) => {
      setTags(res);
    });
  }, [statusValue, success, userType]);

  useEffect(() => {
    userType === userTypes?.SystemAdmin.toString() ||
    userType === userTypes?.Admin.toString()
      ? Uget(
          `MarketingContent/get-pending-by-paging?page=${currentPage}&pageSize=${dataPerPage}&searchstring=${searchStr}&userType=${0}&tagfilter=${tagsSelect}`
        ).then((res) => {
          setData(res);
        })
      : Uget(
          `MarketingContent/get-by-paging?page=${currentPage}&pageSize=${dataPerPage}&searchstring=${searchStr}&userType=${userType}&tagfilter=${tagsSelect}&userId=${referenceId}&status=${statusValue}`
        ).then((res) => {
          setData(res);
        });
  }, [
    currentPage,
    dataPerPage,
    searchStr,
    tagsSelect,
    success,
    userType,
    referenceId,
    statusValue,
  ]);

  const handleTagSelect = (e, id, val) => {
    if (val === true) {
      setTagsSelect([...tagsSelect, id]);
    } else {
      const res = tagsSelect.filter((c) => c !== id);
      setTagsSelect(res);
    }
  };

  const handleChange = (e) => {
    let data = checkData;
    if (e.target.checked) {
      data.push(e.target.value);
    } else {
      let index = data.indexOf(e.target.value);
      data.splice(index, 1);
    }
    setCheckData(data);
    setCheckLength(checkData.length);
  };

  const handleBulkDownload = () => {
    const filteredArray = data?.items.filter((item) =>
      checkData.includes(item.id.toString())
    );

    filteredArray.map((item, i) => {
      fetch(`${rootUrl + item?.content?.fileUrl}`)
        .then((response) => response.blob())
        .then((blob) => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = item?.content?.fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => console.error("Error downloading :", error));
    });
  };

  return (
    <>
      <BreadCrumb title="Content Hub" backTo="" path="/content" />
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-md-flex justify-content-between align-items-center">
          {userType === userTypes?.SystemAdmin.toString() ||
          userType === userTypes?.Admin.toString() ? (
            <h3>Pending Item</h3>
          ) : (
            <>
              <GroupButton
                list={[
                  { id: "1", name: "Aproved" },
                  { id: "2", name: "Pending" },
                  { id: "3", name: "Reject" },
                ]}
                value={statusValue}
                setValue={setStatusValue}
                action={() => {
                  setCurrentPage(1);
                  setDetailsModal(false);
                }}
              />
            </>
          )}

          <div className="mt-2 mt-md-0">
            <Link to="/content" className="text-uapp">
              <span className="text-underline mr-2">Back to content files</span>
              <i class="fas fa-chevron-right"></i>
            </Link>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-between mb-30px">
          <div>
            {tags?.data?.map((item, i) => (
              <input
                key={i}
                type="button"
                name="campusId"
                id="campusId"
                className={`search-key pointer ${
                  tagsSelect?.includes(item?.name) && "bg-select-tag"
                }`}
                value={item?.name}
                onClick={(e) =>
                  handleTagSelect(
                    e,
                    item?.name,
                    tagsSelect?.includes(item?.name) ? false : true
                  )
                }
              />
            ))}
          </div>
          <div>
            <span className="search-key pointer" onClick={handleBulkDownload}>
              {checkLength} Download
              <i className="fas fa-arrow-down text-dark-green ml-2 "></i>
            </span>
          </div>
        </div>

        <Row>
          {data?.items?.length > 0 ? (
            <>
              {data?.items?.map((item, i) => (
                <Col xl={2} lg={3} md={4} sm={6} key={i}>
                  <ContentCard
                    item={item}
                    checkData={checkData}
                    handleChange={handleChange}
                    success={success}
                    setSuccess={setSuccess}
                    permission={true}
                  />
                </Col>
              ))}
            </>
          ) : (
            <h2 className="text-center mx-auto w-50 my-5"> No Content Found</h2>
          )}
        </Row>
        <Pagination
          dataPerPage={dataPerPage}
          totalData={data?.totalFiltered}
          paginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>

      {detailsModal && (
        <SideModal
          title="Upload"
          closeModal={() => setDetailsModal(false)}
          details={FileList}
          setDetails={setFileList}
          isDetails={false}
          success={success}
          setSuccess={setSuccess}
        />
      )}
    </>
  );
};

export default ContentHub;
