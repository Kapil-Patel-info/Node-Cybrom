const AdminModel = require("../models/adminModel");
const UserModel= require("../models/userModel");
const TaskModel= require("../models/taskModel");
const userPassword= require("../middlewares/randomPassword");
var nodemailer = require('nodemailer');

const adminLogin=async(req, res)=>{
     const { adminid, password }= req.body;
 
     try {
        const admin= await AdminModel.findOne({"id":adminid}) 
        if (!admin)
         {
            res.status(401).send({msg:"Invalid User Id"})
         }
 
         if (admin.password!=password)
        {
            res.status(401).send({msg:"Invalid Credentials!"});
        }


    res.status(200).send({admin:admin, msg:"Login Succesfully!" });
     } catch (error) {
         console.log(error);
     }
}



const createUser = async (req, res) => {
  const { name, email, designation } = req.body;
  const UserPass = userPassword();

  try {
    const User = await UserModel.create({
      name,
      email,
      designation,
      password: UserPass
    });

    // Create a test account (only once, or move it outside the function for efficiency)
    let testAccount = await nodemailer.createTestAccount();

    // Set up transporter using Ethereal
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: "josue22@ethereal.email",
        pass: "JVkYechv9qv3KcTPYq"
      }
    });

    let mailOptions = {
      from: `"Admin" <${ "josue22@ethereal.email"}>`,
      to: email,
      subject: 'Sending Email by Admin',
      text: `Welcome: ${name}!\nYour Password: ${UserPass}\nYou can login with this password.`
    };

    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.send({ msg: "User created and email sent!", previewUrl: nodemailer.getTestMessageUrl(info) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Failed to create user or send email." });
  }
};

const showUserData=async(req, res)=>{
  
    try {
        const User= await UserModel.find();
        res.status(201).send(User);
    } catch (error) {
        console.log(error);
    }
   

}

const assignTask=async(req, res)=>{
     const {title, description,   complday, userid} = req.body;

     try {
        const Task= await TaskModel.create({
               title:title,
              description:description,
              compday:complday,
              userid:userid
        })
        res.status(201).send({msg:"User Task Succesfully Assign!"});
     } catch (error) {
       console.log(error);
     }
}




const taskDetail=async(req, res)=>{
  try {
     const Task= await TaskModel.find().populate("userid");
     res.status(200).send(Task);
  } catch (error) {
    console.log(error);
  }
}


const changeTaskStatus=async(req, res)=>{
    const {id} = req.query;
    console.log(req.query);
    try {
         const Task = await TaskModel.findByIdAndUpdate(id, {
          taskstatus:false
         })
         res.status(201).send("Succesfully updated!!!");
    } catch (error) {
       console.log(error);
    }
}



const handleDelete = async (req, res) => {
  const { id } = req.query;
  try {
    const response = await TaskModel.findOneAndDelete({ _id: id });
    if (!response) {
      return res.status(404).send({ msg: "Task not found" });
    }
    res.status(200).send({ response, msg: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error" });
  }
};



const updatetask = async (req, res) => {
  try {
    const { _id, title, description, compday } = req.body;

    if (!_id) {
      return res.status(400).send({ msg: "Task ID is required" });
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      _id,
      { title, description, compday },
      { new: true } // return updated document
    );

    if (!updatedTask) {
      return res.status(404).send({ msg: "Task not found" });
    }

    res.status(200).send({ msg: "Task updated successfully", task: updatedTask });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Server error while updating task" });
  }
};






const changepassword = async (req, res) => {
  const { userid, oldPass, newPass } = req.body;

  try {
    const user = await UserModel.findById(userid);
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.password !== oldPass) {
      return res.json({ success: false, message: "Old password incorrect" });
    }

    user.password = newPass;  
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};



module.exports={
    adminLogin,
    createUser,
    showUserData,
    assignTask,
     taskDetail,
    changeTaskStatus,
    handleDelete,
    updatetask,
    changepassword
}