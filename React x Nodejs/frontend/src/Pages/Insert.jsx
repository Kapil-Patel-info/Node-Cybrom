import { useState } from "react";
import axios from "axios";
import "../css/Insert.css";

export default function Insert() {
  const [input, setInput] = useState({
    rollno: "",
    name: "",
    subject: "",
    fees: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/add-student", input);
      console.log("Response from server:", response.data);

      alert("Student data added successfully!");
      setInput({ rollno: "", name: "", subject: "", fees: "" });
    } catch (err) {
      console.error("Error submitting form:", err);
      if (err.response) {
        alert("Failed to add student: " + err.response.data.error);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <>
      <h1 className="h1">Insert Students Data</h1>
      <div className="formset d-flex justify-content-center">
        <form className="form-group w-50" onSubmit={handleSubmit}>
          <div>
            Rollno:
            <input
              className="form-control"
              type="text"
              name="rollno"
              value={input.rollno}
              onChange={handleChange}
            />
          </div>
          <div>
            Name:
            <input
              className="form-control"
              type="text"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          </div>
          <div>
            Subject:
            <input
              className="form-control"
              type="text"
              name="subject"
              value={input.subject}
              onChange={handleChange}
            />
          </div>
          <div>
            Fees:
            <input
              className="form-control"
              type="text"
              name="fees"
              value={input.fees}
              onChange={handleChange}
            />
          </div>
          <br />
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
