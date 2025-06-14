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
        user: "pablo.considine96@ethereal.email",
        pass: "cjXbTW5D6XzTGQcxqZ"
      }
    });

    let mailOptions = {
      from: `"Admin" <${ "pablo.considine96@ethereal.email"}>`,
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



module.exports={
    adminLogin,
    createUser,
    showUserData,
    assignTask
}