import { useState } from "react";
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
      const response = await fetch("http://localhost:8080/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        alert("Student data added successfully!");
        setInput({ rollno: "", name: "", subject: "", fees: "" });
      } else {
        alert("Failed to add student: " + data.error);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Server error");
    }
  };

  return(
<>
    <h1 className="h1">Insert Students Data</h1>
    <div className="formset d-flex justify-content-center ">
        
    <br /><br />
    <form className="form-group w-50 " onSubmit={handleSubmit}>
      <div>
        Rollno:
        <input
        class="form-control" 
          type="text"
          name="rollno"
          value={input.rollno}
          onChange={handleChange}
        />
      </div>
      <div>
        
        Name:
        <input
        class="form-control" 
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
        />
      </div>
      <div>
        Subject:
        <input
        class="form-control" 
          type="text"
          name="subject"
          value={input.subject}
          onChange={handleChange}
        />
      </div>
      <div>
        Fees:
        <input
        class="form-control" 
          type="text"
          name="fees"
          value={input.fees}
          onChange={handleChange}
        />
      </div><br />
      <button class="btn btn-primary" type="submit">Submit</button>
    </form>
    </div>
    </>
  );
}
