import type { IEventCardProps } from "./EventCard";
import { useParams } from "react-router";

interface IEventDetailsProps {
    events: IEventCardProps[];
    toggleInterest: (id: string) => void;
    deleteEvent: (id: string) => void;
}

function EventDetails(props: IEventDetailsProps) {

    // Getting details of an event based on id
    const { id } = useParams();
    const event = props.events.find(e => e.id === id);
    if (!event) {
        return <div>Event not found</div>
    };


    return (
        <div>
            <div className="event">
                <div className="label"> Title </div> {event.title}
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
                {!event.isOwnEvent && (
                    <button
                        onClick={() => props.toggleInterest(event.id)}
                        disabled={(event.maxPeople !== undefined && event.numInterested === event.maxPeople && !event.isInterested)}>
                        {!event.isInterested ? "I'm interested!" : "Uninterest"} </button>)}
                {event.isOwnEvent && (
                    <button>Edit</button>)}
                {event.isOwnEvent && (
                    <button onClick={() => props.deleteEvent(event.id)}>Delete</button>)}
            </div>
        </div>
    )
}

export default EventDetails;