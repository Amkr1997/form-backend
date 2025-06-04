const connectDB = require("../db/dbSec.connect");
const nodeMailer = require("nodemailer");
const SingleUser = require("../models/singleUserSchema.model");
require("dotenv").config({ path: ".env" });

console.log(process.env.AMAN_MESSOLD_PASS);

// Configure mail
const sendMail = async (userData) => {
  console.log(userData?.questionsAnswers?.[1]?.answer);
  // Creating email transporter,
  // SMTP (Simple Mail Transfer Protocol)
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "aman.khare@messold.com",
      pass: process.env.AMAN_MESSOLD_PASS,
    },
  });

  // Configure email content
  const mailOptions = {
    from: "aman.khare@messold.com",
    to: `${userData?.questionsAnswers?.[1]?.answer}`,
    subject: "Your filled details",
    html: `<ul>
    <h2 style="padding: 0.5rem 0;">Your Messold Form Details</h2>
    ${userData?.questionsAnswers
      ?.map((details) => {
        return ` 
      <li style="list-style: none; margin-bottom: 10px;">
          <h3>
            <span>${details?.title}</span>: <strong>${details?.answer}</strong>
          </h3>
        </li>`;
      })
      .join("")}
    </ul>`,
  };

  // Send Email
  try {
    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    console.log("Error while sending email: ", error);
  }
};

const addQuestion = async (req, res) => {
  const userData = req.body;

  try {
    await connectDB();

    const newUser = await SingleUser.create(userData);

    // const newDetails = new SingleUser(userData);
    // const savedDetails = await newDetails.save();
    // console.log(newUser);

    if (!newUser) {
      return res.status(404).json({ message: "Details cannot get save" });
    }

    const mailResponse = await sendMail(userData); // used for sending mail to user filling form

    // console.log(mailResponse);

    if (!mailResponse) {
      return res.status(404).json({ message: "Mail not send" });
    }

    // console.log("Email sent successfully!");

    return res.status(200).json({ message: "Details saved", details: newUser });
  } catch (error) {
    console.log("Error adding details of user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllQUestions = async (req, res) => {
  try {
    await connectDB();

    const allQuestions = await SingleUser.find();

    if (!allQuestions) {
      return res.status(404).json({ message: "Questions not found" });
    }

    return res
      .status(200)
      .json({ message: "Questions found", details: allQuestions });
  } catch (error) {
    console.log("Error adding details of user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDetails = async (req, res) => {
  const id = req.params.id;

  try {
    await connectDB();

    const deletedDetails = await SingleUser.findByIdAndDelete(id);

    if (!deletedDetails) {
      return res.status(404).json({ message: "Details got deleted" });
    }

    return res
      .status(200)
      .json({ message: "Details deleted", details: deletedDetails });
  } catch (error) {
    console.log("Error adding details of user", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addQuestion, getAllQUestions, deleteDetails };
