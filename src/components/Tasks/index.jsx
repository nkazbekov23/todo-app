import React from "react";

import './Tasks.scss'

import penSvg from '../../assets/img/pen.svg'


const Tasks = () => {


    return (
        <div className='todo__tasks'>

            <div className='tasks'>

                <h2 className='tasks__title'>Фронтенд
                    <img src={penSvg} alt='edit icon'/>
                </h2>

            </div>

        </div>
    )

}

export default Tasks;