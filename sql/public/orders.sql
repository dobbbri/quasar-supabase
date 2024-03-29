-- public.orders definition

-- Drop table

-- DROP TABLE public.orders;

CREATE TABLE public.orders (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	created_at timestamptz NULL DEFAULT now(),
	user_id uuid NULL,
	customer_id int8 NULL,
	customer_name extensions."citext" NULL,
	delivery_date date NULL,
	"comments" text NULL,
	reference text NULL,
	deadline date NULL,
	budget_deadline date NULL,
	CONSTRAINT orders_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.orders OWNER TO supabase_admin;
GRANT ALL ON TABLE public.orders TO postgres;
GRANT ALL ON TABLE public.orders TO supabase_admin;
GRANT ALL ON TABLE public.orders TO anon;
GRANT ALL ON TABLE public.orders TO authenticated;
GRANT ALL ON TABLE public.orders TO service_role;


-- public.orders foreign keys

ALTER TABLE public.orders ADD CONSTRAINT orders_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);
ALTER TABLE public.orders ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
