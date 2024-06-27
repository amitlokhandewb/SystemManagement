import React from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { allColumns } from "./Util";
const visibleColumnKeys = [
  "eventDescription",
  "priority",
  "dateTime",
  "eventType",
  "eventid",
  "deviceType",
];
function Dialog({
  tempVisibleColumns,
  setTempVisibleColumns,
  toggleTempColumnVisibility,
  handleSubmit,
  isModalOpen,
  setIsModalOpen,
}) {
  const initialVisibleColumns = allColumns.map((col, index) => ({
    ...col,
    id: `column-${index}`,
    visible: visibleColumnKeys.includes(col.accessorKey),
  }));
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedColumns = Array.from(tempVisibleColumns);
    const [movedColumn] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, movedColumn);

    setTempVisibleColumns(reorderedColumns);
  };
  const handleclose = () => {
    setIsModalOpen(false)
    // alert(JSON.stringify([...tempVisibleColumns]))
    setTempVisibleColumns([...initialVisibleColumns]);
  }

  return (
    <div>
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
            height: "55%",
            margin: "auto",
            borderRadius: "10px",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "20px",
            marginBottom: "20px",
          }}
        >
          <h4>Customize Columns</h4>
          <IoMdClose
            onClick={handleclose}
            size={20}
            style={{ marginTop: "10px", marginRight: "10px" }}
          />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="columns">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {tempVisibleColumns.map((col, index) => (
                  <Draggable key={col.id} draggableId={col.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: "8px",
                          margin: "0 0 8px 0",
                          borderRadius: "4px",
                          background: "#fff",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={col.visible}
                          onChange={() => toggleTempColumnVisibility(index)}
                        />
                        {col.header}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
