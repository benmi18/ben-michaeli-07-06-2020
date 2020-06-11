import React from "react";
// Material
import { CircularProgress } from "@material-ui/core";

const Loader = () => {
  return (
    <div className="loader">
      <CircularProgress disableShrink />
    </div>
  );
}

export default Loader;
