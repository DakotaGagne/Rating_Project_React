import dotenv from 'dotenv';

dotenv.config();

export default async function posts(req, res, pg, filterByUser=false, filterByPostId=false) {
    
    if(filterByPostId&&filterByUser){
        const postId = req.headers.postid;
        const userId = req.headers.userid;
        if(userId==process.env.MASTER_USER_ID){
            console.log('MASTER USER');
            pg.query('SELECT * FROM public.posts WHERE id = $1', [postId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({success: false, message: 'Internal server error'});
                } else { 
                    if(result.rows.length>0)res.status(200).json({ post: result.rows[0] });
                    else res.status(404).json({success: false, message: 'Post not found'});
                }
            });
        } else {
            pg.query('SELECT * FROM public.posts WHERE id = $1 AND user_id = $2', [postId, userId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({success: false, message: 'Internal server error'});
                } else { 
                    if(result.rows.length>0)res.status(200).json({ post: result.rows[0] });
                    else res.status(404).json({success: false, message: 'Post not found'});
                }
            });
        }
    } else if(filterByUser){
        const userId = req.headers.userid;
        if(userId==process.env.MASTER_USER_ID){
            console.log('MASTER USER');
            pg.query('SELECT * FROM public.posts ORDER BY id DESC', (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({success: false, message: 'Internal server error'});
                } else {
                    res.status(200).json({ posts: result.rows });
                }
            });
        } else {
            pg.query('SELECT * FROM public.posts WHERE user_id = $1 ORDER BY id DESC', [userId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({success: false, message: 'Internal server error'});
                } else {
                    res.status(200).json({ posts: result.rows });
                }
            });
        }
    } else {
        pg.query('SELECT * FROM public.posts ORDER BY id DESC', (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).json({success: false, message:'Internal server error'});
            } else {
                res.status(200).json({ success: true, message:'Success', posts: result.rows });
            }
        });
    };
};