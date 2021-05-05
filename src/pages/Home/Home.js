import './home.css'
import React,{useState, useCallback} from 'react'
import { FaPlus } from 'react-icons/fa'
import {useDropzone} from 'react-dropzone'
import Dropzone from '../../common/Dropzone'
import * as XLSX from 'xlsx'


function Home(){
    const [headers, setHeaders] = useState([''])
    const [file, setFile] = useState({})

    const onDrop = useCallback(acceptedFiles => {
        
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
        const addNewHeader=()=>{
        let latestHeader = null;
        setHeaders([...headers,''])
    }
    const onFileDrop = (file) =>{
        console.log(file)
        const promise = new Promise((resolve,reject)=>{
					const fileReader = new FileReader();
					fileReader.readAsArrayBuffer(file);
					fileReader.onload = (e) =>{
						const bufferArray = e.target.result;
						const wb = XLSX.read(bufferArray,{type:'buffer'});
						const wsname= wb.SheetNames[0];
						const ws = wb.Sheets[wsname];
						const data = XLSX.utils.sheet_add_json(ws);
						resolve(data);
					}
        })
				promise.then((d)=>{
					console.log(d);
				})
    }

    return (
        <div className="main-container">
            <form className="note-container">
                {headers.map((h, index)=>{
                    return (
                      <div className="row form-group" key={index}>
                          <label className="col-3 label form-control"> Header {index+1} </label>
                          <input className="col-9 input form-control" type='text'/>
                      </div>
                    )
                })}
            </form>
            <div className="form-control">
                <span className='btn btn-primary btn-sm' onClick={addNewHeader}><FaPlus/></span>
            </div>
            <div className="file-container">
                <Dropzone onDrop={(file)=>onFileDrop(file)}/>
            </div>
        </div>
    )
}

export default Home;