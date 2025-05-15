export interface IEventCardProps {
    title: string; 
    numInterested: number;
    dateTime: string;
    location?: string;
    description?: string;
    minPeople?: number;
    maxPeople?: number;
    isInterested: boolean;
    isOwnEvent: boolean;
    
}

function EventCard(props: IEventCardProps) {
    return (
        <li className="card">
            <h2>{props.title}</h2>
            <ul>
                <li><b>Interested: {props.numInterested}</b></li>
                <li>{props.dateTime}</li>
                {props.location && <li>{props.location}</li>}
                {props.description && <li>{props.description}</li>}
                {props.minPeople && <li>Minimum People: {props.minPeople}</li>}
                {props.maxPeople && <li>Maximum people: {props.maxPeople}</li>}
            </ul>
        </li>
    )
}

export default EventCard;