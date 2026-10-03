require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// direct sendMail hatao aur function export karo
const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent Successfully!");
  } catch (error) {
    console.log("❌ Error", error);
  }
};

module.exports = sendMail;


// const mailOptions = {
//   from: process.env.EMAIL_USER,
//   to: process.env.EMAIL_USER,
//   subject: "Test Mail",
//   text: "Hello form Node.js"
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log("Error", error);
//   } else {
//     console.log("Email sent Successfully!");
//     console.log(info.response);
//   }
// });


// SMTP = Email bhejne ka rule / system
