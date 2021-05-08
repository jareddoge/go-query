import './home.css'
import React,{useState, useCallback} from 'react'
import { FaPlus } from 'react-icons/fa'
import {useDropzone} from 'react-dropzone'
import Dropzone from '../../common/Dropzone'
import * as XLSX from 'xlsx'


function Home(){
    const [headers, setHeaders] = useState([''])
		const [hasHeader, setHeaderBoolean] = useState(true)
    const [file, setFile] = useState({})

    const onDrop = useCallback(acceptedFiles => {
      
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
        const addNewHeader=()=>{
        let latestHeader = null;
        setHeaders([...headers,''])
    }

		const algo = (object) =>{

		}

		function extractHeader(ws) {
			const header = []
			const columnCount = XLSX.utils.decode_range(ws['!ref']).e.c + 1
			for (let i = 0; i < columnCount; ++i) {
				header[i] = ws[`${XLSX.utils.encode_col(i)}1`].v
			}
			return header
		}
		const onHasHeaderClick = () =>{
			setHeaderBoolean(!hasHeader)
		}

    const onFileDrop = (file) =>{
			console.log(file)
			let newHeader = [];
			const reader = new FileReader();
			console.log(typeof file)
			reader.readAsBinaryString(file[0])
			const rABS = !!reader.readAsBinaryString;
			reader.onload = (e) =>{
				console.log(e)
				const bufferArray = e.target.result;
				const wb = XLSX.read(bufferArray,{type:rABS? "binary": "array"});
				const wsname= wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				const data = XLSX.utils.sheet_to_json(ws);
				let header = []
				if(hasHeader){
					header = extractHeader(ws)
				}
				if(header){
					setHeaders(header)
				}
        console.log(header);
			} 
    }

    return (
        <div className="main-container">
					<div className="upper-container">
            <form className="note-container">
							<div className="form-group row">
								<label className="col-3 label form-control">Has header? </label>
								<input className="col-9 input form-control" type="checkbox" onClick={onHasHeaderClick}/>
							</div>
							<div className="file-container">
                	{headers.map((h, index)=>{
                	    return (
                	      <div className="form-group row" key={index}>
                	          <label className="col-3 label form-control"> Header {index+1} </label>
                	          <input className="col-9 input form-control" type='text' value={h}/>
                	      </div>
                	    )
                	})}
									<span className='btn btn-primary btn-sm' onClick={addNewHeader}><FaPlus/></span>
							</div>
            </form>
						{/* {
       				(headers.length>1)? <div> hi</div> : <div>bye</div>
        		} */}

            <div className="file-container">
                <Dropzone onDrop={(file)=>onFileDrop(file)}/>
            </div>
						</div>
						{/* <div className="lower-container">

						</div> */}
        </div>
    )
}

export default Home;