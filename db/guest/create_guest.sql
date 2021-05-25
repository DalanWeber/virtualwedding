insert into wedding_guests
(username, password)
values($1,$2);
select guest_id, username
from wedding_guests
where username = $1