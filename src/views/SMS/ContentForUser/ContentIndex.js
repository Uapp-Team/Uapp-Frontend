import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";
import ContentCard from "./ContentCard";
import SideModal from "./SideModal";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import { userTypes } from "../../../constants/userTypeConstant";
import Uget from "../../../helpers/Uget";
import { Link } from "react-router-dom/cjs/react-router-dom";
import GroupButton from "../../../components/buttons/GroupButton";
import SideCategory from "./SideCategory";
import Pagination from "../Pagination/Pagination";
import Uremove from "../../../helpers/Uremove";
import { useToasts } from "react-toast-notifications";
import { rootUrl } from "../../../constants/constants";

const ContentIndex = () => {
  const { addToast } = useToasts();
  const userType = localStorage.getItem("userType");
  const referenceId = localStorage.getItem("referenceId");
  const [statusValue, setStatusValue] = useState(1);
  const [data, setData] = useState([]);
  const [userValue, setUserValue] = useState(userType === "1" ? 0 : userType);
  const [checkData, setCheckData] = useState([]);
  const [checkLength, setCheckLength] = useState(0);
  const [FileList, setFileList] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 15;
  const searchStr = "";
  // const [dataPerPage, setDataPerPage] = useState(15);
  // const [searchStr, setSearchStr] = useState("");
  const [tags, setTags] = useState([]);
  const [tagsSelect, setTagsSelect] = useState([]);
  const [approvedCount, setapprovedCount] = useState(0);
  const [pendingCount, setpendingCount] = useState(0);
  const [rejectedCount, setrejectedCount] = useState(0);

  const adminPermission =
    userType === userTypes?.SystemAdmin.toString() ||
    userType === userTypes?.Admin.toString();

  const changeHandler = (e) => {
    setFileList(e.target.files[0]);
    setDetailsModal(true);

    // console.log(e.target.files[0]?.name);
    // console.log("File", FileList?.name);
    // if (!FileList) {
    //   setFileList(e.target.files[0]);
    //   setDetailsModal(true);
    // } else {
    //   if (FileList?.name === e.target.files[0]?.name) {
    //     setDetailsModal(true);
    //   } else {
    //     setFileList(e.target.files[0]);
    //     setDetailsModal(true);
    //   }
    // }
  };

  useEffect(() => {
    Uget(
      `MarketingContent/get-tag-selects?userTypeId=${userValue}&status=${statusValue}`
    ).then((res) => {
      setTags(res);
    });
  }, [statusValue, success, userValue]);

  useEffect(() => {
    Uget(`MarketingContent/get-count?status=1`).then((res) => {
      setapprovedCount(res?.data);
    });

    Uget(`MarketingContent/get-count?status=2`).then((res) => {
      setpendingCount(res?.data);
    });

    Uget(`MarketingContent/get-count?status=3`).then((res) => {
      setrejectedCount(res?.data);
    });
  }, [success, statusValue]);

  useEffect(() => {
    adminPermission
      ? Uget(
          `MarketingContent/get-by-paging?page=${currentPage}&pageSize=${dataPerPage}&searchstring=${searchStr}&userType=${userValue}&tagfilter=${tagsSelect}&status=${statusValue}`
        ).then((res) => {
          setData(res);
        })
      : Uget(
          `MarketingContent/get-approved-by-paging?page=${currentPage}&pageSize=${dataPerPage}&searchstring=${searchStr}&userType=${userValue}&tagfilter=${tagsSelect}`
        ).then((res) => {
          setData(res);
        });
  }, [
    currentPage,
    dataPerPage,
    searchStr,
    tagsSelect,
    userValue,
    success,
    adminPermission,
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

  const handleBulkDelete = () => {
    const deleteArray = {
      data: {
        ids: checkData,
      },
    };

    Uremove(`MarketingContent/bulk-delete`, deleteArray).then((res) => {
      addToast(res?.data?.title, {
        appearance: "error",
        autoDismiss: true,
      });
      setCheckData([]);
      setCheckLength(0);
      setSuccess(!success);
    });
  };

  const handleBulkDownload = () => {
    const filteredArray = data?.items.filter((item) =>
      checkData.includes(item.id.toString())
    );

    filteredArray.map((item) => {
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

    // setCheckData([]);
    // setCheckLength(0);
  };

  return (
    <>
      <BreadCrumb
        title={`${
          adminPermission && statusValue === 1
            ? "Approved "
            : statusValue === 2
            ? "Pending "
            : statusValue === 3
            ? "Reject "
            : ""
        }Content`}
        backTo=""
        path="/"
      />
      <div className="custom-card-border p-4 mb-30px">
        <div className="d-md-flex justify-content-between align-items-center">
          {userType === userTypes?.SystemAdmin.toString() ||
          userType === userTypes?.Admin.toString() ? (
            <GroupButton
              list={[
                { id: 0, name: "All" },
                { id: "13", name: "Consultant" },
                { id: "18", name: "Affiliate" },
                { id: "19", name: "Companion" },
              ]}
              value={userValue}
              setValue={setUserValue}
              action={() => setCurrentPage(1)}
            />
          ) : (
            <h3>Content files</h3>
          )}

          <div className="mt-2 mt-md-0">
            {adminPermission ? (
              <>
                {/* <Link to="/contentHub" className="text-secondary ml-4"> */}

                {statusValue !== 1 && (
                  <span
                    className="text-secondary ml-4 pointer"
                    onClick={() => setStatusValue(1)}
                  >
                    Approved
                    <spam className="count">{approvedCount}</spam>
                  </span>
                )}
                {statusValue !== 2 && (
                  <span
                    className="text-secondary ml-4 pointer"
                    onClick={() => setStatusValue(2)}
                  >
                    Pending
                    <spam className="count">{pendingCount}</spam>
                  </span>
                )}
                {statusValue !== 3 && (
                  <span
                    className="text-secondary ml-4 pointer"
                    onClick={() => setStatusValue(3)}
                  >
                    Reject
                    <spam className="count">{rejectedCount}</spam>
                  </span>
                )}
              </>
            ) : (
              <Link to="/contentHub" className="text-secondary">
                <span className="text-underline">My Content</span>
                <i class="fas fa-chevron-right ml-1"></i>
              </Link>
            )}
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

            {adminPermission && (
              <span
                className="search-key pointer manage-category"
                onClick={() => setCategoryModal(!categoryModal)}
              >
                <i class="fas fa-tools mr-2"></i> Manage Category
              </span>
            )}
          </div>

          <div>
            <span className="search-key pointer" onClick={handleBulkDownload}>
              {checkLength} Download
              <i className="fas fa-arrow-down text-dark-green ml-2 "></i>
            </span>
            {adminPermission && (
              <span
                className="search-key bg-orange-light mr-0 pointer"
                onClick={handleBulkDelete}
              >
                {checkLength} Delete
                <i class="far fa-trash-alt ml-2"></i>
              </span>
            )}
          </div>
        </div>

        <Row>
          <Col xl={2} lg={3} md={4} sm={6}>
            <Card className="custom-card-border bg-theme">
              <label
                className="text-center pointer"
                style={{
                  margin: `82px 0`,
                }}
                htmlFor="content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                  fill="none"
                >
                  <path
                    d="M31.9997 21.3333V42.6666M42.6663 31.9999H21.333"
                    stroke="#367D7E"
                    stroke-width="3.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M58.6663 31.9999C58.6663 17.2723 46.7271 5.33325 31.9997 5.33325C17.2721 5.33325 5.33301 17.2723 5.33301 31.9999C5.33301 46.7274 17.2721 58.6666 31.9997 58.6666C46.7271 58.6666 58.6663 46.7274 58.6663 31.9999Z"
                    stroke="#367D7E"
                    stroke-width="3.5"
                  />
                </svg>
              </label>
              <input
                name="content"
                id="content"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  // setDetailsModal(true);
                  changeHandler(e);
                }}
              />
            </Card>
          </Col>

          {data?.items?.map((item, i) => (
            <Col xl={2} lg={3} md={4} sm={6} key={i}>
              <ContentCard
                item={item}
                checkData={checkData}
                handleChange={handleChange}
                success={success}
                setSuccess={setSuccess}
                permission={statusValue === 1 ? false : true}
              />
            </Col>
          ))}
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

      {categoryModal && (
        <SideCategory
          userType={userValue}
          closeModal={() => setCategoryModal(false)}
        />
      )}
    </>
  );
};

export default ContentIndex;
