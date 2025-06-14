import { useState } from "react";
import axios from "axios";
import "../css/Insert.css";

export default function Insert() {
  const [uploadImage, setUploadImage] = useState(null);
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

  const handleImg = (e) => {
    setUploadImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("rollno", input.rollno);
  formData.append("name", input.name);
  formData.append("subject", input.subject);
  formData.append("fees", input.fees);
  formData.append("image", uploadImage); 

  try {
    const response = await axios.post("http://localhost:8080/add-student", formData);

    console.log("Upload success:", response.data);
    alert("Student added successfully!");
  } catch (error) {
    console.error("Submission error:", error);
    alert("Failed to submit form.");
 }
};


  return (
    <>
      <h1 className="h1">Insert Students Data</h1>
      <div className="formset d-flex justify-content-center">
        <form className="form-group w-50" onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            Rollno:
            <input className="form-control" type="text" name="rollno" value={input.rollno} onChange={handleChange} required />
          </div>
          <div>
            Name:
            <input className="form-control" type="text" name="name" value={input.name} onChange={handleChange} required />
          </div>
          <div>
            Subject:
            <input className="form-control" type="text" name="subject" value={input.subject} onChange={handleChange} required />
          </div>
          <div>
            Fees:
            <input className="form-control" type="number" name="fees" value={input.fees} onChange={handleChange} required />
          </div>
          <div>
            Image:
            <input className="form-control" type="file" name="image" onChange={handleImg} accept="image/*" required />
          </div>
          <br />
          <button className="btn btn-primary" type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
