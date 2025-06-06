import EventSection from "./EventSection";
import EventCard from "./EventCard";
import type { IEventCardProps } from "./EventCard";
import { Link } from "react-router";

interface IHomeProps {
    events: IEventCardProps[];
    isLoading: boolean;
    hasError: boolean;
}


function Home({ events, isLoading, hasError }: IHomeProps) {
    
    if (isLoading) {
        return <p> Loading...</p>
    }

    if (hasError) {
        return <p> There was an error...</p>
    }


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
                {yourEvents.length === 0 ? (<p>You have no events created. Perhaps it's time to create an event...</p>)
                : (renderEventCards(yourEvents))}
            </EventSection>
            <EventSection title="Interested Events">
                {interestedEvents.length === 0 ? (<p>You have no events interested. Perhaps it's time to find an event you're interested in...</p>)
                : (renderEventCards(interestedEvents))}
            </EventSection>
            <EventSection title="All Events">
                {events.length === 0 ? (<p>There are no events. Perhaps it's time to create an event...</p>)
                : (renderEventCards(events))}
            </EventSection>
        </div>
    );
}

export default Home;
