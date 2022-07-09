-- public.users_profile definition

-- Drop table

-- DROP TABLE public.users_profile;

CREATE TABLE public.users_profile (
	id uuid NOT NULL,
	"name" varchar NULL,
	last_name varchar NULL,
	document_number varchar NULL,
	CONSTRAINT profile_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.users_profile OWNER TO supabase_admin;
GRANT ALL ON TABLE public.users_profile TO postgres;
GRANT ALL ON TABLE public.users_profile TO supabase_admin;
GRANT ALL ON TABLE public.users_profile TO anon;
GRANT ALL ON TABLE public.users_profile TO authenticated;
GRANT ALL ON TABLE public.users_profile TO service_role;


-- public.users_profile foreign keys

ALTER TABLE public.users_profile ADD CONSTRAINT users_profile_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);
