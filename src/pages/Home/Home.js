import "./home.css";
import React, { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import Dropzone from "../../common/Dropzone";
import * as XLSX from "xlsx";

function Home() {
  const [headers, setHeaders] = useState([""]);
  const [hasHeader, setHeaderBoolean] = useState(true);
  const [file, setFile] = useState({});
  const [action, setAction] = useState("insert");

  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const addNewHeader = () => {
    let latestHeader = null;
    setHeaders([...headers, ""]);
  };

  function onActionClick(v) {
    console.log(v);
  }

  function extractHeader(ws) {
    const header = [];
    const columnCount = XLSX.utils.decode_range(ws["!ref"]).e.c + 1;
    for (let i = 0; i < columnCount; ++i) {
      header[i] = ws[`${XLSX.utils.encode_col(i)}1`].v;
    }
    return header;
  }
  const onHasHeaderClick = () => {
    setHeaderBoolean(!hasHeader);
  };

	function onHeaderChange(){
	};

  const onFileDrop = (file) => {
    console.log(file);
    let newHeader = [];
    const reader = new FileReader();
    console.log(typeof file);
    reader.readAsBinaryString(file[0]);
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      console.log(e);
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      let header = [];
      console.log(typeof data);

      if (hasHeader) {
        header = extractHeader(ws);
				setHeaders(header);
      }
    };
  };

  return (
    <div className="main-container">
      <div className="upper-container">
        <form className="note-container">
          <div className="form-group row">
            <label className="col-3 label form-control">Has header? </label>
            <input
              className="col-9 input form-control"
              type="checkbox"
              checked={hasHeader}
              onChange={() => setHeaderBoolean(!hasHeader)}
            />
          </div>
          {console.log(hasHeader)}
          <div>
            <input
              type="radio"
              value="insert"
              checked={action === "insert"}
              onChange={(e) => setAction(e.target.value)}
            />
            Insert
            <input
              type="radio"
              value="update"
              checked={action === "update"}
              onChange={(e) => setAction(e.target.value)}
            />
            Update
          </div>

          <div className="file-container">
            <table>
              <tr>
                <th></th>
                <th>Header</th>
                <th>Data Type</th>
              </tr>
              {headers.map((h, index) => {
                return (
                  <tr>
                    <td>
                      <label className="col-3 label form-control">
                        {index + 1}
                      </label>
                    </td>
                    <td>
                      <div className="form-group row" key={index}>
                        <input
                          className="col-9 input form-control"
                          type="text"
                          value={h}
													onChange={onHeaderChange()}
                        />
                      </div>
                    </td>
                    <td>
                      <input
                        className="col-9 input form-control"
                        type="text"
                        value={h}
												onChange={onHeaderChange()}
                      />
                    </td>
                  </tr>
                );
              })}
            </table>

            <span className="btn btn-primary btn-sm" onClick={addNewHeader}>
              <FaPlus />
            </span>
          </div>
        </form>
        <div className="file-container">
          <Dropzone onDrop={(file) => onFileDrop(file)} />
          {/* { (headers.length>1)?  : <div>bye</div>} */}
        </div>{" "}
        {/* {
       				(headers.length>1)? <div> hi</div> : <div>bye</div>
        		} */}
      </div>
    </div>
  );
}

export default Home;
