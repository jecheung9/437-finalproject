interface IGeneralInput {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function GeneralInput(props: IGeneralInput) {
    return (
        <div className="general-inputs">
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type="text"
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export default GeneralInput;