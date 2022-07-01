import React from "react";
import penSvg from "../../assets/img/pen.svg";
import deleteSvg from "../../assets/img/remove.svg";

const Task = ({id, text, completed, onDeleteTask, onEditTask, onComplete, list}) => {

    const onChangeCheckBox = e => {
        console.log(e.target)
        onComplete(list.id, id, e.target.checked);
    }

    return (
        <div key={id} className="tasks__items-row">
            <div className="checkbox">
                <input onChange={onChangeCheckBox} id={`task=${id}`} type="checkbox" checked={completed}/>
                <label htmlFor={`task=${id}`}>
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
            </div>
            <p>{text}</p>
            <img onClick={() => onEditTask(text, id)} src={penSvg} alt="edit"/>
            <img onClick={() => onDeleteTask(id, text)} src={deleteSvg} alt="remove"/>
        </div>
    )
}

export default Task;