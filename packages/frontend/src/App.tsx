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





    function addEvent(newEvent: IEventCardProps) {
        setIsLoading(true);
        setHasError(false);

        fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEvent),
        })
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("HTTP " + res.status);
                }
                return;   
            })
            .then(() => {
                setEvents((events) => [...events, newEvent]);
                setIsLoading(false);
                navigate("/")
            }).catch(() => {
                setHasError(true);
                setIsLoading(false);
            })
    }
    // toggle interested button function (passed as prop)
    function toggleInterest(eventId: string) { 
        const event = events.find(e => e.id === eventId);
        if (!event) {
            return;
        }
        const updatedEvent = {
            ...event,
            isInterested: !event.isInterested,
            numInterested: event.numInterested + (!event.isInterested ? 1 : -1),
        };

        setIsLoading(true);
        setHasError(false);

        fetch(`/api/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEvent),
        })
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("HTTP " + res.status);
                }
                return res.json();
            })
            .then((data) => {
                setEvents(events.map((event) => event.id === data.id ? data : event));
                setIsLoading(false);
                navigate("/");
            })
            .catch((err) => {
                console.log("Caught error:", err);
                setHasError(true);
                setIsLoading(false);
            });
    }

    // delete event function 
    function deleteEvent(eventId: string) {
        setIsLoading(true);
        setHasError(false);
        fetch(`/api/events/${eventId}`, {
            method: "DELETE",
        })
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("HTTP " + res.status);
                }
                return;
            }).then(() => {
                setEvents(events.filter((event) => event.id !== eventId));
                navigate("/");
                setIsLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setIsLoading(false);
            });
    }

    // edit event function
    function editEvent(updatedEvent: IEventCardProps) {
        setIsLoading(true);
        setHasError(false);
        fetch(`/api/events/${updatedEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedEvent),
        })
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("HTTP " + res.status);
                }
                return res.json();
            })
            .then((data) => {
                setEvents(events.map((event) => event.id === data.id ? data : event));
                setIsLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setIsLoading(false);
            });
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