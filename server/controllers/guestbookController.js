module.exports ={
    createEntry: async (req,res) => {
        const db = await req.app.get('db')
        const {guest_id} = req.session.guest
        const {message} = req.body

        if(!guest_id){
            return res.status(401).send('Please login to create a post')
        }

        db.entries.createEntry([message,guest_id])
        .then(res.sendStatus(200))
    },
    readEntries: async (req,res) => {
        const db = await req.app.get('db')

        db.entries.read_entries()
        .then(entries => res.status(200).send(entries))
    },
    editEntry: async () => {},
    deleteEntry: async (req,res) => {
        const db = await req.app.get('db')
        db.entries.delete_entry(+req.params.id);
        return res.sendStatus(200)
    }
}