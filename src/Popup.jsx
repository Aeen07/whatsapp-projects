import React, { useEffect, useState } from 'react'
import './Popup.css'
import db from './firebase_str';
import { useStateValue } from './StateProvider';

function Popup({trigger, setTrigger}) {
  const [input, setInput] = useState('');
  const [newPerson, setNewPerson] = useState('');
  const [person, setPerson] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  useEffect(() => {
    setPerson([]);
    setNewPerson('');
    setInput('');
  }, [trigger])

  const createRoom = () => {
    if(input.length >= 3){
        db.collection('rooms').add({
            name: input,
            people: [...person, user?.email]
        });     
        setTrigger(false);
    }
    else {
        alert('name should be bigger than 3 letters');
    }
  }

  const addPerson = (e) => {
    e.preventDefault();
    if(regexExp.test(newPerson)){
        if(!person.includes(newPerson)){
            setPerson(oldList => [...person, newPerson])
            setNewPerson('');
        }
        else{
            alert('email is already added')
        }
    }
    else{
        alert('email is not valid')
    }
  }

  return (trigger) ? (
    <div className='popup'>
        <div className="popup_body">
            <button className='close_btn' onClick={(e) => (setTrigger(false))}>X</button>
            <div className="popup_input">
                <h2>room name</h2>
                <input 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    type='text' 
                    placeholder='Type a message'/>

                <h2>persons email</h2>
                <form>
                    <input 
                        value={newPerson} 
                        onChange={e => setNewPerson(e.target.value)} 
                        type='text' 
                        placeholder='Type a message'/>
                    <button onClick={addPerson}>+</button>
                </form>

                <ul>
                    {person.map((u,i) => {
                        return(i <= 3) ? ( 
                        <li key={u}>{u}</li> 
                        ) : ((i === 4) ? 
                        <p>and more...</p> 
                        : "")
                    })}
                </ul>
                

                <div className="popup_create"> 
                    <a onClick={createRoom}>Create</a>
                </div>
            </div>
        </div>
    </div>
  ) : "";
}

export default Popup