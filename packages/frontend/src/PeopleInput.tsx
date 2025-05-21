interface IPeopleInputProps {
  minPeople?: number;
  maxPeople?: number;
  onMinPeopleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPeopleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


function PeopleInput(props: IPeopleInputProps) {
  return (
    <div className="people-container">
      <label>People (optional)</label>
      <div className="people-inputs">
        <input
          type="number"
          id="min-people"
          placeholder="Min People"
          value={props.minPeople}
          onChange={props.onMinPeopleChange} />
          to
        <input
          type="number"
          id="max-people"
          placeholder="Max People"
          value={props.maxPeople}
          onChange={props.onMaxPeopleChange}/>
      </div>
    </div>
  );
}

export default PeopleInput;
