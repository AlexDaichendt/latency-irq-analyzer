import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useDispatch, useSelector } from "react-redux";
import { replace, setFileName, setFileSize } from "../state/irqSlice";
import { RootState } from "../state/store";
import prettyBytes from "pretty-bytes";

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

  const filename = useSelector((state: RootState) => state.irq.fileName);
  const filesize = useSelector((state: RootState) => state.irq.fileSize);

  const handleFileChosen = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          const content = e.target.result;

          if (typeof content !== "string") {
            return;
          }
          // calculate filesize in bytes
          const filesize = new Blob([content]).size;

          dispatch(setFileName(file.name));
          dispatch(setFileSize(filesize));
          dispatch(replace(content));
        }
      };

      reader.readAsText(file);
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
        Select file
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
