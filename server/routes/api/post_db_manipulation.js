/*

File that contains the functions that interact with and manipulate the post database

Functions:
  - create_post: creates a new post in the database
  - update_post: updates an existing post in the database
  - delete_post: deletes an existing post in the database

*/

async function fetch_post_data(req, res, pg, filterByUser=false, filterByPostId=false){
    // Fetches post data from the database
    // If filterByUser is true, only fetch posts by a specific user
    // If filterByPostId is true, filterByUser must also be true, and only fetch posts by a specific user with a specific post id
    // If user id is the master user id allow all posts to be fetched regardless of user id
    if(filterByPostId&&filterByUser){
      const postId = req.headers.postid;
      const userId = req.headers.userid;
      if(userId==process.env.MASTER_USER_ID){
            // MASTER USER
            // Fetch post by post id, regardless of user id
            console.log('MASTER USER');
            pg.query('SELECT * FROM public.posts WHERE id = $1', [postId], (err, result) => {
                if (err) {
                  // Internal server error
                    console.log(err);
                    res.status(500).json({success: false, message: 'Internal server error'});
                } else { 
                  // Post found
                    if(result.rows.length>0)res.status(200).json({ post: result.rows[0] });
                    else res.status(404).json({success: false, message: 'Post not found'});
                }
            });
        } else {
            // Fetch post by post id and user id
            pg.query('SELECT * FROM public.posts WHERE id = $1 AND user_id = $2', [postId, userId], (err, result) => {
                if (err) {
                    // Internal server error
                    console.log(err);
                    res.status(500).json({success: false, message: 'Internal server error'});
                } else {
                    // Post found
                    if(result.rows.length>0)res.status(200).json({ post: result.rows[0] });
                    else res.status(404).json({success: false, message: 'Post not found'});
                }
            });
        }
    } else if(filterByUser){
        // Fetch posts by user id
        const userId = req.headers.userid;
        if(userId==process.env.MASTER_USER_ID){
            console.log('MASTER USER');
            // Fetch all posts regardless of user id
            pg.query('SELECT * FROM public.posts ORDER BY time_created DESC', (err, result) => {
                if (err) {
                    // Internal server error
                    console.log(err);
                    res.status(500).json({success: false, message: 'Internal server error'});
                } else {
                    // Posts found
                    res.status(200).json({ posts: result.rows });
                }
            });
        } else {
            // Fetch posts by user id
            pg.query('SELECT * FROM public.posts WHERE user_id = $1 ORDER BY time_created DESC', [userId], (err, result) => {
                if (err) {
                    // Internal server error
                    console.log(err);
                    res.status(500).json({success: false, message: 'Internal server error'});
                } else {
                    // Posts found
                    res.status(200).json({ posts: result.rows });
                }
            });
        }
    } else {
        // Fetch all posts
        pg.query('SELECT * FROM public.posts ORDER BY time_created DESC', (err, result) => {
            if (err) {
                // Internal server error
                console.log(err);
                res.status(500).json({success: false, message:'Internal server error'});
            } else {
                // Posts found
                res.status(200).json({ success: true, message:'Success', posts: result.rows });
            }
        });
    };
};


function create_post(req, res, pg){
  // Creates a new post in the database
  try {
    let data = req.body;
    const time_created = Date.now();
    console.log("time created",time_created);
    pg.query('INSERT INTO public.posts (media_title, media_type, media_rating, post_title, post_author, post_content, user_id, api_data, time_created) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
      [data.media_title, data.media_type, data.media_rating, data.post_title, data.post_author, data.post_content, data.user_id, data.api_data, time_created], (err) => {
        if (err) {
          // Internal server error
          console.log(err);
          res.status(500).send('Internal server error');
        } else {
          // Post created
          res.status(201).send('Post created');
        }
    });
  } catch (err) {
    // Invalid JSON
    console.error('Invalid JSON:', err);
    res.status(400).send('Invalid JSON');
  }
}


async function update_post(req, res, pg){
  // Updates an existing post in the database
  let data = req.body;
  try {
    const time_created = Date.now();
    console.log("time created",time_created);
    if(data.newPostData.user_id == process.env.MASTER_USER_ID){
      // MASTER USER
      // Update post by post id, regardless of user id
      console.log("MASTER USER");
      let postAuthor = await pg.query('SELECT user_id, post_author FROM public.posts WHERE id = $1', [data.prevPostId]);
      postAuthor = postAuthor.rows[0].post_author;
      console.log("post author",postAuthor);
      pg.query('UPDATE public.posts SET media_title = $1, media_type = $2, media_rating = $3, post_title = $4, post_author = $5, post_content = $6, api_data = $7, time_created = $8 WHERE id = $9', 
        [data.newPostData.media_title, data.newPostData.media_type, data.newPostData.media_rating, data.newPostData.post_title, postAuthor, data.newPostData.post_content, data.newPostData.api_data, time_created, data.prevPostId], (err) => {
          if (err) {
            // Internal server error
            console.log(err);
            res.status(500).send('Internal server error');
          } else {
            // Post updated
            res.status(200).send('Post updated');
          }
      });
    } else {
      // Update post by post id and user id
      pg.query('UPDATE public.posts SET media_title = $1, media_type = $2, media_rating = $3, post_title = $4, post_author = $5, post_content = $6, api_data = $7, time_created = $8 WHERE id = $9 AND user_id = $10', 
        [data.newPostData.media_title, data.newPostData.media_type, data.newPostData.media_rating, data.newPostData.post_title, data.newPostData.post_author, data.newPostData.post_content, data.newPostData.api_data, time_created, data.prevPostId, data.newPostData.user_id], (err) => {
          if (err) {
            // Internal server error
            console.log(err);
            res.status(500).send('Internal server error');
          } else {
            // Post updated
            res.status(200).send('Post updated');
          }
      });
    }
  } catch (err) {
    // Invalid JSON
    console.error('Invalid JSON:', err);
    res.status(400).send('Invalid JSON');
  }
}


function delete_post(req, res, pg){
  // Deletes an existing post in the database
  try {
    let data = req.body;
    if(data.userId == process.env.MASTER_USER_ID){
      // MASTER USER
      // Delete post by post id, regardless of user id
      console.log("MASTER USER");
      pg.query('DELETE FROM public.posts WHERE id = $1', [data.postId], (err) => {
        if (err) {
          // Internal server error
          console.log(err);
          res.status(500).json({
            success: false,
            message:'Internal server error'
          });
        } else {
          // Post deleted
          res.status(200).json({
            success: true,
            message:'Post deleted'
          });
        }
      });
    } else {
      pg.query('DELETE FROM public.posts WHERE id = $1 AND user_id = $2', [data.postId, data.userId], (err) => {
        if (err) {
          // Internal server error
          console.log(err);
          res.status(500).json({
            success: false,
            message:'Internal server error'
          });
        } else {
          // Post deleted
          res.status(200).json({
            success: true,
            message:'Post deleted'
          });
        }
      });
    }
  } catch (err) {
    // Invalid JSON
    console.error('Invalid JSON:', err);
    res.status(400).json({
      success: false,
      message:'Invalid JSON'
    });
  }
}


export { create_post, update_post, delete_post, fetch_post_data };