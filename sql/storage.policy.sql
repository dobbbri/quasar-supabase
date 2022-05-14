CREATE POLICY "Enable access to all users"
  ON storage.objects FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users only"
  ON storage.buckets FOR INSERT WITH CHECK (auth.role() = 'authenticated');
