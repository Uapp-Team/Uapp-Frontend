import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Table } from "reactstrap";
import { rootUrl } from "../../../../../constants/constants";
import Institute from "../../../../../assets/img/Institute.svg";

const RecentUniversity = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="custom-card-border p-4 mb-30px">
        <h5>Recent University</h5>

        {data?.length === 0 ? (
          <p className="text-center">No University found</p>
        ) : (
          <>
            <Table responsive className="mt-3">
              <thead className="tablehead">
                <tr>
                  <th className="border-0">University</th>
                  <th className="border-0">Location</th>
                  <th className="border-0">Courses</th>
                  <th className="border-0">Applications </th>
                </tr>
              </thead>
              <tbody>
                {data?.universities?.map((item, i) => (
                  <tr key={i} className="border-buttom">
                    <td>
                      <Link
                        className="text-body"
                        to={`/universityDetails/${item?.id}`}
                      >
                        {item?.imageUrl ? (
                          <img
                            className="subject-university-logo bg-white mr-1"
                            src={rootUrl + item?.imageUrl}
                            alt=""
                          />
                        ) : (
                          <img
                            className="subject-university-logo bg-white mr-1"
                            src={Institute}
                            alt=""
                          />
                        )}
                        {item?.name}
                      </Link>
                    </td>

                    <td>{item?.location}</td>
                    <td>{item?.progams}</td>
                    <td>{item?.applications}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="text-center text-blue">
              <Link to="/universityList">See All</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecentUniversity;
