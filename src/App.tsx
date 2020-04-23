import * as React from "react";
import { FileUploader } from "./FileUploader";

export default () => {
  return (
    <div className="container">
      <FileUploader uploadURL="http://localhost:5000/api/home/upload" />
    </div>
  );
};
