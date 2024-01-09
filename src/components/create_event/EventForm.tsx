import { Controller } from "react-hook-form"
import Button from "../common/Button";
import TextInput from "../common/TextInput";
import DateInput from "./DateInput";
import TimeInput from "./TimeInput";
import MVCInterface from "../../interfaces/MVCInterface";
import CreateEventInterface from "../../interfaces/EventFormInterface";
import TimezoneInput from "../common/TimezoneInput";



export default function EventForm({model}: MVCInterface<CreateEventInterface, null>, ) {


    const { RHFController, RHFSubmit } = model

    return (
      <div className="px-8 py-4">
        <form onSubmit={RHFSubmit} className="border-2 p-8 m-auto max-w-[500px]">
          <div className="mb-6 text-center">
            <h2 className="text-3xl">Create Event</h2>
          </div>
          <div className="mb-3">
            <Controller
                name="title"
                control={RHFController}
                render={({ field, formState }) => <TextInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Event title" />}
                rules={{required: "Field is required"}}
            />
          </div>
          <div className="mb-3">
            <Controller
                name="dates"
                control={RHFController}
                render={({ field, formState }) => <DateInput value={field.value} onChange={field.onChange} error={formState.errors[field.name]?.message} label="Date options" />}
                rules={{required: "Field is required"}}
            />
          </div>
          <div className="mb-3">
            <Controller
                  name="timezone"
                  control={RHFController}
                  render={({ field, formState }) => <TimezoneInput value={field.value} onChange={field.onChange} fullWidth={true} />}
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
          <Button text={"Submit"} form={true} />
        </form>
      </div>
    )
}