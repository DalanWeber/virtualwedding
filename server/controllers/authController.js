const bcrypt = require ('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body
     
        const [existingGuest] = await db.guest.find_guest (username)
        if(existingGuest){
            return res.status(409).send('You have already registered!')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const [Guest] = createGuest = await db.guest.create_guest(username,hash)
        delete Guest.password
        req.session.guest = Guest
        return res.status(200).send(req.session.guest)
    },
    login: async (req, res) => {
        const db = req.app.get('db')
        const{username, password} = req.body

        const [Guest] = await db.guest.find_guest(username)
        if(!Guest){
            return res.status(401).send('User not found')
        }

        const isAuthenticated = bcrypt.compareSync(password, Guest.password)
        if(isAuthenticated){
            delete Guest.password
            req.session.guest = Guest
            return res.status(200).send(req.session.guest)
        }
        return res.status(403).send("thats an oops")
    },
    logout: async (req,res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getGuest: async (req,res) => {
        if(req.session.guest){
            return res.status(200).send(req.session.guest)
        }
        return res.status(404).send('Pls login?')
    },
}