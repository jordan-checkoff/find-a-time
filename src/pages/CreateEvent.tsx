import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import '../App.css';
import { createEventApi } from '../apiCalls';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import { TextField, Button } from '@mui/material';

function CreateEvent() {
  const navigate = useNavigate()

  interface FormData {
    title: string
    startdate: DateData | null,
    enddate: DateData | null,
    starttime: DateData | null,
    endtime: DateData | null
  }

  interface DateData {
    $D: number,
    $H: number,
    $L: string,
    $M: number,
    $W: number,
    $d: Date,
    $isDayjsObject: boolean,
    $m: number,
    $ms: number,
    $s: number,
    $u: any,
    $x: any,
    $y: number,
  }

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      title: "",
      startdate: null,
      enddate: null,
      starttime: null,
      endtime: null
    },
  })
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const title = data.title
    const startdate = data.startdate?.$d
    const enddate = data.enddate?.$d
    const starttime = data.starttime?.$d
    const endtime = data.endtime?.$d

    if (title && startdate && starttime && enddate && endtime) {
      startdate?.setHours(starttime.getHours() + starttime.getMinutes())
      enddate?.setHours(starttime.getHours() + starttime.getMinutes())

      const start_times = []
      while (startdate <= enddate) {
        start_times.push(startdate.getTime())
        startdate.setDate(startdate.getDate() + 1)
      }

      const num_blocks = Math.floor((endtime.getTime() - starttime.getTime()) / (1000*60*30))

      const res = await createEventApi(title, start_times, num_blocks)
      if (res) {
        navigate("event/" + res["id"])
      } else {
        console.log('error')
      }

    }
  }

  return (
    <div className="App">
      <h1>Find A Time</h1>
      <p>Create a new event.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => <TextField {...field} />}
          rules={{required: true}}
        />
        <Controller
          name="startdate"
          control={control}
          render={({ field }) => <DatePicker {...field} />}
          rules={{required: true}}
        />
        <Controller
          name="enddate"
          control={control}
          render={({ field }) => <DatePicker {...field} />}
          rules={{required: true}}
        />
        <Controller
          name="starttime"
          control={control}
          render={({ field }) => <TimePicker {...field} />}
          rules={{required: true}}
        />
        <Controller
          name="endtime"
          control={control}
          render={({ field }) => <TimePicker {...field} />}
          rules={{required: true}}
        />
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default CreateEvent;
