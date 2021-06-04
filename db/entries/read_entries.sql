select gb.entry_id, gb.content, gb.img, g.guest_id, g.username from wedding_guestbook gb
join wedding_guests g on g.guest_id = gb.author_id
order by gb.entry_id asc
