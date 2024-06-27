const {PrismaClient} =require ("@prisma/client");
const { options } = require("../routers/photoRouter");
const prisma = new PrismaClient();

const photoData = {
    title: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Il titolo è un campo obbligatorio",
            bail: true
        },
        isString: {
            errorMessage: "Il titolo deve essere una stringa",
            bail: true
        },
        isLength: {
            errorMessage: "Il titolo deve essere almeno 5 caratteri",
            options: {min: 5}
        },
        trim:true,
    },   
    visible: {
        in: ["body"],
        isBoolean:{
            errorMessage:" Visibile deve essere un booleano "
        },
        toBoolean: true,
    },
    description:{
        in:["body"],
        notEmpty: {
            errorMessage: 'La descrizione è un campo obbligatorio',
            bail: true
        },
    },
    userId:{
        in:["body"],
        notEmpty: {
            errorMessage: "l'user Id  è un campo obbligatorio",
            bail: true
        },
        isInt: {
            errorMessage:"l'user Id deve essere un numero intero"
        },
        custom: {
            options: async (value) => {
                const userId = parseInt(value);
                const user = await prisma.user.findUnique({
                    where: {id: userId}
                })
                if(!user){
                    throw new Error(`l'user con id : ${userId} non esiste`)
                }
                return true;
            }
        },
        toInt: true
    },
    categories: {
        in: ["body"],
        notEmpty:{
            errorMessage: "Le categorie sono un campo obbligatorio",
            bail: true
        },
        isArray: {
            errorMessage: "Le categorie devono essere un Array",
            bail: true
        },
        custom:{
            options: async (list) =>{
                const ids = list.map(id => parseInt(id));
                if(ids.lenght === 0 ){
                    throw new Error(`Una foto deve avere almeno 1 categoria`);
                }
                const notNumberId = ids.find(id => isNaN(parseInt(id)));
                if(notNumberId){
                    throw new Error(`Uno o più id non sono numeri interi`);
                }
                const categories = await prisma.category.findMany({
                    where: {
                        id: {
                            in: ids
                        }
                    }
                });
                if(categories.length !== ids.length){
                    throw new Error(`una delle categorie che hai inserito non esistono`)
                }
                return true;
            }
        },
    }

}
module.exports = {photoData}