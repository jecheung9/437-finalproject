import EventSection from "./EventSection";
import EventCard from "./EventCard";
import type { IEventCardProps } from "./EventCard";
import { Link } from "react-router";

interface IHomeProps {
    events: IEventCardProps[];
}


function Home({events}: IHomeProps) {
    function renderEventCards(eventList: IEventCardProps[]) {
        return eventList.map((event) => (
        <Link className="card" key={event.id} to={"/events/" + event.id}>
            <EventCard
                id={event.id}
                key={event.id}    
                title={event.title}
                numInterested={event.numInterested}
                dateTime={event.dateTime}
                location={event.location}
                description={event.description}
                minPeople={event.minPeople}
                maxPeople={event.maxPeople}
                isInterested={event.isInterested}
                isOwnEvent={event.isOwnEvent}
            />
        </Link>
        ));
    }

    const yourEvents = events.filter((event) => event.isOwnEvent);
    const interestedEvents = events.filter((event) => event.isInterested);

    return (
        <div>
            <EventSection title="Your Events">
                {renderEventCards(yourEvents)}
            </EventSection>
            <EventSection title="Interested Events">
                {renderEventCards(interestedEvents)}
            </EventSection>
            <EventSection title="All Events">
                {renderEventCards(events)}
            </EventSection>
        </div>
    );
}

export default Home;
