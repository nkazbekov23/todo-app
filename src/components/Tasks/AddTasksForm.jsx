import React, {useState} from "react";
import addSvg from "../../assets/img/add.svg";
import axios from "axios";


const AddTasksForm = ({list, onAddTask}) => {

    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }
    const addTask = () => {
        if (!inputValue) {
            alert('введите название задачи');
            return;
        }
        const taskObj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        setIsLoading(true);
        axios.post("http://localhost:3001/tasks", taskObj).then(({data}) => {
           onAddTask(list.id, data);
            toggleFormVisible();
        })
            .finally(() => setIsLoading(false))
            .catch(() => alert('не удалось добавить задачу'))
    }

    return <div className="tasks__form">
        {
            !visibleForm ? (
                <div className="tasks__form-new">
                    <img onClick={toggleFormVisible} src={addSvg} alt="add task"/>
                    <span>Новая задача</span>
                </div>
            ) : (
                <div className="tasks__form-block">
                    <input onChange={e => setInputValue(e.target.value)}
                           value={inputValue}
                           className="field"
                           type="text"
                           placeholder="Название папки"/>
                    <button disabled={isLoading} onClick={addTask} className="button">
                        {
                            isLoading ? 'Добавление' : 'Добавить задачу'
                        }
                    </button>
                    <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
                </div>
            )
        }

    </div>
}

export default AddTasksForm;