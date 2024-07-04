const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const uniqueSlug = require("../middlewares/uniqueSlug.js");
const errorHandler = require("../middlewares/errorHandler.js");


const create = async (req, res) => {
    const { title, slug, description, categories, userId } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !description || !categories || !image) {
        return res.status(400).json({ error: 'Tutti i campi sono obbligatori' });
    }

    const generatedSlug = slug || await uniqueSlug(title);

    // Parsing delle categorie
    let categoryIds;
    try {
        categoryIds = JSON.parse(categories).map(id => {
            const parsedId = parseInt(id, 10);
            if (isNaN(parsedId)) {
                throw new Error('Invalid category ID');
            }
            return parsedId;
        });

        // Verifica che tutte le categorie esistano nel database
        const existingCategories = await prisma.category.findMany({
            where: { id: { in: categoryIds } }
        });

        if (existingCategories.length !== categoryIds.length) {
            return res.status(400).json({ error: 'Una o più categorie specificate non esistono' });
        }
    } catch (error) {
        return res.status(400).json({ error: 'Formato delle categorie non valido' });
    }

    const data = {
        title,
        slug: generatedSlug,
        image,
        description,
        visible: req.body.visible ? true : false,
        categories: {
            connect: categoryIds.map(id => ({ id }))
        },
        userId: parseInt(userId, 10)
    };

    try {
        const photo = await prisma.photo.create({
            data,
            include: {
                categories: true,
                user: true
            }
        });
        res.status(200).json(photo);
    } catch (err) {
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
        const { title, description, categories, image, userId } = req.body;

        const data = {
            title,
            image,
            description,
            visible: req.body.visible ? true : false,
            categories: {
                set: categories.map(categoryId => ({ id: categoryId }))
            },
            userId,
        };

        const updatedPhoto = await prisma.photo.update({
            where: { slug },
            data,
            include: {
                categories: true,
                user:true
            }
        });

        res.json(updatedPhoto);
    } catch (err) {
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