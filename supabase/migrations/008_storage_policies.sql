-- Storage bucket RLS policies
create policy "Public read resources bucket" on storage.objects for select using (bucket_id = 'resources');
create policy "Auth upload resources bucket" on storage.objects for insert with check (bucket_id = 'resources');

create policy "Public read shelters bucket" on storage.objects for select using (bucket_id = 'shelters');
create policy "Auth upload shelters bucket" on storage.objects for insert with check (bucket_id = 'shelters');
