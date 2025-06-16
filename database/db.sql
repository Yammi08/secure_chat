create database chat;
use chat;
create table usuario(idUser int primary key auto_increment,
username varchar(20) not null,
upassword varchar(120),
onlineUser boolean);
create table message(idMessage int primary key auto_increment,
  idUserfrom int not null,
  idUserto int not null,
  mensaje TEXT not null,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  constraint fk_idUserfrom foreign key (idUserfrom) references usuario(idUser),
  constraint fk_idUserto foreign key (idUserto) references usuario(idUser)
)