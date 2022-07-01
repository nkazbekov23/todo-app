import React from "react";
import axios from "axios";
import classNames from "classnames";

import './Tasks.scss'
import AddTasksForm from "./AddTasksForm";

import penSvg from '../../assets/img/pen.svg'
import Task from "./Task";

const Tasks = ({list, onEditTitle, onAddTask, onRemoveTask, withoutEmpty, onEditTaskName, onComplete}) => {

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
        if (newText) {
            axios.patch("http://localhost:3001/tasks/" + taskId, {
                text: newText
            }).then(({data}) => {
                onEditTaskName(list.id, taskId, data);
            });
        }
    }

    const onCompletedTask = (listId, taskId, completed) => {
        axios.patch("http://localhost:3001/tasks/" + taskId, {
            completed
        }).then(({data}) => {
            onComplete(listId, taskId, data);
        });
    }

    return (
            <div className='tasks'>
                <h2 className={classNames('tasks__title',  {[`tasks__title--${list.color.name}`] : list.color.name})}>
                    {list.name}
                    <img onClick={editTitle} src={penSvg} alt='edit icon'/>
                </h2>

                <div className='tasks__items'>
                    {!withoutEmpty && !list.tasks.length && <h2>задачи отсутсвуют</h2>}

                    {list.tasks.map(task => <Task key={task.id} {...task} onDeleteTask={onDeleteTask} onEditTask={onEditTask} onComplete={onCompletedTask} list={list}/>)}

                    {<AddTasksForm list={list} onAddTask={onAddTask}/>}

                </div>

            </div>

    )

}

export default Tasks;