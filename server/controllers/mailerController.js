const nodemailer = require("nodemailer");
const {GMAIL_USERNAME, GMAIL_PASSWORD} = process.env

module.exports = {
  send: async (req, res) => {
    const {list,body} = req.body
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USERNAME,
        pass: GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "youremail@gmail.com",
      to: `${list}`,
      subject: "Wedding updates",
      text: `${body}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).send(error)
      } else {
        console.log("Email sent: " + info.response);
        res.sendStatus(200)
      }
    });
  },
};