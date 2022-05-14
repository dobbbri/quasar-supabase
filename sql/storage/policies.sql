-- objects
CREATE POLICY "Enable ACCESS to all users"
  ON storage.objects FOR SELECT USING (true);

CREATE POLICY "Enable INSERT for authenticated users only"
  ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable UPDATE for authenticated users only"
  ON storage.objects FOR UPDATE WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable UPDATE for authenticated users only"
  ON "storage"."objects"
  AS PERMISSIVE FOR UPDATE TO authenticated USING (true) WITH CHECK (true)

CREATE POLICY "Enable DELETE for authenticated users only"
  ON storage.objects FOR DELETE WITH CHECK (auth.role() = 'authenticated');

-- buckets
CREATE POLICY "Enable INSERT for authenticated users only"
  ON storage.buckets FOR INSERT WITH CHECK (auth.role() = 'authenticated');
