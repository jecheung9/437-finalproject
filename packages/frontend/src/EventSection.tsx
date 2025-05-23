interface IEventSectionProps {
    title: string;
    children: React.ReactNode;
}

// this defines the container for (ex. your events)
function EventSection(props: IEventSectionProps) {
    return (
        <div>
            <h1 className="event-category">{props.title}</h1>
            <div className="event-cards"> {props.children} </div>
        </div>
    );
}

export default EventSection;