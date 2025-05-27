import axios from "axios";
import { useState } from "react";

const Search = () => {
  const [rollno, setRollno] = useState("");
  const [studentData, setStudentData] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`http://localhost:8080/search?rollno=${rollno}`);
    setStudentData(response.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Student by Roll Number</h2>
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollno}
        onChange={(e) => setRollno(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleSearch}>Search</button>

      {studentData.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Search Results:</h3>
          {studentData.map((stu, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
              <p><strong>Name:</strong> {stu.name}</p>
              <p><strong>Roll No:</strong> {stu.rollno}</p>
              <p><strong>sub:</strong> {stu.subject}</p>
              <p><strong>fees:</strong> {stu.fees}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
