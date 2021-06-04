update wedding_guests
set email = $1
where guest_id = $2
returning *;