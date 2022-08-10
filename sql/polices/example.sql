alter table cards enable row level security;

create policy "cards are viewable by everyone. "
  on cards for select
  using (true);

create policy "Individuals can create cards."
  on cards for insert
  with check (auth.uid() = user_id);

create policy "Individuals can update their own cards."
  on cards for update
  using (auth.uid() = user_id);

create policy "Individuals can delete their own cards."
  on cards for delete
  using (auth.uid() = user_id);

