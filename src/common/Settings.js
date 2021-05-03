import React,{useState} from 'react'
import pinImage from '../assets/pin.svg'

function Settings({onSetColor,noteColor}){
    const [setting, setSetting] = useState(null)
    const onClickSettings = (setting) =>{
        switch(setting){
            case 'color':
                setSetting('color');
                break;
            default:
                setSetting(null);
        }
    }
    return (
        <div className="animate__animated animate__fadeInDown settings_pop_up">
            <div className="font-size-8 setting-item" onClick={()=>{onClickSettings('color')}}>
                Change color
                {setting ==='color' &&
                <input type="color" value={noteColor} onChange={onSetColor}/>
                }
            </div>
            <div className="font-size-8 setting-item">
                <span>Pin</span>
                <img src={pinImage} alt="pinImage" className="pinImage"/>
            </div>
           
        </div>
    )
}

export default Settings;