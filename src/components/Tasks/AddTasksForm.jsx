import addSvg from "../../assets/img/add.svg";
import React from "react";


const AddTasksForm = () => {


    return <div className="tasks__form">
        <div className="tasks__form-new">
            <img src={addSvg} alt="add task"/>
            <span>Новая задача</span>
        </div>
        <div className="tasks_form-block">
            <button className="button">Добавить задачу</button>
            <button className="button button--grey">Отмена</button>
        </div>
    </div>
}

export default AddTasksForm;