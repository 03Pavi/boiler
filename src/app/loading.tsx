import React from "react";
import { CircularProgress } from "@mui/material";
const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
        width: "100%",
      }}
    >
      <CircularProgress size={"24px"} />
    </div>
  );
};
export default Loading;
