import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import prettyBytes from "pretty-bytes";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { replace, setFileName, setFileSize } from "../state/worstcaseSlice";
import { decompress } from "../utils/zstandard";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export interface InputFileUploadProps {
  showInformation: boolean;
}

export default function InputFileUpload(props: InputFileUploadProps) {
  const dispatch = useDispatch();

  const filename = useSelector((state: RootState) => state.worstcase.fileName);
  const filesize = useSelector((state: RootState) => state.worstcase.fileSize);

  const handleFileChosen = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const filesize = file.size;

      dispatch(setFileName(file.name));
      dispatch(setFileSize(filesize));
      decompress(file).then((content) => dispatch(replace(content)));
    }
  };

  return (
    <>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{ mr: 2 }}
      >
        Select worst case file (.zst)
        <VisuallyHiddenInput type="file" onChange={handleFileChosen} />
      </Button>

      {props.showInformation && filename && (
        <>
          {filename} ({prettyBytes(filesize)})
        </>
      )}
    </>
  );
}
