import EventSection from "./EventSection";
import Header from "./Header";
import EventCard from "./EventCard";
import type { IEventCardProps } from "./EventCard";

interface IHomeProps {
    events: IEventCardProps[];
}


function Home({events}: IHomeProps) {
    function renderEventCards(eventList: IEventCardProps[]) {
        return eventList.map((event) => (
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
        ));
    }

    const yourEvents = events.filter(event => event.isOwnEvent);
    const interestedEvents = events.filter(event => event.isInterested);

    return (
        <div>
            <Header title="Event Manager" createLink={true} homeLink={false} submitButton={false} />
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
