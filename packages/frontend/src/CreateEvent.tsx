import GeneralInput from "./GeneralInput"
import PeopleInput from "./PeopleInput"
import { useRef, useState } from "react"
import type { IEventCardProps } from "./EventCard"

interface ICreateEventProps {
    onAddEvent: (newEvent: IEventCardProps) => void;
    nextId: number;
    setNextId: (id: number) => void;
}

function CreateEvent(props: ICreateEventProps) {
    const [title, setTitle] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [minPeople, setMinPeople] = useState<number | undefined>(undefined);
    const [maxPeople, setMaxPeople] = useState<number | undefined>(undefined);

    const [titleError, setTitleError] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);


    function formatDateTime(input: string) {
        const year = input.slice(0, 4);
        const month = input.slice(5, 7);
        const day = input.slice(8, 10);
        let hour = parseInt(input.slice(11, 13));
        const minutes = input.slice(14, 16);
        let ampm = "";

        if (hour === 0) {
            hour = 12;
            ampm = "am";
        } else if (hour > 12) {
            hour = hour % 12;
            ampm = "pm";
        } else if (hour === 12) {
            ampm = "pm";
        } else {
            ampm = "am";
        }

        return `${month}/${day}/${year} ${hour}:${minutes}${ampm}`;
    }

    // submit button function, creates a newEvent object, then calls props.onAddEvent(newEvent),
    // and props.onAddEvent == addEvent function passed down from App
    function handleButtonClicked() {
        const dateTimeNew = formatDateTime(dateTime);
        const newEvent = {
            id: String(props.nextId),
            title: title,
            numInterested: 0,
            dateTime: dateTimeNew,
            location,
            description,
            minPeople,
            maxPeople,
            isInterested: false,
            isOwnEvent: true,
        };
        props.onAddEvent(newEvent);
        props.setNextId(props.nextId + 1);
        setTitle("");
        setLocation("");
        setDescription("");
        setMinPeople(undefined);
        setMaxPeople(undefined);
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (title.trim() === "") {
            setTitleError(true);
            titleRef.current?.focus();
        } else {
            setTitleError(false);
        }
        handleButtonClicked();
    };
    

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <GeneralInput
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    aria-invalid={titleError}
                    aria-describedby="titleError"
                    inputRef={titleRef} />
                <div className="date-container">
                    <label htmlFor="dateTime"> Date and Time</label>
                    <input
                        type="datetime-local"
                        id="dateTime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)} />
                </div>
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
                    onMaxPeopleChange={(e) => setMaxPeople(e.target.value === "" ? undefined : parseInt(e.target.value))} />
                
                <div className="error-messages">
                    {titleError && (<p id="titleError"> Title cannot be empty</p>)}
                </div>
                <div className="buttons">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}


export default CreateEvent;