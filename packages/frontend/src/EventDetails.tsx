import type { IEventCardProps } from "./EventCard";
import { useParams } from "react-router";

interface IEventDetailsProps {
    events: IEventCardProps[];
}

function EventDetails(props: IEventDetailsProps) {
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

            <div className="buttons">
                <button>Interested?</button>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default EventDetails;