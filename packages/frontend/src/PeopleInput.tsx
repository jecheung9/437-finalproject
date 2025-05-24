interface IPeopleInputProps {
  minPeople?: number;
  maxPeople?: number;
  onMinPeopleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPeopleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
    inputRef?: React.Ref<HTMLInputElement>;
}


function PeopleInput(props: IPeopleInputProps) {
  return (
    <div className="people-container">
      <label>People (optional)</label>
      <div className="people-inputs">
        <label className="hide" htmlFor="min-people">Minimum</label>
        <input
          type="number"
          id="min-people"
          placeholder="Min People"
          value={props.minPeople || ""}
          min="1"
          onChange={props.onMinPeopleChange}
          ref={props.inputRef}/>
          to
        <label className="hide" htmlFor="max-people">Maximum</label>
        <input
          type="number"
          id="max-people"
          placeholder="Max People"
          value={props.maxPeople || ""}
          min="1"
          onChange={props.onMaxPeopleChange}/>
      </div>
    </div>
  );
}

export default PeopleInput;
