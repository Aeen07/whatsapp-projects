import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import { Avatar } from '@mui/material'
import db from './firebase_str';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import Popup from './Popup';

function SidebarChat({ id, name, addNewChat, sidebar, setSidebar }) {
  const [messages, setMessages] = useState('');
  const [{ user }, dispatch] = useStateValue();
  const [openPopup , setOpenPopup] = useState(false);

  useEffect(() => {
    if (id) {
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
          setMessages(snapshot.docs.map((doc) => doc.data()))
      ))
    }
  }, [id])

  const createChat = () => {
    setOpenPopup(true);
  };

  return !addNewChat ? (
      <Link to={`/rooms/${id}`} onClick={(e) => (setSidebar(window.innerWidth > 600 ? true : false))}>
        <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${name}.svg`}/>
            <div className="sidebarChat_info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
      </Link>
  ) : (
    <>
      <div onClick={createChat}
      className='sidebarChat'>
          <h2>Add new Chat</h2>
      </div>
      <Popup trigger={openPopup} setTrigger={setOpenPopup}/>
    </>
  );
}

export default SidebarChat