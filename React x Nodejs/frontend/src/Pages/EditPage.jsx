import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const EditPage=()=>{
const { id } = useParams();
const [Data,setData]= useState();

const loadData= async()=>{
    let api = `http://localhost:8080/display`;
    const response = await axios.get(api);
    
    console.log("response  =  ",response);
    setData(response);
    console.log("setData => " , Data);

}


useEffect((
    loadData()
),[]);

return(<>

<h1>id : {id} </h1>

</>)

}

export default EditPage;