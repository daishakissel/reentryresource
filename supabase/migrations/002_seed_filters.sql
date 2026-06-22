-- Age Groups
insert into age_groups (name) values
  ('Children (0-12)'),
  ('Teens (13-17)'),
  ('Young Adults (18-24)'),
  ('Adults (25-54)'),
  ('Older Adults (55+)'),
  ('All Ages');

-- Genders
insert into genders (name) values
  ('Male'),
  ('Female'),
  ('Non-Binary'),
  ('Transgender'),
  ('All Genders');

-- Centerings
insert into centerings (name) values
  ('BIPOC'),
  ('LGBTQ+'),
  ('Veterans'),
  ('Women'),
  ('Families'),
  ('Youth'),
  ('Seniors'),
  ('Formerly Incarcerated'),
  ('General');

-- Languages
insert into languages (name) values
  ('English'),
  ('Spanish'),
  ('Mandarin'),
  ('Vietnamese'),
  ('Russian'),
  ('Arabic'),
  ('Somali'),
  ('ASL'),
  ('Other');

-- Formats
insert into formats (name) values
  ('In-Person'),
  ('Online'),
  ('Phone'),
  ('Hybrid'),
  ('Drop-In'),
  ('By Appointment');

-- Times
insert into times (name) values
  ('Morning'),
  ('Afternoon'),
  ('Evening'),
  ('Overnight'),
  ('24/7');

-- Days of Week
insert into days_of_week (name) values
  ('Monday'),
  ('Tuesday'),
  ('Wednesday'),
  ('Thursday'),
  ('Friday'),
  ('Saturday'),
  ('Sunday');

-- Accessibility Features
insert into accessibility_features (name) values
  ('Wheelchair Accessible'),
  ('Service Animals Welcome'),
  ('Hearing Assistance'),
  ('Visual Assistance'),
  ('Childcare Available'),
  ('Transportation Provided'),
  ('Language Interpretation');

-- Costs
insert into costs (name) values
  ('Free'),
  ('Sliding Scale'),
  ('Low Cost'),
  ('Insurance Accepted'),
  ('Medicaid/Medicare'),
  ('Paid');

-- Capacities
insert into capacities (name) values
  ('Open'),
  ('Limited'),
  ('Waitlist'),
  ('Full'),
  ('Call for Availability');

-- Topics (linked to categories)
insert into topics (name, category_id) values
  ('Primary Care', (select id from categories where slug = 'health')),
  ('Mental Health', (select id from categories where slug = 'health')),
  ('Substance Abuse', (select id from categories where slug = 'health')),
  ('Dental', (select id from categories where slug = 'health')),
  ('Vision', (select id from categories where slug = 'health')),
  ('Emergency Shelter', (select id from categories where slug = 'housing')),
  ('Transitional Housing', (select id from categories where slug = 'housing')),
  ('Permanent Housing', (select id from categories where slug = 'housing')),
  ('Rent Assistance', (select id from categories where slug = 'housing')),
  ('Job Training', (select id from categories where slug = 'work')),
  ('Job Placement', (select id from categories where slug = 'work')),
  ('Resume Help', (select id from categories where slug = 'work')),
  ('Interview Prep', (select id from categories where slug = 'work')),
  ('ID/Birth Certificate', (select id from categories where slug = 'administration')),
  ('Legal Aid', (select id from categories where slug = 'administration')),
  ('Benefits Enrollment', (select id from categories where slug = 'administration')),
  ('Tax Assistance', (select id from categories where slug = 'administration')),
  ('Clothing', (select id from categories where slug = 'tools')),
  ('Food/Meals', (select id from categories where slug = 'tools')),
  ('Hygiene/Showers', (select id from categories where slug = 'tools')),
  ('Technology Access', (select id from categories where slug = 'tools')),
  ('Peer Support', (select id from categories where slug = 'network')),
  ('Support Groups', (select id from categories where slug = 'network')),
  ('Community Events', (select id from categories where slug = 'network')),
  ('Mentorship', (select id from categories where slug = 'network'));
