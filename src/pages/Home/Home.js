import "./home.css";
import React, { useState, useCallback } from "react";
import { FaPlus } from "react-icons/fa";
import { useDropzone } from "react-dropzone";
import Dropzone from "../../common/Dropzone";
import * as XLSX from "xlsx";
import * as _ from "lodash";

function Home() {
  const [table, setTable] = useState("");
  const [column, setColumn] = useState([
    { header: "", dataType: "", isPK: true },
  ]);
  const [hasHeader, setHeaderBoolean] = useState(true);
  const [file, setFile] = useState({});
  const [action, setAction] = useState("insert");
  const dataTypes = ["string", "number", "date", "boolean"];

  const onDrop = useCallback((acceptedFiles) => {}, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const addColumn = () => {
    //push new empty object into array
    setColumn([
      ...column,
      {
        header: "",
        dataType: "",
        isPK: false,
      },
    ]);
  };

  function extractHeader(ws) {
    const header = [];
    const columnCount = XLSX.utils.decode_range(ws["!ref"]).e.c + 1;
    for (let i = 0; i < columnCount; ++i) {
      header[i] = ws[`${XLSX.utils.encode_col(i)}1`].v;
    }
    return header;
  }

  const onHeaderChange = (string, index) => {
    let heads = [...column];
    let head = { ...heads[index] };
    head.header = string;
    heads[index] = head;
    setColumn(heads);
  };

  function onDataTypeChange(string, index) {
    let datas = [...column];
    let data = { ...datas[index] };
    data.dataType = string;
    datas[index] = data;
    setColumn(datas);
  }

  function setPKBoolean(boo, index) {
    let datas = [...column];
    let data = { ...datas[index] };
    data.isPK = boo;
    datas[index] = data;
    setColumn(datas);
  }

  const writeQuery = (header, data) => {

    let s = "";
    switch (action) {
      case "insert":
        {
          let headerString = header.toString();
          //query
          s += `INSERT INTO ${table} ( ${headerString} ) VALUES `;
          Object.entries(data).map((i, j) => {
            Object.entries(i)
            console.log(i)
            s +=  j
          });
          console.log(s)
        }
        break;
      case "update":
        {
        }
        break;
    }
    // s += `INSERT INTO ${file}​​​​​​​​\n`;
    // fs.createReadStream(getDir(TARGET_FOLDER, tableFolder, file)).pipe(csv())
    //   .on('data', (row) => {
    //     const primaryKey = getPrimaryKey(tableFolder);
    //     s += updateSQL(tableFolder, row, primaryKey) + "\n";
    //   })
    //   .on('end', () => {
    //     if (!fs.existsSync(RESULT_FOLDER)) {
    //       fs.mkdirSync(RESULT_FOLDER)
    //     }
    //     fs.writeFile(getDir(RESULT_FOLDER, `${file}​​​​​​​​.sql`), s, { flag: "w" }, (err) => {
    //       if (err) throw err;
    //     });
    //   });
  };

  const predictDataType = (header, data) => {
    let dt_arr = column;
    console.log(column, "init header here");
    console.log(dt_arr, "test");

    Object.entries(data[0]).map((obj, index) => {
      let dt_v = { ...dt_arr[index] };
      console.log(dt_v, "entry here");

      if (/^\d+$/.test(obj[1])) {
        dt_v.dataType = "number";
      } else if (Date.parse(obj[1])) {
        dt_v.dataType = "date";
      } else if (obj[1] === "True" || obj[1] === "False") {
        dt_v.dataType = "boolean";
      } else {
        dt_v.dataType = "string";
      }
      dt_arr[index] = dt_v;
    });

    console.log(dt_arr, "dt_arr");
    new Promise((resolve, reject) => {
      resolve(setColumn(dt_arr));
    }).then(() => {
      writeQuery(header, data);
    });
  };

  const onFileDrop = (file) => {
    console.log(file);
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
      header = extractHeader(ws);

      setColumn([])
      console.log(column, "init header here");
      predictDataType(header, data)
      // --> setHeader
      //-- getHea
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
                <th>PK</th>
              </tr>
              {column.map((h, index) => {
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
                          value={h.header}
                          onChange={(e) =>
                            onHeaderChange(e.target.value, index)
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <select
                        className="col-9 input form-control"
                        value={h.dataType}
                        onChange={(e) =>
                          onDataTypeChange(e.target.value, index)
                        }
                      >
                        {dataTypes.map((x, y) => (
                          <option key={y}>{x}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        className="col-9 input form-control"
                        type="checkbox"
                        defaultChecked={h.isPK}
                        onChange={(e) => setPKBoolean(e.target.checked, index)}
                      />
                    </td>
                  </tr>
                );
              })}
            </table>
            <span className="btn btn-primary btn-sm" onClick={addColumn}>
              <FaPlus />
            </span>
          </div>
        </form>
        <div className="file-container">
          <Dropzone onDrop={(file) => onFileDrop(file)} />
          {/* { (headers.length>1)?  : <div>bye</div>} */}
        </div>
      </div>
    </div>
  );
}

export default Home;
