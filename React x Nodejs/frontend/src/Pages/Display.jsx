// src/Pages/Display.jsx
import { useState, useEffect } from "react";
import axios from "axios";

const Display = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/display");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Student List</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Fees (₹)</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.rollno}</td>
              <td>{student.name}</td>
              <td>{student.subject}</td>
              <td>{student.fees}</td>
              <td>
                {student.image && (
                  <img
                    src={`http://localhost:8080/${student.image}`}
                    alt={student.name}
                    width="150"
                    height="100"
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Display;
