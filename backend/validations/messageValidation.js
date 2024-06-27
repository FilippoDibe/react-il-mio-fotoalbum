const messageData = {
    email: {
        notEmpty: {
            errorMessage: "Email è un campo obbligatorio",
            bail: true
        },
        isEmail: {
            errorMessage: "Email deve essere valida",
            bail:true
        }
    }
}
module.exports = { messageData}