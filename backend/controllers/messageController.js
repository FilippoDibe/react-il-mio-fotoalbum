const {PrismaClient} = require  ('@prisma/client');
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");


const create = async (req, res) => {
    const {senderMail, message} = req.body;

    const data = {senderMail, message};

    try{
        const message = await prisma.message.create({data});
        res.status(200).send(message);
    }catch(err){
        errorHandler(err, req, res)
    }

}

const index = async (req, res) =>{
    try{
        const messages = await prisma.message.findMany();
        res.json(messages);
    }catch(err){
        errorHandler(err, req, res)
    }
}

const destroy = async (req, res) => {
    try{
        const id = parseInt(req.params.id)
        await prisma.message.delete({
            where:{id}
        })
        res.json(`messaggio con id: ${id} eliminato con sucesso`)
    }catch(err){
        errorHandler(err, req, res)
    }
}

module.exports ={
    create,
    index,
    destroy
}