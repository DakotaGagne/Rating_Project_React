import TMDB_API_SEARCH from "../../utils/TMDB_API_SEARCH.js";

export default function search(req, res) {
    let media_name = req.query.media_name;
    let media_type = req.query.media_type||"";
    let english_only = req.query.english_only || true;

    TMDB_API_SEARCH(media_name, media_type, process.env.TMDB_API_KEY, english_only)
        .then(data => {
        res.status(data.status).send(data.err||data.result);
        })
        .catch(error => {
        console.error(error);
        res.status(500).send('Internal server error');
    });
}