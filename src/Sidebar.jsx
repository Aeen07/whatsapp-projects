import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import { Avatar, IconButton } from '@mui/material'
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
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    db.collection('rooms').onSnapshot((snapshot) => 
      setRooms(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, [])

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
          <SidebarChat key={room.id} id={room.id} name={room.data.name} sidebar={sidebarOpen} setSidebar={setSiderbarOpen}/>
        ))}
      </div>
    </div>
  )
}

export default Sidebar