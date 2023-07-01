import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material'
import { useParams } from 'react-router-dom';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import DehazeIcon from '@mui/icons-material/Dehaze';
import SidebarChat from './SidebarChat';
import db from './firebase_str';
import { useStateValue } from './StateProvider';

function Sidebar() {
  const [sidebarOpen, setSiderbarOpen] = useState(true);
  const { roomId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    db.collection('rooms').onSnapshot((snapshot) => 
      setRooms(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [])

  useEffect(() => {
    db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
      setPeople(snapshot.docs.map((doc) => doc.data()))
  })
  }, [roomId])

  return (
    <div className={sidebarOpen ? 'sidebar' : 'invisible'}>
      <div className="sidebar_header">
        <div className="sidebar_headerLeft">
          <IconButton onClick={(e) => (setSiderbarOpen(!sidebarOpen))}>
              <DehazeIcon />
          </IconButton>
          <Avatar src={user?.photoURL}/>
        </div>
        <div className="sidebar_headerRight">
            <IconButton>
                <DonutLargeIcon />
            </IconButton>
            <IconButton>
                <ChatIcon />
            </IconButton>
            <IconButton>
                <MoreVertIcon />
            </IconButton>
        </div>
      </div>

      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
            <SearchIcon />
            <input placeholder='Search or start new chat' type='text' /> 
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          room.data.people?.includes(user?.email) ? <SidebarChat key={room.id} id={room.id} name={room.data.name} sidebar={sidebarOpen} setSidebar={setSiderbarOpen}/> : null
        ))}
      </div>
    </div>
  )
}

export default Sidebar