import * as React from "react";
import styled, { css } from "styled-components";
import UploadIcon from "./UploadIcon";

interface FileType {
  name: string;
  type: string;
}

interface FileUploaderProps {
  uploadURL: string;
}

const FileUploader = (props: FileUploaderProps) => {
  const fileUpload = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = React.useState(false);
  const [uploads, setUploads] = React.useState<FileType[]>([] as FileType[]);
  const onUploadContainerClicked = () => {
    fileUpload && fileUpload.current?.click();
  };
  const onFileUploadClicked = async () => {
    const url = /((http|ftp|https):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,256}/gi;
    if (!url.test(props.uploadURL)) {
      throw new Error("Invalid URL");
    }

    const formData = new FormData();
    const file = fileUpload.current?.files?.item(0) as File;
    formData.append("files", file);
    try {
      setLoading(true);
      const response = await fetch(props.uploadURL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });
      if (response.status === 200) {
        setUploads([...uploads, { type: file.type, name: file.name }]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <input
        type="file"
        hidden
        ref={fileUpload}
        onChange={onFileUploadClicked}
      />
      <Wrapper>
        <Container
          onClick={(!loading && onUploadContainerClicked) || (() => {})}
          custom-isLoading={loading}
        >
          <UploadIcon />
          Click to upload files
        </Container>
        <FileList>
          {(uploads.length > 0 &&
            uploads.map((item) => <div key={item.name}>Item</div>)) || (
            <h1></h1>
          )}
        </FileList>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Style = css`
  display: flex;
  align-items: center;
  border: 3px dashed #898988;
`;

const Container = styled.div`
  width: 600px;
  height: 200px;
  color: #a4a4a4;
  background-color: ${(props: any) =>
    props["custom-isLoading"] ? `#c7e5ef` : `unset`};
  background-image: ${(props: any) =>
    props["custom-isLoading"]
      ? `repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 1rem,
    #fff 1rem,
    #fff 2rem)`
      : "unset"};
  background-size: 200% 200%;
  animation: barberpole 10s linear infinite;
  ${Style}
  justify-content: center;
  flex-direction: column;
  transition: all 0.5s;
  :hover {
    cursor: pointer;
    background-color: ${(props: any) =>
      props["custom-isLoading"] ? `unset` : "#f5f5f5"};
  }
  @keyframes barberpole {
    100% {
      background-position: 100% 100%;
    }
  }
`;

const FileList = styled.div`
  ${Style}
  width: 600px;
  height: 100px;
  margin-top: 5px;
  overflow-x: auto;
`;

export { FileUploader };
