import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { createEventApi } from '../apiCalls';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"

function CreateEvent() {
  const navigate = useNavigate()

  interface FormData {
    title: string
    startdate: string,
    enddate: string,
    starttime: string,
    endtime: string
  }

  const { register, handleSubmit } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = async (data) => {
      const res = await createEventApi(data.title, data.startdate, data.enddate, data.starttime, data.endtime)
      if (res) {
        navigate("event/" + res["id"])
      } else {
        console.log('error')
      }
    }

  return (
    <div className="App">
      <h1>Find A Time</h1>
      <p>Create a new event.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Title</label>
          <input {...register("title", {required: true})} />
        </div>
        <div>
          <label>Start date</label>
          <input {...register("startdate", {required: true})} type="date" />
        </div>
        <div>
          <label>End date</label>
          <input {...register("enddate", {required: true})} type="date" />
        </div>
        <div>
          <label>Start time</label>
          <input {...register("starttime", {required: true})} type="time" />
        </div>
        <div>
          <label>End time</label>
          <input {...register("endtime", {required: true})} type="time" />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateEvent;
