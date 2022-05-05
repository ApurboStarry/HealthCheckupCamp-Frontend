import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import slotService from '../services/slotService';
import Spinner from './common/spinner';


const AllAllocatedSlots = () => {
  const { venueId } = useParams();
  const [slots, setSlots] = useState();
  
  const getSlots = async () => {
    const slots = await slotService.getAllAllocatedSlotsOfVenue(venueId);
    setSlots(slots);
  }
  
  useEffect(() => {
    getSlots()
  }, []);
  
  const handleMarkAsCompleted = async (slotId) => {
    try {
      await slotService.markSlotAsCompleted(slotId);
      const newSlots = slots.filter(slot => slot._id !== slotId);
      setSlots(newSlots);
    } catch (error) {
      
    }
  };
  
  return ( 
    <div>
      <h1>All Currently Allocated Slots</h1>
      {!slots && (
        <Spinner />
      )}
      {slots && slots.map(slot => {
        return (
          <div key={slot._id}>
            Scheduled at: {new Date(slot.scheduledAt).toString()}
            <button onClick={() => handleMarkAsCompleted(slot._id)} className="btn btn-success m-2">Mark slot as completed</button>
          </div>
        );
      })}
    </div>
   );
}
 
export default AllAllocatedSlots;