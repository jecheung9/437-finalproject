import EventSection from "./EventSection";
import Header from "./Header";
import EventCard from "./EventCard";
import type { IEventCardProps } from "./EventCard";


const events = [
    {
        title: "Birthday Party",
        numInterested: 6,
        dateTime: "04/24/2025 5:30pm",
        location: "12345 Jones Ave.",
        description: "Some form of a description here",
        isInterested: false,
        isOwnEvent: true,
    },
    {
        title: "Wedding",
        numInterested: 400,
        dateTime: "04/26/2025 9:30am",
        location: "12345 Jones Ave.",
        description: "Some form of a description here that is very long to test some stuff 123aaaaaaaaaa",
        maxPeople: 400,
        isInterested: true,
        isOwnEvent: false,
    },
    {
        title: "Game Night",
        numInterested: 1,
        dateTime: "04/27/2025 1:30am",
        isInterested: false,
        isOwnEvent: false,   
    },
    {
        title: "NBA Playoffs Watch Party",
        numInterested: 4,
        dateTime: "04/26/2025 5:30pm",
        location: "12345 Jones Ave.",
        description: "Some form of a description here",
        minPeople: 2,
        isInterested: false,
        isOwnEvent: false,
    },
]


function App() {
    function renderEventCards(eventList: IEventCardProps[]) {
        return eventList.map((event) => (
        <EventCard
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

export default App;
