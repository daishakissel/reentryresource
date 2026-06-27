-- Add address, organization, and phone fields to shelters
alter table shelters add column if not exists organization_name text;
alter table shelters add column if not exists street_address text;
alter table shelters add column if not exists city text;
alter table shelters add column if not exists state text;
alter table shelters add column if not exists zip text;
alter table shelters add column if not exists phone text;
alter table shelters add column if not exists latitude double precision;
alter table shelters add column if not exists longitude double precision;
