import React from 'react';

import './List.scss'
import classNames from "classnames";

const List = ({items, isRemovable, onClick}) => {
    console.log(items, isRemovable);

    return <ul onClick={onClick} className="list">
        {
            items.map((item, index) => (
                <li key={index} className={classNames(item.className, {'active': item.active})}>
                    <i>{item.icon ? item.icon : <i className={`badge badge--${item.color}`}></i>}</i>
                    <span>{item.name}</span>
                </li>
            ))
        }

    </ul>
}

export default List;
