alter table profiles enable row level security;

create policy "User profile can be read by everyone."
  on profiles for select
  using ( true );

create policy "Users can create their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );
