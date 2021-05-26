drop table if exists wedding_posts;
drop table if exists wedding_guests;


create table wedding_guests
(
    guest_id serial primary key,
    username varchar(200) not null,
    password VARCHAR(300) not null,
    email VARCHAR(300),
    is_admin boolean default false
)

create table wedding_posts
(
    post_id serial primary key,
    title varchar(50) not null,
    img varchar(250),
    content varchar(500),
    cheers int default 0,
    author_id int references wedding_guests(guest_id) 
)