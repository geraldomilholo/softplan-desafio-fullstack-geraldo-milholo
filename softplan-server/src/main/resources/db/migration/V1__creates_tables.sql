CREATE TABLE public."role" (
	id varchar(36) NOT NULL,
	code varchar(255) NULL,
	"name" varchar(255) NULL,
	CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE public.user (
	id varchar(36) NOT NULL,
	name varchar(255) NULL,
	email varchar(255) NULL,
	password varchar(255) NULL,
	role_id varchar(36) NULL,
	CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE public.process (
	id varchar(36) NOT NULL,
	name varchar(255) NULL,
	peding bool NULL,
	seem text NULL,
	CONSTRAINT process_pkey PRIMARY KEY (id)
);

CREATE TABLE public.user_process (
	id varchar(36) NOT NULL,
	process_id varchar(36) NULL,
	user_id varchar(36) NULL,
	CONSTRAINT user_process_pkey PRIMARY KEY (id)
);


ALTER TABLE public.user ADD CONSTRAINT fk_user_role_id FOREIGN KEY (role_id) REFERENCES role(id);
ALTER TABLE public.user_process ADD CONSTRAINT fk_user_process_process_id FOREIGN KEY (process_id) REFERENCES process(id);
ALTER TABLE public.user_process ADD CONSTRAINT fk_user_process_user_id FOREIGN KEY (user_id) REFERENCES "user"(id);
