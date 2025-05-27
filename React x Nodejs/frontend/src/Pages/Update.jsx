import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [data, setData] = useState([]);

const navigate = useNavigate();

  const loadData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/display");
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

    const recEdit=async(id)=>{

console.log(id);
  navigate(`/EditPage/${id}`);

  }


  const deleteData = async (id) => {

      await axios.delete(`http://localhost:8080/delete${id}`);
      loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Student List</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Fees</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={student._id}>
              <td>{index + 1}</td>
              <td>{student.rollno}</td>
              <td>{student.name}</td>
              <td>{student.subject}</td>
              <td>₹{student.fees}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteData(student._id)}
                >
                  Delete
                </button>
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => recEdit(student._id)}
                >
                  Edit
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Update;
