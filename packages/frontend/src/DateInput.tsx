function DateInput() {
  return (
    <div className="date-container">
      <label> Date and Time</label>
      <div className="date-inputs">
        <input type="text" id="month" placeholder="MM" />/
        <input type="text" id="day" placeholder="DD" />/
        <input type="text" id="year" placeholder="YYYY" />
        <input type="text" id="time" placeholder="Time" />
      </div>
    </div>
  );
}

export default DateInput;