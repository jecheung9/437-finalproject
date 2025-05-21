import DateInput from "./DateInput"
import GeneralInput from "./GeneralInput"
import PeopleInput from "./PeopleInput"
import Header from "./Header"
import { useState } from "react"
import type { IEventCardProps } from "./EventCard"
import { useNavigate } from "react-router"

interface ICreateEventProps {
    onAddEvent: (newEvent: IEventCardProps) => void;
}

function CreateEvent({onAddEvent}: ICreateEventProps) {
    const [title, setTitle] = useState("");
    const [month, setMonth] = useState("");
    const [day, setDay] = useState("");
    const [year, setYear] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [minPeople, setMinPeople] = useState<number | undefined>(undefined);
    const [maxPeople, setMaxPeople] = useState<number | undefined>(undefined);
    const navigate = useNavigate();


    function handleButtonClicked() {
        const dateTime = `${month}/${day}/${year} ${time}`;
        const newEvent = {
            id: "", 
            title: title,
            numInterested: 0,
            dateTime,
            location,
            description,
            minPeople,
            maxPeople,
            isInterested: false,
            isOwnEvent: true,
        };
        onAddEvent(newEvent);
        navigate("/");
        setTitle("");
        setMonth("");
        setDay("");
        setYear("");
        setTime("");
        setLocation("");
        setDescription("");
        setMinPeople(undefined);
        setMaxPeople(undefined);
    };

    return (
        // TODO: input validation
        <div>
            <Header
                title="Create An Event"
                createLink={false}
                homeLink={true}
                submitButton={true}
                onSubmit={handleButtonClicked} />
            <form className="form" onSubmit={(e) => e.preventDefault()}>
                <GeneralInput
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <DateInput
                    month={month}
                    day={day}
                    year={year}
                    time={time}
                    onMonthChange={(e) => setMonth(e.target.value)}
                    onDayChange={(e) => setDay(e.target.value)}
                    onYearChange={(e) => setYear(e.target.value)}
                    onTimeChange={(e) => setTime(e.target.value)} />
                <GeneralInput
                    id="location"
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}/>
                <div className="description-container">
                    <label htmlFor="description">  Description (optional)  </label>
                    <textarea
                        className="description-input"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                <PeopleInput
                    minPeople={minPeople}
                    maxPeople={maxPeople}
                    onMinPeopleChange={(e) => setMinPeople(e.target.value === "" ? undefined : parseInt(e.target.value))}
                    onMaxPeopleChange={(e) => setMaxPeople(e.target.value === "" ? undefined : parseInt(e.target.value))}/>
            </form>
        </div>
    );
}


export default CreateEvent;