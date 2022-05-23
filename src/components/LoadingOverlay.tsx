import { Loader } from "@mantine/core";
import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="loading-overlay">
      <Loader variant="dots" size={50} />
    </div>
  );
};

export default LoadingOverlay;
