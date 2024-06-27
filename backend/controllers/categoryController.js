const {PrismaClient} = require  ('@prisma/client');
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");

const create = async ( req, res) => {
    const {name} = req.body;
    const data = {name};

    try{
        const category = await prisma.category.create({data})
        res.status(200).send(category)
    }catch(err){
        errorHandler(err, req, res)
    }
}


const index = async (req, res) => {
    try{
        const categories = await prisma.category.findMany()
        res.json(categories);
    }catch(err){
        errorHandler(err, req, res)
    }
}

const destroy = async(req, res ) => {
    try{
        const id = parseInt(req.params.id);
        await prisma.category.delete({
            where:{id}
        })
        res.json(`categoria ${id} eliminata con successo `)
    }catch(err){
        errorHandler(err, req, res)
    }
}

module.exports ={
    create,
    index,
    destroy
}
