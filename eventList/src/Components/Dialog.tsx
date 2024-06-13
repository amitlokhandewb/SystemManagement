import React, { useState } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

function Dialog({
  tempVisibleColumns,
  toggleTempColumnVisibility,
  handleSubmit,
  isModalOpen,
  setIsModalOpen
}) {

  return (
    <div >
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Customize Columns"
        style={{
          overlay: {
            backgroundColor: "rgba(105, 104, 104, 0.75)",
            
          },
          content: {
            width: "20%",
            height: "38%",
            margin: "auto",
            borderRadius: '10px'
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "20px",
          }}
        >
          <h3>Customize Columns</h3>
          <IoMdClose
            onClick={() => setIsModalOpen(false)}
            size={20}
            style={{ marginTop: "23px", marginRight: "20px" }}
          />
        </div>
        {tempVisibleColumns.map((col, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={col.visible}
              onChange={() => toggleTempColumnVisibility(index)}
            />
            {col.header}
          </div>
        ))}
        <div className="buttons">
          <button onClick={handleSubmit} className="submitcustomize">
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Dialog;
