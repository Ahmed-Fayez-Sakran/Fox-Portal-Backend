module.exports.get_DateTime = function () {
    let dateObject = new Date();
    let date = ("0" + dateObject.getDate()).slice(-2);
    let month = ("0" + (dateObject.getMonth() + 1)).slice(-2);
    let year = dateObject.getFullYear();
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let seconds = dateObject.getSeconds();
    return(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
};