import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { createEventApi } from '../apiCalls';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>("")
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")

  async function callCreateEventApi() {
    if (title && start && end) {
      const res = await createEventApi(title, parseInt(start), parseInt(end))
      if (res) {
        navigate("event/" + res["id"])
      }
    } else {
      console.log('a')
    }
  }

  return (
    <div className="App">
      <input onChange={e => setTitle(e.target.value)} value={title} />
      <input onChange={e => setStart(e.target.value)} value={start} />
      <input onChange={e => setEnd(e.target.value)} value={end} />
      <p onClick={callCreateEventApi}>test</p>
    </div>
  );
}

export default CreateEvent;
