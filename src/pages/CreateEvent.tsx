import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { createEventApi } from '../apiCalls';

function CreateEvent() {

  const [title, setTitle] = useState<string>("")
  const [start, setStart] = useState<string>("")
  const [end, setEnd] = useState<string>("")

  function callCreateEventApi() {
    if (title && start && end) {
      createEventApi(title, parseInt(start), parseInt(end))
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
