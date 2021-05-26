module.exports ={
    createPost: async (req,res) => {
        const db = await req.app.get('db')
        const {guest_id} = req.session.guest
        const {title,image,content} = req.body

        if(!guest_id){
            return res.status(401).send('Please login to create a post')
        }

        db.posts.create_post([title,image,content,guest_id])
        .then(res.sendStatus(200))
    },
    readPosts: async () => {},
    editPost: async () => {},
    deletePost: async () => {}
}