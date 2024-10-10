import React, { useState } from "react";
import SubHeading from "../../components/ui/SubHeading";
import { Modal, Table } from "react-bootstrap";
import Status from "../../components/ui/Status";
import ButtonText from "../../components/buttons/ButtonText";
import HistoryDetails from "./HistoryDetails";

const PreviousHistory = () => {
  const [id, setId] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="custom-card-border p-4 mb-3">
        <SubHeading text="Previous History / Log List" />

        <Table responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Branch</th>
              <th>Consultant</th>
              <th>Status</th>
              <th>Note</th>
            </tr>
          </thead>
          <tbody>
            {/* {list?.models?.map((item, i) => ( */}
            {/* <tr key={i}> */}
            <tr>
              <td>10/03/2024</td>
              <td>Bluebay</td>
              <td>Manna </td>
              <td>
                <Status text="Bad" />
              </td>
              <td className="gray-500">
                So excited to get started on this novel! The prose and style of
                it is absolutely gorgeous, and...
                <ButtonText
                  text="more"
                  action={() => {
                    setOpenModal(true);
                    setId(1);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>10/03/2024</td>
              <td>Bluebay</td>
              <td>Manna </td>
              <td>
                <Status text="Won" />
              </td>
              <td className="gray-500">
                So excited to get started on this novel! The prose and style of
                it is absolutely gorgeous, and ...
                <ButtonText
                  text="more"
                  action={() => {
                    setOpenModal(true);
                    setId(1);
                  }}
                />
              </td>
            </tr>

            {/* ))} */}
          </tbody>
        </Table>
      </div>

      <Modal show={openModal} onHide={() => setOpenModal(false)} centered>
        <Modal.Body>
          <HistoryDetails id={id} action={() => setOpenModal(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PreviousHistory;
