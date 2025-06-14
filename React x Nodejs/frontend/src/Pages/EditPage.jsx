import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    rollno: "",
    name: "",
    subject: "",
    fees: "",
    image: ""
  });

  const [newImage, setNewImage] = useState(null); // store selected image file

  const loadStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/student/${id}`);
      setInput(response.data);
    } catch (error) {
      console.error("Failed to load student data", error);
    }
  };

  useEffect(() => {
    loadStudent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImg = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = input.image; // default: existing image

      if (newImage) {
        const formData = new FormData();
        formData.append("file", newImage);
        formData.append("upload_preset", "kapilPhootes");
        formData.append("cloud_name", "dn9v7oysy");

        const cloudRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dn9v7oysy/image/upload",
          formData
        );

        imageUrl = cloudRes.data.url;
      }

      await axios.put(`http://localhost:8080/student/${id}`, {
        ...input,
        image: imageUrl
      });

      alert("Student updated successfully");
      navigate("/display");
    } catch (error) {
      console.error("Failed to update student", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Student ID: {id}</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          type="text"
          name="rollno"
          value={input.rollno}
          onChange={handleChange}
          placeholder="Roll No"
          required
        />
        <input
          className="form-control mb-2"
          type="text"
          name="name"
          value={input.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          className="form-control mb-2"
          type="text"
          name="subject"
          value={input.subject}
          onChange={handleChange}
          placeholder="Subject"
          required
        />
        <input
          className="form-control mb-2"
          type="number"
          name="fees"
          value={input.fees}
          onChange={handleChange}
          placeholder="Fees"
          required
        />

        <div className="mb-2">
          <label>Current Image:</label><br />
          {input.image && <img src={input.image} alt="student" width="150" />}
        </div>

        <div className="mb-2">
          <label>Upload New Image:</label>
          <input
            className="form-control"
            type="file"
            name="image"
            onChange={handleImg}
            accept="image/*"
          />
        </div>

        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditPage;
