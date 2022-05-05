import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DateTimePicker from "react-datetime-picker";
import slotService from '../services/slotService';

const handleSchedule = async (venueId, date) => {
  console.log(venueId, date.toISOString());
  await slotService.allocateSlot(venueId, date.toISOString());
  window.location = "/venues"
}

const AllocateSlot = () => {
  const { venueId } = useParams();
  const [date, onChange] = useState(new Date());

  return (
    <div>
      <div style={{ marginTop: 40, marginLeft: 100}}>
        <h1>Allocate Slot</h1>
        <DateTimePicker onChange={onChange} value={date} />
        <button onClick={() => handleSchedule(venueId, date)} className="btn btn-primary m-2">Schedule</button>
      </div>

    </div>
  );
}
 
export default AllocateSlot;