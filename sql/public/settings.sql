-- public.settings definition
-- Drop table
-- DROP TABLE public.settings;
CREATE TABLE public.settings (
  id uuid NOT NULL,
  measure_units json NULL,
  document_types json NULL,
  payment_methods json NULL,
  CONSTRAINT settings_pkey PRIMARY KEY (id)
);
-- public.settings foreign keys
ALTER TABLE public.settings
  ADD CONSTRAINT settings_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id);

ALTER TABLE public.settings
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY
  "Can only VIEW own settings data."
  ON public.settings
  FOR SELECT
  USING ( auth.uid() = id );

CREATE POLICY
  "Can only UPDATE own settings data."
  ON public.settings
  FOR UPDATE
  USING ( auth.uid() = id );

CREATE FUNCTION
  public.create_settings_for_new_user()
  RETURNS TRIGGER AS
  $$
  BEGIN
    INSERT INTO public.settings (id)
    VALUES (
      NEW.id,
    );
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER
  create_settings_on_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE
    public.create_settings_for_new_user();

