import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import  GeneralEventsView  from '../../components/events/GeneralEventsView.jsx';
import { CreateEventForm } from '../../components/events/createEventForm.jsx';


const EventsPage = () => {
  const [view, setView] = useState('general');
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  return (
    <>

      {view === "general" && (
        <GeneralEventsView setView={setView} setSelectedEvent={setSelectedEvent} />
      )}
      {view === "create" && (
        <CreateEventForm setView={setView} />
      )}
    </>
  );
};

export default EventsPage;