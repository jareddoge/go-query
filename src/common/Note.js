import React, { useState,useEffect } from 'react';
import './style.css'
import addButton from '../assets/add.svg'
import settingButton from '../assets/settings.svg'
import closeButton from '../assets/close.svg'
import Settings from './Settings'
function Note({id}){
    const [tasks, setTasks] = useState([])
    const [openSettings, setOpenSettings] = useState(false)
    const [noteColor, setNoteColor] = useState('#FFFFFF')
    const [shortcutKey, setShortcutKey] = useState([])
    const [selectMode, setSelectMode] = useState(false)

    const addNewTask= ()=>{
        let newTask = {}
        if(tasks.length>0){
            newTask.id = parseInt(tasks[tasks.length-1].id)+1
        }else{
            newTask.id = 1;
        }
        newTask.text = '';
        newTask.checked = false;
        setTasks([...tasks,newTask])
    }
    
    const onChangeText=(event,index)=>{
      
        let newTasks =[...tasks]
        newTasks[index].text = event.target.value
        setTasks(newTasks)
    }

    const onChecked = (event,index) =>{
        let newTasks =[...tasks]
        newTasks[index].checked = !newTasks[index].checked
        setTasks(newTasks)
    }

    const onDelete = (event,index) =>{
            let newTasks =[...tasks]
            newTasks.splice(index,1)
            setTasks(newTasks) 
    }

    const onClickSetting = () =>{
        setOpenSettings(!openSettings)
    }

    const onSetColor = (color) =>{
        setNoteColor(color)
    }

    const onShortcut=(e,type)=>{
        switch(type){
            case 'keyUp':
                if (e.nativeEvent.ctrlKey === true){
                    switch (e.nativeEvent.key) {
                        case 'b':
                            if(e.target.style.fontWeight ==='bold'){
                                e.target.style.fontWeight = 'normal'
                            }else{
                                e.target.style.fontWeight = 'bold'
                            }
                            break;
                        case 'i':
                            if(e.target.style.fontStyle ==='italic'){
                                e.target.style.fontStyle = 'normal'
                            }else{
                                e.target.style.fontStyle = 'italic'
                            }
                            break;
                        default:
                            break;
                    }
                }
                break;
            case 'select':
                setSelectMode(true);
                break;
            case 'keyDown':
                if(e.key === 'Tab'){
                    addNewTask();
                }
                break;
            default:
                console.log("default")
        }
    }



    return (
        <div className="note" style={{'backgroundColor':noteColor}}>
            <div className="note-header">
                <img src={settingButton} onClick={onClickSetting} alt="settingButton" className="setting-button"></img>
                {openSettings &&
                    <Settings onSetColor={(event)=>onSetColor(event.target.value)} noteColor={noteColor}/>
                }
            </div>
            <div className="note-input-area">
               {tasks.map((task,index)=>(
                   <div key={task.id} className="task-item" style={{justifyContent:task.text!==''?'space-between':'none', paddingTop:index===0?8:0}}>
                       <label htmlFor={`${id}checkbox${index}`} className={`${task.checked?'checked-checkbox':'checkbox'} ${task.text===''?'checkbox-disabled':''}`}>
                           <div className={task.checked?'checked-checkbox-inner':'checkbox-inner'}></div>
                           <div className={task.checked?'checked-checkbox-inner-2':'checkbox-inner'}></div>

                       </label>
                       <input type="checkbox" hidden={true} id={`${id}checkbox${index}`} disabled={task.text===''} onChange={(e)=>onChecked(e,index)}></input>
                        <input type="text" onSelect={(e)=>onShortcut(e,'select')} onKeyDown={(e)=>onShortcut(e,'keyDown')}  onKeyUp={(e)=>onShortcut(e,'keyUp')} style={task.checked?{textDecoration:'line-through'}:{}} id={`${id}taskInput${task.id}`} onChange={(e)=>onChangeText(e,index)}></input>
                        {task.text!=='' &&
                            <img src={closeButton} onClick={(e)=>{onDelete(e,index)}} className="close-button" alt="closeButton"/>
                        }
                    </div>
               ))}
            </div>
            <div className="new-task-button" onClick={addNewTask}>
                <span style={{flex:9}}>New Task</span>
                <img style={{flex:1}} src={addButton} className="note-add-button" alt="addButton"></img>
            </div>
        </div>
    )
}

export default Note