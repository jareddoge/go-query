import Note from '../../common/Note';
import './home.css'
import addButton from '../../assets/add.svg'
import React,{useState} from 'react'

function Home(){
    const [notes, setNotes] = useState([])
    
    const addNewNote=()=>{
        let latestNote = null;
        
        if(notes.length>0){
            latestNote = {id:notes[notes.length-1].id+1}
        }else{
            latestNote = {id:1}
        }
        console.log([...notes,latestNote])
        setNotes([...notes,latestNote])
    }

    return (
        <div className="main-container">
            <div className="note-container">
                {notes.map((i)=>{
                    return (
                        <Note id={i.id} key={i.id}/>
                    )
                })}
            </div>
            <div className="add-button" onClick={addNewNote}>
                <img src={addButton} alt="add" className="add-image"/>
            </div>
        </div>
    )
}

export default Home;