import React from "react";
import axios from "axios";
import classNames from "classnames";

import './Tasks.scss'
import AddTasksForm from "./AddTasksForm";

import penSvg from '../../assets/img/pen.svg'
import deleteSvg from '../../assets/img/remove.svg'

const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, withoutEmpty, onEditTaskName}) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название нового заголовка', list.name);
        if (newTitle) {
            axios.patch("http://localhost:3001/lists/"+list.id, {
                name: newTitle
            }).then(() => {
                onEditTitle(list.id, newTitle);
            }).catch(() => {
                alert('не удлаось обновить название списка!');
            })
        }
    }

    const onDeleteTask = (taskId, text) => {
        if (window.confirm(`вы действиельно хотите удалить задачу ${text}?`)) {
            axios.delete("http://localhost:3001/tasks/"+taskId).then(() => {
                onRemoveTask(list.id, taskId);
            })
        }
    }

    const onEditTask = (text, taskId) => {
        const newText = window.prompt('новое название', text);
        axios.patch("http://localhost:3001/tasks/"+taskId, {
            text: newText
        }).then(({data}) => {
            onEditTaskName(list.id, taskId, data);
        });
    }

    return (
            <div className='tasks'>
                <h2 className={classNames('tasks__title',  {[`tasks__title--${list.color.name}`] : list.color.name})}>
                    {list.name}
                    <img onClick={editTitle} src={penSvg} alt='edit icon'/>
                </h2>


                <div className='tasks__items'>
                    {
                       !withoutEmpty && !list.tasks.length && <h2>задачи отсутсвуют</h2>
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
                                <img onClick={() => onEditTask(task.text, task.id)} src={penSvg} alt="edit"/>
                                <img onClick={() => onDeleteTask(task.id, task.text)} src={deleteSvg} alt="remove"/>
                            </div>
                        )
                    }

                    {
                      <AddTasksForm list={list} onAddTask={onAddTask}/>
                    }


                </div>

            </div>



    )

}

export default Tasks;