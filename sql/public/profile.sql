-- public.profile definition
-- Drop table
-- DROP TABLE public.profile;
CREATE TABLE public.profile (
  id uuid NOT NULL,
  user_name text NULL,
  CONSTRAINT profile_pkey PRIMARY KEY (id)
);
-- public.profile foreign keys
ALTER TABLE public.profile
  ADD CONSTRAINT profile_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);

ALTER TABLE public.profile
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY
  "Can only VIEW own profile data."
  ON public.profile
  FOR SELECT
  USING ( auth.uid() = id );

CREATE POLICY
  "Can only UPDATE own profile data."
  ON public.profile
  FOR UPDATE
  USING ( auth.uid() = id );

CREATE FUNCTION
  public.create_profile_for_new_user()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO public.profile (id, display_name)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data ->> 'user_name'
    );
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER
  create_profile_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.create_profile_for_new_user();

