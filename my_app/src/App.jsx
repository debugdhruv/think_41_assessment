import {useState} from "react";

const App = () => {
  const [startDate, setStartDate] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [occurences, setOccurences] = useState(5);
  const [viewStart, setViewStart] = useState("");
  const [viewEnd, setViewEnd] = useState("");
  const [instances, setInstances] = useState([]);

  const dayMap = {
    Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6
  };
  const generateInstances = () => {
    let date = new Date(startDate);
    const results = [];

    // go to correct day
    while (date.getDay() !== dayMap[dayOfWeek]) {
      date.setDate(date.getDate() + 1);
    }

    for (let i = 0; i < occurences; i++) {
      results.push(new Date(date));
      date.setDate(date.getDate() + 7);
    }

    const viewStartDate = new Date(viewStart);
    const viewEndDate = new Date(viewEnd);

    const filtered = results.filter(d => d >= viewStartDate && d <= viewEndDate);

    setInstances(filtered);
  };

  return (
    <div style={{padding: "2rem", fontFamily:"Arial"}}>
      <h2>Recurring Event Generator</h2>
      <div>
        <label>Start Date:</label>
        <br />
        <input type="date" onChange={(e) => setStartDate(e.target.value)}/>
      </div>

      <div>
        <label>Day of the Week:</label>
        <br />
        <select onChange={(e) => setDayOfWeek(e.target.value)} value={dayOfWeek}>
          {Object.keys(dayMap).map((day) => (
            <option key={day}>{day}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Number of Occurences:</label>
        <br />
        <input type="number" value={occurences} onChange={(e) => setOccurences(e.target.value)}/>       
      </div>

      <div>
        <label>
          View Start Date:
        </label>
        <br />
        <input type="date" onChange={(e) => setViewStart(e.target.value)}/>
      </div>

      <div>
        <label>
          View End Date:
        </label>
        <br />
        <input type="date" onChange={(e) => setViewEnd(e.target.value)}/>
      </div>

      <button style={{marginTop: "1rem"}} onClick={generateInstances}>
        Generate Instances
      </button>

      <h3>Instances:</h3>
      <ul>
        {instances.map((date, i) => (
          <li key={i}>
            {date.toDatetoString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;