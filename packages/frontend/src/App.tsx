import { Routes, Route } from "react-router";
import Home from "./Home";
import CreateEvent from "./CreateEvent";
import { useState } from "react";
import type { IEventCardProps } from "./EventCard";
import EventDetails from "./EventDetails";
import { Layout } from "./Layout";
import { useNavigate } from "react-router";

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
        maxPeople: 1,
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
    const [nextId, setNextId] = useState(initialEvents.length + 1); // useState to set the id
    const navigate = useNavigate(); // navigate to go back to the home page on specific button clicks

    // add event function (passed as a prop, because my state to control events is in here)
    function addEvent(newEvent: IEventCardProps) {
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        navigate("/");
    }
    // toggle interested button function (passed as prop)
    function toggleInterest(eventId: string) { 
        setEvents(events.map((event) => {
            if (event.id === eventId) {
                return {
                    ...event,
                    isInterested: !event.isInterested,
                    numInterested: event.numInterested + (!event.isInterested ? 1 : -1),
                };
            }
            return event;
        }));
        navigate("/");
    }

    // delete event function 
    function deleteEvent(eventId: string) {
        setEvents(events.filter((event) => event.id !== eventId));
        navigate("/");
    }

    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home events={events} />} />
                <Route path="create" element={<CreateEvent onAddEvent={addEvent} nextId={nextId} setNextId={setNextId} />} />
                <Route path="events/:id" element={<EventDetails events={events} toggleInterest={toggleInterest} deleteEvent={deleteEvent} />} />
            </Route>
        </Routes>
    );
}


export default App;