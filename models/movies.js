const mongoose = require("mongoose")


const movieSchema = new mongoose.Schema({
    backdrop: String,
    cast: [String],
    classification: String,
    director: [String],
    genres: [String],
    id: String,
    imdb_rating: Number,
    length: String,
    overview: String,
    poster: String,
    released_on: Date,
    slug: String,
    title: String
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = { Movie }