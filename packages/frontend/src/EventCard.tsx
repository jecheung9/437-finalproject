export interface IEventCardProps {
    _id?: string; 
    title: string; 
    numInterested: number;
    dateTime: string;
    location?: string;
    description?: string;
    minPeople?: number;
    maxPeople?: number;
    interestedUsers: string[];
    author: string;
    
}

function EventCard(props: IEventCardProps) {
    return (
        <li>
            <h2>{props.title}</h2>
            <ul>
                <li><b>Created by: {props.author}</b></li>
                <li><b>Interested: {props.numInterested}</b></li>
                <li>{props.dateTime}</li>
                {props.location && <li>Location: {props.location}</li>}
                {props.description && <li>{props.description}</li>}
                {props.minPeople && <li>Minimum People: {props.minPeople}</li>}
                {props.maxPeople && <li>Maximum people: {props.maxPeople}</li>}
            </ul>
        </li>
    )
}

export default EventCard;