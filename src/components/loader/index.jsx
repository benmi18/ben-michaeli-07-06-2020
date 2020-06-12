import React from "react";
// Material
import { CircularProgress } from "@material-ui/core";

const Loader = () => (
  <div className="loader">
    <CircularProgress disableShrink />
  </div>
);

export default Loader;
