import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { createEventApi } from '../apiCalls';
import { useNavigate } from 'react-router-dom';

function CreateEvent() {
  const navigate = useNavigate()

  const [title, setTitle] = useState<string>("")
  const [startdate, setStartDate] = useState<string>("")
  const [enddate, setEndDate] = useState<string>("")
  const [starttime, setStartTime] = useState<string>("")
  const [endtime, setEndTime] = useState<string>("")

  async function callCreateEventApi() {
    if (title && startdate && enddate && starttime && endtime) {
      const res = await createEventApi(title, startdate, enddate, starttime, endtime)
      if (res) {
        navigate("event/" + res["id"])
      }
    } else {
      console.log('error')
    }
  }

  return (
    <div className="App">
      <h1>Find A Time</h1>
      <p>Create a new event.</p>
      <div>
        <label>Title</label>
        <input onChange={e => setTitle(e.target.value)} value={title} />
      </div>
      <div>
        <label>Start date</label>
        <input onChange={e => setStartDate(e.target.value)} value={startdate} type="date" />
      </div>
      <div>
        <label>End date</label>
        <input onChange={e => setEndDate(e.target.value)} value={enddate} type="date" />
      </div>
      <div>
        <label>Start time</label>
        <input onChange={e => setStartTime(e.target.value)} value={starttime} type="time" />
      </div>
      <div>
        <label>End time</label>
        <input onChange={e => setEndTime(e.target.value)} value={endtime} type="time" />
      </div>
      <button onClick={callCreateEventApi}>Create</button>
    </div>
  );
}

export default CreateEvent;
