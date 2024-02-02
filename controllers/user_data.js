//#region Global Variables
var tbl_Model = require("../models/user_data");
const business_organizations_lkp_Model = require("../models/business_organizations_lkp");
var User_Tokens_Log_Model = require("../models/user_tokens_log");

var UserEmailVerification_Log_Model = require("../models/useremailverification_log");
var UserPhoneVerification_Log_Model = require("../models/userphoneverification_log");

const tbl_Service = require("../services/user_data");
const now_DateTime = require('../helpers/fun_datetime');
const fun_handled_messages = require('../helpers/fun_handled_messages');
const fun_get_serial_number = require('../helpers/fun_get_serial_number');
const fun_get_Template_Form = require('../helpers/fun_get_Template_Form');
const fun_insert_row = require('../helpers/fun_insert_row');
const fun_update_row = require('../helpers/fun_update_row');
// const fun_insert_token = require('../helpers/fun_insert_token');
// const fun_suspend_token = require('../helpers/fun_suspend_token');
const fun_check_Existancy_By_ID = require('../helpers/fun_check_Existancy_By_ID');
//const logger = require('../helpers/fun_insert_Logger');
const logger = require('../utils/logger');
var loggers_Model = require("../models/logger");
let loggers_Data = ""
var langTitle = ""
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const random = require('../helpers/generate_random_text');
var ObjectId = require('mongodb').ObjectId;
//#endregion

exports.create_User =  async(req, res) => {
    try {
      //#region Global Variables
      var val_User_ID = ""
      langTitle = req.params.langTitle;
      var val_Email = req.body.Email;      
      var val_Password = req.body.Password;    
      var val_First_Name = req.body.First_Name;
      var val_Last_Name = req.body.Last_Name;
      var val_User_Roles_ID = ""  //req.body.User_Roles_ID;
      var val_Phone_Number = req.body.Phone_Number;
      var val_Address = req.body.Address;
      var val_Location = req.body.Location;
      var val_Photo_Profile = process.env.Main_URL + "public/user_personal_photos/user_default.jpg";
      var val_Is_Business = req.body.Is_Business;
      var val_is_Other = ""
      var val_Business_Organization_ID = "";
      var val_Organization_Title_Ar = ""
      var val_Organization_Title_En = ""
      var val_Organization_Address = ""
      var val_Organization_Location = ""
      var val_Photo_Organization = process.env.Main_URL + "public/business_organizations_photos/business_default.jpg";
      var val_New_User_Serial_Number = ""
      let sentData = "";
      var saltRounds = +process.env.saltRounds
      //#endregion
 
      new Promise(async (resolve, reject)=>{
        var exist = await tbl_Service.check_User_Existancy(val_Email,val_Phone_Number);
          resolve(exist);
      }).then((flag_User_Exist) => {

        if (flag_User_Exist[0].trim()==="Exist") {
          //#region User Account Already Exist Msg This to user
          new Promise(async (resolve, reject)=>{
            let result = await fun_handled_messages.get_handled_message(langTitle,13);
            resolve(result);
          }).then((msg) => {
            res.status(200).json({ data: [] , message: msg , status: "User Account Already Exist" }); 
          })
          //#endregion
        } else {
          //#region User Is Avialable
          new Promise(async (resolve, reject)=>{
            var exist = await fun_get_serial_number.get_Serial_Number("user_data");
            resolve(exist);
          }).then((New_User_Serial_Number) => {
            val_New_User_Serial_Number = New_User_Serial_Number
            if (!val_Is_Business) {
              //#region Business User Registration
              val_is_Other = req.body.is_Other;
              val_User_Roles_ID = "65187389de9d4f1d31451dcd" //Business Client Admin
              if (val_is_Other) {
                //#region Insert New Row into Business_Organizations_lkp set Is_Reviewed = 0 until operation or admin accept

                //#region prepare photo attributes
                const file = req.file;
                if (file){
                  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
                  if (!allowedMimeTypes.includes(file.mimetype)) {
                      //#region msg 10 Unsupported file type
                      new Promise(async (resolve, reject)=>{
                          let result = await fun_handled_messages.get_handled_message(langTitle,10);
                          resolve(result);
                      }).then((msg) => {
                          res.status(400).json({ data: [] , message: msg , status: "Unsupported file type" }); 
                      });return
                      //#endregion
                  } else{
                    //#region set photo path
                    const fileName = file.filename;
                    const basePath = `${req.protocol}://${req.get('host')}/public/business_organizations_photos/`;
                    val_Photo_Organization = `${basePath}${fileName}`
                    console.log("val_Photo_Organization = "+val_Photo_Organization)
                    //#endregion                    
                  } 
                }
                //#endregion

                //#region prepare Organization Data Object
                val_Organization_Title_Ar = req.body.Organization_Title_Ar;
                val_Organization_Title_En = req.body.Organization_Title_En;
                val_Organization_Address = req.body.Organization_Address;
                val_Organization_Location = req.body.Organization_Location;                
                
                let business_organization_sentData = new business_organizations_lkp_Model({
                  Serial_Number: "000",
                  Organization_Title_En: val_Organization_Title_En,
                  Organization_Title_Ar: val_Organization_Title_Ar,
                  Organization_Location: val_Organization_Location,
                  Organization_Address: val_Organization_Address,
                  Photo_Organization: val_Photo_Organization,
                  Inserted_By: val_New_User_Serial_Number,
                  Inserted_DateTime: now_DateTime.get_DateTime(),
                  Is_Reviewed: false,
                  Is_Suspended: true
                });
                //#endregion

                new Promise(async (resolve, reject)=>{
                  const fun_insert_business_organization = require('../helpers/fun_insert_business_organization');
                  const newList = await fun_insert_business_organization.insert_business_organization(business_organization_sentData);
                  resolve(newList);
                }).then((inserted_Business_Organization_Flag) => {
                  if (inserted_Business_Organization_Flag.length<=0) {
                    //#region msg 1 insert process failed
                    new Promise(async (resolve, reject)=>{
                      let result = await fun_handled_messages.get_handled_message(langTitle,1);
                      resolve(result);
                    }).then((msg) => {
                      res.status(400).json({ data: [] , message: msg , status: "insert failed" });
                    })
                    //#endregion
                  } else {
                    val_Business_Organization_ID = inserted_Business_Organization_Flag._id;

                    //#region insert process succeeded send emails to admin and operation team
                    const fun_get_admin_operation_emails = require('../helpers/fun_get_admin_operation_emails');

                    let select_Emails_Promise = new Promise(async (resolve, reject)=>{
                      const IDs_List = await fun_get_admin_operation_emails.get_Admin_Operation_Team_Emails();
                      resolve(IDs_List);
                    });

                    let select_Templates_Form_Promise = new Promise(async (resolve, reject)=>{
                      const Template_Form = await fun_get_Template_Form.get_Template_Form("1");
                      resolve(Template_Form);
                    });

                    Promise.all([select_Emails_Promise , select_Templates_Form_Promise]).then((results) => {
                      if (results[0].length>0 && results[1].length>0) {

                        //#region prepare attributes for send email to admin and operation team
                        let val_To_Email=[];
                        let emails=results[0];
                        for (let i = 0; i < emails.length; i++) {
                          val_To_Email[i] = emails[i].Email;
                        }

                        const val_From_Email = process.env.From_Email;

                        var val_Subject_Email = ""
                        var val_MSG_Text_Email = ""
                        var val_MSG_Description_Email = ""
                        let msg_Content=results[1];

                        if (langTitle=="en") {
                          val_Subject_Email = msg_Content[0].Subject_En;
                          
                          val_MSG_Text_Email = msg_Content[0].Description_En;
                          val_MSG_Text_Email = val_MSG_Text_Email.replace("Organization_Title", val_Organization_Title_En);
          
                          val_MSG_Description_Email = msg_Content[0].Description_En;
                          val_MSG_Description_Email = val_MSG_Description_Email.replace("Organization_Title", val_Organization_Title_En);
                        } else {
                          val_Subject_Email = msg_Content[0].Subject_Ar;
          
                          val_MSG_Text_Email = msg_Content[0].Description_Ar;
                          val_MSG_Text_Email = val_MSG_Text_Email.replace("Organization_Title", val_Organization_Title_Ar);
          
                          val_MSG_Description_Email = msg_Content[0].Description_Ar;
                          val_MSG_Description_Email = val_MSG_Description_Email.replace("Organization_Title", val_Organization_Title_Ar);
                        }
                        val_MSG_Description_Email = "<div>"+val_MSG_Description_Email+"</div>";

                        const mail = require("../mail/send_mail");
                        const messageId = mail.sendEmailRequest(val_To_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email ) 
                        if (messageId.length<=0) {
                          res.status(400).json({ message: "fail to send email to admin or operation team member" , status: "fail to send email to admin or operation team member" });
                        } else{
                          res.status(200).json({ message: "mail sent succefully to admin or operation team member For Review" , status: "email sent successfully to admin or operation team member For Review" });
                        }
                        //#endregion
                        
                        //#region insert_User_Data
                        bcrypt.genSalt(saltRounds)
                        .then(salt => {
                          return bcrypt.hash(val_Password, salt)
                        })
                        .then(hash => {

                          sentData = new tbl_Model({
                            Serial_Number:val_New_User_Serial_Number,
                            Email:val_Email,
                            Password: hash,
                            First_Name:val_First_Name,
                            Last_Name:val_Last_Name,
                            User_Roles_ID:val_User_Roles_ID,
                            Phone_Number:val_Phone_Number,
                            Address:val_Address,
                            Location:val_Location,
                            Photo_Profile:val_Photo_Profile,
                            Inserted_DateTime:now_DateTime.get_DateTime(),
                            Is_Business:val_Is_Business,
                            Business_Organization_ID:val_Business_Organization_ID,
                            Is_Verified:false,
                            Is_Suspended:true,
                            Inserted_By:val_New_User_Serial_Number,
                          });

                          new Promise(async (resolve, reject)=>{
                            const newList = await tbl_Service.create_Single_DataRow(sentData);
                            resolve(newList);
                          }).then((insert_Flg) => {
                            if (insert_Flg.length<=0) {
                              //#region msg 1 insert process failed
                              new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,1);
                                resolve(result);
                              }).then((msg) => {
                                res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                              })
                              //#endregion
                            } else {
                              //#region msg insert User Data process successed
                              var val_User_ID = insert_Flg._id;
                              new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,27);
                                resolve(result);
                              }).then((msg) => {
                                const random = require('../helpers/generate_random_text');
                                //#region "Email & Phone" Generate Code , select Template , get Serial Number Promises
                                  let get_Email_Random_Code_Promise = new Promise(async (resolve, reject)=>{
                                    let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
                                    resolve(result);
                                  });
                                  let select_Email_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
                                    const Template_Form = await fun_get_Template_Form.get_Template_Form("2");
                                    resolve(Template_Form);
                                  });
                                  let get_Phone_Random_Code_Promise = new Promise(async (resolve, reject)=>{
                                    let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
                                    resolve(result);
                                  });
                                  let select_Phone_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
                                    const Template_Form = await fun_get_Template_Form.get_Template_Form("3");
                                    resolve(Template_Form);
                                  });
                                  let get_Email_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
                                    var exist = await fun_get_serial_number.get_Serial_Number("useremailverification_log");
                                    resolve(exist);
                                  });
                                  let get_Phone_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
                                    var exist = await fun_get_serial_number.get_Serial_Number("userphoneverification_log");
                                    resolve(exist);
                                  });
                                //#endregion

                                Promise.all([
                                  get_Email_Random_Code_Promise , 
                                  select_Email_verification_Template_Form_Promise , 
                                  get_Phone_Random_Code_Promise , 
                                  select_Phone_verification_Template_Form_Promise , 
                                  get_Email_Verification_Serial_Number_Promise , 
                                  get_Phone_Verification_Serial_Number_Promise
                                ]).then((Returned_Code) => {
                                    if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2].length>0 && Returned_Code[3].length>0 && Returned_Code[4]>0 && Returned_Code[5]>0) {
                                      
                                      //#region prepare object then insert into useremailverification_log
                                      var useremailverification_log_Model = require("../models/useremailverification_log");

                                      let useremailverification_sentData = new useremailverification_log_Model({
                                        Serial_Number:Returned_Code[4],
                                        User_ID:val_User_ID,
                                        Code:Returned_Code[0],
                                        Inserted_DateTime:now_DateTime.get_DateTime(),
                                        Is_Expired:false,
                                      });

                                      let insert_Email_Verification_Promise = new Promise(async (resolve, reject)=>{
                                        const newList = await fun_insert_row.insert_row("useremailverification_log",useremailverification_sentData);
                                        resolve(newList);
                                      });
                                      //#endregion

                                      //#region prepare object then insert into userphoneverification_log
                                      var userphoneverification_log_Model = require("../models/userphoneverification_log");

                                      let Phone_verification_sentData = new userphoneverification_log_Model({
                                        Serial_Number:Returned_Code[5],
                                        User_ID:val_User_ID,
                                        Code:Returned_Code[2],
                                        Inserted_DateTime:now_DateTime.get_DateTime(),
                                        Is_Expired:false,
                                      });

                                      let insert_Phone_Verification_Promise = new Promise(async (resolve, reject)=>{
                                        const newList = await fun_insert_row.insert_row("userphoneverification_log_Model",Phone_verification_sentData);
                                        resolve(newList);
                                      });
                                      //#endregion

                                      Promise.all([insert_Email_Verification_Promise , insert_Phone_Verification_Promise]).then((insert_Verifications) => {

                                        //#region prepare attributes for send email to new user to verify his account
                                        let msg_Content = Returned_Code[1];
                                        const val_From_Email = process.env.From_Email;
                                              
                                        var val_Subject_Email = ""
                                        var val_MSG_Text_Email = ""
                                        var val_MSG_Description_Email = ""
                                              
                                        if (langTitle=="en") {
                                          val_Subject_Email = msg_Content[0].Subject_En;
                                          
                                          val_MSG_Text_Email = msg_Content[0].Description_En;
                                          val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                                              
                                          val_MSG_Description_Email = msg_Content[0].Description_En;
                                          val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                                        } else {
                                          val_Subject_Email = msg_Content[0].Subject_Ar;
                                              
                                          val_MSG_Text_Email =msg_Content[0].Description_Ar;
                                          val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                                              
                                          val_MSG_Description_Email = msg_Content[0].Description_Ar;
                                          val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                                        }
                                        val_MSG_Description_Email = "<div>"+val_MSG_Description_Email+"</div>";

                                        const mail = require("../mail/send_mail");
                                        const messageId = mail.sendEmailRequest(val_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email )
                                        //#endregion
                                        
                                        //#region prepare attributes for send SMS Phone Message to new user to verify his account
                                        msg_Content = Returned_Code[3];
                                        var val_Subject_SMS = ""
                                        var val_MSG_Description_SMS = ""

                                        if (langTitle=="en") {
                                          val_Subject_SMS = msg_Content[0].Subject_En;
                                              
                                          val_MSG_Description_SMS = msg_Content[0].Description_En;
                                          val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[2]);
                                        } else {
                                          val_Subject_SMS = msg_Content[0].Subject_Ar;
                                              
                                          val_MSG_Description_SMS = msg_Content[0].Description_Ar;
                                          val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[2]);
                                        }
                                        val_MSG_Description_SMS = val_MSG_Description_SMS;

                                        const sms = require("../sms/send_sms");
                                        var val_TO = insert_Flg.Phone_Number
                                        console.log("insert_Flg : "+insert_Flg)
                                        console.log("insert_Flg.Phone_Number : "+insert_Flg.Phone_Number)
                                        const messageObject = sms.sendSMSRequest(val_TO , val_MSG_Description_SMS);
                                        if (!messageObject) {
                                          //#region sending SMS failed
                                          new Promise(async (resolve, reject)=>{
                                            let result = await fun_handled_messages.get_handled_message(langTitle,27);
                                            resolve(result);
                                          }).then((sms_result) => {
                                            res.status(400).json({ data: [] , message: sms_result , status: "sms failed" });
                                          })                          
                                          //#endregion
                                        } else {
                                          //#region sending SMS succeeded
                                          var SMS_Message_Model = require("../models/sms_message");

                                          let sms_sentData = new SMS_Message_Model({
                                            sid:messageObject.sid,
                                            date_created:messageObject.date_created,
                                            date_updated:messageObject.date_updated,
                                            date_sent:messageObject.date_sent,
                                            account_sid:messageObject.account_sid,
                                            to:messageObject.to,
                                            from:messageObject.from,
                                            messaging_service_sid:messageObject.messaging_service_sid,
                                            body:messageObject.body,
                                            status:messageObject.status,
                                            num_segments:messageObject.num_segments,
                                            num_segments:messageObject.num_segments,
                                            num_media:messageObject.num_media,
                                            direction:messageObject.direction,
                                            api_version:messageObject.api_version,
                                            price:messageObject.price,
                                            price_unit:messageObject.price_unit,
                                            error_code:messageObject.error_code,
                                            error_message:messageObject.error_message,
                                            uri:messageObject.uri,
                                            subresource_uris:{media:messageObject.media},
                                          });
                                          console.log("sms_sentData = "+sms_sentData)
                                          new Promise(async (resolve, reject)=>{
                                            //const newList = await tbl_Service.insert_SMS_Message(sms_sentData);
                                            const newList = await fun_insert_row.insert_row("sms_message",sms_sentData);
                                            resolve(newList);
                                          });
                                          //#endregion
                                        }
                                        //#endregion

                                        res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                      })
                                    } else {
                                      res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
                                    }

                                })
                                
                              })
                              //#endregion
                            }
                          })

                        })
                        //#endregion
                      } else {
                        res.status(400).json({ message: "no admin , operation team member emails or no avialable template form to send " , status: "no admin , operation team member emails or no avialable template form to send " });
                      }
                    })
                    //#endregion
                    
                  }
                })
                //#endregion
              } else {
                //#region Business Organization Already Exist In DB Before
                    val_Business_Organization_ID = req.body.Business_Organization_ID;
                
                    //#region insert process succeeded
                    
                        //#region insert_User_Data
                        bcrypt.genSalt(saltRounds)
                        .then(salt => {
                          return bcrypt.hash(val_Password, salt)
                        })
                        .then(hash => {

                          sentData = new tbl_Model({
                            Serial_Number:val_New_User_Serial_Number,
                            Email:val_Email,
                            Password: hash,
                            First_Name:val_First_Name,
                            Last_Name:val_Last_Name,
                            User_Roles_ID:val_User_Roles_ID,
                            Phone_Number:val_Phone_Number,
                            Address:val_Address,
                            Location:val_Location,
                            Photo_Profile:val_Photo_Profile,
                            Inserted_DateTime:now_DateTime.get_DateTime(),
                            Is_Business:val_Is_Business,
                            Business_Organization_ID:val_Business_Organization_ID,
                            Is_Verified:false,
                            Is_Suspended:true,
                            Inserted_By:val_New_User_Serial_Number,
                          });

                          new Promise(async (resolve, reject)=>{
                            const newList = await fun_insert_row.insert_row("user_data",sentData);
                            resolve(newList);
                          }).then((insert_Flg) => {
                            if (insert_Flg.length<=0) {
                              //#region msg 1 insert process failed
                              new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,1);
                                resolve(result);
                              }).then((msg) => {
                                res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                              })
                              //#endregion
                            } else {
                              //#region msg insert User Data process successed
                              var val_User_ID = insert_Flg._id;
                              new Promise(async (resolve, reject)=>{
                                let result = await fun_handled_messages.get_handled_message(langTitle,27);
                                resolve(result);
                              }).then((msg) => {
                                const random = require('../helpers/generate_random_text');
                                //#region "Email & Phone" Generate Code , select Template , get Serial Number Promises
                                  let get_Email_Random_Code_Promise = new Promise(async (resolve, reject)=>{
                                    let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
                                    resolve(result);
                                  });
                                  let select_Email_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
                                    const Template_Form = await fun_get_Template_Form.get_Template_Form("2");
                                    resolve(Template_Form);
                                  });
                                  let get_Phone_Random_Code_Promise = new Promise(async (resolve, reject)=>{
                                    let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
                                    resolve(result);
                                  });
                                  let select_Phone_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
                                    const Template_Form = await fun_get_Template_Form.get_Template_Form("3");
                                    resolve(Template_Form);
                                  });
                                  let get_Email_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
                                    var exist = await fun_get_serial_number.get_Serial_Number("useremailverification_log");
                                    resolve(exist);
                                  });
                                  let get_Phone_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
                                    var exist = await fun_get_serial_number.get_Serial_Number("userphoneverification_log");
                                    resolve(exist);
                                  });
                                //#endregion

                                Promise.all([
                                  get_Email_Random_Code_Promise , 
                                  select_Email_verification_Template_Form_Promise , 
                                  get_Phone_Random_Code_Promise , 
                                  select_Phone_verification_Template_Form_Promise , 
                                  get_Email_Verification_Serial_Number_Promise , 
                                  get_Phone_Verification_Serial_Number_Promise
                                ]).then((Returned_Code) => {
                                    if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2].length>0 && Returned_Code[3].length>0 && Returned_Code[4]>0 && Returned_Code[5]>0) {
                                      
                                      //#region useremailverification_log
                                      var useremailverification_log_Model = require("../models/useremailverification_log");

                                      let useremailverification_sentData = new useremailverification_log_Model({
                                        Serial_Number:Returned_Code[4],
                                        User_ID:val_User_ID,
                                        Code:Returned_Code[0],
                                        Inserted_DateTime:now_DateTime.get_DateTime(),
                                        Is_Expired:false,
                                      });

                                      let insert_Email_Verification_Promise = new Promise(async (resolve, reject)=>{
                                        const newList = await fun_insert_row.insert_row("useremailverification_log",useremailverification_sentData);
                                        resolve(newList);
                                      });
                                      //#endregion

                                      //#region userphoneverification_log
                                      var userphoneverification_log_Model = require("../models/userphoneverification_log");

                                      let Phone_verification_sentData = new userphoneverification_log_Model({
                                        Serial_Number:Returned_Code[5],
                                        User_ID:val_User_ID,
                                        Code:Returned_Code[2],
                                        Inserted_DateTime:now_DateTime.get_DateTime(),
                                        Is_Expired:false,
                                      });

                                      let insert_Phone_Verification_Promise = new Promise(async (resolve, reject)=>{
                                        const newList = await fun_insert_row.insert_row("userphoneverification_log",Phone_verification_sentData);
                                        resolve(newList);
                                      });
                                      //#endregion

                                      Promise.all([insert_Email_Verification_Promise , insert_Phone_Verification_Promise]).then((insert_Verifications) => {

                                        //#region prepare attributes for send email to new user to verify his account
                                        let msg_Content = Returned_Code[1];
                                        const val_From_Email = process.env.From_Email;
                                              
                                        var val_Subject_Email = ""
                                        var val_MSG_Text_Email = ""
                                        var val_MSG_Description_Email = ""
                                              
                                        if (langTitle=="en") {
                                          val_Subject_Email = msg_Content[0].Subject_En;
                                          
                                          val_MSG_Text_Email = msg_Content[0].Description_En;
                                          val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                                              
                                          val_MSG_Description_Email = msg_Content[0].Description_En;
                                          val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                                        } else {
                                          val_Subject_Email = msg_Content[0].Subject_Ar;
                                              
                                          val_MSG_Text_Email =msg_Content[0].Description_Ar;
                                          val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                                              
                                          val_MSG_Description_Email = msg_Content[0].Description_Ar;
                                          val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                                        }
                                        val_MSG_Description_Email = "<div>"+val_MSG_Description_Email+"</div>";

                                        const mail = require("../mail/send_mail");
                                        const messageId = mail.sendEmailRequest(val_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email )
                                        //#endregion
                                        
                                        //#region prepare attributes for send SMS Phone Message to new user to verify his account
                                        msg_Content = Returned_Code[3];
                                        var val_Subject_SMS = ""
                                        var val_MSG_Description_SMS = ""

                                        if (langTitle=="en") {
                                          val_Subject_SMS = msg_Content[0].Subject_En;
                                              
                                          val_MSG_Description_SMS = msg_Content[0].Description_En;
                                          val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[2]);
                                        } else {
                                          val_Subject_SMS = msg_Content[0].Subject_Ar;
                                              
                                          val_MSG_Description_SMS = msg_Content[0].Description_Ar;
                                          val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[2]);
                                        }
                                        val_MSG_Description_SMS = val_MSG_Description_SMS;

                                        const sms = require("../sms/send_sms");
                                        var val_TO = insert_Flg.Phone_Number
                                        console.log("insert_Flg : "+insert_Flg)
                                        console.log("insert_Flg.Phone_Number : "+insert_Flg.Phone_Number)
                                        const messageObject = sms.sendSMSRequest(val_TO , val_MSG_Description_SMS);
                                        if (!messageObject) {
                                          //#region sending SMS failed
                                          new Promise(async (resolve, reject)=>{
                                            let result = await fun_handled_messages.get_handled_message(langTitle,28);
                                            resolve(result);
                                          }).then((sms_result) => {
                                            res.status(400).json({ data: [] , message: sms_result , status: "sms failed" });
                                          })                          
                                          //#endregion
                                        } else {
                                          //#region sending SMS succeeded
                                          var SMS_Message_Model = require("../models/sms_message");

                                          let sms_sentData = new SMS_Message_Model({
                                            sid:messageObject.sid,
                                            date_created:messageObject.date_created,
                                            date_updated:messageObject.date_updated,
                                            date_sent:messageObject.date_sent,
                                            account_sid:messageObject.account_sid,
                                            to:messageObject.to,
                                            from:messageObject.from,
                                            messaging_service_sid:messageObject.messaging_service_sid,
                                            body:messageObject.body,
                                            status:messageObject.status,
                                            num_segments:messageObject.num_segments,
                                            num_segments:messageObject.num_segments,
                                            num_media:messageObject.num_media,
                                            direction:messageObject.direction,
                                            api_version:messageObject.api_version,
                                            price:messageObject.price,
                                            price_unit:messageObject.price_unit,
                                            error_code:messageObject.error_code,
                                            error_message:messageObject.error_message,
                                            uri:messageObject.uri,
                                            subresource_uris:{media:messageObject.media},
                                          });
                                          console.log("sms_sentData = "+sms_sentData)
                                          new Promise(async (resolve, reject)=>{
                                            const newList = await fun_insert_row.insert_row("sms_message",sms_sentData);
                                            resolve(newList);
                                          });
                                          //#endregion
                                        }
                                        //#endregion

                                        res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                                      })
                                    } else {
                                      res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
                                    }

                                })
                                
                              })
                              //#endregion
                            }
                          })

                        })
                        //#endregion
                      
                    //#endregion
                    
                //#endregion
              }
              //#endregion
            } else {
              //#region Client User Registration

              val_User_Roles_ID = "65187389de9d4f1d31451dcc" //Registered Client
              val_Business_Organization_ID = "658c3ad066b5d3ae62f3e98c" //Not Applicable
              val_New_User_Serial_Number = New_User_Serial_Number

              //#region insert_User_Data
              bcrypt.genSalt(saltRounds).then(salt => {
                return bcrypt.hash(val_Password, salt)
              }).then(hash => {
                sentData = new tbl_Model({
                  Serial_Number:val_New_User_Serial_Number,
                  Email:val_Email,
                  Password: hash,
                  First_Name:val_First_Name,
                  Last_Name:val_Last_Name,
                  User_Roles_ID:val_User_Roles_ID,
                  Phone_Number:val_Phone_Number,
                  Address:val_Address,
                  Location:val_Location,
                  Photo_Profile:val_Photo_Profile,
                  Inserted_DateTime:now_DateTime.get_DateTime(),
                  Is_Business:val_Is_Business,
                  Business_Organization_ID:val_Business_Organization_ID,
                  Is_Verified:false,
                  Is_Suspended:false,
                  Inserted_By:val_New_User_Serial_Number,
                });
                new Promise(async (resolve, reject)=>{
                  const newList = await fun_insert_row.insert_row("user_data",sentData);
                  resolve(newList);
                }).then((insert_Flg) => {
                  if (insert_Flg.length<=0) {
                    //#region msg 1 insert process failed
                    new Promise(async (resolve, reject)=>{
                      let result = await fun_handled_messages.get_handled_message(langTitle,1);
                      resolve(result);
                    }).then((msg) => {
                      res.status(400).json({ data: [] , message: msg , status: "insert failed" }); 
                    })
                    //#endregion
                  } else {
                    //#region msg insert process successed
                    val_User_ID = insert_Flg._id;
                    new Promise(async (resolve, reject)=>{
                      let result = await fun_handled_messages.get_handled_message(langTitle,27);
                      resolve(result);
                    }).then((msg) => {
                      //#region "Email & Phone" Generate Code , select Template , get Serial Number Promises
                        let get_Email_Random_Code_Promise = new Promise(async (resolve, reject)=>{
                          let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
                          resolve(result);
                        });
                        let select_Email_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
                          const Template_Form = await fun_get_Template_Form.get_Template_Form("2");
                          resolve(Template_Form);
                        });
                        let get_Phone_Random_Code_Promise = new Promise(async (resolve, reject)=>{
                          let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
                          resolve(result);
                        });
                        let select_Phone_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
                          const Template_Form = await fun_get_Template_Form.get_Template_Form("3");
                          resolve(Template_Form);
                        });
                        let get_Email_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
                          var exist = await fun_get_serial_number.get_Serial_Number("useremailverification_log");
                          resolve(exist);
                        });
                        let get_Phone_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
                          var exist = await fun_get_serial_number.get_Serial_Number("userphoneverification_log");
                          resolve(exist);
                        });
                      //#endregion

                      Promise.all([
                        get_Email_Random_Code_Promise , 
                        select_Email_verification_Template_Form_Promise , 
                        get_Phone_Random_Code_Promise , 
                        select_Phone_verification_Template_Form_Promise , 
                        get_Email_Verification_Serial_Number_Promise , 
                        get_Phone_Verification_Serial_Number_Promise]).then((Returned_Code) => {
                          if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2].length>0 && Returned_Code[3].length>0 && Returned_Code[4]>0 && Returned_Code[5]>0) {
                            
                            //#region useremailverification_log
                            var useremailverification_log_Model = require("../models/useremailverification_log");

                            let useremailverification_sentData = new useremailverification_log_Model({
                              Serial_Number:Returned_Code[4],
                              User_ID:val_User_ID,
                              Code:Returned_Code[0],
                              Inserted_DateTime:now_DateTime.get_DateTime(),
                              Is_Expired:false,
                            });

                            let insert_Email_Verification_Promise = new Promise(async (resolve, reject)=>{
                              const newList = await fun_insert_row.insert_row("useremailverification_log",useremailverification_sentData);
                              resolve(newList);
                            });
                            //#endregion

                            //#region userphoneverification_log
                            var userphoneverification_log_Model = require("../models/userphoneverification_log");

                            let Phone_verification_sentData = new userphoneverification_log_Model({
                              Serial_Number:Returned_Code[5],
                              User_ID:val_User_ID,
                              Code:Returned_Code[2],
                              Inserted_DateTime:now_DateTime.get_DateTime(),
                              Is_Expired:false,
                            });

                            let insert_Phone_Verification_Promise = new Promise(async (resolve, reject)=>{
                              const newList = await fun_insert_row.insert_row("userphoneverification_log",Phone_verification_sentData);
                              resolve(newList);
                            });
                            //#endregion

                            Promise.all([insert_Email_Verification_Promise , insert_Phone_Verification_Promise]).then((insert_Verifications) => {


                              //#region prepare attributes for send email to new user to verify his account
                              let msg_Content=Returned_Code[1];
                              const val_From_Email = process.env.From_Email;
                                    
                              var val_Subject_Email = ""
                              var val_MSG_Text_Email = ""
                              var val_MSG_Description_Email = ""
                                    
                              if (langTitle=="en") {
                                val_Subject_Email = msg_Content[0].Subject_En;
                                
                                val_MSG_Text_Email = msg_Content[0].Description_En;
                                val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                                    
                                val_MSG_Description_Email = msg_Content[0].Description_En;
                                val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                              } else {
                                val_Subject_Email = msg_Content[0].Subject_Ar;
                                    
                                val_MSG_Text_Email = msg_Content[0].Description_Ar;
                                val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                                    
                                val_MSG_Description_Email = msg_Content[0].Description_Ar;
                                val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                              }
                              val_MSG_Description_Email = "<div>"+val_MSG_Description_Email+"</div>";

                              const mail = require("../mail/send_mail");
                              const messageId = mail.sendEmailRequest(val_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email )
                              //#endregion
                              
                              //#region prepare attributes for send SMS Phone Message to new user to verify his account
                              msg_Content=Returned_Code[3];
                              var val_Subject_SMS = ""
                              var val_MSG_Description_SMS = ""

                              if (langTitle=="en") {
                                val_Subject_SMS = msg_Content[0].Subject_En;
                                    
                                val_MSG_Description_SMS = msg_Content[0].Description_En;
                                val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[2]);
                              } else {
                                val_Subject_SMS = msg_Content[0].Subject_Ar;
                                    
                                val_MSG_Description_SMS = msg_Content[0].Description_Ar;
                                val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[2]);
                              }
                              val_MSG_Description_SMS = val_MSG_Description_SMS;

                              const sms = require("../sms/send_sms");
                              var val_TO = insert_Flg.Phone_Number
                              console.log("insert_Flg : "+insert_Flg)
                              console.log("insert_Flg.Phone_Number : "+insert_Flg.Phone_Number)
                              const messageObject = sms.sendSMSRequest(val_TO , val_MSG_Description_SMS);
                              console.log("messageObject :: "+messageObject)
                              if (!messageObject) {
                                //#region sending SMS failed
                                new Promise(async (resolve, reject)=>{
                                  let result = await fun_handled_messages.get_handled_message(langTitle,28);
                                  resolve(result);
                                }).then((sms_result) => {
                                  res.status(400).json({ data: [] , message: sms_result , status: "sms failed" });
                                })                          
                                //#endregion
                              } else {
                                //#region sending SMS succeeded
                                var SMS_Message_Model = require("../models/sms_message");

                                let sms_sentData = new SMS_Message_Model({
                                  sid:messageObject.sid,
                                  date_created:messageObject.date_created,
                                  date_updated:messageObject.date_updated,
                                  date_sent:messageObject.date_sent,
                                  account_sid:messageObject.account_sid,
                                  to:messageObject.to,
                                  from:messageObject.from,
                                  messaging_service_sid:messageObject.messaging_service_sid,
                                  body:messageObject.body,
                                  status:messageObject.status,
                                  num_segments:messageObject.num_segments,
                                  num_segments:messageObject.num_segments,
                                  num_media:messageObject.num_media,
                                  direction:messageObject.direction,
                                  api_version:messageObject.api_version,
                                  price:messageObject.price,
                                  price_unit:messageObject.price_unit,
                                  error_code:messageObject.error_code,
                                  error_message:messageObject.error_message,
                                  uri:messageObject.uri,
                                  subresource_uris:{media:messageObject.media},
                                });
                                console.log("sms_sentData = "+sms_sentData)
                                new Promise(async (resolve, reject)=>{
                                  const newList = await fun_insert_row.insert_row("sms_message",sms_sentData);
                                  resolve(newList);
                                });
                                //#endregion
                              }
                              //#endregion

                              res.status(200).json({ data: insert_Flg , message: msg , status: "insert successed" });
                            })
                          } else {
                            res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
                          }
                                            

                        })


                    })
                    //#endregion
                  }
                })

              })
              //#endregion

              //#endregion
            }
          })
          //#endregion 
        }

      })

    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ data:[] , message:err.message , status: "error" });
    }
};

exports.Email_Verification =  async(req, res) => {
  try {
    //#region Global Variables
    var val_User_ID = req.body.User_ID;
    langTitle = req.params.langTitle;
    var val_Code = req.body.Code;
    //#endregion

    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(400).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region ID exist in DB And  check Code Existancy
        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.check_Code_Existancy( val_User_ID , val_Code , "useremailverification_log");
          resolve(newList);
        }).then((Code_Existancy_Flg) => {
          if (Code_Existancy_Flg.length<=0) {
            //#region code is not exist in DB
            new Promise(async (resolve, reject)=>{
              let result = await fun_handled_messages.get_handled_message(langTitle,29);
              resolve(result);
            }).then((msg) => {
              res.status(404).json({ data: [] , message: msg , status: "code not exist" });
            })
            //#endregion
          } else {
            if (Code_Existancy_Flg[0].Is_Expired) {
              //#region Code is expired
              new Promise(async (resolve, reject)=>{
                let result = await fun_handled_messages.get_handled_message(langTitle,30);
                resolve(result);
              }).then((msg) => {
                res.status(400).json({ data: [] , message: msg , status: "code is expired" });
              })
              //#endregion
            } else {
              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.Verification_Expiration( val_User_ID , val_Code , "useremailverification_log" );
                resolve(newList);
              }).then((Update_Flg) => {
                //#region email verification success
                new Promise(async (resolve, reject)=>{
                  let result = await fun_handled_messages.get_handled_message(langTitle,31);
                  resolve(result);
                }).then((msg) => {
                  res.status(200).json({data: Update_Flg , message: msg, status: "email verification success" }) 
                })
                //#endregion
              })
            }
          }
        })
        //#endregion
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Phone_Verification =  async(req, res) => {
  try {
    //#region Global Variables
    var val_User_ID = req.body.User_ID; 
    langTitle = req.params.langTitle;
    var val_Code = req.body.Code;      
    //#endregion

    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(400).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region ID exist in DB And Check Code Existancy
        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.check_Code_Existancy( val_User_ID , val_Code , "userphoneverification_log");
          resolve(newList);
        }).then((Code_Existancy_Flg) => {
          if (Code_Existancy_Flg.length<=0) {
            //#region code is not exist in DB
            new Promise(async (resolve, reject)=>{
              let result = await fun_handled_messages.get_handled_message(langTitle,32);
              resolve(result);
            }).then((msg) => {
              res.status(404).json({ data: [] , message: msg , status: "code not exist" });
            })
            //#endregion
          } else {
            if (Code_Existancy_Flg[0].Is_Expired) {
              //#region Code is expired
              new Promise(async (resolve, reject)=>{
                let result = await fun_handled_messages.get_handled_message(langTitle,30);
                resolve(result);
              }).then((msg) => {
                res.status(400).json({ data: [] , message: msg , status: "code is expired" });
              })
              //#endregion
            } else {

              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.Verification_Expiration( val_User_ID , val_Code , "userphoneverification_log" );
                resolve(newList);
              }).then((Update_Flg) => {
                //#region phone verification success
                new Promise(async (resolve, reject)=>{
                  var result = await tbl_Service.update_Verification(val_User_ID , true);
                  resolve(result);
                }).then((update) => {
                  new Promise(async (resolve, reject)=>{
                    let result = await fun_handled_messages.get_handled_message(langTitle,31);
                    resolve(result);
                  }).then((msg) => {
                    res.status(200).json({data: Update_Flg , message: msg, status: "phone verification success" }) 
                  })
                })               
                //#endregion
              })

            }
          }
        })
        //#endregion
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Resend_Code_To_Email =  async(req, res) => {
  try {
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_User_ID = req.body.User_ID; 
    //#endregion

    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(400).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region expire all Codes related to this user
        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.Expire_All_User_Codes( val_User_ID , "useremailverification_log" );
          resolve(newList);
        }).then((Update_Flg) => {
          //#region create new code and send to user mail
          let get_Email_Random_Code_Promise = new Promise(async (resolve, reject)=>{
            let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
            resolve(result);
          });
          let select_Email_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
            const Template_Form = await fun_get_Template_Form.get_Template_Form("2");
            resolve(Template_Form);
          });
          let get_Email_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
            var exist = await fun_get_serial_number.get_Serial_Number("useremailverification_log");
            resolve(exist);
          });
          //#endregion
          Promise.all([
            get_Email_Random_Code_Promise , 
            select_Email_verification_Template_Form_Promise ,
            get_Email_Verification_Serial_Number_Promise 
          ]).then((Returned_Code) => {
            if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2]>0) {
              //#region insert into useremailverification_log
              let useremailverification_sentData = new UserEmailVerification_Log_Model({
                Serial_Number:Returned_Code[2],
                User_ID:val_User_ID,
                Code:Returned_Code[0],
                Inserted_DateTime:now_DateTime.get_DateTime(),
                Is_Expired:false,
              });
              new Promise(async (resolve, reject)=>{
                const newList = await fun_insert_row.insert_row("useremailverification_log",useremailverification_sentData);
                resolve(newList);
              }).then((inserted_Code) => {
                if (!inserted_Code) {
                  //#region msg 1 insert process failed
                  new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,1);
                    resolve(result);
                  }).then((msg) => {
                    res.status(400).json({ data: [] , message: msg , status: "insert failed" });
                  })
                  //#endregion
                } else {
                  //#region prepare attributes for send email to new user to verify his account
                  var val_Email=""
                  new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.get_User_Email( val_User_ID );
                    resolve(newList);
                  }).then((User_Email) => {
                    val_Email =User_Email
                    let msg_Content=Returned_Code[1];
                    const val_From_Email = process.env.From_Email;
                          
                    var val_Subject_Email = ""
                    var val_MSG_Text_Email = ""
                    var val_MSG_Description_Email = ""
                          
                    if (langTitle=="en") {
                      val_Subject_Email = msg_Content[0].Subject_En;
                      
                      val_MSG_Text_Email = msg_Content[0].Description_En;
                      val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                          
                      val_MSG_Description_Email = msg_Content[0].Description_En;
                      val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                    } else {
                      val_Subject_Email = msg_Content[0].Subject_Ar;
                          
                      val_MSG_Text_Email = msg_Content[0].Description_Ar;
                      val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                          
                      val_MSG_Description_Email = msg_Content[0].Description_Ar;
                      val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                    }
                    val_MSG_Description_Email = "<div>"+val_MSG_Description_Email+"</div>";

                    const mail = require("../mail/send_mail");
                    const messageId = mail.sendEmailRequest(val_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email )

                    if (messageId.length<=0) {
                      //#region msg 33 email not sent successed
                      new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,33);
                        resolve(result);
                      }).then((msg) => {
                        res.status(400).json({ data: [] , message: msg , status: "email not sent successed" });
                      })
                      //#endregion
                    } else {
                      //#region msg 34 insert process successed
                      new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,34);
                        resolve(result);
                      }).then((msg) => {
                        res.status(200).json({ data: inserted_Code , message: msg , status: "email sent successed" });
                      })
                      //#endregion
                    }
                  })                  
                  //#endregion
                }
              })
              //#endregion
            } else {
              res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
            }
          })
        })
        //#endregion
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Resend_Code_To_Phone =  async(req, res) => {
  try {
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_User_ID = req.body.User_ID; 
    //#endregion

    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(400).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region expire all Codes related to this user
        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.Expire_All_User_Codes( val_User_ID , "userphoneverification_log" );
          resolve(newList);
        }).then((Update_Flg) => {
          //#region create new code and send to user phone
          let get_Phone_Random_Code_Promise = new Promise(async (resolve, reject)=>{
            let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
            resolve(result);
          });
          let select_Phone_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
            const Template_Form = await fun_get_Template_Form.get_Template_Form("3");
            resolve(Template_Form);
          });
          let get_Phone_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
            var exist = await fun_get_serial_number.get_Serial_Number("userphoneverification_log");
            resolve(exist);
          });
          //#endregion
          Promise.all([
            get_Phone_Random_Code_Promise , 
            select_Phone_verification_Template_Form_Promise ,
            get_Phone_Verification_Serial_Number_Promise 
          ]).then((Returned_Code) => {
            if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2]>0) {
              //#region insert into userphoneverification_log
              let userphoneverification_sentData = new UserPhoneVerification_Log_Model({
                Serial_Number:Returned_Code[2],
                User_ID:val_User_ID,
                Code:Returned_Code[0],
                Inserted_DateTime:now_DateTime.get_DateTime(),
                Is_Expired:false,
              });
              new Promise(async (resolve, reject)=>{
                const newList = await fun_insert_row.insert_row("userphoneverification_log",userphoneverification_sentData);
                resolve(newList);
              }).then((inserted_Code) => {
                if (!inserted_Code) {
                  //#region msg 1 insert process failed
                  new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,1);
                    resolve(result);
                  }).then((msg) => {
                    res.status(400).json({ data: [] , message: msg , status: "insert failed" });
                  })
                  //#endregion
                } else {
                   //#region prepare attributes for send SMS Phone Message to new user to verify his account
                  new Promise(async (resolve, reject)=>{
                    const newList = await tbl_Service.get_User_Phone_Number( val_User_ID );
                    resolve(newList);
                  }).then((User_Phone) => {
                    var val_TO =User_Phone
                    let msg_Content=Returned_Code[1];
                    var val_Subject_SMS = ""
                    var val_MSG_Description_SMS = ""

                    if (langTitle=="en") {
                      val_Subject_SMS = msg_Content[0].Subject_En;
                          
                      val_MSG_Description_SMS = msg_Content[0].Description_En;
                      val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[0]);
                    } else {
                      val_Subject_SMS = msg_Content[0].Subject_Ar;
                          
                      val_MSG_Description_SMS = msg_Content[0].Description_Ar;
                      val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[0]);
                    }
                    val_MSG_Description_SMS = val_MSG_Description_SMS;

                    const sms = require("../sms/send_sms");
                    const messageObject = sms.sendSMSRequest(val_TO , val_MSG_Description_SMS);
                    if (!messageObject) {
                      //#region sending SMS failed
                      new Promise(async (resolve, reject)=>{
                        let result = await fun_handled_messages.get_handled_message(langTitle,35);
                        resolve(result);
                      }).then((sms_result) => {
                        res.status(400).json({ data: [] , message: sms_result , status: "sms failed" });
                      })
                      //#endregion
                    } else {console.log("messageObject : "+messageObject)
                      //#region sending SMS succeeded
                      var SMS_Message_Model = require("../models/sms_message");

                      let sms_sentData = new SMS_Message_Model({
                        sid:messageObject.sid,
                        date_created:messageObject.date_created,
                        date_updated:messageObject.date_updated,
                        date_sent:messageObject.date_sent,
                        account_sid:messageObject.account_sid,
                        to:messageObject.to,
                        from:messageObject.from,
                        messaging_service_sid:messageObject.messaging_service_sid,
                        body:messageObject.body,
                        status:messageObject.status,
                        num_segments:messageObject.num_segments,
                        num_segments:messageObject.num_segments,
                        num_media:messageObject.num_media,
                        direction:messageObject.direction,
                        api_version:messageObject.api_version,
                        price:messageObject.price,
                        price_unit:messageObject.price_unit,
                        error_code:messageObject.error_code,
                        error_message:messageObject.error_message,
                        uri:messageObject.uri,
                        subresource_uris:{media:messageObject.media},
                      });

                      console.log("sms_sentData = "+sms_sentData)

                      new Promise(async (resolve, reject)=>{
                        const newList = await fun_insert_row.insert_row("sms_message",sms_sentData);
                        resolve(newList);
                      }).then((User_Phone) => {

                        new Promise(async (resolve, reject)=>{
                          var result = await fun_handled_messages.get_handled_message(langTitle,50);
                          resolve(result);
                        }).then((msg) => {
                          res.status(200).json({ code:Returned_Code[0] , message: msg , status: "sms sent successed"  });
                        })
                      })
                      //#endregion
                    }
                  })                  
                  //#endregion
                }
              })
              //#endregion
            } else {
              res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
            }
          })
        })
        //#endregion
      }
    })
    //#endregion
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.signin =  async(req, res) => {
try {

  //#region Global Variables
  langTitle = req.params.langTitle;
  const TOKEN_KEY = process.env.TOKEN_KEY;
  var val_Email = req.body.Email;
  var val_Password = req.body.Password;
  //#endregion

  if (val_Email=="") {
    //#region Email Empty
    new Promise(async (resolve, reject)=>{
      let result = await fun_handled_messages.get_handled_message(langTitle,38);
      resolve(result);
    }).then((msg) => {
      res.status(400).json({ data: [] , message: msg , status: "empty email" });
    })
    //#endregion
  } else {
      await tbl_Model.findOne({Email: val_Email})
      .then(user => {
        if (!user) {

          //#region wrong email message
          new Promise(async (resolve, reject)=>{
            let result = await fun_handled_messages.get_handled_message(langTitle,39);
            resolve(result);
          }).then((msg) => {
            res.status(404).json({ data: [] , message: msg , status: "email not exist" });
          })
          //#endregion

        } else {

          //#region right email
          bcrypt.compare(val_Password, user.Password).then(compare_flag => {
            if (user && compare_flag) {
              //#region Right Password and update Last_Login_DateTime
              if (!user.Is_Verified) {
                //#region Account Not Verified
                new Promise(async (resolve, reject)=>{
                  let result = await fun_handled_messages.get_handled_message(langTitle,40);
                  resolve(result);
                }).then((msg) => {
                  res.status(400).json({ data: [] , message: msg , status: "account not verified" });
                })
                //#endregion
              } else {

                if (user.Is_Suspended) {
                  //#region Account is Suspended
                  new Promise(async (resolve, reject)=>{
                    let result = await fun_handled_messages.get_handled_message(langTitle,41);
                    resolve(result);
                  }).then((msg) => {
                    res.status(400).json({ data: [] , message: msg , status: "account Suspended" });
                  })
                  //#endregion
                } else {
                  
                  //#region Update Last Login Date Time
                  let recievedData = new tbl_Model({
                    Last_Login_DateTime: now_DateTime.get_DateTime()
                  },{ new: true});

                  new Promise(async (resolve, reject)=>{
                    const newList = await fun_update_row.update_row(user._id , "user_data" , recievedData , false);
                    resolve(newList)}).then((flg) => {
                      
                      //#region Suspend Tokens For This User
                      new Promise(async (resolve, reject)=>{
                        const newList = await fun_suspend_token.Suspend_Booked_Token(user._id);
                        resolve(newList)}).then((suspend_flg) => {

                          //#region get Serial Number for user_tokens_log table
                          const token = jwt.sign(
                            {
                              Email: val_Email,
                              Password: user.Password
                            },
                            TOKEN_KEY
                          )

                          new Promise(async (resolve, reject)=>{
                            var exist = await fun_get_serial_number.get_Serial_Number("user_tokens_log");
                            resolve(exist);
                          }).then((New_User_Token_Serial_Number) => {

                            //#region insert Token into user_tokens_log table

                            //#region Set Expire_DateTime

                            //#region Define Variables
                            let dateObject = new Date();
                            let year = ""
                            let month = ""
                            let date = ""
                            let hours = ""
                            let minutes = ""
                            let seconds = ""
                            //#endregion

                            hours = +(dateObject.getHours())+2;
                            date = ("0" + dateObject.getDate()).slice(-2);
                            if (hours>=24) {
                              hours = hours-24
                              date = date+1
                            }

                            month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
                            year = dateObject.getFullYear();
                            minutes = dateObject.getMinutes();
                            seconds = dateObject.getSeconds();
                            var val_Expire_DateTime = (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
                            //#endregion

                            let tokenData = new User_Tokens_Log_Model({
                                Serial_Number:New_User_Token_Serial_Number,
                                User_ID: user._id,
                                Token:token,
                                Inserted_DateTime:now_DateTime.get_DateTime(),
                                Expire_DateTime:val_Expire_DateTime,
                                Is_Expired:false
                            });

                            new Promise(async (resolve, reject)=>{
                              const newList = await fun_insert_row.insert_row("user_tokens_log",tokenData);
                              resolve(newList);
                            }).then((insert_flg) => {
                              res.status(200).json({data: flg , token: token, status: "login success" }) 
                            })
                            //#endregion
                          })
                          //#endregion
                        
                        })
                        //#endregion
                      
                    })
                    //#endregion
                  
                }
                
              }
              //#endregion
            } else {
              //#region Wrong Password
              new Promise(async (resolve, reject)=>{
                let result = await fun_handled_messages.get_handled_message(langTitle,42);
                resolve(result);
              }).then((msg) => {
                res.status(400).json({ data: [] , message: msg , status: "wrong password" });
              })
              //#endregion
            }
          })
          //#endregion

        }

      })
  }

} catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Reset_Password =  async(req, res) => {
  try {
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_Email = req.body.Email;
    //#endregion

    new Promise(async (resolve, reject)=>{
      var exist = await tbl_Service.Check_Email_To_Who(val_Email);
        resolve(exist);
    }).then((Email_Exist) => {
      if (Email_Exist) {
        //#region generate random code Then send it to Email
        var val_User_ID = Email_Exist._id;

        //#region fill useremailverification_log and send Email with generated code
        let get_Email_Random_Code_Promise = new Promise(async (resolve, reject)=>{
          let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
          resolve(result);
        });
        let select_Email_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
          const Template_Form = await fun_get_Template_Form.get_Template_Form("2");
          resolve(Template_Form);
        });
        let get_Email_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
          var exist = await fun_get_serial_number.get_Serial_Number("useremailverification_log");
          resolve(exist);
        });
        Promise.all([get_Email_Random_Code_Promise , select_Email_verification_Template_Form_Promise , get_Email_Verification_Serial_Number_Promise]).then((Returned_Code) => {
          if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2]>0) {

            //#region expire all Codes related to this user
            new Promise(async (resolve, reject)=>{
              const newList = await tbl_Service.Expire_All_User_Codes( val_User_ID , "useremailverification_log" );
              resolve(newList);
            }).then((Update_Flg) => {

              //#region useremailverification_log
              var useremailverification_log_Model = require("../models/useremailverification_log");

              let useremailverification_sentData = new useremailverification_log_Model({
                Serial_Number:Returned_Code[2],
                User_ID:val_User_ID,
                Code:Returned_Code[0],
                Inserted_DateTime:now_DateTime.get_DateTime(),
                Updated_By:val_Updated_By,
                Is_Expired:false,
              });
              
              new Promise(async (resolve, reject)=>{
                const newList = await fun_insert_row.insert_row("useremailverification_log",useremailverification_sentData);
                resolve(newList);
              }).then((insert_Email_Verification) => {
                
                //#region prepare attributes for send email to new user to verify his account
                let msg_Content=Returned_Code[1];
                const val_From_Email = process.env.From_Email;
          
                var val_Subject_Email = ""
                var val_MSG_Text_Email = ""
                var val_MSG_Description_Email = ""
          
                if (langTitle=="en") {
                  val_Subject_Email = msg_Content[0].Subject_En;
                  
                  val_MSG_Text_Email = msg_Content[0].Description_En;
                  val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
          
                  val_MSG_Description_Email = msg_Content[0].Description_En;
                  val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                } else {
                  val_Subject_Email = msg_Content[0].Subject_Ar;
          
                  val_MSG_Text_Email = msg_Content[0].Description_Ar;
                  val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
          
                  val_MSG_Description_Email = msg_Content[0].Description_Ar;
                  val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                }
                val_MSG_Description_Email = "<div>"+val_MSG_Description_Email+"</div>";

                const mail = require("../mail/send_mail");
                const messageId = mail.sendEmailRequest(val_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email )
                
                if (messageId.length<=0) {
                  res.status(400).json({ message: "cannot send mail" , status: "cannot send mail" });
                } else{
                  //#region New code has been generated ans sent msg 34
                  new Promise(async (resolve, reject)=>{
                  var result = await fun_handled_messages.get_handled_message(langTitle,34);
                  resolve(result);
                  }).then((msg) => {   

                      new Promise(async (resolve, reject)=>{
                        var result = await tbl_Service.update_Verification(val_User_ID , false);
                        resolve(result);
                      }).then((msg) => {
                        res.status(200).json({ data: Returned_Code[0] , message: msg, status: "code sent successfully" });
                      })

                  })
                  //#endregion
                }      
                //#endregion
              
              })
              //#endregion

            })
            //#endregion
            
          } else {
            res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
          }
        })
        //#endregion

        //#endregion
      } else {
        //#region email is not exist in DB msg 43
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,43);
          resolve(result);
        }).then((msg) => {        
          res.status(404).json({ data: [] , message: msg, status: "wrong email" });
        })
        //#endregion
      }
    })

  }catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Make_Password =  async(req, res) => {
  try {
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_User_ID = req.body.User_ID;
    var val_Password = req.body.Password;
    var val_Updated_By = req.body.Updated_By;
    var saltRounds = +process.env.saltRounds;
    //#endregion

    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(404).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region ID exist in DB And  check Code Existancy
        new Promise(async (resolve, reject)=>{
          var result = await tbl_Service.update_Verification(val_User_ID , true);
          resolve(result);
        }).then((Verified) => {
    
          bcrypt.genSalt(saltRounds).then(salt => {
            return bcrypt.hash(val_Password, salt)
          }).then(hash => {
            
            let recievedData = new tbl_Model({
              Password:hash,
              Updated_By:val_Updated_By,
              LastUpdate_DateTime: now_DateTime.get_DateTime()
            },{ new: true});

            new Promise(async (resolve, reject)=>{
              const result = await fun_update_row.update_row(val_User_ID , "user_data" , recievedData , false);
              //var result = await tbl_Service.update_Password(val_User_ID , val_Updated_By , hash);
              resolve(result);
            }).then((Updated) => {
              res.status(200).json({data: Updated , message: "password updated successfully", status: "password updated successfully" })
            })
          })
    
        })      
        //#endregion
      }
    })
    //#endregion

  }catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.update_My_Profile_Name =  async(req, res) => {
  try{
    //#region Global Variables
    langTitle = req.params.langTitle;
    const saltRounds = +process.env.saltRounds;
    var val_User_ID = req.body.User_ID;

    var val_First_Name = req.body.First_Name;
    var val_Last_Name = req.body.Last_Name;
    var val_Updated_By = req.body.Updated_By;
    let recievedData = ""
    //#endregion
    
    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(404).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region ID exist in DB
        new Promise(async (resolve, reject)=>{
          var exist = await tbl_Service.check_Name_Existancy(val_User_ID , val_First_Name , val_Last_Name );
          resolve(exist);
        }).then((Exist) => {
          if (Exist) {
            //#region msg 45 already exist
            new Promise(async (resolve, reject)=>{
              var result = await fun_handled_messages.get_handled_message(langTitle,45);
              resolve(result);
            }).then((msg) => {
              msg = msg.replace("First_Name", val_First_Name);
              msg = msg.replace("Last_Name", val_Last_Name);
              res.status(200).json({ data: [] , message: msg , status: "already exist" });
            })
            //#endregion
          } else {
            //#region update process

            recievedData = new tbl_Model({
              First_Name: val_First_Name,
              Last_Name: val_Last_Name,
              Updated_By:val_Updated_By,
              LastUpdate_DateTime: now_DateTime.get_DateTime()
            },{ new: true});

            new Promise(async (resolve, reject)=>{
              const newList = await fun_update_row.update_row(val_User_ID , "user_data" , recievedData , false);
              resolve(newList);
            }).then((flg) => {
              if (!flg) {
                //#region msg 2 update process failed
                new Promise(async (resolve, reject)=>{
                let result = await fun_handled_messages.get_handled_message(langTitle,2);
                resolve(result);
                }).then((msg) => {
                    res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                })
                //#endregion
              } else {
                //#region msg update process successed
                new Promise(async (resolve, reject)=>{
                  var result = await fun_handled_messages.get_handled_message(langTitle,44);
                  resolve(result);
                }).then((msg) => {
                  res.status(200).json({ data: flg , message: msg , status: "updated successed" });
                })
                //#endregion
              }
            })

            //#endregion
          }
        })
        //#endregion
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.update_My_Profile_Address =  async(req, res) => {
  try{
    //#region Global Variables
    langTitle = req.params.langTitle;
    const saltRounds = +process.env.saltRounds;
    var val_User_ID = req.body.User_ID;

    var val_Address = req.body.Address;
    var val_Updated_By = req.body.Updated_By;
    let recievedData = ""
    //#endregion
    
    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(404).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region ID exist in DB
        new Promise(async (resolve, reject)=>{
          var exist = await tbl_Service.check_Address_Existancy(val_User_ID , val_Address );
          resolve(exist);
        }).then((Exist) => {
          if (Exist) {
            //#region msg 46 already exist
            new Promise(async (resolve, reject)=>{
              var result = await fun_handled_messages.get_handled_message(langTitle,46);
              resolve(result);
            }).then((msg) => {
              res.status(200).json({ data: [] , message: msg , status: "already exist" });
            })
            //#endregion
          } else {
            //#region update process

            recievedData = new tbl_Model({
              Address: val_Address,
              Updated_By:val_Updated_By,
              LastUpdate_DateTime: now_DateTime.get_DateTime()
            },{ new: true});

            new Promise(async (resolve, reject)=>{
              const newList = await fun_update_row.update_row(val_User_ID , "user_data" , recievedData , false);
              resolve(newList);
            }).then((flg) => {
              if (!flg) {
                //#region msg 2 update process failed
                new Promise(async (resolve, reject)=>{
                let result = await fun_handled_messages.get_handled_message(langTitle,2);
                resolve(result);
                }).then((msg) => {
                    res.status(400).json({ data: [] , message: msg , status: "update failed" });    
                })
                //#endregion
              } else {
                //#region msg update process successed
                new Promise(async (resolve, reject)=>{
                  var result = await fun_handled_messages.get_handled_message(langTitle,44);
                  resolve(result);
                }).then((msg) => {
                  res.status(200).json({ data: flg , message: msg , status: "updated successed" });
                })
                //#endregion
              }
            })

            //#endregion
          }
        })
        //#endregion
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.check_phone_number_existancy =  async(req, res) => {
try {
  //#region Global Variables
  langTitle = req.params.langTitle;
  var val_User_ID = req.body.User_ID;
  var Val_New_Phone_Number = req.body.Phone_Number;
  //#endregion

  //#region check User ID Existancy
  new Promise(async (resolve, reject)=>{
    let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
    resolve(returnedList);
  }).then((returned_ID) => {
    if (!returned_ID) {
      //#region ID is not exist in DB msg 14
      new Promise(async (resolve, reject)=>{
        var result = await fun_handled_messages.get_handled_message(langTitle,14);
        resolve(result);
      }).then((msg) => {        
        res.status(404).json({ data: [] , message: msg, status: "wrong id" });
      })
      //#endregion
    } else {
      //#region check Phone Number Existancy
      new Promise(async (resolve, reject)=>{
        const newList = await tbl_Service.Check_PhoneNumber_Existancy( val_User_ID,Val_New_Phone_Number );
        resolve(newList);
      }).then((Phone_Number_Exist) => {
        if (Phone_Number_Exist) {
          //#region This Phone Number Already Taken by another User msg 47
          new Promise(async (resolve, reject)=>{
            var result = await fun_handled_messages.get_handled_message(langTitle,47);
            resolve(result);
          }).then((msg) => {        
            res.status(400).json({ data: [] , message: msg, status: "phone number already taken by another user" });
          })
          //#endregion
        } else {
          //#region This Phone Number is avialable fill userphoneverification_log and send sms
          let get_Phone_Random_Code_Promise = new Promise(async (resolve, reject)=>{
            let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
            resolve(result);
          });
          let select_Phone_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
            const Template_Form = await fun_get_Template_Form.get_Template_Form("3");
            resolve(Template_Form);
          });
          let get_Phone_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
            var exist = await fun_get_serial_number.get_Serial_Number("userphoneverification_log");
            resolve(exist);
          });
          Promise.all([get_Phone_Random_Code_Promise , select_Phone_verification_Template_Form_Promise , get_Phone_Verification_Serial_Number_Promise]).then((Returned_Code) => {
            if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2]>0) {

              //#region expire all Codes related to this user
              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.Expire_All_User_Codes( val_User_ID , "userphoneverification_log" );
                resolve(newList);
              }).then((Update_Flg) => {

                //#region userphoneverification_log
                var userphoneverification_log_Model = require("../models/userphoneverification_log");

                let Phone_verification_sentData = new userphoneverification_log_Model({
                  Serial_Number:Returned_Code[2],
                  User_ID:val_User_ID,
                  Code:Returned_Code[0],
                  Inserted_DateTime:now_DateTime.get_DateTime(),
                  Is_Expired:false,
                });

                new Promise(async (resolve, reject)=>{
                  const newList = await fun_insert_row.insert_row("userphoneverification_log",Phone_verification_sentData);
                  resolve(newList);
                }).then((Phone_Number_Exist) => {
                  
                  //#region prepare attributes for send SMS Phone Message to new user to verify his account
                  msg_Content=Returned_Code[1];
                  var val_Subject_SMS = ""
                  var val_MSG_Description_SMS = ""

                  if (langTitle=="en") {
                    val_Subject_SMS = msg_Content[0].Subject_En;
                        
                    val_MSG_Description_SMS = msg_Content[0].Description_En;
                    val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[0]);
                  } else {
                    val_Subject_SMS = msg_Content[0].Subject_Ar;
                        
                    val_MSG_Description_SMS = msg_Content[0].Description_Ar;
                    val_MSG_Description_SMS = val_MSG_Description_SMS.replace("Generated_Code", Returned_Code[0]);
                  }
                  val_MSG_Description_SMS = val_MSG_Description_SMS;

                  const sms = require("../sms/send_sms");

                  var val_TO = Val_New_Phone_Number
                  const messageObject = sms.sendSMSRequest(val_TO , val_MSG_Description_SMS);

                  if (!messageObject) {
                    //#region sending SMS failed
                    new Promise(async (resolve, reject)=>{
                      let result = await fun_handled_messages.get_handled_message(langTitle,48);
                      resolve(result);
                    }).then((sms_result) => {
                      res.status(400).json({ data: [] , message: sms_result , status: "sms failed" });
                    })                          
                    //#endregion
                  } else {
                    //#region sending SMS succeeded
                    var SMS_Message_Model = require("../models/sms_message");

                    let sms_sentData = new SMS_Message_Model({
                      sid:messageObject.sid,
                      date_created:messageObject.date_created,
                      date_updated:messageObject.date_updated,
                      date_sent:messageObject.date_sent,
                      account_sid:messageObject.account_sid,
                      to:messageObject.to,
                      from:messageObject.from,
                      messaging_service_sid:messageObject.messaging_service_sid,
                      body:messageObject.body,
                      status:messageObject.status,
                      num_segments:messageObject.num_segments,
                      num_segments:messageObject.num_segments,
                      num_media:messageObject.num_media,
                      direction:messageObject.direction,
                      api_version:messageObject.api_version,
                      price:messageObject.price,
                      price_unit:messageObject.price_unit,
                      error_code:messageObject.error_code,
                      error_message:messageObject.error_message,
                      uri:messageObject.uri,
                      subresource_uris:{media:messageObject.media},
                    });
                    console.log("sms_sentData = "+sms_sentData)
                    new Promise(async (resolve, reject)=>{
                      const newList = await tbl_Service.insert_SMS_Message(sms_sentData);
                      resolve(newList);
                    }).then((inserted_SMS) => {

                      //#region This Phone Number is avialable msg 50
                      new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,50);
                        resolve(result);
                      }).then((msg) => {   
                        
                        new Promise(async (resolve, reject)=>{
                          var result = await tbl_Service.update_Verification(val_User_ID , false);
                          resolve(result);
                        }).then((msg) => {
                          res.status(200).json({ data: Returned_Code[0] , message: msg, status: "code sent successfully" });
                        })
                        
                      })
                      //#endregion

                    })
                    //#endregion
                  }
                  //#endregion

                })
                //#endregion

              })
              //#endregion
              
            } else {
              res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
            }
          })
          //#endregion
        }
      })
      //#endregion
    }
  })
  //#endregion

} catch (err) {
  logger.error(err.message);
  res.status(500).json({ data:[] , message:err.message , status: "error" });
}
};

exports.check_Email_existancy =  async(req, res) => {
  try {
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_User_ID = req.body.User_ID;
    var Val_New_Email = req.body.Email;
    //#endregion

    //#region check User ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(400).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region check Email Existancy
        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.Check_Email_Existancy(val_User_ID,Val_New_Email );
          resolve(newList);
        }).then((Email_Exist) => {
          if (Email_Exist) {
            //#region This Email Already Taken by another User msg 49
            new Promise(async (resolve, reject)=>{
              var result = await fun_handled_messages.get_handled_message(langTitle,49);
              resolve(result);
            }).then((msg) => {        
              res.status(400).json({ data: [] , message: msg, status: "email already taken by another user" });
            })
            //#endregion
          } else {
            //#region This Email is avialable fill userphoneverification_log and send sms
            let get_Email_Random_Code_Promise = new Promise(async (resolve, reject)=>{
              let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
              resolve(result);
            });
            let select_Email_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
              const Template_Form = await fun_get_Template_Form.get_Template_Form("2");
              resolve(Template_Form);
            });
            let get_Email_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
              var exist = await fun_get_serial_number.get_Serial_Number("useremailverification_log");
              resolve(exist);
            });
            Promise.all([get_Email_Random_Code_Promise , select_Email_verification_Template_Form_Promise , get_Email_Verification_Serial_Number_Promise]).then((Returned_Code) => {
              if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2]>0) {

                //#region expire all Codes related to this user
                new Promise(async (resolve, reject)=>{
                  const newList = await tbl_Service.Expire_All_User_Codes( val_User_ID , "useremailverification_log" );
                  resolve(newList);
                }).then((Update_Flg) => {

                  //#region useremailverification_log
                  var useremailverification_log_Model = require("../models/useremailverification_log");

                  let useremailverification_sentData = new useremailverification_log_Model({
                    Serial_Number:Returned_Code[2],
                    User_ID:val_User_ID,
                    Code:Returned_Code[0],
                    Inserted_DateTime:now_DateTime.get_DateTime(),
                    Is_Expired:false,
                  });
                  console.log("useremailverification_sentData = "+useremailverification_sentData)
                  new Promise(async (resolve, reject)=>{
                    const newList = await fun_insert_row.insert_row("useremailverification_log",useremailverification_sentData);
                    resolve(newList);
                  }).then((insert_Email_Verification) => {
                    
                    //#region prepare attributes for send email to new user to verify his account
                    let msg_Content=Returned_Code[1];
                    const val_From_Email = process.env.From_Email;
                          
                    var val_Subject_Email = ""
                    var val_MSG_Text_Email = ""
                    var val_MSG_Description_Email = ""
                          
                    if (langTitle=="en") {
                      val_Subject_Email = msg_Content[0].Subject_En;
                      
                      val_MSG_Text_Email = msg_Content[0].Description_En;
                      val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                          
                      val_MSG_Description_Email = msg_Content[0].Description_En;
                      val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                    } else {
                      val_Subject_Email = msg_Content[0].Subject_Ar;
                          
                      val_MSG_Text_Email = msg_Content[0].Description_Ar;
                      val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
                          
                      val_MSG_Description_Email = msg_Content[0].Description_Ar;
                      val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                    }
                    val_MSG_Description_Email = "<div>"+val_MSG_Description_Email+"</div>";

                    const mail = require("../mail/send_mail");
                    const messageId = mail.sendEmailRequest(Val_New_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email )
                    
                    if (messageId.length<=0) {
                      res.status(400).json({ message: "cannot send mail" , status: "cannot send mail" });
                    } else{
                      //#region This Phone Number is avialable msg 34
                      new Promise(async (resolve, reject)=>{
                        var result = await fun_handled_messages.get_handled_message(langTitle,34);
                        resolve(result);
                      }).then((msg) => {   
                        
                        new Promise(async (resolve, reject)=>{
                          var result = await tbl_Service.update_Verification(val_User_ID , false);
                          resolve(result);
                        }).then((msg) => {
                          res.status(200).json({ data: Returned_Code[0] , message: msg, status: "code sent successfully" });
                        })
                        
                      })
                      //#endregion
                    }                  
                    //#endregion
                  
                  })
                  //#endregion

                })
                //#endregion
                
              } else {
                res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
              }
            })
            //#endregion
          }
        })
        //#endregion
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Email_Profile_Verification =  async(req, res) => {
  try {
    //#region Global Variables
    var val_User_ID = req.body.User_ID; 
    langTitle = req.params.langTitle;
    var val_Code = req.body.Code;
    var Val_New_Email = req.body.Email;
    //#endregion

    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(404).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region ID exist in DB And  check Code Existancy
        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.check_Code_Existancy( val_User_ID , val_Code , "useremailverification_log");
          resolve(newList);
        }).then((Code_Existancy_Flg) => {
          if (Code_Existancy_Flg.length<=0) {
            //#region code is not exist in DB
            new Promise(async (resolve, reject)=>{
              let result = await fun_handled_messages.get_handled_message(langTitle,29);
              resolve(result);
            }).then((msg) => {
              res.status(404).json({ data: [] , message: msg , status: "code not exist" });
            })
            //#endregion
          } else {
            if (Code_Existancy_Flg[0].Is_Expired) {
              //#region Code is expired
              new Promise(async (resolve, reject)=>{
                let result = await fun_handled_messages.get_handled_message(langTitle,30);
                resolve(result);
              }).then((msg) => {
                res.status(400).json({ data: [] , message: msg , status: "code is expired" });
              })
              //#endregion
            } else {
              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.Verification_Expiration( val_User_ID , val_Code , "useremailverification_log" );
                resolve(newList);
              }).then((Update_Flg) => {
                //#region email verification success
                new Promise(async (resolve, reject)=>{
                  let result = await fun_handled_messages.get_handled_message(langTitle,31);
                  resolve(result);
                }).then((msg) => {
                  
                  new Promise(async (resolve, reject)=>{
                    var result = await tbl_Service.update_Verification(val_User_ID , true);
                    resolve(result);
                  }).then((Verified) => {

                    new Promise(async (resolve, reject)=>{
                      var result = await tbl_Service.update_Email(val_User_ID , Val_New_Email);
                      resolve(result);
                    }).then((EmailUpdated) => {
                      res.status(200).json({data: Update_Flg , message: msg, status: "email verification success" })
                    })

                  })

                })
                //#endregion
              })
            }
          }
        })
        //#endregion
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Phone_Profile_Verification =  async(req, res) => {
  try {
    //#region Global Variables
    var val_User_ID = req.body.User_ID; 
    langTitle = req.params.langTitle;
    var val_Code = req.body.Code;      
    var Val_New_Phone_Number = req.body.Phone_Number;
    //#endregion

    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(404).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region ID exist in DB And Check Code Existancy
        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.check_Code_Existancy( val_User_ID , val_Code , "userphoneverification_log");
          resolve(newList);
        }).then((Code_Existancy_Flg) => {
          if (Code_Existancy_Flg.length<=0) {
            //#region code is not exist in DB
            new Promise(async (resolve, reject)=>{
              let result = await fun_handled_messages.get_handled_message(langTitle,32);
              resolve(result);
            }).then((msg) => {
              res.status(404).json({ data: [] , message: msg , status: "code not exist" });
            })
            //#endregion
          } else {
            if (Code_Existancy_Flg[0].Is_Expired) {
              //#region Code is expired
              new Promise(async (resolve, reject)=>{
                let result = await fun_handled_messages.get_handled_message(langTitle,30);
                resolve(result);
              }).then((msg) => {
                res.status(400).json({ data: [] , message: msg , status: "code is expired" });
              })
              //#endregion
            } else {
              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.Verification_Expiration( val_User_ID , val_Code , "userphoneverification_log" );
                resolve(newList);
              }).then((Update_Flg) => {
                //#region phone verification success
                new Promise(async (resolve, reject)=>{
                  let result = await fun_handled_messages.get_handled_message(langTitle,31);
                  resolve(result);
                }).then((msg) => {

                  new Promise(async (resolve, reject)=>{
                    var result = await tbl_Service.update_Verification(val_User_ID , true);
                    resolve(result);
                  }).then((Verified) => {

                    new Promise(async (resolve, reject)=>{
                      var result = await tbl_Service.update_Phone_Number(val_User_ID , Val_New_Phone_Number);
                      resolve(result);
                    }).then((EmailUpdated) => {
                      res.status(200).json({data: Update_Flg , message: msg, status: "phone verification success" }) 
                    })

                  })

                })
                //#endregion
              })
            }
          }
        })
        //#endregion
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Change_Photo_Profile =  async(req, res) => {
  try{
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_User_ID = req.body.User_ID;
    var val_Updated_By = req.body.Updated_By;
    var Val_Photo_Profile = req.body.Photo_Profile;
    var is_Delete_Old_Image=true;
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    var recievedData = ""
    //#endregion

    //#region prepare photo attributes
    const file = req.file;
    if (!file) {
      //#region msg 9 No image in the request
      new Promise(async (resolve, reject)=>{
        let result = await fun_handled_messages.get_handled_message(langTitle,9);
        resolve(result);
    }).then((msg) => {
        res.status(400).json({ data: [] , message: msg , status: "No image in the request" }); 
    });return
    //#endregion
    } else if (!allowedMimeTypes.includes(file.mimetype)) {
          //#region msg 10 Unsupported file type
          new Promise(async (resolve, reject)=>{
              let result = await fun_handled_messages.get_handled_message(langTitle,10);
              resolve(result);
          }).then((msg) => {
              res.status(400).json({ data: [] , message: msg , status: "Unsupported file type" }); 
          });return
          //#endregion
    } else {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/user_personal_photos/`;
        Val_Photo_Profile = `${basePath}${fileName}`

        recievedData = new tbl_Model({
          Photo_Profile: Val_Photo_Profile,
          Updated_By:val_Updated_By,
          LastUpdate_DateTime: now_DateTime.get_DateTime()
        },{ new: true});

        console.log("recievedData = "+recievedData)

        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.update_My_Profile_Data(val_User_ID, recievedData , is_Delete_Old_Image);
          resolve(newList);
        }).then((flg) => {

          if (!flg) {
            //#region msg 2 update process failed
            new Promise(async (resolve, reject)=>{
            let result = await fun_handled_messages.get_handled_message(langTitle,2);
            resolve(result);
            }).then((msg) => {
                res.status(400).json({ data: [] , message: msg , status: "update failed" });    
            })
            //#endregion
          } else {
            //#region msg 44 update process successed
            new Promise(async (resolve, reject)=>{
              var result = await fun_handled_messages.get_handled_message(langTitle,44);
              resolve(result);
            }).then((msg) => {
              res.status(200).json({ data: flg , message: msg , status: "updated successed" });
            })
            //#endregion
          }

        })
    }
    //#endregion
  
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Update_Password =  async(req, res) => {
  try{
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_User_ID = req.body.User_ID;
    var val_Updated_By = req.body.Updated_By;
    var val_Email = req.body.Email;
    //#endregion

    //#region check User ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(404).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        
        //#region fill useremailverification_log and send Email with generated code
          let get_Email_Random_Code_Promise = new Promise(async (resolve, reject)=>{
            let result = await random.generate_Random_Value_Hex(3) +""+ await random.generate_Random_Value_Hex(3);
            resolve(result);
          });
          let select_Email_verification_Template_Form_Promise = new Promise(async (resolve, reject)=>{
            const Template_Form = await fun_get_Template_Form.get_Template_Form("2");
            resolve(Template_Form);
          });
          let get_Email_Verification_Serial_Number_Promise = new Promise(async (resolve, reject)=>{
            var exist = await fun_get_serial_number.get_Serial_Number("useremailverification_log");
            resolve(exist);
          });
          Promise.all([get_Email_Random_Code_Promise , select_Email_verification_Template_Form_Promise , get_Email_Verification_Serial_Number_Promise]).then((Returned_Code) => {
            if (Returned_Code[0].length>0 && Returned_Code[1].length>0 && Returned_Code[2]>0) {

              //#region expire all Codes related to this user
              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.Expire_All_User_Codes( val_User_ID , "useremailverification_log" );
                resolve(newList);
              }).then((Update_Flg) => {

                //#region useremailverification_log
                var useremailverification_log_Model = require("../models/useremailverification_log");

                let useremailverification_sentData = new useremailverification_log_Model({
                  Serial_Number:Returned_Code[2],
                  User_ID:val_User_ID,
                  Code:Returned_Code[0],
                  Inserted_DateTime:now_DateTime.get_DateTime(),
                  Updated_By:val_Updated_By,
                  Is_Expired:false,
                });
                console.log("useremailverification_sentData = "+useremailverification_sentData)
                new Promise(async (resolve, reject)=>{
                  const newList = await fun_insert_row.insert_row("useremailverification_log",useremailverification_sentData);
                  resolve(newList);
                }).then((insert_Email_Verification) => {
                  
                  //#region prepare attributes for send email to new user to verify his account
                  let msg_Content=Returned_Code[1];
                  const val_From_Email = process.env.From_Email;
            
                  var val_Subject_Email = ""
                  var val_MSG_Text_Email = ""
                  var val_MSG_Description_Email = ""
            
                  if (langTitle=="en") {
                    val_Subject_Email = msg_Content[0].Subject_En;
                    
                    val_MSG_Text_Email = msg_Content[0].Description_En;
                    val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
            
                    val_MSG_Description_Email = msg_Content[0].Description_En;
                    val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                  } else {
                    val_Subject_Email = msg_Content[0].Subject_Ar;
            
                    val_MSG_Text_Email = msg_Content[0].Description_Ar;
                    val_MSG_Text_Email = val_MSG_Text_Email.replace("Generated_Code", Returned_Code[0]);
            
                    val_MSG_Description_Email = msg_Content[0].Description_Ar;
                    val_MSG_Description_Email = val_MSG_Description_Email.replace("Generated_Code", Returned_Code[0]);
                  }
                  val_MSG_Description_Email = "<div>"+val_MSG_Description_Email+"</div>";

                  const mail = require("../mail/send_mail");
                  const messageId = mail.sendEmailRequest(val_Email , val_From_Email , val_Subject_Email , val_MSG_Text_Email , val_MSG_Description_Email )
                  
                  if (messageId.length<=0) {
                    res.status(400).json({ message: "cannot send email" , status: "cannot send email" });
                  } else{
                    //#region This Phone Number is avialable msg 34
                    new Promise(async (resolve, reject)=>{
                    var result = await fun_handled_messages.get_handled_message(langTitle,34);
                    resolve(result);
                    }).then((msg) => {   

                        new Promise(async (resolve, reject)=>{
                          var result = await tbl_Service.update_Verification(val_User_ID , false);
                          resolve(result);
                        }).then((msg) => {
                          res.status(200).json({ data: Returned_Code[0] , message: msg, status: "code sent successfully" });
                        })

                    })
                    //#endregion
                  }      
                  //#endregion
                
                })
                //#endregion

              })
              //#endregion
              
            } else {
              res.status(400).json({ data: [] , message: "cannot create verification code" , status: "cannot create verification code" });
            }
          })
          //#endregion
          
      }
    })
    //#endregion

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.Password_Verification =  async(req, res) => {
  try{
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_User_ID = req.body.User_ID;
    var val_Password = req.body.Password;
    const saltRounds = +process.env.saltRounds;
    var val_Updated_By = req.body.Updated_By;
    var val_Code = req.body.Code;    
    //#endregion

    //#region check ID Existancy
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("user_data",val_User_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
        //#region ID is not exist in DB msg 14
        new Promise(async (resolve, reject)=>{
          var result = await fun_handled_messages.get_handled_message(langTitle,14);
          resolve(result);
        }).then((msg) => {        
          res.status(400).json({ data: [] , message: msg, status: "wrong id" });
        })
        //#endregion
      } else {
        //#region ID exist in DB And  check Code Existancy
        new Promise(async (resolve, reject)=>{
          const newList = await tbl_Service.check_Code_Existancy( val_User_ID , val_Code , "useremailverification_log");
          resolve(newList);
        }).then((Code_Existancy_Flg) => {
          if (Code_Existancy_Flg.length<=0) {
            //#region code is not exist in DB
            new Promise(async (resolve, reject)=>{
              let result = await fun_handled_messages.get_handled_message(langTitle,29);
              resolve(result);
            }).then((msg) => {
              res.status(404).json({ data: [] , message: msg , status: "code not exist" });
            })
            //#endregion
          } else {
            if (Code_Existancy_Flg[0].Is_Expired) {
              //#region Code is expired
              new Promise(async (resolve, reject)=>{
                let result = await fun_handled_messages.get_handled_message(langTitle,30);
                resolve(result);
              }).then((msg) => {
                res.status(400).json({ data: [] , message: msg , status: "code is expired" });
              })
              //#endregion
            } else {
              new Promise(async (resolve, reject)=>{
                const newList = await tbl_Service.Verification_Expiration( val_User_ID , val_Code , "useremailverification_log" );
                resolve(newList);
              }).then((Update_Flg) => {
                //#region email verification success
                new Promise(async (resolve, reject)=>{
                  let result = await fun_handled_messages.get_handled_message(langTitle,51);
                  resolve(result);
                }).then((msg) => {
                  
                  new Promise(async (resolve, reject)=>{
                    var result = await tbl_Service.update_Verification(val_User_ID , true);
                    resolve(result);
                  }).then((Verified) => {

                    bcrypt.genSalt(saltRounds).then(salt => {
                      return bcrypt.hash(val_Password, salt)
                    }).then(hash => {
                      new Promise(async (resolve, reject)=>{
                        var result = await tbl_Service.update_Password(val_User_ID , val_Updated_By , hash);
                        resolve(result);
                      }).then((EmailUpdated) => {
                        res.status(200).json({data: Update_Flg , message: msg, status: "password verification success" })
                      })
                    })

                  })

                })
                //#endregion
              })
            }
          }
        })
        //#endregion
      }
    })
    //#endregion
  
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.List_Users =  async(req, res) => {
  try {
    //#region Global Variables
    langTitle = req.params.langTitle;
    var suspendStatus = req.params.suspendStatus;
    var val_user_types = req.params.user_types;
    var val_Page_Number = req.params.page_number;
    console.log("val_Page_Number ="+val_Page_Number)
    //#endregion

    //#region get Users List By User Types
    new Promise(async (resolve, reject)=>{
      let returnedList = await tbl_Service.get_Users_List_By_User_Types(val_user_types,val_Page_Number,suspendStatus);
      resolve(returnedList);
    }).then((returned_Users) => {

      if((!returned_Users)||(returned_Users.length<=0)) {
        //#region empty rows
          new Promise(async (resolve, reject)=>{
              var result = await fun_handled_messages.get_handled_message(langTitle,36);
              resolve(result);
          }).then((msg) => {
              res.status(404).json({data: [] , message: msg , status: "empty rows" });
          })
        //#endregion
      } else{
          res.status(200).json({ data: returned_Users , message: "", status: "rows selected" });
      }
      
    })
    //#endregion
    
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.List_Users_Inside_Organization =  async(req, res) => {
  try { 
    
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_Business_Organization_ID = (req.params.id).trim();
    var val_suspendStatus = (req.params.suspendStatus).trim();
    var val_Page_Number = req.params.page_number;
    //#endregion

    //#region check_Existancy_By_ID Then get Users List By Business_Organization_ID
    new Promise(async (resolve, reject)=>{
      let returnedList = await fun_check_Existancy_By_ID.check_Existancy_By_ID("business_organizations_lkp",val_Business_Organization_ID);
      resolve(returnedList);
    }).then((returned_ID) => {
      if (!returned_ID) {
          //#region ID is not exist in DB msg 14
          new Promise(async (resolve, reject)=>{
              var result = await fun_handled_messages.get_handled_message(langTitle,14);
              resolve(result);
          }).then((msg) => {        
              res.status(400).json({ data: [] , message: msg, status: "wrong id" });
          })
          //#endregion
      } else {
        new Promise(async (resolve, reject)=>{
          let returnedList = await tbl_Service.List_Users_Inside_Organization(val_Business_Organization_ID,val_Page_Number,val_suspendStatus);
          resolve(returnedList);
        }).then((returned_Users) => {

          if((!returned_Users)||(returned_Users.length<=0)) {
            //#region empty rows
              new Promise(async (resolve, reject)=>{
                  var result = await fun_handled_messages.get_handled_message(langTitle,17);
                  resolve(result);
              }).then((msg) => {
                  res.status(404).json({data: [] , message: msg , status: "empty rows" });
              })
            //#endregion
          } else{
              res.status(200).json({ data: returned_Users , message: "", status: "rows selected" });
          }
          
        })
      }

    })
    //#endregion
    
  }catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};

exports.check_User_Existancy =  async(req, res) => {
  try {
    //#region Global Variables
    langTitle = req.params.langTitle;
    var val_Email = req.body.Email;
    var val_Phone_Number = req.body.Phone_Number;
    //#endregion

    new Promise(async (resolve, reject)=>{
      var exist = await tbl_Service.check_User_Existancy(val_Email,val_Phone_Number);
        resolve(exist);
    }).then((flag_User_Exist) => {
      if (flag_User_Exist[0].trim()==="Exist_Non_Registered_Client") {
        res.status(200).json({ data: flag_User_Exist[1] , message: "", status: "Exist As Non Registered Client" });
      } else if (flag_User_Exist[0].trim()==="Exist") {
        //#region User Account Already Exist Msg This to user
        new Promise(async (resolve, reject)=>{
          let result = await fun_handled_messages.get_handled_message(langTitle,13);
          resolve(result);
        }).then((msg) => {
          res.status(200).json({ data: [] , message: msg , status: "User Account Already Exist" }); 
        })
        //#endregion
      } else if(flag_User_Exist[0].trim()==="Not_Exist") {
        //#region User Account Not Exist So, Insert This New Account
        res.status(200).json({ data: [] , message: "" , status: "User Account Not Exist" }); 
        //#endregion
      }
    })

  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ data:[] , message:err.message , status: "error" });
  }
};