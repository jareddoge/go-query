import './home.css'
import React,{useState, useCallback} from 'react'
import { FaPlus } from 'react-icons/fa';
import {useDropzone} from 'react-dropzone'


function Home(){
    const [headers, setHeaders] = useState([''])
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
        const addNewHeader=()=>{
        let latestHeader = null;
        setHeaders([...headers,''])
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
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    isDragActive ?
                      <p>Drop the files here ...</p> :
                      <p>Drag 'n' drop some files here, or click to select files</p>
                  }
                </div>
            </div>
        </div>
    )
}

export default Home;