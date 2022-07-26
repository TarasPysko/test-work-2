import axios from "axios";
import { useEffect, useState } from "react";

import { DropDown } from "./component/dropDown";
import { FileTile } from "./component/file";

const App = () => {
  const [files, setFiles] = useState([]);
  const [sortBy, setSortBy] = useState(
    document.cookie.includes("sort=")
      ? document.cookie.split("sort=")[1]
      : "name"
  );

  useEffect(() => {
    document.cookie = `sort=${sortBy}`;
  }, [sortBy]);

  useEffect(() => {
    axios
      .get(
        "https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8"
      )
      .then(({ data }) => {
        return setFiles(Object.values(data.data.files).flat(2));
      });
  }, []);

  const filteredFiles = () => {
    if (sortBy === "name") {
      return files.sort((a, b) => {
        const textA = a.name.toUpperCase();
        const textB = b.name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
    } else if (sortBy === "create") {
      return files.sort((a, b) => {
        return a.atime - b.atime;
      });
    } else if (sortBy === "change") {
      return files.sort((a, b) => {
        return a.mtime - b.mtime;
      });
    } else if (sortBy === "weight") {
      return files.sort((a, b) => {
        return b.size - a.size;
      });
    } else return files;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex m-[50px]">
        <h1 className="font-bold">FILES</h1>
        <DropDown
          defaultValue={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
          }}
        />
      </div>
      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {filteredFiles().map((file, i) => {
          return <FileTile key={i} file={file} />;
        })}
      </div>
    </div>
  );
};

export default App;
