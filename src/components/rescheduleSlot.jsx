import React, { useState } from "react";
import { useParams } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import slotService from "../services/slotService";

const handleReschedule = async (slotId, date) => {
  date = date.toISOString();
  console.log(slotId, date);
  await slotService.rescheduleSlot(slotId, date);
  window.location = "/venues"
}

const RescheduleSlot = () => {
  const { slotId, scheduledAt } = useParams();
  const [date, onChange] = useState(new Date(scheduledAt));
  console.log(date, scheduledAt);

  return (
    <div>
      <div style={{ marginTop: 40, marginLeft: 100 }}>
        <h1>Reschedule Slot</h1>
        <DateTimePicker onChange={onChange} value={date} />
        <button
          onClick={() => handleReschedule(slotId, date)}
          className="btn btn-primary m-2"
        >
          Reschedule
        </button>
      </div>
    </div>
  );
};

export default RescheduleSlot;
