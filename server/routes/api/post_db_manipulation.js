function create_post(req, res, pg){
  try {
    let data = req.body;
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


async function update_post(req, res, pg){
  let data = req.body;
  try {
    if(data.newPostData.user_id == process.env.MASTER_USER_ID){
      console.log("MASTER USER");
      let postAuthor = await pg.query('SELECT user_id, post_author FROM public.posts WHERE id = $1', [data.prevPostId]);
      postAuthor = postAuthor.rows[0].post_author;
      console.log("post author",postAuthor);
      pg.query('UPDATE public.posts SET media_title = $1, media_type = $2, media_rating = $3, post_title = $4, post_author = $5, post_content = $6, api_data = $7 WHERE id = $8', 
        [data.newPostData.media_title, data.newPostData.media_type, data.newPostData.media_rating, data.newPostData.post_title, postAuthor, data.newPostData.post_content, data.newPostData.api_data, data.prevPostId], (err) => {
          if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
          } else {
            res.status(200).send('Post updated');
          }
      });
    } else {
      pg.query('UPDATE public.posts SET media_title = $1, media_type = $2, media_rating = $3, post_title = $4, post_author = $5, post_content = $6, api_data = $7 WHERE id = $8 AND user_id = $9', 
        [data.newPostData.media_title, data.newPostData.media_type, data.newPostData.media_rating, data.newPostData.post_title, data.newPostData.post_author, data.newPostData.post_content, data.newPostData.api_data, data.prevPostId, data.newPostData.user_id], (err) => {
          if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
          } else {
            res.status(200).send('Post updated');
          }
      });
    }
  } catch (err) {
    console.error('Invalid JSON:', err);
    res.status(400).send('Invalid JSON');
  }
}


function delete_post(req, res, pg){
  try {
    let data = req.body;
    if(data.userId == process.env.MASTER_USER_ID){
      console.log("MASTER USER");
      pg.query('DELETE FROM public.posts WHERE id = $1', [data.postId], (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message:'Internal server error'
          });
        } else {
          res.status(200).json({
            success: true,
            message:'Post deleted'
          });
        }
      });
    } else {
      pg.query('DELETE FROM public.posts WHERE id = $1 AND user_id = $2', [data.postId, data.userId], (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message:'Internal server error'
          });
        } else {
          res.status(200).json({
            success: true,
            message:'Post deleted'
          });
        }
      });
    }
  } catch (err) {
    console.error('Invalid JSON:', err);
    res.status(400).json({
      success: false,
      message:'Invalid JSON'
    });
  }
}


export { create_post, update_post, delete_post };