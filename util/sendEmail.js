const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

const TOKEN = "1a325c6cf4684a5e38940118649bc5eb";
mailSender = (email,subject,message)=>{
   
const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
    testInboxId: 3474709,
  })
);

const sender = {
  address: "hello@example.com",
  name: "Mailtrap Test",
};
const recipients = [
  email,
];

      transport
  .sendMail({
    from: sender,
    to: recipients,
    subject: subject,
    text: message,
    category: "Integration Test",
    sandbox: true
  })
  .then(console.log, console.error);

      
    }

module.exports = {mailSender};

  
 