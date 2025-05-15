import DateInput from "./DateInput"
import GeneralInput from "./GeneralInput"
import PeopleInput from "./PeopleInput"
import Header from "./Header"

function CreateEvent() {
    return (
        // TODO: input validation
        <div>
            <Header title="Create An Event" createLink={false} homeLink={true} submitButton={true} />
            <form className="form">
                <GeneralInput id="title" label="Title" />
                <DateInput />
                <GeneralInput id="location" label="Location" />
                <div className="description-container">
                    <label htmlFor="description">  Description (optional)  </label>
                    <textarea className="description-input" id="description"></textarea>
                </div>
                <PeopleInput />
            </form>
        </div>
    );
}


export default CreateEvent;