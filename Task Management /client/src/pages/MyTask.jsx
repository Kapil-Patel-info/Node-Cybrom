import axios from "axios";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const MyTask = () => {
  const [mydata, setMydata] = useState([]);

  const loadData = async () => {
    const userId = localStorage.getItem("userid");

    const api = `${BackEndUrl}/user/mytask/?id=${userId}`;

    try {
      const response = await axios.get(api);

      setMydata(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const submitTask = async (id) => {
    const api = `${BackEndUrl}/user/completetask/?id=${id}`;

    try {
      const response = await axios.get(api);
      console.log("form sumbit btn => ", response);
      loadData();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="p-3">
      <h3 className="text-center text-primary mb-4">
        📋 Task List Given By Admin
      </h3>

      {mydata.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Completion Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mydata.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.compday}</td>
                <td>
                 
                {task.taskstatus ? (<>
                  <Button style={{backgroundColor:"green"}} disabled>Task Submited</Button>
                </>) :(<>
                       <Button onClick={()=>{submitTask(task._id)}}>Submit Task</Button>
                </>)}
                 
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p className="text-muted text-center">No tasks assigned yet.</p>
      )}
    </div>
  );
};

export default MyTask;
