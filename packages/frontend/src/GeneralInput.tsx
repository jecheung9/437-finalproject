interface IGeneralInput {
    id: string;
    label: string;
    placeholder?: string;
}

function GeneralInput(props: IGeneralInput) {
    return (
        <div className="general-inputs">
            <label htmlFor={props.id}>{props.label}</label>
            <input type="text" id={props.id} placeholder={props.placeholder} />
        </div>
    );
}

export default GeneralInput;