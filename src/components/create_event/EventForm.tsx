import { Controller } from "react-hook-form"
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import MVCInterface from "../../interfaces/MVCInterface";
import CreateEventInterface from "../../interfaces/EventFormInterface";



export default function EventForm({model}: MVCInterface<CreateEventInterface, null>, ) {


    const { RHFController, RHFSubmit } = model

    return (
      <div className="p-4">
        <form onSubmit={RHFSubmit} className="border-2 p-8 m-auto max-w-[500px]">
          <div className="mb-8 text-center">
            <p>Enter your event's title, time range, and date options to create a FindATime!</p>
          </div>
          <hr className="mb-8" />
          <div className="mb-8">
            <Controller
                name="title"
                control={RHFController}
                render={({ field, formState }) => <TextInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Event title" />}
                rules={{required: "Field is required"}}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Controller
                name="starttime"
                control={RHFController}
                render={({ field, formState }) => <TimeInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Start time" />}
                rules={{required: "Field is required"}}
            />
            <Controller
                name="endtime"
                control={RHFController}
                render={({ field, formState }) => <TimeInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="End time" />}
                rules={{required: "Field is required"}}
            />
          </div>
          <div className="mb-8">
            <Controller
                name="dates"
                control={RHFController}
                render={({ field, formState }) => <DateInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Date options" />}
                rules={{required: "Field is required"}}
            />
          </div>
          <Button text={"Submit"} form={true} />
        </form>
      </div>
    )
}