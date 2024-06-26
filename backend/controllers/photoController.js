const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const uniqueSlug = require("../middlewares/uniqueSlug.js");
const errorHandler = require("../middlewares/errorHandler.js");


const create = async (req, res) => {
    const { title, slug, description, categories, image } = req.body;

    if (!title || !description || !categories || !image) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const generatedSlug = slug || await uniqueSlug(title);

    const data = {
        title,
        slug: generatedSlug,
        image,
        description,
        visible: req.body.visible ? true : false,
        categories: {
            connect: categories.map(categoryId => ({ id: categoryId }))
        }
    };

    try {
        const photo = await prisma.photo.create({
            data,
            include: {
                categories: true
            }
        });
        res.status(200).json(photo);
    } catch (err) {
        console.error('Error creating photo:', err);
       
        errorHandler(err, req, res);
    }
};

const index = async(req, res) => {
    const {visible} = req.query;
    try{
        const photo = await prisma.photo.findMany({
            where: {
                AND: [
                    visible !== undefined ? {visible: visible === 'true'} : {},
                ]
            },
            include:{
                categories: true
            }
        })
        res.json(photo)
    }catch(err){
        errorHandler(err, req, res)
    }
}
const showBySlug = async (req, res) => {
    try{
        const {slug} = req.params;
        const photo = await prisma.photo.findUnique({
            where:{slug},
            include: {
                categories:true
            }
        });
        if(photo){
            res.json(photo);
        }else{
            return res.status(404).json({error: 'foto non trovato'});
        }
    }catch(err){
        errorHandler(err, req, res)
    }
}


const update = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, description, categories, image } = req.body;

        const data = {
            title,
            image,
            description,
            visible: req.body.visible ? true : false,
            categories: {
                set: categories.map(categoryId => ({ id: categoryId }))
            }
        };

        const updatedPhoto = await prisma.photo.update({
            where: { slug },
            data,
            include: {
                categories: true
            }
        });

        res.json(updatedPhoto);
    } catch (err) {
        console.error('Error updating photo:', err);
        errorHandler(err, req, res);
    }
};


const destroy = async(req, res) => {
    const {slug } = req.params;
    try{
        await prisma.photo.delete({
            where: {slug}
        })
        res.json(`photo ${slug} eliminato con sucesso`)
    }catch(err){
        errorHandler(err, req, res)
    }
}

module.exports= {
    create,
    index,
    showBySlug,
    update,
    destroy
}