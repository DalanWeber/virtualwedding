drop table if exists wedding_guests;
create table wedding_guests
(
    guest_id serial primary key,
    username varchar(200) not null,
    password VARCHAR(300) not null,
    email VARCHAR(300),
    is_admin boolean
)

drop