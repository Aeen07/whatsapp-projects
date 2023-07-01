import Picker from 'emoji-picker-react';
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { useState, useEffect } from 'react';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVert from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import DehazeIcon from '@mui/icons-material/Dehaze';
import db from './firebase_str';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import { useRef } from 'react';

function Chat() {
  const inputRef = useRef(null);
  const [emojiPopup, setEmojiPopup] = useState(false);
  const [input, setInput] = useState('');
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [users, setUsers] = useState([]);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    if (roomId) {
        db.collection('rooms').doc(roomId).onSnapshot((snapshot) => 
            setRoomName(snapshot.data().name));

        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()))
        })

        db.collection('rooms').doc(roomId).onSnapshot((snapshot) =>
            setUsers(snapshot.data().people))

    }
  }, [roomId])
  
  useEffect(() => {
    inputRef.current.selectionEnd = cursor;
  }, [cursor])


  const sendMessage = (e) => {
    e.preventDefault();
    console.log('you typed >', input)

    db.collection('rooms').doc(roomId).collection('messages').add({
        message: input,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    setInput('')
  }

  const handleShowEmoji = () => {
    inputRef.current.focus();
    setEmojiPopup(!emojiPopup);
  }

  const emojiClicked = (emojiObject, e) => {
    // setInput(previous => previous + emojiObject.emoji);
    const ref = inputRef.current;
    ref.focus();
    const start = input.substring(0, ref.selectionStart);
    const end = input.substring(ref.selectionStart);
    const text = start + emojiObject.emoji + end;
    setInput(text);
    setCursor(start.length+emojiObject.emoji.length);
  }

  return (
    <>
    <div className='chat'>
        <div className="chat_header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${roomName}.svg`}/>

            <div className="chat_headerInfo">
                <h3>{roomName}</h3>
                <p>{users.length + ' people'}</p>
            </div>

            <div className="chat_headerRight">
                <IconButton onClick={(e) => console.log(user.uid)}>
                    <SearchIcon />
                </IconButton>
                <IconButton>
                    <AttachFile />
                </IconButton>
                <IconButton>
                    <MoreVert />
                </IconButton>
            </div>
        </div>

        <div className="chat_body">
            {messages.map(message => (
                <p className={`chat_message ${message.name === user.displayName && 'chat_reciever'}`}>
                    <span className="chat_name">{message.name}</span>
                    {message.message}

                    <span className="chat_timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
            ))}
        </div>

        <div className="chat_footer">
            <IconButton>
                <InsertEmoticonIcon onClick={handleShowEmoji}/>
            </IconButton>
            <form onSubmit={sendMessage}>
                <input 
                value={input} 
                onChange={e => setInput(e.target.value)} 
                type='text' 
                placeholder='Type a message'
                ref={inputRef}/>
        
                <button 
                onClick={sendMessage} 
                type='submit'>Send a message</button>
            </form>
            <MicIcon />
        </div>
    </div>
    <div className='emoji_box'>
        {emojiPopup &&  <Picker 
        onEmojiClick={emojiClicked}
         />}
    </div>
    </>
  )
}

export default Chat