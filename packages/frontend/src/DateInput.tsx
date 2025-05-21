interface IDateInputProps {
  month: string;
  day: string;
  year: string;
  time: string;
  onMonthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onYearChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


function DateInput(props: IDateInputProps) {
  return (
    <div className="date-container">
      <label> Date and Time</label>
      <div className="date-inputs">
        <input
          type="text"
          id="month"
          placeholder="MM"
          value={props.month}
          onChange={props.onMonthChange} />
        /
        <input
          type="text"
          id="day"
          placeholder="DD"
          value={props.day}
          onChange={props.onDayChange}/>
        /
        <input
          type="text"
          id="year"
          placeholder="YYYY"
          value={props.year}
          onChange={props.onYearChange}/>
        <input
          type="text"
          id="time"
          placeholder="HH:MM AM/PM"
          value={props.time}
          onChange={props.onTimeChange}/>
      </div>
    </div>
  );
}

export default DateInput;