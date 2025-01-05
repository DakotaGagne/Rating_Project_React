export default function posts(req, res, pg) {
    pg.query('SELECT * FROM public.posts ORDER BY id DESC', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
        } else {
            res.json({ posts: result.rows });
        }
    });
}