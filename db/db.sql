create table task (
    id integer primary key auto_increment,
    title varchar(200) not null,
    description varchar(300)  null,
    done boolean not null default false,
    createdAt timestamp not null default current_timestamp
);

insert into task (title, description) values
('Task1','Web application'),
('Task2','Mobile application'),
('Task3','Machine learning application'),
('Task4','Data analysis application');