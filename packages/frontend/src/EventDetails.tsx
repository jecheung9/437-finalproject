import type { IEventCardProps } from "./EventCard";
import { useParams } from "react-router";
import { useState } from "react";
import CreateEvent from "./CreateEvent";

interface IEventDetailsProps {
    events: IEventCardProps[];
    toggleInterest: (id: string) => void;
    deleteEvent: (id: string) => void;
    onEditEvent: (updatedEvent: IEventCardProps) => void;
    isLoading: boolean;
    hasError: boolean;
    currentUser: string;
}

function EventDetails(props: IEventDetailsProps) {


    if (props.isLoading) {
        return <p>Loading ...</p>;
    }

    if (props.hasError) {
        return <p>Failed to load ...</p>;
    }


    // Getting details of an event based on id
    const { id } = useParams();
    const event = props.events.find(e => e._id === id);
    const [isEditing, setIsEditing] = useState(false);
    if (!event) {
        return <div>Event not found</div>
    };

    function handleEditedEvent(updatedEvent: IEventCardProps) {
        const newUpdatedEvent = {...updatedEvent, _id: id! }
        props.onEditEvent(newUpdatedEvent);
        setIsEditing(false);
    }


    // if isEditing is true, pull up the event form, edit on submit.
    return (
        <div> 
            {isEditing ? (
                <div>
                <CreateEvent
                    eventToEdit={event}
                    onAddEvent={handleEditedEvent} 
                    onCancel={() => setIsEditing(false)}
                    currentUser={props.currentUser}
                    />
                </div>
            ) : (
                <>
                    <div className="event">
                        <div className="label"> Title </div> {event.title}
                        <div className="label"> Created by </div> {event.author}
                        <div className="label"> Interested </div> {event.numInterested}
                        <div className="label">  Date and Time </div> {event.dateTime}
                        <div className="label">  Location  </div> {event.location || "N/A"}
                        <div className="label">  Description  </div> {event.description || "N/A"}
                        <div className="label">  Minimum people  </div> {event.minPeople || "N/A"}
                        <div className="label">  Maximum people  </div> {event.maxPeople || "N/A"}
                    </div>

                    {/* buttons show based on criteria, and clicking the buttons
                    will call the functions as props */}
                    <div className="buttons">
                        {event.author !== props.currentUser && (
                            <button
                                onClick={() => props.toggleInterest(event._id!)}
                                disabled={(event.maxPeople !== undefined && event.numInterested === event.maxPeople && !event.isInterested)}>
                                {!event.isInterested ? "I'm interested!" : "Uninterest"} 
                            </button>)}
                        {event.author === props.currentUser && (
                            <button onClick={() => setIsEditing(true)}>Edit</button>)}
                        {event.author === props.currentUser && (
                            <button onClick={() => props.deleteEvent(event._id!)}>Delete</button>)}
                    </div>
                </>
            )}
        </div>
    )
}

export default EventDetails;