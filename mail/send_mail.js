const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.foxtransport.com",
  port: 2526,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'foxportal@foxtransport.com',
    pass: 'Ahsj2&3Yah@1'
  }
});

exports.sendEmailRequest = async ( val_To_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email) => {
    try {
    //   console.log("================================")
    //   console.log("val_To_Email : "+val_To_Email)
    //   console.log("val_From_Email : "+val_From_Email)
    //   console.log("val_Subject_Email : "+val_Subject_Email)
    //   console.log("val_MSG_Text_Email : "+val_MSG_Text_Email)
    //   console.log("val_MSG_Description_Email : "+val_MSG_Description_Email)
    //   console.log("================================")
        const info = await transporter.sendMail({
            from: val_From_Email, // sender address
            to: val_To_Email, // list of receivers
            subject: val_Subject_Email, // Subject line
            text: val_MSG_Text_Email, // plain text body
            html: val_MSG_Description_Email, // html body
          });
          return info.messageId;
    } catch (error) {
        throw error;
    }
};