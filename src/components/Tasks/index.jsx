import React from "react";

import './Tasks.scss'

import penSvg from '../../assets/img/pen.svg'


const Tasks = ({list, onEditTitle}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название нового заголовка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
        }
    }

    return (
        <div className='todo__tasks'>

            <div className='tasks'>

                <h2 className='tasks__title'>{list.name}
                    <img onClick={editTitle} src={penSvg} alt='edit icon'/>
                </h2>


                <div className='tasks__items'>
                    {
                        !list.tasks.length && <h2>задачи отсутсвуют</h2>
                    }
                    {
                        list.tasks.map(task =>
                            <div key={task.id} className="tasks__items-row">
                                <div className="checkbox">
                                    <input id={`task=${task.id}`} type="checkbox"/>
                                    <label htmlFor={`task=${task.id}`}>
                                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </label>
                                </div>
                                <p>{task.text}</p>
                            </div>
                        )
                    }

                </div>

            </div>


        </div>
    )

}

export default Tasks;