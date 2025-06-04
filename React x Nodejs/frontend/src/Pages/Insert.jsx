import { useState } from "react";
import axios from "axios";
import "../css/Insert.css";

export default function Insert() {
  const [uploadImage,setUploadImage]=useState("");
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
     

   const formData = new FormData();
    formData.append('file',uploadImage);
    formData.append('upload_preset','kapilPhootes');
    formData.append('cloud_name','dn9v7oysy');
    

    const response = await axios.post('https://api.cloudinary.com/v1_1/dn9v7oysy/image/upload',formData);




console.log(response);
alert("sucess");

  };

  const handleImg=(e)=>{

setUploadImage(e.target.files[0]);
console.log(uploadImage);
  }

  return (
    <>
      <h1 className="h1">Insert Students Data</h1>
      <div className="formset d-flex justify-content-center">
        <form className="form-group w-50" >
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

          <div>
            image:
            <input
              className="form-control"
              type="file"
              name="image"
              value={input.image}
                onChange={handleImg}
            />
          </div>

          <br />
          <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
