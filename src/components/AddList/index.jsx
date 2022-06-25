import React, {useState, useEffect} from "react";
import List from "../List";

import './AddListButton.scss';
import Badge from "../Badge";
import closeButton from '../../assets/img/close.svg';
import axios from "axios";

const AddList = ({colors, onAdd}) => {

    const [visiblePopup, setVisiblePopup] = useState(false);
    const [selectedColor, selectColor] = useState(3);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id)
        }
    }, [colors])

    const addList  = () => {
        if(!inputValue) {
            alert('Введите название списка');
            return;
        }

/*
        const color = colors.filter(color => color.id === selectedColor)[0].id;
*/

        axios.post("http://localhost:3001/lists", {
            "name":  inputValue,
            "colorId": selectedColor
        }).then(({data}) => {
            console.log(data)
        });

        /*onAdd({
            "id":  Math.random(),
            "name":  inputValue,
            "color": color
        });*/
        onClose();
    }

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    }

    return <div className="add-list">

        <List onClick={() => setVisiblePopup(true)}
              items={[
                  {
                      className: 'list__add-button',
                      icon:
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                              <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round"
                                    strokeLinejoin="round"/>
                          </svg>,
                      name: 'Добавить список'
                  }]
              }
        />
        {
            visiblePopup && <div className="add-list__popup">
                <img onClick={onClose} src={closeButton} alt={'закрыть'} className="add-list__popup-close-btn"></img>
                <input value={inputValue}
                       onChange={e => {

                           setInputValue(e.target.value)

                       }}
                       className={'field'}
                       type="text"
                       placeholder="Название папки"/>
                <div className="add-list__popup-colors">
                    <li>
                        <ul>
                            {
                                colors.map(
                                    color => <Badge
                                        onClick={() => selectColor(color.id)}
                                        key={color.id}
                                        color={color.name}
                                        className={selectedColor === color.id && 'active'}
                                    />
                                )
                            }
                        </ul>
                    </li>
                </div>
                <button onClick={addList} className="button">Добавить</button>
            </div>
        }
    </div>

};


export default AddList;
