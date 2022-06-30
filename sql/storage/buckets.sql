-- "storage".buckets definition

-- Drop table

-- DROP TABLE "storage".buckets;

CREATE TABLE "storage".buckets (
	id text NOT NULL,
	"name" text NOT NULL,
	"owner" uuid NULL,
	created_at timestamptz NULL DEFAULT now(),
	updated_at timestamptz NULL DEFAULT now(),
	public bool NULL DEFAULT false,
	CONSTRAINT buckets_pkey PRIMARY KEY (id)
);
CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);

-- Permissions

ALTER TABLE "storage".buckets OWNER TO supabase_storage_admin;
GRANT ALL ON TABLE "storage".buckets TO supabase_storage_admin;
GRANT ALL ON TABLE "storage".buckets TO anon;
GRANT ALL ON TABLE "storage".buckets TO authenticated;
GRANT ALL ON TABLE "storage".buckets TO service_role;
GRANT ALL ON TABLE "storage".buckets TO postgres;


-- "storage".buckets foreign keys

ALTER TABLE "storage".buckets ADD CONSTRAINT buckets_owner_fkey FOREIGN KEY ("owner") REFERENCES auth.users(id);
