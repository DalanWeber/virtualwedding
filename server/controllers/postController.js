module.exports = {
  createPost: async (req, res) => {
    const db = await req.app.get("db");
    const { guest_id } = req.session.guest;
    const { title, image, content } = req.body;

    if (!guest_id) {
      return res.status(401).send("Please login to create a post");
    }

    db.posts
      .create_post([title, image, content, guest_id])
      .then(res.sendStatus(200));
  },
  readPosts: async (req, res) => {
    const db = await req.app.get("db");
    // const {guest_id} = req.session.guest
    // if(!guest_id){
    //     return res.status(401).send('Please login to create a post')
    // }
    db.posts.read_posts().then((posts) => res.status(200).send(posts));
  },
  editPost: async (req, res) => {
    const db = await req.app.get("db");
    // const {guest_id} = req.session.guest
    const { title, image, content, cheers, post_id } = req.body;
    // if(!guest_id){
    //     return res.status(401).send('Please login to create a post')
    // }
    if (cheers) {
      db.posts.add_cheers(+post_id);
      return res.sendStatus(200);
    } else {
      db.posts.edit_post(title,image,content,+post_id)
      return res.sendStatus(200)
    }
  },
  deletePost: async (req, res) => {
    const db = await req.app.get("db");
    db.posts.delete_posts(+req.params.id);
    return res.sendStatus(200);
  },
};
