import './App.css';
import listSvg from './assets/img/menu-icon.svg';
import List from './components/List'
import React from "@types/react";

function App() {
  return (
    <div className='todo'>

      <div className="todo__sidebar">
        <List items={[
            {
                icon: <img src={listSvg} alt="list icon"/>

            }

        ]}/>
      </div>

      <div className='todo__tasks'>

      </div>

    </div>
  );
}

export default App;
