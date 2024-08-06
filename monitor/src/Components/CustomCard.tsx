import React, { useEffect, useState } from "react";
import "../Resources/Index.scss";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
function CustomCard({ deviceId, alertTime, alertMessage, geticonbytypeid }) {
  const [blink, setblink] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setblink(false);
    }, 5000);
  }, []);
  return (
    <div className="card">
      <div className="container">
        <div>{deviceId}</div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="grid-item"
        >
          <div>Severnity Type:</div>
          <div className={blink === true ? "blink" : ""}>{geticonbytypeid}</div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="grid-item"
        >
          <div>Date: </div>
          <div>{alertTime.slice(0, 10)}</div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "space-between" }}
          className="grid-item"
        >
          <div>Time : </div>
          <div>{alertTime.slice(11, 16)}</div>
        </div>
        <div className="grid-item">Alert message</div>
        <div>

          <a data-tooltip-id="my-tooltip" data-tooltip-content={`${alertMessage}`}>
          <textarea
            value={alertMessage}
            disabled
            style={{ width: "100%", height: "50px", resize: "none" }}
          />
          </a>
          <Tooltip id="my-tooltip" place="bottom"  />
        </div>
      </div>
    </div>
  );
}

export default CustomCard;
