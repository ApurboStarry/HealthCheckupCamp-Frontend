import React from 'react';
import { useParams } from 'react-router-dom';
import VenueInfo from './venueInfo';

const Venue = () => {
  const { venueId } = useParams();
  return ( 
    <VenueInfo venueId={venueId} />
   );
}
 
export default Venue;