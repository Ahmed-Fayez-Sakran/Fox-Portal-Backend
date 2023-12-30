const accountSid = 'ACb02af8f2befeebe3e1212992242aaf54';
const authToken = 'b501df37310471f36d0857e351fbd70d';
const client = require('twilio')(accountSid, authToken);


exports.sendSMSRequest = async (val_TO , val_Message) => {
var returnObject = ""
client.messages
  .create({
    body: val_Message,
    to: val_TO,
    from: '+12562748546',
  })
  .then((message) => 
  returnObject = message
  );

  return returnObject;
};