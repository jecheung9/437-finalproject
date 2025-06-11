import { Routes, Route } from "react-router";
import Home from "./Home";
import CreateEvent from "./CreateEvent";
import { useState} from "react";
import type { IEventCardProps } from "./EventCard";
import EventDetails from "./EventDetails";
import { Layout } from "./Layout";
import { useNavigate } from "react-router";
import { ValidRoutes } from "../../backend/src/shared/ValidRoutes.ts"
import { LoginPage } from "./LoginPage.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";



function App() {
    const [events, setEvents] = useState<IEventCardProps[]>([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [authToken, setAuthToken] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();


    function fetchEvents(authToken: string) {
        setIsLoading(true);
        setHasError(false);

        fetch("/api/events", {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((res) => {
            if (res.status >= 400) {
                throw new Error("HTTP " + res.status);
            }
            return res.json();
        })
        .then((data) => {
            setEvents(data);
            setIsLoading(false);
        })
        .catch(() => {
            setHasError(true);
            setIsLoading(false);
        });
    }





    function addEvent(newEvent: IEventCardProps) {
        setIsLoading(true);
        setHasError(false);

        fetch("/api/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            },
            body: JSON.stringify(newEvent),
        })
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("HTTP " + res.status);
                }
            })
            .then(() => {
                fetchEvents(authToken);
                setIsLoading(false);
                navigate("/")
            }).catch(() => {
                setHasError(true);
                setIsLoading(false);
            })
    }
    // toggle interested button function (passed as prop)
    function toggleInterest(eventId: string) { 
        const event = events.find(e => e._id === eventId);
        if (!event) {
            return;
        }

    const interestedUsers = event.interestedUsers ?? [];
    const isInterested = interestedUsers.includes(currentUser) ?
        interestedUsers.filter(user => user !== currentUser) : [...interestedUsers, currentUser];

        const updatedEvent = {
            ...event,
            interestedUsers: isInterested,
            numInterested: isInterested.length
        };

        setIsLoading(true);
        setHasError(false);

        fetch(`/api/events/${eventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
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
                setEvents(events.map((event) => event._id === data._id ? data : event));
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
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        })
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("HTTP " + res.status);
                }
                return;
            }).then(() => {
                setEvents(events.filter((event) => event._id !== eventId));
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
        console.log(updatedEvent)
        const updatedEventId = updatedEvent._id?.toString();
        setIsLoading(true);
        setHasError(false);
        fetch(`/api/events/${updatedEventId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
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
                setEvents(events.map((event) => event._id?.toString() === data._id.toString() ? data : event));
                setIsLoading(false);
            })
            .catch(() => {
                setHasError(true);
                setIsLoading(false);
            });
    }

    function handleLogin(token: string, username: string) {
        setAuthToken(token);
        setCurrentUser(username);
        fetchEvents(token);
    }

    return (
        <Routes>
            <Route path={ValidRoutes.HOME} element={<Layout/>}>
                <Route index element={
                    <ProtectedRoute authToken={authToken}>
                        <Home
                            events={events}
                            isLoading={isLoading}
                            hasError={hasError}
                            currentUser={currentUser} />
                    </ProtectedRoute>} />
                <Route path={ValidRoutes.CREATE} element={
                    <ProtectedRoute authToken={authToken}>
                        <CreateEvent
                            onAddEvent={addEvent}
                            currentUser={currentUser}/>
                        </ProtectedRoute>} />
                <Route path={ValidRoutes.EVENTS} element={
                    <ProtectedRoute authToken={authToken}>
                    <EventDetails
                        events={events}
                        toggleInterest={toggleInterest}
                        deleteEvent={deleteEvent}
                        onEditEvent={editEvent}
                        isLoading={isLoading}
                        hasError={hasError}
                        currentUser={currentUser}/>
                    </ProtectedRoute>} />
                <Route path={ValidRoutes.LOGIN} element={
                    <LoginPage
                        isRegistering={false}
                        onLogin={handleLogin}/>} />
                <Route path={ValidRoutes.REGISTER} element={
                    <LoginPage
                        isRegistering={true}
                        onLogin={handleLogin}/>} />
            </Route>
        </Routes>
    );
}


export default App;