import React, { useEffect } from "react";

function CustomApp({ src, title, pathname }) {
  const handleNavigate = () => {
    window.location.href = pathname;
  };
  return (
    <div
      style={{
        borderRight:
          pathname === window.location.pathname ? "5px solid #3dcd58" : "",
        backgroundColor: pathname === window.location.pathname ? "#f7f7f7" : "",
      }}
      onClick={() => handleNavigate()}
      className="items"
    >
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          paddingTop: "15px",
        }}
      >
        {src}
      </div>
      <span
        style={{
          fontSize: "11px",
          textAlign: "center",
          display: "flex",
          paddingTop: "15px",
        }}
      >
        {title}
      </span>
    </div>
  );
}

export default CustomApp;
