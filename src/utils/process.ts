import * as sgMail from '@sendgrid/mail'
export  const processes = async(job:any)=>{

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
// const msg = {
//   to: "test@example.com", // Change to your recipient
//   from: "test@example.com", // Change to your verified sender
//   subject: "Sending with SendGrid is Fun",
//   text: "and easy to do anywhere, even with Node.js",
//   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
// };
sgMail
  .send(job.data)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
} ;