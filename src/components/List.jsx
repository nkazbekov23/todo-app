import React from 'react';
import listSvg from "../assets/img/menu-icon.svg";

const List = (props) => {
    console.log(props);

    return <ul className="todo__list">
        <li className="active">
            <i>
                <img src={listSvg} alt="list icon"/>
            </i>
            <span>Список задач</span>
        </li>
    </ul>
}

export default List;
