function PeopleInput() {
  return (
    <div className="people-container">
      <label>People (optional)</label>
      <div className="people-inputs">
        <input type="text" id="min-people" placeholder="Min People" />
        to
        <input type="text" id="max-people" placeholder="Max People" />
      </div>
    </div>
  );
}

export default PeopleInput;
