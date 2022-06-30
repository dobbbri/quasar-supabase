-- public.users_settings definition

-- Drop table

-- DROP TABLE public.users_settings;

CREATE TABLE public.users_settings (
	id uuid NOT NULL,
	measure_units json NULL,
	payment_methods json NULL,
	CONSTRAINT settings_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.users_settings OWNER TO supabase_admin;
GRANT ALL ON TABLE public.users_settings TO postgres;
GRANT ALL ON TABLE public.users_settings TO supabase_admin;
GRANT ALL ON TABLE public.users_settings TO anon;
GRANT ALL ON TABLE public.users_settings TO authenticated;
GRANT ALL ON TABLE public.users_settings TO service_role;


-- public.users_settings foreign keys

ALTER TABLE public.users_settings ADD CONSTRAINT users_settings_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);
