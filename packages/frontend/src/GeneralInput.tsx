interface IGeneralInput {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
    inputRef?: React.Ref<HTMLInputElement>;
}

// normal input box
// ref is needed for focusing on input validation fail
function GeneralInput(props: IGeneralInput) {
    return (
        <div className="general-inputs">
            <label htmlFor={props.id}>{props.label}</label>
            <input
                type="text"
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                ref={props.inputRef}
            />
        </div>
    );
}

export default GeneralInput;