const express = require("express");
const { Movie } = require('../models/movies')
const authenticateToken = require("../middleware/authenthication")

const router = express.Router();

router.get('/ping', (req, res) => {
    res.send("welcome to wookieMovies")
})

router.get('/movies', authenticateToken, async (req, res) => {
    try {
        const aggregatedData = await Movie.aggregate([
            { $unwind: "$genres" },
            {
                $group: {
                    _id: "$genres",
                    movies: {
                        $push: {
                            director: "$director",
                            imdb_rating: "$imdb_rating",
                            length: "$length",
                            poster: "$poster",
                            title: "$title",
                            slug: "$slug"
                        }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    categories: {
                        $push: {
                            category: "$_id",
                            movies: "$movies"
                        }
                    }
                }
            },
            { $project: { _id: 0, categories: 1 } }
        ]);

        if (aggregatedData.length === 0) {
            return res.status(404).json({ message: "No movies found" });
        }

        res.json(aggregatedData[0].categories);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});




module.exports = router;