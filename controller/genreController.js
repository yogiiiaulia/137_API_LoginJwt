const db = require('../models');

async function getAllGenre(req, res) {
    try {
        const genre = await db.Genre.findAll();
        res.status(200).json(genre);
    } catch (err) {
        console.error('Error fetching genre:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getGenreById(req, res) {
    const { id } = req.params;
    try {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        res.status(200).json(genre);
    } catch (err) {
        console.error(`Error fetching genre with id ${id}:`, err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createGenre(req, res) {
    const { namaGenre } = req.body;
    try {
        const newGenre = await db.Genre.create({ namaGenre });
        res.status(201).json(newGenre);
    } catch (err) {
        console.error('Error creating genre:', err.message);
        res.status(500).json({ error: 'Failed to create genre' });
    }
}

async function updateGenre(req, res) {
    const { id } = req.params;
    const { namaGenre } = req.body;
    try {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        genre.namaGenre = namaGenre;
        await genre.save();
        res.status(200).json(genre);
    } catch (err) {
        console.error(`Error updating genre with id ${id}:`, err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteGenre(req, res) {
    const { id } = req.params;
    try {
        const genre = await db.Genre.findByPk(id);
        if (!genre) {
            return res.status(404).json({ error: 'Genre not found' });
        }
        await genre.destroy();
        res.status(200).json({ message: 'Genre deleted successfully' });
    } catch (err) {
        console.error(`Error deleting genre with id ${id}:`, err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllGenre,
    getGenreById,
    createGenre,
    updateGenre,
    deleteGenre
};
