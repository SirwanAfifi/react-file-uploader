import * as React from "react";
import { FileUploader } from "./FileUploader";

export default () => {
  return (
    <div className="container">
      <FileUploader uploadURL="http://localhost:8081/samples/php/process.php" />
    </div>
  );
};
