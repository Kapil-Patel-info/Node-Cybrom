import { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is imported
import "../css/Insert.css";
import { useParams } from "react-router-dom";

const  EditPage=() =>{
  const [input, setInput] = useState({
    rollno: "",
    name: "",
    subject: "",
    fees: ""
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  
  const { id } = useParams(); 
  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/display/${id}`); 
      setInput(response.data); 
    } catch (error) {
      setError("Failed to fetch data");
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!input.rollno || !input.name || !input.subject || !input.fees) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/add-student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(input)
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Data submitted successfully!");
        setError(null);
      } else {
        setError(data.message || "Failed to submit data");
      }
    } catch (error) {
      setError("An error occurred while submitting data.");
      console.error("Error submitting data", error);
    }
  };

  useEffect(() => {
    loadData(); // Load data when the component mounts
  }, [id]); // Dependency array includes id to refetch if it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1 className="h1">Edit Students Data id: {id}</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="formset d-flex justify-content-center">
        <br /><br />
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
          </div><br />
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default EditPage;
