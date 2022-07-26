import { DateTime } from "luxon";

import PDF from "../image/pdf.svg";
import Docx from "../image/docx.svg";
import NewFile from "../image/new-file.svg";
import Picture from "../image/picture.svg";

export const FileTile = ({ file }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <img
        className="w-[50px]"
        src={
          file.name.includes(".pdf")
            ? PDF
            : file.name.includes(".jpeg") || file.name.includes(".png")
            ? Picture
            : file.name.includes(".doc") || file.name.includes(".docx")
            ? Docx
            : NewFile
        }
      />
      <p>{file.name}</p>
      <p>
        Date create :
        {DateTime.fromSeconds(file.atime).toLocaleString(
          DateTime.DATETIME_MED_WITH_SECONDS
        )}
      </p>
      <p>
        Date change :
        {DateTime.fromSeconds(file.mtime).toLocaleString(
          DateTime.DATETIME_MED_WITH_SECONDS
        )}
      </p>
      <p>weight : {file.size} Byte</p>
    </div>
  );
};
