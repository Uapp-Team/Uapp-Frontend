import React from "react";
import Select from "react-select";

const DataShow = ({ dataPerPage, setDataPerPage, setCurrentPage }) => {
  // user select data per page
  const dataSizeArr = [10, 15, 20, 30, 50, 100, 1000];
  const dataSizeName = dataSizeArr.map((dsn) => ({ label: dsn, value: dsn }));

  const selectDataSize = (value) => {
    setDataPerPage(value);
    setCurrentPage && setCurrentPage(1);
  };

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <div className="mr-2">Showing :</div>
        <div className="ddzindex">
          <Select
            options={dataSizeName}
            value={{ label: dataPerPage, value: dataPerPage }}
            onChange={(opt) => selectDataSize(opt.value)}
          />
        </div>
      </div>
    </>
  );
};

export default DataShow;
