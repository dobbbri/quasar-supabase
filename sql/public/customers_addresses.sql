-- public.customers_addresses definition

-- Drop table

-- DROP TABLE public.customers_addresses;

CREATE TABLE public.customers_addresses (
	created_at timestamptz NULL DEFAULT now(),
	zip_code varchar NULL,
	street varchar NULL,
	"number" varchar NULL,
	complement varchar NULL,
	district varchar NULL,
	city varchar NULL,
	state varchar NULL,
	customer_id int8 NOT NULL,
	user_id uuid NULL,
	CONSTRAINT customer_addresses_pkey PRIMARY KEY (customer_id)
);

-- Permissions

ALTER TABLE public.customers_addresses OWNER TO supabase_admin;
GRANT ALL ON TABLE public.customers_addresses TO postgres;
GRANT ALL ON TABLE public.customers_addresses TO supabase_admin;
GRANT ALL ON TABLE public.customers_addresses TO anon;
GRANT ALL ON TABLE public.customers_addresses TO authenticated;
GRANT ALL ON TABLE public.customers_addresses TO service_role;


-- public.customers_addresses foreign keys

ALTER TABLE public.customers_addresses ADD CONSTRAINT customers_addresses_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);
ALTER TABLE public.customers_addresses ADD CONSTRAINT customers_addresses_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
