import axios from "axios";
import { useState, useEffect } from "react";
import BackEndUrl from "../config/BackendUrl";
import Table from 'react-bootstrap/Table';
import right from "../public/right.jpg";
import wrong from "../public/wrong.webp";
import Button from "react-bootstrap/esm/Button";
const TaskDetail=()=>{
    const [mydata, setMydata] = useState([]);

    const loadData=async()=>{
          let api=`${BackEndUrl}/admin/taskdetail`
          try {
              const response= await axios.get(api);
              console.log(response.data);
              setMydata(response.data);
          } catch (error) {
             console.log(error);
          }
    }

    useEffect(()=>{
        loadData();
    }, [])

   const changeTaskStatus=async(id)=>{
    let api=`${BackEndUrl}/admin/changetaskstatus/?id=${id}`;
    try {
          const response = await axios.get(api);
          console.log(response);
    } catch (error) {
        console.log(error);
    }

    loadData();
   }

    let no=0
    const ans= mydata.map((key)=>{
         no++;
        return(
            <>
              <tr>
                <td>

               {key.taskstatus ? (<>
                 <img src={right }  width="30" height="30"/>
               </>) :(
                <>
                    <img src={wrong } width="30" height="30" />
                </>
               )}

                </td>
                <td>{no}</td>
                <td>{key.userid.name}</td>
                <td>{key.userid.email}</td>
                <td>{key.title}</td>
                <td>{key.description}</td>
                <td> 

                      
                      {key.taskstatus ? (<>
                        <Button variant="success" size="sm" onClick={()=>{changeTaskStatus(key._id)}}> ReAssign </Button>
                      
                      </>) :(<>
                      
                       <Button variant="danger" size="sm"> Pending... </Button></>)}
                   
                     
                </td>
              </tr>
            </>
        )
    })
    return(
        <>
          <h2> Task Detail List</h2>
           <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>#</th>
          <th>Employee Name</th>
          <th>Email</th>
          <th>Task Title</th>
          <th>Description</th>
          <th> Action</th>
        </tr>
      </thead>
      <tbody>
     {ans}
      </tbody>
  </Table>
        </>
    )
}

export default TaskDetail;