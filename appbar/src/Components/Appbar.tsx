import React, { useState } from "react";
import "../Resources/Style.css";
import logo from "../Resources/SE_logotype_white.svg";
import { CgProfile } from "react-icons/cg";

function Appbar() {
  const [open, setOpen] = useState<Boolean>(false);
  return (
    <div
      style={{
        paddingRight: "80px",
        paddingLeft: "90px",
        color: "#3dcd58",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: 'white'
      }}
      className="appbar"
    >
      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          fontWeight: "bold",
          fontSize: "20px",
        }}
      >
        <b>System Management (Demo Preview)</b>
      </div>
      <div
        className="profile"
        style={{
          display: "flex",
          borderRadius: "0px 0px 20px 20px",
          backgroundColor: "7b7575",
          position: "absolute", right: "100px", top: "0"
        }}
      >
        <div
          style={{
            backgroundColor: "grey",
            width: "50px",
            borderRadius: "50%",
            color: "white",
            height: "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "5px",
          }}
          onClick={() => setOpen(!open)}
        >
          ME
        </div>
        <img
          src={logo}
          style={{
            backgroundColor: "#3dcd58",
            width: "120px",
            borderRadius: "0px 0px 20px 0px",
          }}
        />
      </div>
      {open && (
        <div
          className="dropdown"
          style={{ position: "absolute", right: "100px", top: "70px", backgroundColor: 'white' }}
        >
          <div style={{ width: "300px", height: "60px", display: "flex", justifyContent: 'space-between', padding: '10px', alignItems: 'center', marginTop: '10px' }}>
            <CgProfile size={70} />
            <p>Maintainenance Engineeer</p>
          </div>
            <div style={{ width: '100%', borderStyle: 'none', height: '50px', color: '#3dcd58', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}} >Sign out</div>
        </div>
      )}
    </div>
  );
}

export default Appbar;
