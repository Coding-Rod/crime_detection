CREATE TABLE IF NOT EXISTS thesis.public.contacts (
    idcontact SERIAL NOT NULL,
    caller integer NOT NULL,
    called integer NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY (idcontact)
);
CREATE TABLE IF NOT EXISTS thesis.public.users (
    iduser SERIAL NOT NULL,
    name character varying(45) NOT NULL,
    email character varying(255) NOT NULL,
    password text NOT NULL,
    username character varying(45) NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    phone character varying(45),
    PRIMARY KEY (iduser)
);
CREATE TABLE IF NOT EXISTS thesis.public.nodes (
    idnode SERIAL NOT NULL,
    name character varying(45) NOT NULL,
    location character varying(45) NOT NULL,
    status boolean NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    user_id integer NOT NULL,
    PRIMARY KEY (idnode)
);

CREATE TABLE IF NOT EXISTS thesis.public.notifications (
    idnotification SERIAL NOT NULL,
    type INTEGER NOT NULL,
    message text NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    PRIMARY KEY (idnotification)
);