-- public.orders_services definition

-- Drop table

-- DROP TABLE public.orders_services;

CREATE TABLE public.orders_services (
	id int8 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	created_at timestamptz NULL DEFAULT now(),
	user_id uuid NULL,
	order_id int8 NULL,
	service_id int8 NULL,
	service_name extensions."citext" NULL,
	unit_price numeric NULL,
	amount numeric NULL,
	CONSTRAINT orders_services_pkey PRIMARY KEY (id)
);

-- Permissions

ALTER TABLE public.orders_services OWNER TO supabase_admin;
GRANT ALL ON TABLE public.orders_services TO postgres;
GRANT ALL ON TABLE public.orders_services TO supabase_admin;
GRANT ALL ON TABLE public.orders_services TO anon;
GRANT ALL ON TABLE public.orders_services TO authenticated;
GRANT ALL ON TABLE public.orders_services TO service_role;


-- public.orders_services foreign keys

ALTER TABLE public.orders_services ADD CONSTRAINT orders_services_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);
ALTER TABLE public.orders_services ADD CONSTRAINT orders_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id);
ALTER TABLE public.orders_services ADD CONSTRAINT orders_services_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);
