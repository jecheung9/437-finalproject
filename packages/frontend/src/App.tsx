import { Routes, Route } from "react-router";
import Home from "./Home";
import CreateEvent from "./CreateEvent";
import { useState, useEffect } from "react";
import type { IEventCardProps } from "./EventCard";
import EventDetails from "./EventDetails";
import { Layout } from "./Layout";
import { useNavigate } from "react-router";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts"



function App() {
    const [events, setEvents] = useState<IEventCardProps[]>([]); 
    // const [nextId, setNextId] = useState(initialEvents.length + 1); // useState to set the id
    const [nextId, setNextId] = useState(1); 
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate(); // navigate to go back to the home page on specific button clicks


    useEffect(() => {
        setIsLoading(true);
        setHasError(false);
        fetch("/api/events")
            .then((res) => {
                if (res.status >= 400) {
                    throw new Error("HTTP " + res.status);
                }
                return res.json();
            })
            .then((data) => {
                setEvents(data);
                setIsLoading(false);
                setNextId(data.length + 1);
            })
            .catch(() => {
                setHasError(true);
                setIsLoading(false);
            });
    }, []);





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

    // edit event function
    function editEvent(updatedEvent: IEventCardProps) {
        setEvents(events.map((event) => event.id === updatedEvent.id ? updatedEvent : event));
    }

    return (
        <Routes>
            <Route path={ValidRoutes.HOME} element={<Layout/>}>
                <Route index element={<Home events={events} isLoading={isLoading} hasError={hasError} />} />
                <Route path={ValidRoutes.CREATE} element={<CreateEvent onAddEvent={addEvent} nextId={nextId} setNextId={setNextId} />} />
                <Route path={ValidRoutes.EVENTS} element={<EventDetails events={events} toggleInterest={toggleInterest} deleteEvent={deleteEvent} onEditEvent={editEvent} isLoading={isLoading} hasError={hasError} />} />
            </Route>
        </Routes>
    );
}


export default App;