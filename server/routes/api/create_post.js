export default function create_post(req, res, pg){
  try {
    let data = req.body;
    console.log("data", req.body);
    pg.query('INSERT INTO public.posts (media_title, media_type, media_rating, post_title, post_author, post_content, user_id, api_data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', 
      [data.media_title, data.media_type, data.media_rating, data.post_title, data.post_author, data.post_content, data.user_id, data.api_data], (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Internal server error');
        } else {
          res.status(201).send('Post created');
        }
    });
  } catch (err) {
    console.error('Invalid JSON:', err);
    res.status(400).send('Invalid JSON');
  }
}