import { Routes, Route } from "react-router";
import Home from "./Home";
import CreateEvent from "./CreateEvent";
import { useState } from "react";
import type { IEventCardProps } from "./EventCard";

const initialEvents = [
    {
        id: "1",
        title: "Birthday Party",
        numInterested: 6,
        dateTime: "04/24/2025 5:30pm",
        location: "12345 Jones Ave.",
        description: "Some form of a description here",
        isInterested: false,
        isOwnEvent: true,
    },
    {
        id: "2",
        title: "Wedding",
        numInterested: 400,
        dateTime: "04/26/2025 9:30am",
        location: "12345 Jones Ave.",
        description: "Some form of a description here that is very long to test some stuff 123aaaaaaaaaa",
        maxPeople: 400,
        isInterested: true,
        isOwnEvent: false,
    },
    {
        id: "3",
        title: "Game Night",
        numInterested: 1,
        dateTime: "04/27/2025 1:30am",
        isInterested: false,
        isOwnEvent: false,
    },
    {
        id: "4",
        title: "NBA Playoffs Watch Party",
        numInterested: 4,
        dateTime: "04/26/2025 5:30pm",
        location: "12345 Jones Ave.",
        description: "Some form of a description here",
        minPeople: 2,
        isInterested: false,
        isOwnEvent: false,
    },
];


function App() {
    const [events, setEvents] = useState<IEventCardProps[]>(initialEvents);

    function addEvent(newEvent: IEventCardProps) {
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
    }

    return (
        <Routes>
            <Route path="/" element={<Home events={events} />} />
            <Route path="/create" element={<CreateEvent onAddEvent={addEvent}/>} />
        </Routes>
    );
}


export default App;