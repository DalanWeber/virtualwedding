module.exports = {
  readGuests: async (req, res) => {
    const db = await req.app.get("db");

    db.guests.find_guests().then((guests) => res.status(200).send(guests));
  },
  editGuests: async (req, res) => {
    const db = await req.app.get("db");
    const { email, is_admin, guest_id } = req.body;

    if (is_admin !== undefined) {
      await db.guest.update_guest(is_admin, +guest_id);
      return res.sendStatus(200);
    } else if (email) {
      let [guest] = await db.guest.update_guest_email(email, +guest_id);
      delete guest.password;
      req.session.guest = guest;
      return res.status(200).send(guest);
    }
  }
}
