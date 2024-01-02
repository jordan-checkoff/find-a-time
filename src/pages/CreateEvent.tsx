
import EventFormController from "../components/create_event/EventFormController";

function CreateEvent() {



  return (
    <div>
      <h1 className='text-4xl'>Find A Time</h1>
      <p>Create a new event.</p>
      <EventFormController />
    </div>
  );
}

export default CreateEvent;
