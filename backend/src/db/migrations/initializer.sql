CREATE TABLE IF NOT EXISTS thesis.public.contact (
    idcontact integer NOT NULL,
    caller integer NOT NULL,
    called integer NOT NULL,
    PRIMARY KEY (idcontacto)
);
CREATE TABLE IF NOT EXISTS thesis.public."user" (
    iduser integer NOT NULL,
    name character varying(45) NOT NULL,
    email character varying(45) NOT NULL,
    password character varying(45) NOT NULL,
    username character varying(45) NOT NULL,
    PRIMARY KEY (iduser)
);
CREATE TABLE IF NOT EXISTS thesis.public.node (
    idnode integer NOT NULL,
    name character varying(45) NOT NULL,
    location character varying(45) NOT NULL,
    status boolean NOT NULL,
    recording boolean NOT NULL,
    created_at date NOT NULL,
    updated_at date NOT NULL,
    id_user integer NOT NULL,
    PRIMARY KEY (idnode)
);