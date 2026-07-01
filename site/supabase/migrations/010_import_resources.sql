-- ============================================================
-- RESOURCE IMPORT SUMMARY
-- Total published rows: 115
-- Imported: 115
-- Skipped (no title): 0
-- Warnings: 2
-- ============================================================

-- WARNING: Row 18 'NE 82nd Ave Voluntary Isolation Motel' has unmapped category: ,17,
-- WARNING: Row 30 'Cascade AIDS Project' has unmapped category: ,17,

-- ============================================================
-- IMPORT: 115 published resources from CSV
-- ============================================================

-- Resource 1: Cityteam Portland
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Cityteam Portland', NULL, 'Men only, sobriety required. $5/night or voucher from a partner agency for shelter. Dinner, breakfast, shower included daily.
Shelter sign-up 5:45-6:30 p.m.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-8.55.09 AM.png', '526 Southeast Grand Avenue', 'Portland', 'Oregon', '97214', NULL, 'United States', 45.5189591, -122.6605053, '503-231-9334', NULL, 'https://www.cityteam.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 17:23:51', '2025-02-20 22:58:02')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 2: Bybee Lakes Hope Center
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Bybee Lakes Hope Center', NULL, 'Referrals are welcome 7 days a week between 8am to 5pm, for same-day placement to the shelter when capacity allows.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-10.41.06 AM.png', '14355 N Bybee Lake Ct.', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.62629715, -122.75777750705919, '(971) 333-5070', NULL, 'https://helpinghandsreentry.org/bybee-lakes-hope-center', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 03:31:10', '2025-02-20 22:59:39')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Justice Impacted'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'LGBTQIA2S+'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Seniors'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Veterans'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 3: Banfield Shelter Motel Emergency Shelter
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Banfield Shelter Motel Emergency Shelter', NULL, 'Banfield Shelter Motel is a 60 bed emergency shelter open 24/7 for medically vulnerable men, women, and couples age 18 and older in NE Portland.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Portland-Skyline.jpg', '1525 Northeast 37th Avenue', 'Portland', 'Oregon', '97232', NULL, 'United States', 45.534571, -122.62593555232155, NULL, NULL, 'https://www.tprojects.org/shelters', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 03:33:14', '2025-02-20 22:58:44')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Couples'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 4: Laurelwood Center (TPI)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Laurelwood Center (TPI)', NULL, 'A 120-bed emergency shelter open 24/7 for women and couples in SE Portland.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-9.59.28 AM.png', '6130 Southeast Foster Road', 'Portland', 'Oregon', '97206', NULL, 'United States', 45.491148262031764, -122.60028096395864, '(503) 280-4776', NULL, 'https://www.tprojects.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:12:26', '2025-02-20 22:56:59')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Couples'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 5: River District Navigation Center (TPI)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('River District Navigation Center (TPI)', NULL, 'A 90-bed emergency shelter open 24/7 for men, women, and couples in NW Portland.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-9.59.28 AM-1.png', '1111 Northwest Naito Parkway', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.5307084, -122.67693700000001, '(503) 280-4752', NULL, 'https://www.tprojects.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:15:20', '2025-02-20 18:15:20')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 6: Walnut Park (TPI)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Walnut Park (TPI)', NULL, 'An 72-bed emergency shelter open 24/7 for men, women, and couples in NE Portland.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-9.59.28 AM-2.png', '5411 Northeast Martin Luther King Junior Boulevard', 'Portland', 'Oregon', '97211', NULL, 'United States', 45.562214777777776, -122.66197255555555, '(503) 488-7761', NULL, 'https://www.tprojects.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:15:11', '2025-02-20 18:15:11')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 7: Willamette Center (TPI)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Willamette Center (TPI)', NULL, 'A 120-bed emergency shelter open 24/7 for women and couples in SE Portland.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-9.59.28 AM-3.png', '5120 Southeast Milwaukie Avenue', 'Portland', 'Oregon', '97202', NULL, 'United States', 45.4857289, -122.64932711581284, '(503) 488-7750', NULL, 'https://www.tprojects.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:15:01', '2025-02-20 18:15:01')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 8: The Clark Center (TPI)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('The Clark Center (TPI)', NULL, 'A 90-bed short-term, housing-focused residential program for men offering case management, life-and job-skills training, and support services. Dedicated beds are available to men involved in the Multnomah County community justice system. Abstinence from alcohol and drugs is expected of residents.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-9.59.28 AM-4.png', '1431 Southeast Martin Luther King Junior Boulevard', 'Portland', 'Oregon', '97214', NULL, 'United States', 45.51250193877551, -122.66194161224489, '(503) 280-4770', NULL, 'https://www.tprojects.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:14:36', '2025-02-20 22:54:47')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Justice Impacted'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 9: Doreen's Place (TPI)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Doreen''s Place (TPI)', NULL, 'A 90-bed short-term, housing-focused residential program for men. The program provides case management, life- and job-skills training, and connection to essential support services. Half of this facility''s beds are dedicated to U.S. Military Veterans. Abstinence from alcohol and drugs is expected of residents.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-9.59.28 AM-5.png', '610 Northwest Broadway', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.52748775510204, -122.67747991836735, '(503) 280-4664', NULL, 'https://www.tprojects.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:11:38', '2025-02-20 22:57:35')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Veterans'));
END $$;

-- Resource 10: Jean's Place (TPI)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Jean''s Place (TPI)', NULL, 'A 60-bed short-term, housing-focused residential program for women offering case management, life-and job-skills training. Dedicated beds are available for women involved in the Multnomah County community justice system and U.S. Military Veterans. Abstinence from alcohol and drugs is expected of residents.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-9.59.28 AM-6.png', '18 Northeast 11th Avenue', 'Portland', 'Oregon', '97232', NULL, 'United States', 45.52327835, -122.65432299020082, '(503) 280-4747', NULL, 'https://www.tprojects.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:31:43', '2025-02-20 22:53:08')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Veterans'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Justice Impacted'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 11: Community Action
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Community Action', NULL, 'The shelter is for families with children or mothers in the last trimester of pregnancy.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-10.22.45 AM.png', '210 SE 12th Ave', 'Hillsboro', 'Oregon', '97123', NULL, 'United States', 45.520857199999995, -122.96967646100279, '503-640 3263', NULL, 'https://caowash.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:31:52', '2025-02-20 22:50:18')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 12: Family Promise
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Family Promise', NULL, 'Family shelter for women and/or men with children. Three- family limit; call 211 or Community Connect (503-640-3263) to join the waitlist for shelter. Maximum stay six weeks. Children must be enrolled in and attend public school or Head Start during their stay. Requires drug screening test with clean results and background check for all participants 13 years or older. 24-hour shelter. Join the Community Action wait list.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-10.30.10 AM.png', '4837 NE Couch St, Portland, OR 97213', 'Portland', 'Oregon', '97213', NULL, 'United States', 45.523885261744965, -122.61362592617449, '503-640-3263', NULL, 'https://familypromise.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:31:26', '2025-02-20 22:53:59')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 13: Good Neighbor Center
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Good Neighbor Center', NULL, 'Provides safe emergency housing with supportive empowering services to adults with children younger than 18. Families have up to six weeks to meet their goals with the help of staff. No singles. To join the waitlist call Community Connect 503-640-3263 or Family Promise of Tualatin Valley 503-427-2768.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-10.44.11 AM.png', '11130 Southwest Greenburg Road', 'Tigard', 'Oregon', '97223', NULL, 'United States', 45.439813650000005, -122.77918746773082, '503-443-6084', NULL, 'https://gncnw.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 18:45:32', '2025-02-20 22:49:57')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 14: Arbor Lodge (Do Good Multnomah)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Arbor Lodge (Do Good Multnomah)', NULL, 'This corner of N. Lombard began serving the community as a COVID vaccine clinic in 2020, then evolved in a winter shelter in 2021 and a severe weather shelter in 2022. Today, the wholly-renovated Arbor Lodge Shelter is a flagship of trauma-informed design, specially built for serving folx who''ve survived in the streets. This shelter was renovated by Multnomah County in partnership the Arbor Lodge Neighborhood Association, Kenton Neighborhood Association, and BIPOC Artists, Qué Lo Gì, who led the community mural. On site, you’ll find compassionate, structured care from staff as they equip participants with the skills and confidence for independent living.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-3.10.14 PM.png', '1952 North Lombard Street', 'Portland', 'Oregon', '97217', NULL, 'United States', 45.576840250000004, -122.68657744990202, '(503) 684-0360', NULL, 'https://www.dogoodmultnomah.org/refer', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 23:12:40', '2025-02-21 02:04:21')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'LGBTQIA2S+'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Couples'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Veterans'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 15: Downtown Shelter (Do Good Multnomah)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Downtown Shelter (Do Good Multnomah)', NULL, 'Located in the heart of Old Town, our Downtown shelter is geographically close to numerous peer agencies, resource providers, and transit lines for job access. The space is unique among shelters in Multnomah County in that it welcomes couples, pets, and all gender identities. With nightly scratch-made dinners and showers available 24/7, Downtown meets participants where they are in their journey, serving as a transformative stepping stone to regaining self-worth and embarking on sustainable pathways out of homelessness.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-3.16.55 PM.png', '540 Northwest 5th Avenue', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.5271502, -122.67526219999999, '(503) 436-5757', NULL, 'https://www.dogoodmultnomah.org/refer', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-20 23:19:16', '2025-02-21 02:04:02')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People with Pets/Animals'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Couples'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 16: Bikes for Humanity PDX
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Bikes for Humanity PDX', NULL, 'Bikes For Humanity PDX (B4HPDX) is a 501c3 non-profit bike shop and school. Our mission is to substantially increase public access to affordable and safe bicycles while empowering self-sufficiency in bicycle maintenance and commute.
We work towards this mission with several programs:
Our bike shop joins donors, volunteers, and adopters, to transition under-utilized bicycles back into service.
Our financial aid process allows bicyclists of any economic status to gain access to refurbished bicycles.
Our Volunteer Mechanics Classes train volunteers via professional instruction, curriculum, tools, and workspace to refurbish donated bicycles.
We create and maintain co-ops with partners around Portland.
We provide repairs at public events.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-5.33.17 PM.png', '3366 Southeast Powell Boulevard', 'Portland', 'Oregon', '97202', NULL, 'United States', 45.4965884, -122.63016, '(503) 496-6941', NULL, 'https://www.b4hpdx.org/', (SELECT id FROM what_topics WHERE slug = 'transport'), 'admin', '2025-02-21 01:46:58', '2025-02-21 01:46:58')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 17: Roseway (Do Good Multnomah)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Roseway (Do Good Multnomah)', NULL, 'Roseway is the largest motel shelter in Multnomah County, with 110 individualized rooms, a 24/7 food pantry that counteracts food scarcity, and two large, fenced-in areas for pets to roam free. A large, covered outdoor community space allows participants to bond with each other and build rapport.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-5.50.43 PM.png', '9723 Northeast Sandy Boulevard', 'Portland', 'Oregon', '97220', NULL, 'United States', 45.55881194897959, -122.56249419387755, '(503)436-5757', NULL, 'https://www.dogoodmultnomah.org/refer', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 02:03:43', '2025-02-21 02:03:43')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People with Pets/Animals'));
END $$;

-- Resource 18: NE 82nd Ave Voluntary Isolation Motel
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('NE 82nd Ave Voluntary Isolation Motel', NULL, 'Our Voluntary Isolation Motel (VIMo) is the only shelter in Multnomah County offering medically-isolated rooms for up to two weeks for contagious illness, as well as respite care for those coming out of medical trauma. Breakfast and dinner are served daily. Couples are welcome, as well as one pet per person.

To refer medically vulnerable individuals to VIMo, please call 971-500-9163.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-5.55.43 PM.png', '1707 Northeast 82nd Avenue', 'Portland', 'Oregon', '97220', NULL, 'United States', 45.5348375, -122.57942043306451, '971-500-9163', NULL, 'https://www.dogoodmultnomah.org/shelter', NULL, 'admin', '2025-02-21 02:07:55', '2025-03-24 05:04:34')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People with Pets/Animals'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Couples'));
END $$;

-- Resource 19: Stark Street (Do Good Multnomah)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Stark Street (Do Good Multnomah)', NULL, 'Located on the border of East Portland and Gresham, the Stark Street motel offers 40 rooms community gardens, and a large outdoor kitchen setup. The location is right on several transit lines, and has a very high walkability score. A current participant states “We can be self-sufficient. We can cook, we can clean, we have our privacy.”', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-6.01.22 PM.png', 'Southeast Stark Street, Centennial', 'Portland', 'Oregon', '97233', NULL, 'United States', 45.51914735, -122.4972461, '(503)436-5757', NULL, 'https://www.dogoodmultnomah.org/refer', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 02:03:22', '2025-02-21 02:03:22')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People with Pets/Animals'));
END $$;

-- Resource 20: Veteran’s Village (Do Good Multnomah)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Veteran’s Village (Do Good Multnomah)', NULL, 'The Veterans Village is operated in partnership with Clackamas County. Since opening in 2018, we have served 138 individual Veterans, 65 of whom have been moved into permanent housing!

Currently, the program can support 24 Veterans in individual, gender-inclusive pods. The village has a shared community space, stocked kitchen, bathroom/showers, and individual case managers to address needs and help participants work towards permanent housing. The generous folks in the greater Veteran-supporting community keep the food pantry stocked. They’ve also donated a gazebo for outdoor meeting space, installed a putting green, and supplied a chicken/duck coop, energizing the village and keeping the space feeling alive and accessible.

To be referred to Vets Village, visit the Clackamas County Coordinated Housing Access.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-6.17.00 PM.png', '16575 Southeast 115th Avenue', 'Clackamas County', 'Oregon', '97015', NULL, 'United States', 45.402675369127515, -122.54524418120805, '503-655-8575', NULL, 'https://www.clackamas.us/communitydevelopment/cccha', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 02:33:45', '2025-02-21 02:33:45')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Veterans'));
END $$;

-- Resource 21: St. Johns Village (Do Good Multnomah)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('St. Johns Village (Do Good Multnomah)', NULL, 'St Johns Village offers 19 individual pods with shared community space, showers, laundry, security features, and a well-outfitted community kitchen. It sits on land leased from neighboring St. Johns Church, and the outdoor space boasts bike storage, a rain garden, and a community garden built in collaboration with the Veterans of VetRest.

Support and housing services are provided in partnership with the Joint Office of Homeless Services. The village’s success is a result of a true community effort, including:
Home Builders Foundation
Design work by Convergence Architecture (pro bono)
Rachel Hill, licensed Landscape Architect (pro bono)
Pods built by Mods PDX
WCL Engineering - Civil Engineer (pro bono)
PAE Engineers - Electrical &amp; Low Voltage Engineers (pro bono)
Community advocacy by St. Johns Welcomes the Village Coalition', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-6.27.31 PM.png', '8005 North Richmond Avenue', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.59019285354252, -122.75020316995564, '(503) 572-2649', NULL, 'https://www.dogoodmultnomah.org/alternative-shelter', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 02:33:53', '2025-02-21 02:33:53')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 22: Kiggins Village (Do Good Multnomah)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Kiggins Village (Do Good Multnomah)', NULL, 'Kiggins Village has the honor of being Do Good’s first ever project north of the Columbia River. It offers a tremendous opportunity to serve the Veterans of Southwest Washington.

Operated in collaboration with the City of Vancouver, this Safe Stay Village features 20 individual pods, as well as a volunteer-built dog run and pet area, plus a handmade patio for every shelter pod.

The community surrounding the shelter shows strong support, including regular donations, volunteer events, and clinical counseling services provided by community health provider Sea Mar. Check out some stories of Kiggins Village in the recent news:

‘You can have a brand-new life’: Once-homeless veteran becomes first graduate of Kiggins Village Safe Stay - The Columbian

With help of Vancouver Safe Stay, former soldier who had lived in truck heads to complex for veterans - The Columbian

Vancouver Safe Stay site provides ‘sense of stability’ by allowing pets - KOIN', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-6.33.03 PM.png', '4611 Main Street', 'Vancouver', 'Washington', '98663', NULL, 'United States', 45.65537416891892, -122.66651099324324, '(503)436-5757', NULL, 'https://www.dogoodmultnomah.org/alternative-shelter', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 02:34:01', '2025-02-21 02:34:01')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People with Pets/Animals'));
END $$;

-- Resource 23: Our Just Future
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Our Just Future', NULL, 'The Lilac Meadows Family Shelter is accessible to families — one or more adults with at least one minor child, or individuals in their third trimester of pregnancy. This shelter has no walk-up access; we partner with 211 to screen for eligibility and coordinated intake.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-6.47.58 PM.png', '10550 Northeast Halsey Street', 'Portland', 'Oregon', '97220', NULL, 'United States', 45.533227499999995, -122.55421125996759, '503-548-0200', NULL, 'https://ourjustfuture.org/services/homeless-services/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 02:59:26', '2025-02-21 02:59:26')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 24: Gresham Women’s Shelter
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Gresham Women’s Shelter', NULL, 'The Gresham Women’s Shelter is a shelter for anyone who identifies as a woman, nonbinary, or genderqueer. This shelter is a hybrid program that works with all women, including those who have experienced domestic violence (DV). It is not a secure DV shelter but is DV-informed, and we work in conjunction with community partners offering an array of services. This shelter has no walk-up access; instead we partner with 211, the Gateway Center, and Call to Safety to screen for eligibility and coordinated intake.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-6.47.58 PM-1.png', '16141 East Burnside Street', 'Portland', 'Oregon', '97233', NULL, 'United States', 45.522477699999996, -122.49690419960142, '(503) 405-7875', NULL, 'https://ourjustfuture.org/', NULL, 'admin', '2025-02-21 02:59:36', '2025-02-21 02:59:36')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Domestic Violence (DV) Survivors'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'LGBTQIA2S+'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 25: Path Homes Family Village
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Path Homes Family Village', NULL, 'Previously known as Portland Homeless Family Solutions Family Village for homeless families. Path Homes Family Village is a shelter for 17 homeless families with children open every day of the year, 24 hours a day. Meals, showers, laundry, computers, internet, and rapid re-housing support in addition to family recreation spaces and child play areas. Designed using trauma-informed design &amp; architecture, the shelter is a very calm and peaceful environment. Families must have children under age 18 in their care to qualify, and must be experiencing homelessness. To access this shelter program, call 211 to be put on the Homeless Family System Waitlist.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-6.57.43 PM.png', '6220 Southeast 92nd Avenue', 'Portland', 'Oregon', '97266', NULL, 'United States', 45.477919100671144, -122.56849916778523, '503-915-8306', NULL, 'https://www.path-home.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 02:59:17', '2025-02-21 02:59:17')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 26: Portland Rescue Mission, New Life Recovery
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Portland Rescue Mission, New Life Recovery', NULL, 'Free overnight emergency shelter for men. Open space provided nightly, as available. Spaces are maintained for guests who return nightly. Showers and clothing provided daily from 2:00pm-4:00pm to those staying in the shelter. Requests for available space can be made from 8:00am-4:30pm. All requests are randomized, and selections are announced by 5:00pm. Check- in at 8:00pm nightly.
Hours:
Requests for available space can be made from 8:00am-4:30pm. All requests are randomized, and selections are announced by 5:00pm. Shower and clothing provided daily from 2:00pm-4:00pm.

3–6-month transitional program for men that provides stability and community within a clean and sober environment to transition away from houselessness. Receive job readiness through vocational assignments, guidance toward obtaining housing and employment and supportive relationships through regular life group meetings. Attend orientation on Mon, Wed or Fri at 1:00PM to sign up or learn more.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-7.08.16 PM.png', '111 West Burnside Street', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.523379750000004, -122.67169886030786, '503-906-7690', NULL, 'https://portlandrescuemission.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 04:42:05', '2025-02-21 04:42:05')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
END $$;

-- Resource 27: Shepherd’s Door (Salvation Army New Life Ministry)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Shepherd’s Door (Salvation Army New Life Ministry)', NULL, 'Shepherd’s Door, our New Life Ministry for women and women with children, provides a supportive and relational environment in long-term residential recovery in a retreat-like setting for those who are experiencing homelessness, at risk of homelessness, or struggling with addiction. At Shepherd’s Door, women receive holistic care from Certified Alcohol and Drug Counselors and support from our dedicated nursing staff to overcome substance use disorders, spiritual transformation, and life skills development.

Shepherd’s Door residential recovery programs begin with Discovery, a 5-week assessment, stabilization, and relapse prevention program. Discovery graduates are eligible to enter New Life, a one-year holistic recovery program. Transition programs are available upon completion of the New Life program. As we compassionately walk beside the women, they are encouraged to grow inside and out.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-20-at-7.08.16 PM-1.png', '13207 Northeast Halsey Street', 'Portland', 'Oregon', '97230', NULL, 'United States', 45.534250549999996, -122.52620727018348, '(503) 906-7650', NULL, 'https://portlandrescuemission.org/women-children/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-21 04:42:13', '2025-02-21 04:42:13')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 28: Blanchet House of Hospitality
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Blanchet House of Hospitality', NULL, 'Seven-month transitional living program for men who are unemployed or struggling with personal issues. Must be physically and mentally able to work full-time in the kitchen during the first 90 days. After completing a seven-month program, guests may be eligible for a nine-month residential program.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-22-at-7.06.50 PM.png', '310 Northwest Glisan Street', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.5263894, -122.67382643868521, '971-337-8747', NULL, 'https://blanchethouse.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-25 21:11:03', '2025-02-25 21:11:03')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 29: Blanchet Farm Residential Recovery Program
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Blanchet Farm Residential Recovery Program', NULL, 'Blanchet Farm is located in Yamhill County, Oregon one hour outside Portland. Its goal is to help men with substance addiction build sobriety, and self-worth, and regain job skills by being responsible for the care of animals, gardens, meals, and facilities.

The farm is successful at saving lives because it offers hands-on therapeutic work, unlike more traditional recovery programs. The farm is free, no insurance is billed, thanks to the generosity of our donors.

Call for a phone interview and screening at 503-241-4340 x117 Mon-Fri.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-22-at-7.15.15 PM.png', '11750 NE Finn Hill Loop', 'Yamhill County', 'Oregon', '97111', NULL, 'United States', 45.30590448870791, -123.11927659287144, '503-241-4340 x117', NULL, 'https://blanchethouse.org/blanchet-farm-residential-recovery-program/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-02-25 21:11:21', '2025-02-25 21:11:21')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 30: Cascade AIDS Project
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Cascade AIDS Project', NULL, 'We promote well-being and advance equity by providing inclusive health and wellness services for LGBTQ+ people, people affected by HIV, and all those seeking compassionate care.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-22-at-7.22.45 PM.png', '520 NW Davis St. Portland, OR 97209', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.5243838, -122.6759142, '503.223.5907', NULL, 'https://www.capnw.org/', NULL, 'admin', '2025-02-25 21:11:33', '2025-02-25 21:11:33')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'LGBTQIA2S+'));
END $$;

-- Resource 31: Cascadia Health
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Cascadia Health', NULL, 'Cascadia Health delivers Whole Health CareTM. We provide mental health services, addiction recovery support, primary care, wellness programs, permanent housing solutions and affordable housing to people of all ages.', NULL, '4212 Southeast Division Street', 'Portland', 'Oregon', '97206', NULL, 'United States', 45.50512765133822, -122.61861668822985, '(503) 674-7777', NULL, 'https://cascadiahealth.org/', (SELECT id FROM what_topics WHERE slug = 'crisis-hotlines'), 'admin', '2025-02-25 21:11:44', '2026-04-23 16:24:00')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 32: New Narrative
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('New Narrative', NULL, 'We envision a future where everyone seeking mental health care can live the life they choose. With access to our range of clinical care, peer programs, housing and other services, participants can develop the tools to thrive in the community and build their own path to independence.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-22-at-7.48.28 PM.png', '8915 Southwest Center Street', 'Tigard', 'Oregon', '97223', NULL, 'United States', 45.4338046, -122.7684671, '(503) 726-3764', NULL, 'https://newnarrativepdx.org/', (SELECT id FROM what_topics WHERE slug = 'mental-behavioral-health'), 'admin', '2025-02-25 21:11:56', '2025-04-03 20:24:53')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 33: Portland Rescue Mission
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Portland Rescue Mission', NULL, 'Mens clothing provided from 1-2 p.m. on Tuesday, must sign up between 8 a.m.-12 p.m.Tues.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-25-at-5.52.57 PM.png', '111 West Burnside Street', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.523379750000004, -122.67169886030786, '503-906-7690', NULL, 'https://portlandrescuemission.org/', (SELECT id FROM what_topics WHERE slug = 'clothing'), 'admin', '2025-02-26 02:13:37', '2025-02-26 02:13:37')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
END $$;

-- Resource 34: St. Johns Food Share
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('St. Johns Food Share', NULL, 'Powered entirely by volunteers, we distribute food through an open-door, no-barrier approach, providing a welcoming pantry shopping experience for individuals to choose what works best for them and their families, free from judgement or proof of need. By bridging the food gap, we create more joy, ease and security in our community.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-25-at-5.59.26 PM.png', '8100 North Lombard Street', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.5892188, -122.74935102889253, '(503) 286-0750', NULL, 'https://stjohnsfoodshare.org/', (SELECT id FROM what_topics WHERE slug = 'food'), 'admin', '2025-02-26 02:13:46', '2025-02-26 02:13:46')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 35: Catholic Charities Immigration Legal Services
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Catholic Charities Immigration Legal Services', NULL, 'Immigration legal services. Spanish speakers available. Call for appt.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-25-at-6.03.11 PM.png', '2740 Southeast Powell Boulevard', 'Portland', 'Oregon', '97202', NULL, 'United States', 45.4975846, -122.6380411, '503-542-2855', NULL, 'https://www.catholiccharitiesoregon.org/', (SELECT id FROM what_topics WHERE slug = 'legal'), 'admin', '2025-02-26 02:13:56', '2025-02-26 02:13:56')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 36: Access Wireless
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Access Wireless', NULL, 'We know how important it is to stay in touch with family, be available for job opportunities, and have a phone in case of emergencies. Access Wireless serves our community by offering free service for qualifying customers, through a government-funded program. Need some form of ID (with photo, name, birthday) and EBT or OHP card.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-25-at-6.04.50 PM.png', '219 NW Couch St. Portland OR. 97209', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.5239615, -122.6729, '1-888-900-5899', NULL, 'https://www.accesswireless.com/', (SELECT id FROM what_topics WHERE slug = 'phone'), 'admin', '2025-02-26 02:14:04', '2025-02-26 02:14:04')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 37: Alano Club
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Alano Club', NULL, 'More than 125 support meetings each week, monthly recovery workshops, wellness seminars, free weekly yoga, CrossFit and meditation classes, sober social events, and holiday community dinners. Because of COVID restrictions call or check our website to confirm the dates and times of classes and events. Bus: 15, 17, 77.', 'https://resources.reentryresource.org/wp-content/uploads/2025/02/Screenshot-2025-02-25-at-6.12.40 PM.png', '909 Northwest 24th Avenue', 'Portland', 'Oregon', '97210', NULL, 'United States', 45.52925595, -122.70093233825439, '503-222-5756', NULL, 'https://www.portlandalano.org/home', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2025-02-26 02:14:14', '2025-02-26 02:14:14')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
END $$;

-- Resource 38: The Bethlehem Children's Clothes Closet
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('The Bethlehem Children''s Clothes Closet', NULL, 'Need free baby and/or kids clothing? The Bethlehem Children’s Clothes Closet is here for you! We have sizes preemie through age 17. Our facility is easily accessible on the main floor. Please note, you may only visit the clothes closet BY APPOINTMENT ONLY.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-05-at-10.50.19 AM.png', '5415 Southeast Powell Boulevard', 'Portland', 'Oregon', '97206', NULL, 'United States', 45.49786400000001, -122.60674394756518, '503-777-1443', NULL, 'https://www.smpdx.org/clothes.html', (SELECT id FROM what_topics WHERE slug = 'clothing'), 'admin', '2025-03-05 20:54:54', '2025-03-05 20:54:54')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'By Appointment'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 39: Paul Susi
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Paul Susi', NULL, 'Paul is a notary and helps people get their ID and Birth Certificates by writing checks to cover the cost.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-05-at-11.10.18 AM.png', '801 Southwest 10th Avenue', 'Portland', 'Oregon', '97205', NULL, 'United States', 45.519200749999996, -122.68320156112537, '(971) 271 4163', NULL, 'https://paulsusi.wordpress.com/pdx-id-assistance/', (SELECT id FROM what_topics WHERE slug = 'id-documents'), 'admin', '2025-03-05 20:55:08', '2025-03-05 20:55:08')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 40: LifeChange (UGM)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('LifeChange (UGM)', NULL, 'Union Gospel Mission’s LifeChange for Women and Children provides a safe, healing home for single women and women with children to transform their lives.
If you are struggling with abuse, addiction, or homelessness, we can help.
LifeChange is a safe environment to heal from past traumas and to learn how to break free of destructive choices.
LifeChange is an intentional Christian community where people help and support each other to break cycles of addiction, abuse and homelessness and live a transformed and abundant life in Jesus.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-23-at-7.54.39 PM.png', '3400 Southwest 103rd Avenue', 'Beaverton', 'Oregon', '97005', NULL, 'United States', 45.49458905, -122.78110963679222, '971-476-6682', NULL, 'https://ugmportland.org/help-for-women?gad_source=1&gclid=Cj0KCQjw4v6-BhDuARIsALprm32GkByERuNkjFKfOr0iAf7t28FUvQWQq4LvZU4n9zRm6WTb471kgS4aAsQsEALw_wcB', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2025-03-24 02:56:54', '2025-03-24 02:56:54')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 41: Home and Family Reunification Program (Ticket Home)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Home and Family Reunification Program (Ticket Home)', NULL, 'Ticket Home is a family reunification program that funds one-time transportation assistance for individuals and families experiencing homelessness in Multnomah County to a safe and stable housing destination outside of Multnomah County.
Applicants must have a State Issued ID.
The travel destination must be to stay with family or friends. We will not facilitate transportation to destinations such as emergency shelters, transitional living facilities, halfway/sober houses, or places not meant for habitation.
The host must verify a minimum 3-month stable housing plan for the applicant. Host housing will be verified via mail by a signed host agreement and proof of address.
Applicants must currently be experiencing or at imminent risk of Homelessness in Multnomah County.
At this time, we are unable to fulfill same-day requests for travel assistance. Requests for transportation assistance will be approved within 72 Hours of receipt of the Signed Host Agreement and Proof of Address.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/bus-ticket.webp', 'Online', 'Portland', 'Oregon', NULL, NULL, 'United States', NULL, NULL, '311', NULL, 'https://www.tprojects.org/housing', (SELECT id FROM what_topics WHERE slug = 'transport'), 'admin', '2025-03-24 02:46:35', '2026-05-22 00:19:44')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 42: SNAP Training and Employment Program (STEP)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('SNAP Training and Employment Program (STEP)', NULL, 'The STEP program supports employment, training and education opportunities for people in Oregon who:
Are receiving SNAP benefits,
Are not receiving Temporary Assistance to Needy Families (TANF) benefits, and
Are 18 and older.
If you are receiving TANF and would like to participate in an employment and training program, please reach out to your ODHS Family Coach.
WorkSource Oregon will connect you to a STEP Coach. Your coach will support you with a customized plan to help you reach your employment goals.
To get started in the program, and to connect with a STEP Coach, contact WorkSource Oregon.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-23-at-8.18.16 PM.png', '30 North Webster Street', 'Portland', 'Oregon', '97217', NULL, 'United States', 45.5595609, -122.6672841, '833-685-0845', NULL, 'https://worksourceoregon.org/contact', (SELECT id FROM what_topics WHERE slug = 'employment-career'), 'admin', '2025-03-24 03:19:05', '2025-03-24 03:19:05')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 43: Dignity Village Shelter & Tiny Houses
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Dignity Village Shelter & Tiny Houses', NULL, 'Dignity Village is a membership-based community in NE Portland, providing shelter off the streets for 60 people a night since 2000. Dignity Village envisioned and created the first Village Model shelter in North America. The Village Model is democratically self-administrated, self-governed, and self-operated with a mission to provide shelter that fosters community and self-empowerment– a radical experiment to end homelessness.
Please be aware that we do not have beds available for shelter at any time other than Winter. There is nearly always a waiting list for our houses and our winter shelter is actually our greenhouse for the rest of the year. Vaccination against COVID is required for entry. Please see our Village Intake Committee process for intake details.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-23-at-8.22.04 PM.png', '9401 Northeast Sunderland Avenue', 'Portland', 'Oregon', '97211', NULL, 'United States', 45.590779, -122.63588, '503-281-1604', NULL, 'https://dignityvillage.org/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2025-03-24 05:02:49', '2025-03-24 05:02:49')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 44: Outside In
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Outside In', NULL, 'For 50 years, Outside In has supported <a href="http://outsidein.org/services-for-16-to-24-year-olds/">youth experiencing homelessness</a> and other marginalized people as they move toward improved health and self-sufficiency. Driven to meet the changing needs of those it helps, the agency has created an all-inclusive and integrated system of cutting edge and sometimes controversial wraparound services that has transformed and saved thousands of lives over the years.

Today, <a href="http://outsidein.org/health-services/">Outside In’s clinic</a>, a Federally-Qualified Health Center and youth department provide a comprehensive array of services to its patients and participants, including:
<ul class="fa-ul">
 	<li><i class="fas fa-circle"></i>primary health care</li>
 	<li><i class="fas fa-circle"></i>syringe exchange</li>
 	<li><i class="fas fa-circle"></i>access to basic needs</li>
 	<li><i class="fas fa-circle"></i>tattoo removal</li>
 	<li><i class="fas fa-circle"></i>case management</li>
 	<li><i class="fas fa-circle"></i>recreational activities</li>
 	<li><i class="fas fa-circle"></i>meals</li>
 	<li><i class="fas fa-circle"></i>LGBTQIA+ programs</li>
 	<li><i class="fas fa-circle"></i>housing</li>
 	<li><i class="fas fa-circle"></i>substance use treatment</li>
 	<li><i class="fas fa-circle"></i>behavioral health</li>
 	<li><i class="fas fa-circle"></i>education</li>
 	<li><i class="fas fa-circle"></i>job training</li>
</ul>', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-9.57.25-AM.png', '1132 Southwest 13th Avenue', 'Portland', 'Oregon', '97205', NULL, 'United States', 45.51760995, -122.68649918224386, '503.535.3800', NULL, 'https://outsidein.org/', (SELECT id FROM what_topics WHERE slug = 'medical'), 'admin', '2025-03-24 05:02:57', '2026-04-23 16:59:16')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
END $$;

-- Resource 45: Multnomah County Community Health Center
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Multnomah County Community Health Center', NULL, 'Everyone in Multnomah County is welcome at our clinics. Our teams work together to provide quality whole health care for you, your family, and our community. Medical &amp; Dental.
Also visit''s Bybee in Medical Van.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-23-at-9.57.32 PM.png', '9000 North Lombard Street', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.592355, -122.75745984699911, '503-988-5558', NULL, 'https://healthcenter.multco.us/', (SELECT id FROM what_topics WHERE slug = 'mental-behavioral-health'), 'admin', '2025-03-24 05:03:14', '2025-04-03 20:21:49')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 46: Hooper Detoxification Stabilization Center (CCC)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Hooper Detoxification Stabilization Center (CCC)', NULL, 'Hooper’s inpatient program offers 24/7 withdrawal management and stabilization services for people in the early stages of recovery from alcohol, opioids and other drugs.

<span class="NormalTextRun SCXW201393083 BCX0">Withdrawal </span><span class="NormalTextRun SCXW201393083 BCX0">Management </span><span class="NormalTextRun SCXW201393083 BCX0">Admission</span><span class="NormalTextRun SCXW201393083 BCX0">:</span> Monday – Friday, 6:45 to 7:45 am', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-24-at-9.51.55 PM.png', '1535 North Williams Avenue', 'Portland', 'Oregon', '97227', NULL, 'United States', 45.5341167, -122.6669386, '(503) 238-2067', NULL, 'https://centralcityconcern.org/recovery-location/hooper-detoxification-stabilization-center/', (SELECT id FROM what_topics WHERE slug = 'detox'), 'admin', '2025-03-25 04:53:42', '2025-03-25 15:30:40')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 47: DPI Staffing Solutions
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('DPI Staffing Solutions', NULL, 'As a company of The DPI Group, DPI Staffing’s mission is to identify and create job opportunities for people with employment barriers. We pride ourselves on our strong relationships with our associates and employers, and our ability to make great matches between them.
Some common barriers to employment include:
Age (55+)
Criminal record, including incarceration
Disability (physical, mental, addiction-related, intellectual or developmental)
Experience of homelessness or housing instability
Limited English proficiency', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-25-at-8.03.57 PM.png', '4950 Northeast Martin Luther King Junior Boulevard', 'Portland', 'Oregon', '97211', NULL, 'United States', 45.55889415, -122.66124598636321, '(503) 281-1289', NULL, 'https://dpistaffing.com/for-job-seekers/jobs/', (SELECT id FROM what_topics WHERE slug = 'employment-career'), 'admin', '2025-03-26 03:05:15', '2025-03-26 03:05:15')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 48: Department of Human Services - Food Stamps (SNAP)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Department of Human Services - Food Stamps (SNAP)', NULL, '<p class="lead"><strong>The Supplemental Nutrition Assistance Program (SNAP) provides monthly food benefits to help you buy healthy food.</strong></p>
<p class="lead">This program helps people pay for groceries, learn about nutrition, and get job training and support. SNAP helps you stretch your food budget, but may not meet all your food needs. <a href="https://www.oregon.gov/odhs/food/Pages/default.aspx">Visit our food resources page</a> if you need more help getting food.</p>
Apply online.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-26-at-12.56.20 PM.png', '6443 North Lombard Street', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.5859806, -122.7329486, '503-945-1400', NULL, 'https://www.oregon.gov/odhs/benefits/pages/default.aspx?utm_source=ODHS&utm_medium=egov_redirect&utm_campaign=https%3A%2F%2Fwww.oregon.gov%2Fdhs%2Fbenefits%2Fpages%2Findex.aspx', (SELECT id FROM what_topics WHERE slug = 'food'), 'admin', '2025-03-26 19:57:51', '2025-03-26 19:58:31')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 49: Oregon Health Plan (OHP) Oregon's Medicaid Program
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Oregon Health Plan (OHP) Oregon''s Medicaid Program', NULL, '<div class="WaaZC">
<div class="RJPOee EIJn2">
<div class="rPeykc" data-hveid="CAcQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQo_EKegQIBxAB">

<span data-huuid="2020438594556854461">The Oregon Health Plan (OHP), which is Oregon''s Medicaid program, provides comprehensive medical coverage, including physical, dental, and mental health care, as well as substance use disorder treatment, and prescriptions.<span class="pjBG2e" data-cid="c8d1b6c6-6985-4325-8872-64824ed99f70"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="c8d1b6c6-6985-4325-8872-64824ed99f70" data-uuids="2020438594556854461">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CAUQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQIBRAB">
<div class="niO4u">
<div class="kHtcsd"></div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<div class="rPeykc" data-hveid="CAgQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQo_EKegQICBAB">

<span data-huuid="2020438594556856383">Here''s a more detailed breakdown of what OHP covers:</span>
<div class="NPrrbc" data-cid="4d498bb5-381f-4ae0-89bf-4dc2e2d1f283" data-uuids="2020438594556856383">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CAIQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQIAhAB">
<div class="niO4u">
<div class="kHtcsd"></div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<div class="rPeykc pyPiTc" data-hveid="CA4QAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQo_EKegQIDhAB"><span data-huuid="927007182344006024">General Medical Coverage:</span></div>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<ul data-hveid="CDAQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQm_YKegQIMBAB">
 	<li><span data-huuid="927007182344003747"><strong>Doctor visits and check-ups:</strong> </span><span data-huuid="927007182344007084">Regular check-ups, vaccinations, and other preventative care.</span></li>
 	<li><span data-huuid="927007182344005566"><strong>Hospital stays:</strong> </span><span data-huuid="927007182344004807">Coverage for necessary hospital care.</span></li>
 	<li><span data-huuid="927007182344007385"><strong>Prescriptions:</strong> </span><span data-huuid="927007182344006626">Coverage for most prescription medications.</span></li>
 	<li><span data-huuid="927007182344005108"><strong>Emergency and urgent care:</strong> </span><span data-huuid="927007182344004349">Access to emergency and urgent care services.</span></li>
 	<li><span data-huuid="927007182344006927"><strong>Diagnostic services:</strong> </span><span data-huuid="927007182344006168">X-rays, lab tests, and other diagnostic procedures.</span></li>
 	<li><span data-huuid="927007182344004650"><strong>Rehabilitation services:</strong> </span><span data-huuid="927007182344003891">Physical therapy, occupational therapy, and other rehabilitation services.</span></li>
 	<li><span data-huuid="927007182344006469"><strong>Medical equipment:</strong> </span><span data-huuid="927007182344005710">Coverage for durable medical equipment like wheelchairs or walkers.</span></li>
 	<li><span data-huuid="927007182344004192"><strong>Home healthcare:</strong> </span><span data-huuid="927007182344007529">Coverage for home healthcare services when medically necessary.</span></li>
 	<li><span data-huuid="927007182344006011"><strong>Transportation to medical appointments:</strong> </span><span data-huuid="927007182344005252">Assistance with transportation to healthcare appointments.<span class="pjBG2e" data-cid="56f76cd6-bfd6-4497-87fc-bd4a903cd863"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="56f76cd6-bfd6-4497-87fc-bd4a903cd863" data-uuids="927007182344003747,927007182344007084,927007182344005566,927007182344004807,927007182344007385,927007182344006626,927007182344005108,927007182344004349,927007182344006927,927007182344006168,927007182344004650,927007182344003891,927007182344006469,927007182344005710,927007182344004192,927007182344007529,927007182344006011,927007182344005252">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CC4QAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQILhAB"></div>
</div></li>
</ul>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<div class="rPeykc pyPiTc" data-hveid="CDYQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQo_EKegQINhAB"><span data-huuid="6171102901891030852">Dental and Vision Care:</span></div>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<ul data-hveid="CEEQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQm_YKegQIQRAB">
 	<li><span data-huuid="6171102901891028995"><strong>Dental care:</strong> </span><span data-huuid="6171102901891028376">OHP covers dental exams, cleanings, fillings, and other dental services.<span class="pjBG2e" data-cid="0f38e125-6a6a-4fcd-b82b-dfcf6cae700a"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="0f38e125-6a6a-4fcd-b82b-dfcf6cae700a" data-uuids="6171102901891028995,6171102901891028376">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CDgQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQIOBAB">
<div class="niO4u">
<div class="kHtcsd"></div>
</div>
</div>
</div></li>
 	<li><span data-huuid="6171102901891027138"><strong>Eye and vision care:</strong> </span><span data-huuid="6171102901891030615">Coverage for eye exams, glasses, and other vision-related care.<span class="pjBG2e" data-cid="a7301346-c801-4c2b-8996-023f1a00a250"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="a7301346-c801-4c2b-8996-023f1a00a250" data-uuids="6171102901891027138,6171102901891030615">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CD8QAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQIPxAB"></div>
</div></li>
</ul>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<div class="rPeykc pyPiTc" data-hveid="CEYQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQo_EKegQIRhAB"><span data-huuid="16145934800770622209">Mental Health and Substance Use Disorder Treatment:</span></div>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<ul data-hveid="CEkQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQm_YKegQISRAB">
 	<li><span data-huuid="16145934800770622428"><strong>Mental health care:</strong> </span><span data-huuid="16145934800770622501">Coverage for mental health counseling, therapy, and medication.</span></li>
 	<li><span data-huuid="16145934800770622647"><strong>Substance use disorder treatment:</strong> </span><span data-huuid="16145934800770622720">Coverage for treatment and rehabilitation services for substance use disorders.<span class="pjBG2e" data-cid="efd311ac-182d-4329-8a41-76021cf157a7"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="efd311ac-182d-4329-8a41-76021cf157a7" data-uuids="16145934800770622428,16145934800770622501,16145934800770622647,16145934800770622720">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CEwQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQITBAB"></div>
</div></li>
</ul>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<div class="rPeykc pyPiTc" data-hveid="CFQQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQo_EKegQIVBAB"><span data-huuid="2020438594556854572">Specialized Coverage:</span></div>
</div>
</div>
<div class="WaaZC">
<div class="RJPOee EIJn2">
<ul data-hveid="CG0QAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQm_YKegQIbRAB">
 	<li class="K3KsMc">
<div class="zMgcWd dSKvsb" data-il="">
<div data-crb-p="">
<div class="xFTqob">
<div class="Gur8Ad"><span data-huuid="2020438594556857455"><strong>Early and Periodic Screening, Diagnosis, and Treatment (EPSDT):</strong></span></div>
<div class="vM0jzc">

<span data-huuid="2020438594556854320">For children and youth under age 21, OHP covers all medically necessary and appropriate services.<span class="pjBG2e" data-cid="5dd3f89c-b3b4-4877-965a-7ef8dcae2b3b"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="5dd3f89c-b3b4-4877-965a-7ef8dcae2b3b" data-uuids="2020438594556857455,2020438594556854320">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CGgQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQIaBAB">
<div class="niO4u">
<div class="kHtcsd"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div></li>
 	<li class="K3KsMc">
<div class="zMgcWd dSKvsb" data-il="">
<div data-crb-p="">
<div class="xFTqob">
<div class="Gur8Ad"><span data-huuid="2020438594556856242"><strong>Gender-affirming services:</strong></span></div>
<div class="vM0jzc">

<span data-huuid="2020438594556857203">OHP covers gender-affirming services according to the World Professional Association for Transgender Health Standards of Care.<span class="pjBG2e" data-cid="ec7c4c19-9328-4520-aa06-b139381e761e"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="ec7c4c19-9328-4520-aa06-b139381e761e" data-uuids="2020438594556856242,2020438594556857203">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CGEQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQIYRAB">
<div class="niO4u">
<div class="kHtcsd"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div></li>
 	<li class="K3KsMc">
<div class="zMgcWd dSKvsb" data-il="">
<div data-crb-p="">
<div class="xFTqob">
<div class="Gur8Ad"><span data-huuid="2020438594556855029"><strong>OHP Bridge:</strong></span></div>
<div class="vM0jzc">

<span data-huuid="2020438594556855990">A new benefit for adults with incomes slightly above the traditional OHP Plus limit, offering medical, dental, and behavioral health coverage.<span class="pjBG2e" data-cid="38f083d1-4eb1-4ade-9d3c-77f540730176"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="38f083d1-4eb1-4ade-9d3c-77f540730176" data-uuids="2020438594556855029,2020438594556855990">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CGkQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQIaRAB">
<div class="niO4u">
<div class="kHtcsd"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div></li>
 	<li class="K3KsMc">
<div class="zMgcWd dSKvsb" data-il="">
<div data-crb-p="">
<div class="xFTqob">
<div class="Gur8Ad"><span data-huuid="2020438594556857912"><strong>OHP with Limited Drug:</strong></span></div>
<div class="vM0jzc">

<span data-huuid="2020438594556854777">For individuals eligible for both OHP and Medicare Part D, this program covers drugs not covered by Medicare Part D.<span class="pjBG2e" data-cid="efd387ed-9625-4dba-97fb-78ebd1c330da"><span class="UV3uM"> </span></span></span>
<div class="NPrrbc" data-cid="efd387ed-9625-4dba-97fb-78ebd1c330da" data-uuids="2020438594556857912,2020438594556854777">
<div class="BMebGe btku5b fCrZyc LwdV0e FR7ZSc OJeuxf" tabindex="0" role="button" aria-label="View related links" data-hveid="CGQQAQ" data-ved="2ahUKEwjgyvyPxaiMAxW3OjQIHZqEJ9gQ3fYKegQIZBAB">
<div class="niO4u">
<div class="kHtcsd"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div></li>
 	<li class="K3KsMc">
<div class="zMgcWd dSKvsb" data-il="">
<div data-crb-p="">
<div class="xFTqob">
<div class="Gur8Ad"><span data-huuid="2020438594556856699"><strong>Health-Related Social Needs (HRSN) benefits:</strong></span></div>
<div class="vM0jzc"><span data-huuid="2020438594556857660">Some members may be eligible for benefits designed to help with needs beyond healthcare, such as climate, housing, and nutrition support.<span class="pjBG2e" data-cid="12ad4ddc-1cff-4e96-95b9-51961a495fc6"><span class="UV3uM"> </span></span></span></div>
</div>
</div>
</div></li>
</ul>
</div>
</div>', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-26-at-12.59.31 PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '800-699-9075', NULL, 'https://www.oregon.gov/oha/hsd/ohp/pages/splash.aspx', (SELECT id FROM what_topics WHERE slug = 'benefits'), 'admin', '2025-03-26 20:12:42', '2025-04-03 20:01:27')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 50: Oregon One
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Oregon One', NULL, '<h1 class="or-page-title">Medical, Food, Cash and Child Care Benefits</h1>', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-26-at-1.15.05 PM.png', '6443 North Lombard Street', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.5859806, -122.7329486, '800-699-9075', NULL, 'https://www.oregon.gov/odhs/benefits/Pages/default.aspx', (SELECT id FROM what_topics WHERE slug = 'benefits'), 'admin', '2025-03-26 20:20:28', '2025-03-26 20:20:28')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 51: Latino Home Base Recovery (VOA)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Latino Home Base Recovery (VOA)', NULL, 'Home Base Recovery (HBR) is a comprehensive treatment program that facilitates men ages 18 and over in making positive life changes. We utilize the cultural strengths of each person to provide effective services. We provide substance abuse, problem gambling, mental health, and naturopathic medical services, and mentorship coupled with supportive housing.
<h2>Services Offered</h2>
<ul>
 	<li>Alcohol and drug treatment</li>
 	<li>Help for problem gamblers and their family members</li>
 	<li>Individual, family, and group counseling</li>
 	<li>Help to resolve DUIIs</li>
 	<li>Naturopathic medical services</li>
 	<li>Mental health services – counseling and medication</li>
 	<li>Personalized assessment, planning, and advocacy to meet everyone’s needs</li>
 	<li>Help for high-risk and/or gang-involved clients</li>
</ul>
<h2>Latino Home Base Recovery</h2>
Latino Home Base Recovery (LHBR) is a comprehensive treatment program that facilitates men ages 18 and over in making positive life changes. We utilize the cultural strengths of each person to provide effective services. We provide culturally specific services for substance abuse, problem gambling, mental health, and naturopathic medical services, and mentorship coupled with supportive housing.

Latino Home Base Recovery (LHBR) es un programa de tratamiento integral que facilita a los hombres mayores de 18 años realizar cambios positivos en la vida. Utilizamos las fortalezas culturales de cada persona para proporcionar servicios efectivos. Brindamos servicios culturalmente específicos para abuso de sustancias, problemas con el juego, salud mental y servicios médicos naturopáticos, y asesoría junto con viviendas de apoyo.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-26-at-1.49.33 PM.png', 'Portland', 'Portland', 'Oregon', NULL, NULL, 'United States', 45.5202471, -122.674194, '(503) 228-9229', NULL, 'https://www.voaor.org/resource-dir/supportive-housing/', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2025-03-26 20:50:15', '2025-03-26 20:50:15')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
END $$;

-- Resource 52: Harry Watson House (VOA)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Harry Watson House (VOA)', NULL, '<p class="p1">Home Base Recovery (HBR) is a comprehensive treatment program that facilitates men ages 18 and over in making positive life changes. We utilize the cultural strengths of each person to provide effective services. We provide substance abuse, problem gambling, mental health, and naturopathic medical services, and mentorship coupled with supportive housing.</p>
<p class="p2"><b>Services Offered</b></p>

<ul class="ul1">
 	<li class="li1">Alcohol and drug treatment</li>
 	<li class="li1">Help for problem gamblers and their family members</li>
 	<li class="li1">Individual, family, and group counseling</li>
 	<li class="li1">Help to resolve DUIIs</li>
 	<li class="li1">Naturopathic medical services</li>
 	<li class="li1">Mental health services – counseling and medication</li>
 	<li class="li1">Personalized assessment, planning, and advocacy to meet everyone’s needs</li>
 	<li class="li1">Help for high-risk and/or gang-involved clients</li>
</ul>
<p class="p2"><b>Harry Watson House</b></p>
<p class="p1">Harry Watson House is a comprehensive, culturally-specific treatment program that facilitates African American men ages 18 and over in making positive life changes. We utilize the relationship model built on the theory of kinship to include the support of blood relatives, chosen family, pastors or members of the clergy, extended family, or those persons identified as family members.</p>
<p class="p1">Complete the <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=o9vDaWK9tUmhMY1rJYG7f2pxeq952RNLidbJdVRQKDpUNVQ1REI1SEJINFU4TTRJVTUyVFZaQTBMQy4u"><span class="s2">Scheduling form</span></a> to submit a request for services. This form is open for new or returning individuals to outpatient services. Once we have received your request, our team will be in contact to schedule your appointment.</p>', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-26-at-1.52.59 PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(971) 227-6092', NULL, 'https://www.voaor.org/home-base-recovery/', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2025-03-26 20:53:36', '2025-03-26 20:53:36')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'By Appointment'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
END $$;

-- Resource 53: TANF Cash Benefits
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('TANF Cash Benefits', NULL, 'In Oregon, Temporary Assistance for Needy Families (TANF) is a program that provides monthly cass benefits to low-income families with children, aiming to help them achieve self-sufficiency through employment and community resources.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-27-at-12.08.04 PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '800-699-9075', NULL, 'https://www.oregon.gov/odhs/cash/Pages/tanf.aspx', (SELECT id FROM what_topics WHERE slug = 'children-support'), 'admin', '2025-03-27 19:08:47', '2025-03-27 19:09:58')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 54: JOBS Program for TANF Clients
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('JOBS Program for TANF Clients', NULL, '<h2 class="ms-rteElement-Heading2">How it works</h2>
Family coaches meet with families to learn about your strengths and make a plan to meet your goals. The program can help pay for things like transportation, car repairs, clothing and child care.

Some of the services include:
<ul>
 	<li>Training and work experience to help you get and keep a job</li>
 	<li>Support to get a high school diploma or GED</li>
 	<li>Help to get started in a trades or college degree program</li>
 	<li>Help securing a place to live</li>
 	<li>Support with parenting, making a budget and more</li>
 	<li>Help to find medical, mental health or substance use treatment services</li>
 	<li>English language learning</li>
</ul>', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-27-at-12.13.11 PM.png', '6443 North Lombard Street', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.5859806, -122.7329486, '971-673-5500', NULL, 'https://www.oregon.gov/odhs/cash/Pages/tanf-jobs.aspx', (SELECT id FROM what_topics WHERE slug = 'employment-career'), 'admin', '2025-03-27 19:13:54', '2025-03-27 19:13:54')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 55: Family Support and Connections Program
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Family Support and Connections Program', NULL, 'Being a parent can sometimes be stressful, and all families can use a little help from time to time. Family Support and Connections offers free, voluntary services to help reduce that stress. You can choose what support you want for your family. A Family Advocate from your community will help you get services that meet your needs.

<strong>Your Family Advocate may:</strong>
<ul>
 	<li>​Visit you at your home or at another place that ​works for you</li>
 	<li>Stay in touch on a regular basis</li>
 	<li>Identify your family''s strengths and challenges</li>
 	<li>Create a plan to meet your needs based on the specific services you want for your family</li>
 	<li>If you get support from other programs, they can partner with those programs​</li>
 	<li>Connect you with local resources</li>
 	<li>Connect you with support for immediate needs if you are in crisis​​</li>
</ul>', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-27-at-12.20.16 PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '503-945-5600', NULL, 'https://www.oregon.gov/odhs/children-youth/Pages/family-support.aspx', (SELECT id FROM what_topics WHERE slug = 'children-support'), 'admin', '2025-03-27 19:20:55', '2025-03-27 19:20:55')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 56: Employment Related Day Care (ERDC) program
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Employment Related Day Care (ERDC) program', NULL, 'The Employment Related Day Care (ERDC) program helps families who are working, in school, or receiving <span class="ui-provider hb b c d e f g h i j k l m n o p q r s t u v w x y z ab ac ae af ag ah ai aj ak" dir="ltr">Temporary Assistance for Needy Families</span> (TANF) pay for child care, including registration fees. We also work with partners across the state to help families find and keep good child care. <a href="https://public.govdelivery.com/accounts/ORDELC/subscriber/new?topic_id=ORDELC_21" target="_blank" rel="noopener">Sign up for email updates</a>

ERDC is a subsidy program. This means many families still pay part of the child care cost. This is called a copayment (copay).

ERDC now has a waitlist for most families applying to the program. The waitlist is open due to increased demand and limited funding. Families with specific needs can skip the waitlist and there are resources available to support families while they wait.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-27-at-12.21.54 PM.png', '6443 North Lombard Street', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.5859806, -122.7329486, '800-699-9075', NULL, 'https://www.oregon.gov/delc/programs/pages/erdc.aspx', (SELECT id FROM what_topics WHERE slug = 'children-support'), 'admin', '2025-03-27 19:25:36', '2025-03-27 19:25:36')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 57: Special Supplemental Nutrition Program for Women, Infants, a
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Special Supplemental Nutrition Program for Women, Infants, and Children (WIC)', NULL, '<blockquote class="ms-rteElement-BlockQuote"><span class="EOP SCXW82506187 BCX8" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}"><span class="TextRun SCXW20976442 BCX8" lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW20976442 BCX8">WIC is a place where families like yours get healthy food and a lot more.  WIC is for pregnant people, new and breastfeeding moms, and children under 5. WIC helps improve the health of mothers </span><span class="NormalTextRun SCXW20976442 BCX8">and supports a healthy start for infants and children </span><span class="NormalTextRun SCXW20976442 BCX8">through:</span></span><span class="EOP SCXW20976442 BCX8" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:160,&quot;335559740&quot;:259}"> </span>
</span></blockquote>
<blockquote class="ms-rteElement-BlockQuote">
<div class="SCXW235021551 BCX8">
<div class="ListContainerWrapper SCXW235021551 BCX8"><span class="TextRun SCXW235021551 BCX8" lang="EN-US" data-contrast="auto">- Nutrition education</span><span class="EOP SCXW235021551 BCX8" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:240}"> </span>
<span class="TextRun SCXW235021551 BCX8" lang="EN-US" data-contrast="auto">- Breastfeeding support</span><span class="EOP SCXW235021551 BCX8" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:240}"> </span>
<span class="TextRun SCXW235021551 BCX8" lang="EN-US" data-contrast="auto">- Healthy foods</span><span class="EOP SCXW235021551 BCX8" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:240}"> </span></div>
</div>
<div class="SCXW235021551 BCX8">
<div class="ListContainerWrapper SCXW235021551 BCX8"><span class="TextRun SCXW235021551 BCX8" lang="EN-US" data-contrast="auto">- Health screenings and referrals</span><span class="EOP SCXW235021551 BCX8" data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:240}"> </span></div>
</div></blockquote>', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-27-at-12.36.49 PM.png', '9000 North Lombard Street', 'Portland', 'Oregon', '97203', NULL, 'United States', 45.592355, -122.75745984699911, '971-673-0040', NULL, 'https://www.oregon.gov/oha/PH/HEALTHYPEOPLEFAMILIES/WIC/Pages/index.aspx', (SELECT id FROM what_topics WHERE slug = 'children-support'), 'admin', '2025-03-27 19:37:17', '2025-03-27 19:37:17')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 58: Community Warehouse Furnature
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Community Warehouse Furnature', NULL, 'Are you an individual looking to receive furniture?

If you are a case manager or an agency advocate, please <a href="https://www.communitywarehouse.org/partner-agencies/">click here</a> to learn the steps needed to partner with us.

<strong>Basic Information about the furniture bank and how to get services</strong>
<ul>
 	<li>What you will find in the warehouse:
<ul>
 	<li>The furnishings available usually include mattresses, couches, dining tables/chairs, armchairs, dressers, end tables, shelves, desks, lamps, bedding, kitchen items, and more.</li>
 	<li>Most of the items at Community Warehouse are gently-used (not brand new).</li>
 	<li>Our inventory is based on donations. We may not always have everything, but we will do our best to get you the basic items you need.</li>
</ul>
</li>
 	<li>Who do we help:  <strong>Any individual who is moving into stable housing</strong>. This includes but is not limited to:
<ul>
 	<li>Individuals moving off the street or out of shelters</li>
 	<li>Refugees and Immigrants</li>
 	<li>Veterans</li>
 	<li>Individuals coming out of incarceration</li>
 	<li>Individuals escaping domestic violence</li>
 	<li>Members of the BIPOC and LGBTQIA+ communities</li>
 	<li>And many more</li>
</ul>
</li>
 	<li>We require that all individuals work with a case manager or advocate from one of our partner agencies to get access to the furniture bank.
<ul>
 	<li>If you already have a case manager, reach out to them to see if they can assist you in getting an appointment.</li>
 	<li>If you do not have a case manager, refer to the list below of agencies that we work with to find an agency to assist you.</li>
</ul>
</li>
</ul>', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-27-at-1.24.30 PM.png', '3961 Northeast Martin Luther King Junior Boulevard', 'Portland', 'Oregon', '97212', NULL, 'United States', 45.55154610204082, -122.66167687755102, '503.235.8786', NULL, 'https://www.communitywarehouse.org/get-furniture/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2025-03-27 20:24:59', '2025-03-27 20:24:59')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 59: Men’s Residential Treatment Center (MRC) (VOA)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Men’s Residential Treatment Center (MRC) (VOA)', NULL, '<span data-ogsc="rgb(36, 36, 36)" data-olk-copy-source="MessageBody">The Volunteers of America Men’s Residential Center (MRC) is a 54-bed residential substance use </span><span data-ogsc="rgb(12, 100, 192)">(and concurrent outpatient mental health) </span><span data-ogsc="rgb(36, 36, 36)">treatment facility for men referred by the Multnomah County </span><span data-ogsc="rgb(12, 100, 192)">and/or Federal </span><span data-ogsc="rgb(36, 36, 36)">criminal justice system. Many began using substances as early as age</span><span data-ogsc="red"> ten </span><span data-ogsc="rgb(36, 36, 36)">and </span><span data-ogsc="rgb(12, 100, 192)">do not know life</span><span data-ogsc="rgb(36, 36, 36)"> without crime.</span><span data-ogsc="black"> </span>

<span data-ogsc="rgb(36, 36, 36)">During </span><span data-ogsc="red">17 weeks </span><span data-ogsc="rgb(36, 36, 36)">of intensive, </span><span data-ogsc="red">skills</span><span data-ogsc="rgb(12, 100, 192)">-</span><span data-ogsc="red">focused </span><span data-ogsc="rgb(36, 36, 36)">treatment, the MRC </span><span data-ogsc="rgb(12, 100, 192)">counselors and staff</span><span data-ogsc="rgb(36, 36, 36)"> develop therapeutic relationships with clients and </span><span data-ogsc="rgb(12, 100, 192)">create</span><span data-ogsc="rgb(36, 36, 36)"> an environment where the men learn </span><span data-ogsc="red">recovery-based and </span><span data-ogsc="rgb(36, 36, 36)">prosocial living skills. </span><span data-ogsc="red">Clients graduate when they </span><span data-ogsc="rgb(12, 100, 192)">complete the treatment curriculum</span><span data-ogsc="red">, have a solid recovery plan and support group, employment, safe housing, and are enrolled in outpatient treatment. The MRC provides 12 beds of transitional alcohol and drug free housing next door at the Sacramento </span><span data-ogsc="rgb(12, 100, 192)">Recovery </span><span data-ogsc="red">House. </span><span data-ogsc="rgb(12, 100, 192)">MRC graduates may live there rent-free for up to </span><span data-ogsc="red">three months. This provides them </span><span data-ogsc="rgb(12, 100, 192)">with </span><span data-ogsc="red">the opportunity to save money so they can </span><span data-ogsc="rgb(12, 100, 192)">afford and </span><span data-ogsc="red">transition into long</span><span data-ogsc="rgb(12, 100, 192)">-</span><span data-ogsc="red">term housing. </span>

To receive treatment from our Men''s Residential Center, individuals must be referred by Multnomah County; this includes those involved with Multnomah County Department of Community Justice or the Federal Probation/Parole system.', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-27-at-1.28.15 PM.png', '2318 Northeast Martin Luther King Junior Boulevard', 'Portland', 'Oregon', '97212', NULL, 'United States', 45.53978205, -122.66135019999999, '(503) 235-8655', NULL, 'https://www.voaor.org/resource-dir/mens-residential-treatment-center-mrc/', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2025-03-27 20:29:04', '2025-03-27 20:29:04')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Men'));
END $$;

-- Resource 60: Community Vision
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Community Vision', NULL, '<p class="hero-headline">Community Vision provides services, education, and advocacy to ensure that people with disabilities direct their own lives.
We envision a world where people with disabilities are included, accepted, and able to live a life they choose.</p>

<ul>
 	<li>Providing staff support to people who live in their own home.</li>
 	<li>Guidance on finding and maintaining an apartment.</li>
 	<li>Job search services and on-site training and support.</li>
 	<li>Consultations and resources to find assistive technology solutions.</li>
</ul>', 'https://resources.reentryresource.org/wp-content/uploads/2025/03/Screenshot-2025-03-27-at-2.02.59 PM.png', '2475 SE Ladd Ave. Portland, OR 97214', 'Portland', 'Oregon', '97214', NULL, 'United States', 45.505007818791945, -122.64545489932887, '503-292-4964', NULL, 'https://cvision.org/', (SELECT id FROM what_topics WHERE slug = 'employment-career'), 'admin', '2025-03-27 21:04:05', '2025-03-27 21:04:05')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 61: Recovery Works NW
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Recovery Works NW', NULL, '<span class="sqsrte-text-color--black">Get Help for Substance Addictions, DUII, and Mental Health Issues.</span>

We can help you with:
<ul>
 	<li>Medications for Addictions</li>
 	<li>Inpatient Detoxification</li>
 	<li>Addiction Counseling</li>
 	<li>Mental Health Therapy</li>
 	<li>DUII Diversion Program</li>
 	<li>Peer Support</li>
</ul>
- Transportation to Detox
- Stabilization
- Outpatient
- Long Term Recovery
- Case Management
- OHP', 'https://resources.reentryresource.org/wp-content/uploads/2025/04/Screenshot-2025-04-02-at-11.22.24 AM.png', '12612 Southeast Stark Street', 'Portland', 'Oregon', '97233', NULL, 'United States', 45.519127112244895, -122.53330969387754, '(503) 906-9995', NULL, 'https://www.recoveryworksnw.com/', (SELECT id FROM what_topics WHERE slug = 'detox'), 'admin', '2025-04-02 18:23:01', '2026-05-07 19:05:21')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 62: Fora Health
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Fora Health', NULL, 'Fora Health provides treatment, care and advocacy for all who are affected by substance use disorder.

Admission for Fora Health’s Withdrawal Management program is an in-person, walk-in process. Individuals should arrive at our facility at 10230 SE Cherry Blossom Dr., Portland, OR 97216 by 7:30 am Monday–Saturday. Saturdays we are only able to accept OHP patients.
<div class="w-1/4 px-6 my-10 border-r-2 border-purple-50 lg:w-1/6">
<ul>
 	<li>Same Day Care</li>
 	<li>Self Assessment</li>
 	<li>Payment Options</li>
 	<li>Verify Your Insurance</li>
 	<li>Current Patients &amp; Families</li>
 	<li>Withdrawal Management (Detox)</li>
 	<li>Residential Treatment</li>
 	<li>Outpatient Treatment</li>
 	<li>DUII Program</li>
 	<li>Medically Monitored Treatment</li>
 	<li>Peer Recovery Mentors</li>
 	<li>Family Therapy</li>
 	<li>Medications for Addiction Treatment (MAT)</li>
 	<li>Treatment FAQs</li>
 	<li>Resources</li>
</ul>
</div>
<p class="w-1/4 px-6 my-10 border-r-2 border-purple-50 lg:w-1/6"></p>

<div class="w-1/4 px-6 my-10 border-r-2 border-purple-50 lg:w-1/6"></div>', 'https://resources.reentryresource.org/wp-content/uploads/2025/04/Screenshot-2025-04-02-at-11.28.48 AM.png', '10230 Southeast Cherry Blossom Drive', 'Portland', 'Oregon', '97216', NULL, 'United States', 45.51593045, -122.55703896196638, '(503) 535-1151', NULL, 'https://forahealth.org/', (SELECT id FROM what_topics WHERE slug = 'detox'), 'admin', '2025-04-02 18:29:28', '2025-04-02 18:29:28')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Walk In'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 63: National Alliance on Mental Illness (NAMI)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('National Alliance on Mental Illness (NAMI)', NULL, 'Our free Peer Delivered Services offer peer-based mental health support for those who are seeking additional guidance as they navigate their mental health journey. Peer Delivered Services can offer peer-based understanding, support in navigating and connecting to necessary resources, assistance in creating personalized care plans, and more. Each of our programs are unique and offer support to various peer populations. Explore our programs below to find out more information.
<p class=""><a href="https://www.namimultnomah.org/nami-connects"><strong>NAMI Connects</strong></a> - Peer-based mental health support and navigation program designed for those who enter hospital emergency room departments.</p>
<p class=""><a href="https://www.namimultnomah.org/vbhpss"><strong>Veteran Peer Support Services</strong></a> - Peer-based support for Veterans and Active/Prior Military Service Members living with mental health conditions.</p>
<p class=""><a href="https://www.namimultnomah.org/veteran-family-support-services" target="_blank" rel="noopener"><strong>Veteran Family Support Services</strong></a> - Peer-based support for the family members and close loved ones of Veterans and Active/Prior Military Service Members living with mental health conditions.</p>
<p class=""><a href="https://www.namimultnomah.org/mrss"><strong>Mobile Response and Stabilization Services</strong> </a>- Family Partners offer comprehensive, collaborative care that supports a youth and family in acute crises.</p>
<p class=""><a href="https://www.namimultnomah.org/wraparound-family-partners"><strong>Wraparound</strong></a> - Family Partners collaborate with children, family members, friends, service providers and community members to create an individualized plan for addressing a child’s needs.</p>', 'https://resources.reentryresource.org/wp-content/uploads/2025/04/Screenshot-2025-04-02-at-12.45.12 PM.png', '464 Southeast 185th Avenue', 'Gresham', 'Oregon', '97233', NULL, 'United States', 45.51942916326531, -122.47276361224489, '503-228-5692', NULL, 'https://www.namimultnomah.org/peer-delivered-services', (SELECT id FROM what_topics WHERE slug = 'peer-support'), 'admin', '2025-04-02 19:45:51', '2025-04-02 19:45:51')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Veterans'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 64: Ticket to Work Program
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Ticket to Work Program', NULL, 'Social Security''s <a href="https://choosework.ssa.gov/">Ticket to Work</a> (Ticket) Program supports career development for people ages 18 through 64 who receive Social Security disability benefits and want to work. The Ticket Program is free and voluntary. It helps people with disabilities move toward financial independence and connects them with the services and support they need to succeed in the workforce.', 'https://resources.reentryresource.org/wp-content/uploads/2025/04/Screenshot-2025-04-10-at-10.59.33 AM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1-866-968-7842', NULL, 'https://choosework.ssa.gov/', (SELECT id FROM what_topics WHERE slug = 'employment-career'), 'admin', '2025-04-10 18:00:13', '2025-04-10 18:00:13')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 65: Indeed Job Site
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Indeed Job Site', NULL, 'Indeed is the #1 job site in the world<sup>1 </sup>and a global job matching and hiring platform.', 'https://resources.reentryresource.org/wp-content/uploads/2025/04/Screenshot-2025-04-10-at-11.02.23 AM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.indeed.com/', (SELECT id FROM what_topics WHERE slug = 'employment-career'), 'admin', '2025-04-10 18:04:59', '2025-04-10 18:05:12')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 66: Recovery Network of Oregon
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Recovery Network of Oregon', NULL, 'Whether you are just starting out, are a family or friend, or are in long-term recovery, you are not alone. Search the directory now or reach out for support.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-16-at-2.07.43-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://recoverynetworkoforegon.org/', NULL, 'admin', '2026-04-16 21:08:42', '2026-04-16 21:08:42')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 67: Oregon Recovery Residences
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Oregon Recovery Residences', NULL, 'The Oregon Recovery Residences Registry is a free to use service aimed at providing up-to-date information on recovery housing in Oregon.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-17-at-4.04.45-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.oregonrecoveryresidences.org/en/', NULL, 'admin', '2026-04-17 23:09:45', '2026-04-17 23:09:45')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 68: Iron Tribe
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Iron Tribe', NULL, '<strong>Iron Tribe Network (ITN) is a Community of Belonging</strong> where people can be understood and accepted. Iron Tribe Network provides peer support, housing and family reunification services to individuals and families overcoming pressures and barriers while in transition to leading a life that reflects their values.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-17-at-4.19.30-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(503) 344-6710', NULL, 'https://www.irontribenetwork.org/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2026-04-17 23:21:04', '2026-04-17 23:21:04')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 69: Sober Housing Oregon
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Sober Housing Oregon', NULL, 'Welcome to Sober Housing Oregon LLC!
We offer safe, stable, and structured sober housing for both men and women throughout Oregon. Our mission is to provide an environment that promotes long-term recovery and personal growth through peer support and accountability.
At SHO, you can build the skills and connections needed to transition successfully into a self-supporting life. Your new beginning starts now.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-17-at-4.26.39-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '971-337-4587', NULL, 'https://www.soberhousingoregonllc.com/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2026-04-17 23:27:19', '2026-04-17 23:27:19')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 70: Bridges to Change
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Bridges to Change', NULL, 'Bridges to Change is one of the largest peer-led organizations in the state of Oregon.  BTC was founded in 2004 with an aim to support people on their path to recovery.  BTC continues to support participants on their recovery journeys through a combination of community-based housing, peer delivered services and behavioral health treatment.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-17-at-4.38.37-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.bridgestochange.com/', (SELECT id FROM what_topics WHERE slug = 'mental-behavioral-health'), 'admin', '2026-04-17 23:39:10', '2026-04-17 23:39:10')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 71: HMIT Referral for Services
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('HMIT Referral for Services', NULL, 'Multnomah County Aging, Veterans, Disability Services (ADVSD) operates Homeless Mobile Intake Team  <a href="https://multco.us/news/homeless-mobile-intake-team-bringing-older-adults-and-those-disabilities-caring-home">HMIT</a> which helps elders and people with disabilities experiencing homelessness connect to care settings or reconnect to services.

Learn more and seek services by:
<ul>
 	<li aria-level="1">Emailing <a href="mailto:hmit@multco.us">hmit@multco.us</a></li>
 	<li aria-level="1">Submitting an <a href="https://app.smartsheet.com/b/form/6a61de9da2ed4e83b651a90f9ce65e09">Referral Sheet </a></li>
 	<li aria-level="1">Contacting the ADRC at 1-855-ORE-ADRC (1-855-673-2372)</li>
</ul>
<p class="p1">4-6 week turn around on contact (is this still true?)</p>', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-17-at-5.37.28-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1-855-673-2372', NULL, 'https://app.smartsheet.com/b/form/6a61de9da2ed4e83b651a90f9ce65e09', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2026-04-18 00:38:25', '2026-04-18 00:38:25')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Seniors'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People with Disabilities'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Veterans'));
END $$;

-- Resource 72: William Temple House
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('William Temple House', NULL, 'William Temple House offers food, counseling, clothing, and household items to our Portland-area neighbors. We envision a future where everyone in our community is fully nourished—emotionally, physically, and spiritually.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-17-at-6.04.08-PM.png', '2230 Northwest Glisan Street', 'Portland', 'Oregon', '97205', NULL, 'United States', 45.526119, -122.6971504, '503-222-3328', NULL, 'https://www.williamtemple.org/', (SELECT id FROM what_topics WHERE slug = 'clothing'), 'admin', '2026-04-18 01:04:34', '2026-04-18 01:04:34')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 73: Rose City Detox
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Rose City Detox', NULL, 'Rose City Detox provides focused medical detoxification in a private, campus-style setting. With individual rooms, 24/7 clinical oversight, and structured discharge planning, we offer comfort and clarity during one of the most critical moments in recovery.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-17-at-6.06.26-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.rosecitydetox.com/', (SELECT id FROM what_topics WHERE slug = 'detox'), 'admin', '2026-04-18 01:08:40', '2026-04-18 01:08:40')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 74: Pacific Crest Trail Detox
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Pacific Crest Trail Detox', NULL, 'Is addiction dictating your life? At Pacific Crest Trail Detox, our all-encompassing approach merges medical treatment with clinical care to guarantee a lasting recovery—beginning on day one.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-17-at-6.11.11-PM.png', '10600 Southeast McLoughlin Boulevard', 'Milwaukie', 'Oregon', '97222', NULL, 'United States', 45.4459484, -122.6423845, '(844) 692-7528', NULL, 'https://pctdetox.com/', (SELECT id FROM what_topics WHERE slug = 'detox'), 'admin', '2026-04-18 01:15:02', '2026-04-18 01:15:02')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 75: 211info
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('211info', NULL, '211info empowers Oregon communities by helping people identify, navigate, and connect with local resources.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-18-at-6.47.22-PM.png', NULL, NULL, NULL, NULL, NULL, 'United States', NULL, NULL, '211 or 866-698-6155', NULL, 'https://www.211info.org/', NULL, 'admin', '2026-04-19 01:48:55', '2026-05-07 03:36:34')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 76: Findhelp
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Findhelp', NULL, 'Findhelp has resources for food pantries and meal programs near you. You can also find housing, financial assistance, health care, and more.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-18-at-7.02.35-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.findhelp.org/', NULL, 'admin', '2026-04-19 02:03:36', '2026-04-19 02:03:36')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 77: Shelter Bridge
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Shelter Bridge', NULL, '<div class="fe-block fe-block-511548d1bdaccfb3cf74">
<div id="block-511548d1bdaccfb3cf74" class="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block" data-block-css="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.html/8636d61b-54e9-4d33-8bb8-0228d44c3611_445/website.components.html.styles.css&quot;]" data-block-scripts="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.html/8636d61b-54e9-4d33-8bb8-0228d44c3611_445/website.components.html.visitor.js&quot;]" data-block-type="1337" data-definition-name="website.components.html" data-sqsp-block="text" data-website-component-id="511548d1bdaccfb3cf74">
<div class="sqs-block-content">
<div class="sqs-text-block-container">
<div class="sqs-html-content" data-sqsp-text-block-content="">

Empowering Homeless Individuals Globally Through Technology.

</div>
</div>
</div>
</div>
</div>
<div class="fe-block fe-block-64c3bbec8f76e1edd1ab">
<div id="block-64c3bbec8f76e1edd1ab" class="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block" data-block-css="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.html/8636d61b-54e9-4d33-8bb8-0228d44c3611_445/website.components.html.styles.css&quot;]" data-block-scripts="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.html/8636d61b-54e9-4d33-8bb8-0228d44c3611_445/website.components.html.visitor.js&quot;]" data-block-type="1337" data-definition-name="website.components.html" data-sqsp-block="text" data-website-component-id="64c3bbec8f76e1edd1ab">
<div class="sqs-block-content">
<div class="sqs-text-block-container">
<div class="sqs-html-content" data-sqsp-text-block-content="">
<p class="">Founded by youth, guiding individuals to essential resources and free accommodations. Uniting hearts to make a difference.</p>

</div>
</div>
</div>
</div>
</div>', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-18-at-7.05.11-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://www.shelterbridge.org/', NULL, 'admin', '2026-04-19 02:05:44', '2026-04-19 02:05:44')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 78: Oregon Law Help
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Oregon Law Help', NULL, 'The legal system can feel overwhelming.
We''re here to make things easier.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-18-at-7.15.35-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://oregonlawhelp.org/', (SELECT id FROM what_topics WHERE slug = 'legal'), 'admin', '2026-04-19 02:16:38', '2026-04-19 02:16:38')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Immigrants, Refugees, Asylum Seekers'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People with Disabilities'));
END $$;

-- Resource 79: 4D Recovery
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('4D Recovery', NULL, '4D Recovery is a peer-led Recovery Community Organization that serves young people ages 14–35 who are recovering from substance use and co-occurring mental health challenges. We provide welcoming, youth and young adult–driven spaces where recovery is accessible, empowering, and fun. At the heart of 4D’s work are our Recovery Community Centers—vibrant, peer-led spaces where young people can find connection, support, and belonging. Our peer mentors, who bring lived experience to their roles, are the cornerstone of everything we do. Through genuine relationships, they help others navigate recovery, set goals, and build meaningful lives.

We also offer a comprehensive Continuum of Care, including: Substance use disorder treatment, co-capable mental health services, family therapy, medications for opioid use disorder (MOUD), and recovery supportive housing at multiple levels. We partner with communities, systems, and individuals to remove barriers and make long-term recovery possible for all youth and young adults—by young people, for young people.

Offers peer services focused on drug/alcohol addiction recovery, including meetings plus has drop-in community centers in Gresham, Happy Valley and Hillsboro. No charge for their services.

Prefers contact/referrals via website, click on Get a Mentor (<a href="https://4drecovery.jotform.com/20288669898808" target="_blank" rel="noopener" data-saferedirecturl="https://www.google.com/url?q=https://4drecovery.jotform.com/20288669898808&amp;source=gmail&amp;ust=1777044659074000&amp;usg=AOvVaw2Fu6umlm6-P149iRkgM-nr">https://4drecovery.jotform.<wbr />com/20288669898808</a>) Can take up to 72 hours.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-8.39.08-AM.png', NULL, 'Portland', 'Oregon', NULL, NULL, 'United States', NULL, NULL, '(971) 703-4623', NULL, 'https://4drecovery.org/', (SELECT id FROM what_topics WHERE slug = 'peer-support'), 'admin', '2026-04-23 15:44:59', '2026-04-23 15:44:59')
  RETURNING id INTO rid;
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Walk In'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 80: Alano Club
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Alano Club', NULL, 'By owning and operating a beautiful, historic community center that hosts the largest and most diverse offering of mutual-aid support meetings and recovery services in Oregon, the Alano Club of Portland is able to bring healing, hope and solutions to more than 10,000 visitors each month. There’s no other recovery support center of its kind in the area, where recovering individuals can go—free of charge—to receive the level of life-long support they need in their journey to addiction recovery. Ours is a safe, loving and inviting home for more than 100 weekly recovery support meetings, recovery seminars and workshops, yoga and meditation classes, sobriety-based social events, information and referral services for treatment resources, and holiday celebrations for the recovery community.

&nbsp;

They also have The Recovery Gym (other location): https://www.therecoverygym.org/

All TRG classes, workshops, events and services are <strong>FREE for anyone in or seeking recovery</strong> — however they define it — from substance use and mental health disorders, disordered eating, trauma and grief. Allies who do not identify as in recovery but would like to utilize our FREE services are welcome to join, once they have had two introductory sessions with a trainer/coach.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-8.46.10-AM.png', '909 Northwest 24th Avenue', 'Portland', 'Oregon', '97210', NULL, 'United States', 45.529256, -122.7009323, '(503) 222-5756', NULL, 'https://www.portlandalano.org/home', (SELECT id FROM what_topics WHERE slug = 'peer-support'), 'admin', '2026-04-23 15:59:29', '2026-04-23 15:59:29')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 81: The Recovery Gym
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('The Recovery Gym', NULL, 'The Recovery Gym (TRG) is the Pacific Northwest’s first fitness center dedicated to helping people on the path to recovery for substance use and mental health disorders, and the first of its kind—anywhere—to merge fitness, data and mentorship to do so.

All TRG classes, workshops, events and services are <strong>FREE for anyone in or seeking recovery</strong> — however they define it — from substance use and mental health disorders, disordered eating, trauma and grief. Allies who do not identify as in recovery but would like to utilize our FREE services are welcome to join, once they have had two introductory sessions with a trainer/coach.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-9.03.06-AM.png', '931 Southeast 6th Avenue', 'Portland', 'Oregon', '97214', NULL, 'United States', 45.5162403, -122.6598529, NULL, NULL, 'https://www.therecoverygym.org/', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2026-04-23 16:04:56', '2026-04-23 16:04:56')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 82: Juntos NW
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Juntos NW', NULL, 'Juntos NW expands access to behavioral health for Latino/a/x/e and Indigenous communities through outreach, education, and collective action, so our communities can live healthy, joyful, and thriving lives.
<h3 class="wp-block-heading alignwide">Abuelos Transitional Recovery Housing Program</h3>
<p class="is-service-description wp-block-paragraph">Abuelo’s Transitional Recovery Housing program offers culturally and linguistically specific recovery housing, fostering the growth and well-being of the Latino/e community within a supportive, familial, and communal environment. This holistic approach helps individuals reconnect with the core cultural values of “familia” and community bonds elements often overshadowed by the challenges of addiction. To find our more about Abuelo’s Transitional Recovery Housing and get on the waitlist please contact: <strong>503-449-9126</strong> or <strong>971-500-2064</strong>.</p>', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-9.31.22-AM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '503-449-9126', NULL, 'https://juntosnw.com/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2026-04-23 16:32:13', '2026-04-23 16:32:13')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 83: Just Men in Recovery
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Just Men in Recovery', NULL, 'Culturally Specific Peer Support Services for African American men and youth. Offering a yearly Men’s Retreats, Peer to Peer services, sponsorship, outreach and support.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-9.35.59-AM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://justmeninrecovery.com/', (SELECT id FROM what_topics WHERE slug = 'peer-support'), 'admin', '2026-04-23 16:36:46', '2026-04-23 16:36:46')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 84: The Peer Company
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('The Peer Company', NULL, '<div>
<p dir="ltr"><span data-olk-copy-source="MessageBody">The Peer Company is an inclusive, peer-run nonprofit that supports recovery and wellness through lived experience. We walk alongside people wherever they are in their journey, offering peer delivered services, including education, advocacy, recovery support, outreach, training, technical assistance, re-entry services, and connection to additional services, such as Housing, Detox, and treatment. . Everything we do is grounded in community, empowerment, and self-determined choice.</span></p>
<p dir="ltr"></p>

</div>
<div>
<p dir="ltr"><span data-ogsc="black">On September 1, 2025, we became The Peer Company, transitioning from our former name, the Mental Health &amp; Addiction Association of Oregon. </span></p>

</div>', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-9.37.43-AM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://thepeercompany.org/', (SELECT id FROM what_topics WHERE slug = 'mental-behavioral-health'), 'admin', '2026-04-23 16:42:30', '2026-04-23 16:42:30')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 85: Miracles Club
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Miracles Club', NULL, 'The Miracles Club is a Black, Peer led, Recovery Center, committed to providing safe spaces for marginalized, historically oppressed racial and ethnic groups. We serve all individuals looking to find freedom and/or reduce harm from alcohol and drug abuse. Our mission is to maintain a recovery focused environment where all people feel safe to heal.

Miracles is a community recovery center that offers addiction peer services to the African American Community, a fellowship hall, a wellness program, events, and meeting space for community recovery meetings.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-9.43.28-AM.png', '4200 Northeast Martin Luther King Junior Boulevard', 'Portland', 'Oregon', '97211', NULL, 'United States', 45.5540198, -122.6612256, '(503) 249-8559', NULL, 'https://www.miraclesclub.org/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2026-04-23 16:51:08', '2026-04-23 16:51:08')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 86: Painted Horse Recovery
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Painted Horse Recovery', NULL, 'Painted Horse Recovery has drop-in support at our recovery center for Native Americans and all who are looking for culturally specific services.  These services are open to anyone wanting recovery support and they include 12 step meetings, such as wellberiety, Native based AA, NA, recovery events, skill building groups, and culture nights for Native American families.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-10.07.18-AM.png', '10209 Southeast Division Street', 'Portland', 'Oregon', '97266', NULL, 'United States', 45.5047641, -122.5583029, '971-205-5144', NULL, 'https://www.paintedhorserecovery.org/', (SELECT id FROM what_topics WHERE slug = 'peer-support'), 'admin', '2026-04-23 17:07:57', '2026-04-23 17:07:57')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Walk In'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 87: P:ear
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('P:ear', NULL, 'p:ear builds positive relationships with youth experiencing homelessness, ages 15 to 25, through education, art, recreation and job training to affirm personal worth and create more meaningful and healthier lives.

Since 2002, p:ear has mentored over 5,200 youth and provided over 320,000 hours of healthy, engaging and nurturing programs. p:ear has identified a strong model for working with homeless youth: assist them to recognize themselves as capable people while providing truly supportive relationships and opportunities for growth while they navigate the personal and difficult journey out of street life. We love these kids.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-10.12.23-AM.png', '338 Northwest 6th Avenue', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.5257641, -122.676224, '503-228-6677', NULL, 'https://www.pearmentor.org/', (SELECT id FROM what_topics WHERE slug = 'employment-career'), 'admin', '2026-04-23 17:16:50', '2026-04-23 17:16:50')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
END $$;

-- Resource 88: Quest Center for Integrative Health
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Quest Center for Integrative Health', NULL, '<strong><em>Our mission is to provide integrative healthcare services, community, and education to all people seeking a wellness-focused approach to living and dying. </em></strong>Quest Center is committed to providing the best integrated behavioral and physical health services. More than 85% of our clients are low income and/or medically un-insured or under-insured. The Oregon Health Plan as well as other commercial insurance plans are welcomed at Quest Center.
<p class="">Our doors are open to all who seek a life of health and wellness. We strongly believe that all of our clients should have access to excellent service regardless of their income, insurance, gender, sexual orientation, religion, national origin, race, ethnicity, disability, veteran status, HIV status, or chronic health conditions.</p>
<p class=""><strong>Our three primary service communities are low-income, people living with HIV, and LGBTQIA2S+.</strong></p>', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-10.27.57-AM.png', '3231 Southeast 50th Avenue', 'Portland', 'Oregon', '97206', NULL, 'United States', 45.4991215, -122.6116285, '(503) 238-5203', NULL, 'https://quest-center.org/', (SELECT id FROM what_topics WHERE slug = 'medical'), 'admin', '2026-04-23 17:27:45', '2026-04-23 17:31:15')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'LGBTQIA2S+'));
END $$;

-- Resource 89: True Colors
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('True Colors', NULL, 'To provide recovery support services to LGBTQIA2S+ individuals, 18 and older, that affirms identity and allows people to stay true to their-self.

True Colors will provide recovery community centers (open six days a week) where individuals can access a variety of recovery support services. Our centers are substance free environments where individuals can feel safe and have the opportunity to expand their recovery network. Other services available at our centers include but are not limited to mutual-aid groups, LGBTQIA2s+ focused events, access to on site STD and Hep C testing, resource navigation fairs, and skill-building opportunities.

True colors provides free substance use recovery peer services to individuals 18 and older. These services are provided by Certified Recovery Mentors(CRM) that identify as LGBTQIA2S+ or allies.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-10.37.23-AM.png', '3807 Northeast Martin Luther King Junior Boulevard', 'Portland', 'Oregon', '97212', NULL, 'United States', 45.550194, -122.6616887, '971-252-1943', NULL, 'https://www.truecolorsrecovery.org/', (SELECT id FROM what_topics WHERE slug = 'peer-support'), 'admin', '2026-04-23 17:38:01', '2026-04-23 17:38:01')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'LGBTQIA2S+'));
END $$;

-- Resource 90: The Pathfinder Network
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('The Pathfinder Network', NULL, 'The Pathfinder Network provides justice system-impacted individuals and families with the tools and support they need to be safe and thrive in our communities. We offer programs and services for incarcerated individuals through the Oregon Department of Corrections (ODOC) and for parents, children and families in the community.

<strong>We facilitate multiple programs</strong> for the Oregon Department of Corrections, including Parenting Inside Out®, and offer prevention and intervention programming for the segregation population.

In the community, the Center for Family Success in Multnomah County offers parenting classes, reentry mentoring support for justice-involved mothers and fathers, early childhood home visiting, peer mentoring, case management, and mentoring and intervention programs for children of justice-involved parents.', 'https://resources.reentryresource.org/wp-content/uploads/2026/04/Screenshot-2026-04-23-at-10.50.15-AM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '503-892-5396', NULL, 'https://www.thepathfindernetwork.org/', (SELECT id FROM what_topics WHERE slug = 'peer-support'), 'admin', '2026-04-23 17:50:52', '2026-04-23 17:50:52')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 91: Cell Phones For Soldiers
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Cell Phones For Soldiers', NULL, 'Cell Phones For Soldiers is a national non profit organization dedicated to providing cost-free communication services and emergency funding to active-duty military members and veterans', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-04-30-at-8.06.27-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1-800-982-0972', NULL, 'https://cellphonesforsoldiers.com/', (SELECT id FROM what_topics WHERE slug = 'phone'), 'admin', '2026-05-01 03:07:08', '2026-05-01 03:07:08')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Veterans'));
END $$;

-- Resource 92: Clear Clinic
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Clear Clinic', NULL, '<div class="fe-block fe-block-d7355d56a78d6ac00993">
<div id="block-d7355d56a78d6ac00993" class="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block" data-block-css="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.html/89e5858d-54a2-4261-afbf-68334248cc62_489/website.components.html.styles.css&quot;]" data-block-scripts="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.html/89e5858d-54a2-4261-afbf-68334248cc62_489/website.components.html.visitor.js&quot;]" data-block-type="1337" data-definition-name="website.components.html" data-sqsp-block="text" data-website-component-id="d7355d56a78d6ac00993">
<div class="sqs-block-content">
<div class="sqs-text-block-container">
<div class="sqs-html-content" data-sqsp-text-block-content="">
<p class="preFade fadeIn">We are a nonprofit collective of legal workers</p>

</div>
</div>
</div>
</div>
</div>
<div id="block-4b6e5302cc3bd3ce386a" class="sqs-block website-component-block sqs-block-website-component sqs-block-html html-block" data-block-css="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.html/89e5858d-54a2-4261-afbf-68334248cc62_489/website.components.html.styles.css&quot;]" data-block-scripts="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.html/89e5858d-54a2-4261-afbf-68334248cc62_489/website.components.html.visitor.js&quot;]" data-block-type="1337" data-definition-name="website.components.html" data-sqsp-block="text" data-website-component-id="4b6e5302cc3bd3ce386a">
<div class="sqs-block-content">
<div class="sqs-text-block-container">
<div class="sqs-html-content" data-sqsp-text-block-content="">
<h4 class="preFade fadeIn">who provide free legal services to Oregonians. We aim to tear down legal barriers that stop our community from enjoying each members’ full participation; to find legal, educational, and systemic solutions to racial, social, and economic injustice; and to work toward <span class="sqsrte-text-highlight" data-text-attribute-id="42e04284-f9c4-4093-9887-ac6a210f6ef5">dismantling oppressive legal systems</span>.</h4>
</div>
</div>
</div>
</div>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">We have three legal programs: record relief &amp; self-determination, housing justice, and immigration justice. </span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-highlight" data-text-attribute-id="81e730c0-79a2-449b-ac0e-30ed30a086d7"><span class="sqsrte-text-color--white">Record Relief &amp; Self-determination:</span></span>:</p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">Our record relief and self-determination program provides two to three drop-in legal clinics per week all over the Portland metro (tri-county) area, including at recovery centers, community-based organizations, and our office. We also provide legal clinics for people in Oregon prisons, at all nine federally-recognized tribal nations in the state, and at other locations around Oregon. At these drop-in clinics we offer </span><span class="sqsrte-text-highlight" data-text-attribute-id="7ee47aa4-31d8-4335-a791-328e855d1a1e"><span class="sqsrte-text-color--white"><strong>criminal record expungements, court fines and fee waiver assistance, eviction expungements, legal name and gender-marker changes</strong></span></span><span class="sqsrte-text-color--white">, enrollment in our immigration programs, and more. </span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">Check our our calendar of drop-in legal clinics here at the “drop-in clinics” tab above. </span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">This program also provides pro se and limited scope assistance with </span><span class="sqsrte-text-highlight" data-text-attribute-id="7213910e-a11d-409c-93ea-6b5cd1dba3e5"><span class="sqsrte-text-color--white"><strong>SB 819 applications</strong></span></span><span class="sqsrte-text-color--white"> for non-expungeable felony relief; </span><span class="sqsrte-text-highlight" data-text-attribute-id="fadd429b-246d-441e-9b23-1a8cf321d50a"><span class="sqsrte-text-color--white"><strong>legal services and resources to incarcerated Oregonians</strong> </span></span><span class="sqsrte-text-color--white">through a partnership with ACLU of Oregon; </span><span class="sqsrte-text-highlight" data-text-attribute-id="969749bf-478e-4c22-b5f9-0ec00ff79975"><span class="sqsrte-text-color--white"><strong>habeas corpus legal services</strong></span></span><span class="sqsrte-text-color--white"> to people in prison in Oregon; and open access legal name and gender-marker changes. </span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-highlight" data-text-attribute-id="92d203f7-ca55-4cea-9adc-14fcd45a5daf"><span class="sqsrte-text-color--white">Housing Justice:</span></span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">Our housing justice program provides </span><span class="sqsrte-text-highlight" data-text-attribute-id="b9d0f326-2341-4791-bd13-96ce33d5329f"><span class="sqsrte-text-color--white"><strong>eviction defense legal services to Portland residents</strong></span></span><span class="sqsrte-text-color--white"> through funding provided by the Portland Housing Bureau. To access these services you must either have a termination notice from your landlord or be in eviction proceedings, be low-income, and reside in Portland. </span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">In addition, we have a </span><span class="sqsrte-text-highlight" data-text-attribute-id="3aa4a08c-8367-4432-bec0-ee744917fee1"><span class="sqsrte-text-color--white"><strong>tenant advocacy program</strong></span></span><span class="sqsrte-text-color--white"><strong>, which provides brief advice and limited scope legal services to tenants throughout Oregon</strong> on issues ranging from security deposit returns, habitability issues, reasonable accommodations, and more. This program includes a tenant advocacy hotline, available on Tuesdays and Thursday from 9 am to 5 pm. </span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white"><strong>Tenant Advocacy Hotline: </strong></span><span class="sqsrte-text-highlight" data-text-attribute-id="1251cc3b-821c-4cee-9908-318252051ee4"><span class="sqsrte-text-color--white"><strong>503-433-6431 (available T &amp; Th 9 am to 5 pm)</strong></span></span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-highlight" data-text-attribute-id="dfd2d2b4-39ef-411a-8928-50d48e5e1d8e"><span class="sqsrte-text-color--white">Immigration Justice:</span></span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">Our immigraiton justice program provides both </span><span class="sqsrte-text-highlight" data-text-attribute-id="62659510-0936-4a19-aed2-637bb3fd1f4c"><span class="sqsrte-text-color--white"><strong>limited-scope and full-scope deportation defense legal services</strong></span></span><span class="sqsrte-text-color--white"> through the Equity Corps of Oregon (ECO) program, DACA renewals, work permit applications and renewals, and other </span><span class="sqsrte-text-highlight" data-text-attribute-id="3eea18de-7161-4ced-a92e-68a3d3af0478"><span class="sqsrte-text-color--white"><strong>immigrant worker justice legal services</strong></span></span><span class="sqsrte-text-color--white"> through a collaboration with the Northwest Workers’ Justice Program. </span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">Our immigraiton team also offers regular </span><span class="sqsrte-text-highlight" data-text-attribute-id="e26ed253-0615-40be-b1d6-bf8826b9662e"><span class="sqsrte-text-color--white"><strong>Know Your Rights Trainings</strong></span></span><span class="sqsrte-text-color--white"> on dealing with ICE and other immigration issues, </span><span class="sqsrte-text-highlight" data-text-attribute-id="d12141f8-8029-4232-9e80-144970b079a5"><span class="sqsrte-text-color--white"><strong>enrollment into the ECO program</strong></span></span><span class="sqsrte-text-color--white"> and </span><span class="sqsrte-text-highlight" data-text-attribute-id="a4ca056b-9ad9-4cd3-82c7-43e28a4e5fd3"><span class="sqsrte-text-color--white"><strong>community resource navigation</strong></span></span><span class="sqsrte-text-color--white">.</span></p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--white">We pride ourselves on having deep and collaborative connections with community-based organizations and community members who share our vision. </span></p>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-04-30-at-8.11.57-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '503.389.5919', NULL, 'https://clear-clinic.org/', (SELECT id FROM what_topics WHERE slug = 'legal'), 'admin', '2026-05-01 03:12:46', '2026-05-01 03:12:46')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Walk In'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Immigrants, Refugees, Asylum Seekers'));
END $$;

-- Resource 93: Fern's Place
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Fern''s Place', NULL, '<div class="CjVfdc CJIdie"><span class="C9DxTc ">Dedicated to providing a safe and nurturing temporary care environment for the pets of individuals seeking in-patient medical care or addiction treatment.</span></div>
<p class="CjVfdc"><span class="C9DxTc ">Looking to place a pet in our program?</span></p>

<ol class="n8H08c BKnRcf ">
 	<li class="zfr3Q OmQG5e TYR86d lsiHE " dir="ltr">
<p id="h.7sqdti9bv24g" class="GV3q8e yMxPgf  aP9Z7e"><span class="C9DxTc ">Fill out the application </span><a class="XqQF9c" href="https://docs.google.com/forms/d/e/1FAIpQLSeWmco-HodAsMyCaVyPB4-T6ptOs8VmwM901vDcxebLXzC4LQ/viewform" target="_blank" rel="noopener"><span class="C9DxTc aw5Odc ">here</span></a><span class="C9DxTc "> to give us information about the pet you''d like to find a temporary foster for. Please provide us with as honest and detailed information as you can. This will ensure that we find the best foster placement for your animal.</span></p>
</li>
 	<li class="zfr3Q OmQG5e TYR86d lsiHE " dir="ltr">
<p id="h.ccjwh2vc1bt0" class="GV3q8e yMxPgf  aP9Z7e">We will review your submission and reach out to our volunteer network. You will be notified of a suitable fit as soon as possible.</p>
</li>
 	<li class="zfr3Q OmQG5e TYR86d lsiHE " dir="ltr">
<p id="h.k5aogy80atk" class="GV3q8e yMxPgf  aP9Z7e">We will ask you to provide all necessary care items for your pet. This includes items such as enough food for the duration of your treatment, a crate/other housing if applicable, and all other essential items and medications.</p>
</li>
 	<li class="zfr3Q OmQG5e TYR86d lsiHE " dir="ltr">
<p id="h.96qh45c6ooq9" class="GV3q8e yMxPgf  aP9Z7e">Upon the finalization of your treatment, you will be reunited with your pet as soon as you notify us.</p>
</li>
</ol>
<p class="CjVfdc"><span class="C9DxTc ">Fern''s Place does not and will never ask for payment for our services.</span></p>

<div class="CjVfdc"><span class="C9DxTc ">Is Fern''s Place the program for you? </span></div>
<div id="h.dkgajftut7ut" class="GV3q8e yMxPgf  aP9Z7e"></div>
<div class="CjVfdc"><span class="C9DxTc ">If one of the following describes you, then Fern''s Place is the </span><span class="C9DxTc ">right</span><span class="C9DxTc "> choice:</span></div>
<ul class="n8H08c UVNKR ">
 	<li class="zfr3Q OmQG5e TYR86d eD0Rn " dir="ltr">
<div id="h.dct3xe2kdja2" class="GV3q8e yMxPgf  aP9Z7e">You are entering in-patient addiction treatment and need someone to care for your pet(s).</div></li>
 	<li class="zfr3Q OmQG5e TYR86d eD0Rn " dir="ltr">
<div id="h.24l5wnfhikba" class="GV3q8e yMxPgf  aP9Z7e">You are entering in-patient medical treatment and need someone to care for your pet(s).</div></li>
</ul>
<div class="CjVfdc"><span class="C9DxTc ">We understand that incarceration, housing transitions, or other major life events may lead you to our </span><span class="C9DxTc ">organization</span><span class="C9DxTc ">. Although we are unable to assist in these circumstances, please contact us and we will connect you to alternative resources that may be able to help.</span></div>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-04-30-at-8.26.57-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'https://sites.google.com/view/fernsplaceinc/home?authuser=0', (SELECT id FROM what_topics WHERE slug = 'animal-support'), 'admin', '2026-05-01 03:28:00', '2026-05-01 03:28:00')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 94: Array Animal Rescue
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Array Animal Rescue', NULL, '<div id="jw-element-701795970" class="jw-tree-node jw-element jw-image-text jw-node-is-first-child" data-jw-element-id="701795970">
<div class="jw-element-imagetext-text">
<p class="jw-heading-100"><strong>Important Message:</strong></p>

</div>
</div>
<div class="jw-element-imagetext-text">

Due to our current case load and lack of funds, Array Animal Rescue will not be taking new applications until July 1, 2026.

</div>
<strong><span class="">Our mission is to empower and support individuals in need by offering foster care for their pets. We serve those affected by homelessness, poverty, addiction, </span><span class="">and domestic violence. We also can provide emergency pet care during unexpected crisis. By doing this, we strive to not only alleviate overburdened shelters, but also improve our communities by helping those experiencing homelessness find stability, and transition off the streets without fear of losing their furry companions.</span></strong>

This is where your journey begins.  If you are struggling to care for or find care for your pets due to hard circumstances, we want to help you. All of these services are free to very low income (earn 30%  or less of the median income, <a href="https://www.arrayanimalrescue.org/_downloads/63f221fe5f522b2934640e3c6c4fa7be" data-jwlink-type="file" data-jwlink-identifier="54220597" data-jwlink-title="multnomah 2025.pdf">multnomah 2025.pdf</a>) individuals and families, including those without homes. We also offer our services on a sliding scale for those who do not qualify. We are devoted to  keeping animals out of the shelters and with their people. If any of these services are what you are looking for, please fill out a Temporary Foster Application under the heading ''Contracts and Forms'', and we will be in touch.  Good luck to you and your animal companions, we are here for you every step of the way.

<strong>If you are applying for free services, you MUST have a case worker. Having OHP or SNAP is no longer acceptable as verification. Please put your case worker''s information on your application and ask them to reach out to us on your behalf.</strong>
<div class="jw-element-imagetext-text">

If you are ready to take that brave but difficult step towards a better life for yourself through recovery or transitional housing but have been told that you cannot bring your pet with you, we will foster your animal for up to 3 months.

</div>
<div class="jw-element-imagetext-text">
<p class="jw-heading-100">For those wanting to get off of the streets</p>

</div>
<p class="jw-heading-100">Domestic Violence</p>
<p class="jw-heading-100">Sudden Crisis</p>
<p class="jw-heading-100">We Now Do In Home Care!</p>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-04-30-at-8.36.07-PM.png', '6426 Southeast 122nd Avenue', 'Portland', 'Oregon', '97266', NULL, 'United States', 45.59818525564936, -122.69565582275392, '503-851-4459', NULL, 'https://www.arrayanimalrescue.org/', (SELECT id FROM what_topics WHERE slug = 'animal-support'), 'admin', '2026-05-01 03:48:25', '2026-05-01 03:48:25')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Domestic Violence (DV) Survivors'));
END $$;

-- Resource 95: Serenity Lane
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Serenity Lane', NULL, '<p id="headline-325-10760" class="ct-headline myHeading myShadow">Oregon’s Largest Nonprofit Drug &amp; Alcohol Treatment Provider Since 1973</p>

<div id="_rich_text-7-10760" class="oxy-rich-text">

Providing Detox, Residential, Outpatient, and DUII Services

WE ADMIT 7 DAYS A WEEK
Same day admissions possible - Most insurance accepted

</div>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-04-30-at-9.28.22-PM.png', '10920 Southwest Barbur Boulevard', 'Portland', 'Oregon', '97219', NULL, 'United States', 45.4462439, -122.7295354, '1 541-703-3633', NULL, 'https://serenitylane.org/', (SELECT id FROM what_topics WHERE slug = 'detox'), 'admin', '2026-05-01 04:29:24', '2026-05-01 04:29:24')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 96: Family Peace Center
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Family Peace Center', NULL, '<h4 class="preFade fadeIn"><span class="sqsrte-text-color--lightAccent"><strong>Our mission is to work collaboratively with our community to provide a single location for prevention, intervention, healing and hope for survivors of domestic violence, sexual assault, and child abuse in Washington County.</strong>  </span></h4>
We are a one-of-a-kind, collaborative hub where survivors of domestic violence, sexual assault, child abuse, elder abuse, and human trafficking can access the full range of services they need, all under one roof. More than 20 partner agencies work side-by-side, providing trauma-informed care, legal advocacy, medical support, therapy, housing assistance, early childhood services, and more.
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Medical Services</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">CARES Northwest provides forensic medical evaluations, trauma therapy, and family support for child abuse victims, plus community prevention education.</li>
 	<li class="whitespace-normal break-words pl-2">Providence Safe Center offers acute and follow-up medical and forensic care for adult survivors of abuse and assault.</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Advocacy &amp; Counseling</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">The Domestic Violence Resource Center (DVRC) provides advocacy, counseling, housing support, and safety planning for domestic violence survivors.</li>
 	<li class="whitespace-normal break-words pl-2">The Sexual Assault Resource Center (SARC) offers 24/7 crisis response, advocacy, and housing support for sexual assault survivors.</li>
 	<li class="whitespace-normal break-words pl-2">Safety Compass provides specialized advocacy and case management for survivors of sex trafficking and exploitation.</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Legal Services</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Oregon Law Center offers free civil family law legal assistance to survivors. The Southern Oregon Women''s Access to Legal Center (SALC) also assists with child custody, child support, divorce, guardianship, spousal support, and domestic violence protection — available Tuesdays 10am–4pm.</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Children &amp; Family Services</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Adelante Mujeres runs a bilingual therapeutic preschool providing trauma-informed early education for children who have experienced or witnessed violence, with culturally responsive support for Latine families.</li>
 	<li class="whitespace-normal break-words pl-2">A Village for One offers long-term support and therapeutic services for youth survivors of sexual exploitation and trafficking.</li>
 	<li class="whitespace-normal break-words pl-2">Family SkillBuilders provides parent education, skill development, and child welfare-related family support.</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Economic &amp; Housing Support</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Community Action offers rent and utility assistance, eviction prevention, and housing assessments.</li>
 	<li class="whitespace-normal break-words pl-2">The Department of Human Services (DHS) provides child welfare services and enrollment in programs like SNAP, TANF, childcare assistance, and health care coverage.</li>
 	<li class="whitespace-normal break-words pl-2">The Oregon Food Bank stocks an on-site Family Grocery Store, ensuring survivors and their families have access to food.</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Transportation</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Ride Connection provides door-to-door transportation for survivors to access the center, and Lyft rides are also available — call 503-430-8300 for immediate transport needs.</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Survivor Leadership</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">The VOICES Survivor Leadership Committee is a survivor-led advisory group that ensures the center''s design, policies, and services reflect lived experience.</li>
</ul>
<strong>NOW OPEN! </strong>Walk in hours Monday-Friday 8:30am to 4:00pm', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-04-30-at-9.40.35-PM.png', '1100 Northeast Compton Drive', 'Hillsboro', 'Oregon', '97006', NULL, 'United States', 45.5284121, -122.8825906, '503-430-8300', NULL, 'https://www.fpcwc.org/', (SELECT id FROM what_topics WHERE slug = 'children-support'), 'admin', '2026-05-01 04:41:04', '2026-05-01 04:41:04')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Walk In'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Domestic Violence (DV) Survivors'));
END $$;

-- Resource 97: Old Town Recovery Center
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Old Town Recovery Center', NULL, '<div class="container">
<div class="wysiwyg center">

<span class="TextRun SCXW54074140 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW54074140 BCX0">Comprehensive, compassionate mental health services </span><span class="NormalTextRun SCXW54074140 BCX0">and outpatient treatment for substance use disorders.</span><span class="NormalTextRun SCXW54074140 BCX0"> Our mental health professionals and certified alcohol and drug counselors </span><span class="NormalTextRun SCXW54074140 BCX0">are highly trained, nonjudgmental, and committed to your success — wherever you are on the path to recovery.</span></span>
<div class="container">
<div class="wysiwyg center">
<h2>Services</h2>
<ul>
 	<li><span class="TextRun SCXW54074140 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW54074140 BCX0">One-on-one counseling</span></span></li>
 	<li><span class="TextRun SCXW54074140 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW54074140 BCX0">Medication management</span></span></li>
 	<li><span class="TextRun SCXW54074140 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW54074140 BCX0">Case management</span></span></li>
 	<li><span class="TextRun SCXW54074140 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW54074140 BCX0">Money management</span></span></li>
 	<li><span class="TextRun SCXW54074140 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW54074140 BCX0">Wraparound care</span></span></li>
 	<li><span class="TextRun SCXW54074140 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW54074140 BCX0">In-home visits and outreach</span></span></li>
 	<li><span class="TextRun SCXW54074140 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW54074140 BCX0">On-site pharmacy</span></span></li>
</ul>
<div id="cb-simple-content" class="cb cbjl " data-jumplink="6">
<div class="container">
<div class="wysiwyg center">
<h2>Mental Health</h2>
<div>

<span data-contrast="none">Getting one-on-one counseling and support from a qualified mental health professional can help you manage symptoms such as depression, anxiety, stress and other issues that may feel overwhelming. In-person appointments are available as well as phone and video sessions.</span><span data-ccp-props="{&quot;134233117&quot;:false,&quot;134233118&quot;:false,&quot;201341983&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:300,&quot;335559740&quot;:240}"> </span>

<span data-contrast="none">Sometimes our clients need a higher level of support for more severe mental health challenges. Care coordination and community support are available with a referral. Old Town Recovery Center offers:</span><span data-ccp-props="{&quot;134233117&quot;:false,&quot;134233118&quot;:false,&quot;201341983&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:300,&quot;335559740&quot;:240}"> </span>
<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="2" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="1" data-aria-level="1"><span data-contrast="none">Case management and care coordination</span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="2" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="2" data-aria-level="1"><span data-contrast="none">Wraparound care through a multidisciplinary team</span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="2" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="3" data-aria-level="1"><span data-contrast="none">Medication management and on-site pharmacy</span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="2" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="4" data-aria-level="1"><span data-contrast="none">Money management</span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="2" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="5" data-aria-level="1"><span data-contrast="none">In-home visits and outreach in the community</span></li>
</ul>
<p aria-level="3"><b><span data-contrast="none">Talk to your current provider about making a referral to Old Town Recovery Center <a href="https://centralcityconcern.org/health-care-location/act-program/" target="_blank" rel="noopener">Community Outreach Recovery Engagement</a> (CORE) or ICM teams.</span></b><span data-ccp-props="{&quot;134233117&quot;:false,&quot;134233118&quot;:false,&quot;201341983&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></p>

</div>
</div>
</div>
</div>
<div id="cb-simple-content" class="cb cbjl " data-jumplink="7">
<div class="container">
<div class="wysiwyg center">
<h2>Substance Use Disorder Treatment</h2>
<div>

<span data-contrast="none">Our specialty is in intensive outpatient treatment, meaning clients see our team about five times a week, for up to nine hours total.</span><span data-ccp-props="{&quot;134233117&quot;:false,&quot;134233118&quot;:false,&quot;201341983&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:300,&quot;335559740&quot;:240}"> </span>
<p aria-level="3"><span data-contrast="none">Treatment includes:</span><span data-ccp-props="{&quot;134233117&quot;:false,&quot;134233118&quot;:false,&quot;201341983&quot;:0,&quot;335559738&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></p>

<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="5" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="1" data-aria-level="1"><span data-contrast="none">A treatment plan based on your individual needs</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="5" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="2" data-aria-level="1"><span data-contrast="none">Medication-supported recovery with Suboxone (buprenorphine)</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="5" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="3" data-aria-level="1"><span data-contrast="none">Individual counseling</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="5" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="4" data-aria-level="1"><span data-contrast="none">Peer support and mentoring</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="5" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="1" data-aria-level="1"><span data-contrast="none">Gender-specific group counseling</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="5" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="2" data-aria-level="1"><span data-contrast="none">Acupuncture to reduce substance cravings, relieve chronic pain, regulate emotions, lower stress and anxiety, and support overall wellbeing</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="5" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="3" data-aria-level="1"><span data-contrast="none">Coordinated care, including help accessing CCC’s nearby pharmacy and health care services at Old Town Clinic</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:150,&quot;335559740&quot;:240}"> </span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="5" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;multilevel&quot;}" aria-setsize="-1" data-aria-posinset="4" data-aria-level="1"><span data-contrast="none">Referrals for primary health care, mental health treatment, supportive housing and culturally specific recovery support at CCC or with other agencies</span><span data-ccp-props="{&quot;201341983&quot;:0,&quot;335559739&quot;:0,&quot;335559740&quot;:240}"> </span></li>
</ul>
</div>
</div>
</div>
</div>
<div id="cb-simple-content" class="cb cbjl " data-jumplink="8">
<div class="container">
<div class="wysiwyg center">
<h2><span class="TextRun SCXW29839260 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW29839260 BCX0">Assertive Community Treatment (ACT) Program</span></span></h2>
<div>

<span class="TextRun SCXW29839260 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW29839260 BCX0">The ACT program provides community-based, long-term, and time-unlimited services to individuals who meet Serious and Persistent Mental Illness (SPMI) eligibility, have a primary psychotic diagnosis, significant functional impairment, and continuous high service needs.</span></span>

<span class="TextRun SCXW29839260 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW29839260 BCX0">The Community Outreach Recovery Engagement (CORE) team, </span><span class="NormalTextRun SCXW29839260 BCX0">comprised</span><span class="NormalTextRun SCXW29839260 BCX0"> of QMHAs, QMHPs, and peers, makes up CCC’s ACT program. The CORE team provides services within the </span></span><span class="TextRun Underlined SCXW29839260 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW29839260 BCX0" data-ccp-charstyle="Hyperlink">Old Town Recovery Center</span></span><span class="TextRun SCXW29839260 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW29839260 BCX0"> in Downtown Portland. Services provided by CORE are team-based and integrated with primary care to offer more comprehensive treatment of behavioral health disorders.</span></span>

<a class="btn btn-filled" href="https://centralcityconcern.org/health-care-location/act-program/" target="_blank" rel="noopener">Learn more about the ACT program</a>

</div>
</div>
</div>
</div>
<div id="cb-simple-content" class="cb cbjl " data-jumplink="9">
<div class="container">
<div class="wysiwyg center">
<h2>How to Access Care</h2>
<span class="TextRun SCXW194115077 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW194115077 BCX0">Call us </span><span class="NormalTextRun ContextualSpellingAndGrammarErrorV2Themed SCXW194115077 BCX0">at</span> </span><strong><span class="TextRun SCXW194115077 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW194115077 BCX0">(503) 228-7134</span></span></strong><span class="TextRun SCXW194115077 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW194115077 BCX0"> or walk in to </span><span class="NormalTextRun SCXW194115077 BCX0">establish</span><span class="NormalTextRun SCXW194115077 BCX0"> care. Providers with referral questions or patient referrals can also contact OTRC at the same number.</span></span>

</div>
</div>
</div>
<div id="cb-simple-content" class="cb cbjl " data-jumplink="10">
<div class="container">
<div class="wysiwyg center">
<h2>Insurance Information</h2>
We don’t turn anyone away for lack of insurance or inability to pay.

We accept Oregon Health Plan, self-pay and some private insurance. Need coverage? We can help you get set up.

</div>
</div>
</div>
</div>
</div>
</div>
</div>
<strong>Hours</strong>
<span data-contrast="none">Phone hours: Monday – Friday, 8 am to 5 pm</span>
<span class="TextRun SCXW183598419 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="none"><span class="NormalTextRun SCXW183598419 BCX0">Walk-in hours: <span data-contrast="none">Monday – Friday, 9 am to 5 pm</span></span></span>
<a href="https://centralcityconcern.org/holiday-hours/">Closed holidays</a>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-01-at-2.24.18-PM.png', '33 Northwest Broadway', 'Portland', 'Oregon', '97209', NULL, 'United States', 45.5236118, -122.6777175, '(503) 228-7134', NULL, 'https://centralcityconcern.org/recovery-location/old-town-recovery-center/', (SELECT id FROM what_topics WHERE slug = 'mental-behavioral-health'), 'admin', '2026-05-01 21:27:41', '2026-05-01 21:27:41')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Walk In'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 98: Puentes
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Puentes', NULL, '<span class="OYPEnA font-feature-liga-off font-feature-clig-off font-feature-calt-off text-decoration-none text-strikethrough-none">Established in 2005, Puentes has been dedicated to supporting the Latino/a/e/ Hispanic community and non-English speakers seeking healing and recovery. Puentes addresses the mental health and substance use needs of individuals 18 and older in Multnomah County and surrounding areas, providing personalized care from bicultural and bilingual clinicians who share their clients’ language, cultural background, and life experiences.</span>

<strong>Puentes means “Bridges” in Spanish!</strong>
<h2>Services</h2>
<span class="OYPEnA font-feature-liga-off font-feature-clig-off font-feature-calt-off text-decoration-none text-strikethrough-none">Puentes staff create tailored treatment plans to meet the unique needs of each individual. Treatment is designed for adults and addresses conditions like depression, anxiety, trauma, and other life stressors. </span><span data-contrast="auto">These plans include behavioral health services such as:</span><span data-ccp-props="{}"> </span>
<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="7" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559683&quot;:0,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;hybridMultilevel&quot;}" aria-setsize="-1" data-aria-posinset="1" data-aria-level="1"><span data-contrast="auto">Mental health care</span><span data-ccp-props="{}"> </span></li>
</ul>
<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="7" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559683&quot;:0,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;hybridMultilevel&quot;}" aria-setsize="-1" data-aria-posinset="2" data-aria-level="1"><span data-contrast="auto">Group counseling</span><span data-ccp-props="{}"> </span></li>
</ul>
<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="7" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559683&quot;:0,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;hybridMultilevel&quot;}" aria-setsize="-1" data-aria-posinset="3" data-aria-level="1"><span data-contrast="auto">Individual counseling</span><span data-ccp-props="{}"> </span></li>
</ul>
<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="7" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559683&quot;:0,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;hybridMultilevel&quot;}" aria-setsize="-1" data-aria-posinset="4" data-aria-level="1"><span data-contrast="auto">Outpatient addiction treatment</span><span data-ccp-props="{}"> </span></li>
</ul>
<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="7" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559683&quot;:0,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;hybridMultilevel&quot;}" aria-setsize="-1" data-aria-posinset="5" data-aria-level="1"><span data-contrast="auto">Recovery groups</span><span data-ccp-props="{}"> </span></li>
</ul>
<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="7" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559683&quot;:0,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;hybridMultilevel&quot;}" aria-setsize="-1" data-aria-posinset="6" data-aria-level="1"><span data-contrast="auto">Peer support</span><span data-ccp-props="{}"> </span></li>
</ul>
<ul>
 	<li data-leveltext="" data-font="Symbol" data-listid="7" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559683&quot;:0,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;hybridMultilevel&quot;}" aria-setsize="-1" data-aria-posinset="7" data-aria-level="1"><span data-contrast="auto">Case management</span><span data-ccp-props="{}"> </span></li>
 	<li data-leveltext="" data-font="Symbol" data-listid="7" data-list-defn-props="{&quot;335552541&quot;:1,&quot;335559683&quot;:0,&quot;335559684&quot;:-2,&quot;335559685&quot;:720,&quot;335559991&quot;:360,&quot;469769226&quot;:&quot;Symbol&quot;,&quot;469769242&quot;:[8226],&quot;469777803&quot;:&quot;left&quot;,&quot;469777804&quot;:&quot;&quot;,&quot;469777815&quot;:&quot;hybridMultilevel&quot;}" aria-setsize="-1" data-aria-posinset="8" data-aria-level="1"><span data-contrast="auto">DUII treatment</span><span data-ccp-props="{}"> </span></li>
</ul>
During treatment, clients may receive case management and referrals for medical, psychiatric, and holistic care. The average length of treatment is six months, depending on individual needs. Clients in recovery experiencing homelessness may qualify for transitional, supportive housing.

<strong><span class="TextRun SCXW260995306 BCX0" lang="EN-US" xml:lang="EN-US" data-contrast="auto"><span class="NormalTextRun SCXW260995306 BCX0">Puentes accommodates monolingual and bilingual individuals in English and Spanish.</span></span><span class="EOP SCXW260995306 BCX0" data-ccp-props="{}"> </span></strong>
<h2>How to Access Care</h2>
<span data-contrast="none">Call </span><b><span data-contrast="none">(503) 546-9975</span></b><span data-contrast="none"> to become a client. Our bilingual staff will assist with paperwork and scheduling./Llámanos al (503) 546-9975 para convertirte en cliente. Nuestro personal bilingüe lo ayudará a completar cualquier documentación necesaria y programar una cita.</span><span data-ccp-props="{}"> </span>

<strong>To refer someone for Puentes services, please use the referral link below./Si quiere referir a alguien para servicios de uso de sustancias, clique abajo.</strong>

<a href="https://forms.office.com/r/8HdbPNwzxk">Puentes SUDS Referral Form</a>
<h2>Eligibility</h2>
<span data-contrast="none">Puentes specializes in mental health counseling, substance abuse, and DUII treatment for Latino/a/e residents of Multnomah County. Services may also be available to residents of other counties if they are insured. Please call for more information.</span>
<h2>Insurance Information</h2>
<span data-contrast="none">Puentes is committed to providing inclusive and accessible care to everyone, regardless of insurance status or financial situation. We accept the Oregon Health Plan, self-pay arrangements, and select private insurance options.</span>

Need coverage? Our dedicated team is ready to help!

<strong>Hours</strong>
Monday – Friday, 9 am to 5 pm
<a href="https://centralcityconcern.org/holiday-hours/">Closed holidays</a>

<strong>Location</strong>
Location not disclosed', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-01-at-2.33.26-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(503) 546-9975', NULL, 'https://centralcityconcern.org/recovery-location/puentes/', (SELECT id FROM what_topics WHERE slug = 'mental-behavioral-health'), 'admin', '2026-05-01 21:34:14', '2026-05-01 21:34:14')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
END $$;

-- Resource 99: Blackburn Center
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Blackburn Center', NULL, 'Blackburn Center makes it easy to access many kinds of help to gain stability. Our east side location brings Central City Concern’s signature health care, housing and employment services together, all under the same roof.

You’ll find treatment for routine health concerns/primary care, mental health support, care for addiction and substance use disorders, an on-site pharmacy, resources to help you find meaningful work, and housing for more than 100 residents, most of whom are in recovery.

<strong>Hours
</strong>Clinic Hours:<strong>
</strong><span data-contrast="auto">Monday, Tuesday, Thursday and Friday, 8 am to 5 pm</span>
<span data-contrast="auto">Wednesday, 9 am to 5 pm</span>
<a href="https://centralcityconcern.org/holiday-hours/">Closed holidays</a>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-01-at-2.41.41-PM.png', '12121 East Burnside Street', 'Portland', 'Oregon', '97216', NULL, 'United States', 45.5227169, -122.5383426, '(971) 361-7700', NULL, 'https://centralcityconcern.org/blackburn-center/', (SELECT id FROM what_topics WHERE slug = 'medical'), 'admin', '2026-05-01 21:43:11', '2026-05-01 21:43:11')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 100: Letty Owings Center
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Letty Owings Center', NULL, 'Since 1989, Letty Owings Center (LOC) has helped over a thousand of young mothers become sober, healthy, and hopeful about the future. Because recovery is especially complex during pregnancy and early parenting, this 29-bed residential facility offers a safe, inclusive space where women can live with their children, many of whom might otherwise be placed in foster care, while receiving treatment and working toward long-term stability.
<div class="text">
<div class="wysiwyg">
<h2>Services</h2>
Our services are geared toward the needs of pregnant women and mothers of children under age 6. You’ll find:
<ul>
 	<li>Residential treatment for substance use disorders</li>
 	<li>Recovery and/or mental health counseling in individual and group settings</li>
 	<li>Peer support and mentoring</li>
 	<li>Medication management to support recovery and mental health</li>
 	<li>Health care providers who can develop birth plans and offer support after delivery</li>
 	<li>Case management, including help with family reunification, access to housing and guidance about other social services</li>
 	<li>Child care through our in-house nursery or nearby preschools/daycare centers</li>
 	<li>Skill-building programs to help residents navigate healthy relationships, build self-esteem, develop successful communication skills, and gain essential life skills such as budgeting, meal planning and time management</li>
 	<li>Workshops on progressive parenting, to help residents nurture their families and themselves</li>
 	<li>Assistance with the transition to outpatient recovery treatment when the time is right</li>
</ul>
<div id="cb-simple-content" class="cb cbjl " data-jumplink="7">
<div class="container">
<div class="wysiwyg center">
<h2>How to Access Care</h2>
Complete and submit our screening form so that we can begin to work on your request to participate in the program. We will contact you once we receive the form.

<a class="btn btn-filled" href="https://forms.office.com/Pages/ResponsePage.aspx?id=aZccukx83EOaQXTRGTPUhLI1iD16G1NLrfd9JAX_6ndUMExQREJSSDk2QzdVRTZRQUk2U004U1dWSCQlQCN0PWcu">Screening Form</a>

Prefer to talk on the phone first? To learn more about treatment at Letty Owings, call our Intake Coordinator at <a href="tel:971-352-8740">(971) 352-8740</a> or email <a href="mailto:LettyOwingsIntake@ccconcern.org" target="_blank" rel="noopener">LettyOwingsIntake@ccconcern.org</a><strong>.</strong> We’ll walk you through the enrollment process and answer any questions you may have.

</div>
</div>
</div>
<div id="cb-simple-content" class="cb cbjl " data-jumplink="8">
<div class="container">
<div class="wysiwyg center">
<h2>Insurance Information</h2>
We don’t turn anyone away for lack of insurance or inability to pay. We accept Oregon Health Plan, Medicare, self-pay and some private insurance. Need coverage? We can help you get set up.

</div>
</div>
</div>
</div>
</div>
<strong>Hours</strong>
Staffed 24 hours a day, 7 days a week

<strong>Location
</strong>Location not disclosed', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-01-at-2.47.38-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(971) 352-8740', NULL, 'https://centralcityconcern.org/recovery-location/letty-owings-center/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2026-05-01 21:48:25', '2026-05-01 21:48:25')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Families'));
END $$;

-- Resource 101: Coda
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Coda', NULL, 'CODA, Inc., founded in 1969, is one of Oregon’s largest not-for-profit substance use treatment programs. Operating 14 programs at ten different sites, CODA provides Oregon’s most comprehensive integrated substance use disorder treatment.
<div class="flex-1 flex flex-col px-4 max-w-3xl mx-auto w-full pt-1">
<div data-test-render-count="1">
<div class="group">
<div class="contents">
<div class="group relative relative pb-3" data-is-streaming="false">
<div class="font-claude-response relative leading-[1.65rem] [&amp;_pre&gt;div]:bg-bg-000/50 [&amp;_pre&gt;div]:border-0.5 [&amp;_pre&gt;div]:border-border-400 [&amp;_.ignore-pre-bg&gt;div]:bg-transparent [&amp;_.standard-markdown_:is(p,blockquote,h1,h2,h3,h4,h5,h6)]:pl-2 [&amp;_.standard-markdown_:is(p,blockquote,ul,ol,h1,h2,h3,h4,h5,h6)]:pr-8 [&amp;_.progressive-markdown_:is(p,blockquote,h1,h2,h3,h4,h5,h6)]:pl-2 [&amp;_.progressive-markdown_:is(p,blockquote,ul,ol,h1,h2,h3,h4,h5,h6)]:pr-8">
<div>
<div class="standard-markdown grid-cols-1 grid [&amp;_&gt;_*]:min-w-0 gap-3 standard-markdown">
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Core Treatment</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Withdrawal Management (Detox)</li>
 	<li class="whitespace-normal break-words pl-2">Residential/Inpatient Treatment</li>
 	<li class="whitespace-normal break-words pl-2">Opioid Treatment Program</li>
 	<li class="whitespace-normal break-words pl-2">Outpatient Treatment (general &amp; intensive)</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Therapies</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Cognitive Behavioral Therapy (CBT)</li>
 	<li class="whitespace-normal break-words pl-2">Dialectical Behavior Therapy (DBT)</li>
 	<li class="whitespace-normal break-words pl-2">Trauma Therapy</li>
 	<li class="whitespace-normal break-words pl-2">Motivational Interviewing</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Support Services</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Recovery Coaching &amp; Peer Mentoring</li>
 	<li class="whitespace-normal break-words pl-2">Housing Services</li>
 	<li class="whitespace-normal break-words pl-2">Case Management</li>
 	<li class="whitespace-normal break-words pl-2">Discharge Planning</li>
 	<li class="whitespace-normal break-words pl-2">Naloxone &amp; Overdose Education</li>
 	<li class="whitespace-normal break-words pl-2">Transportation Assistance</li>
 	<li class="whitespace-normal break-words pl-2">Mental Health Services</li>
 	<li class="whitespace-normal break-words pl-2">Social Skills Development</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Specialized Programs</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Programs for mothers with children</li>
 	<li class="whitespace-normal break-words pl-2">DUII Services</li>
 	<li class="whitespace-normal break-words pl-2">Supported Employment</li>
 	<li class="whitespace-normal break-words pl-2">Court-ordered treatment programs</li>
</ul>
<p class="font-claude-response-body break-words whitespace-normal leading-[1.7]"><strong>Payment Options</strong></p>

<ul class="[li_&amp;]:mb-0 [li_&amp;]:mt-1 [li_&amp;]:gap-1 [&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc flex flex-col gap-1 pl-8 mb-3">
 	<li class="whitespace-normal break-words pl-2">Medicaid, Medicare, Military Insurance, Private Insurance, Self-pay, Sliding Scale</li>
</ul>
</div>
</div>
</div>
</div>
</div>
<div class="flex justify-start" role="group" aria-label="Message actions">
<div class="text-text-300">
<div class="text-text-300 flex items-stretch justify-between">
<div class="w-fit" data-state="closed">
<div class="relative text-text-500 group-hover/btn:text-text-100">
<div class="transition-all opacity-100 scale-100"></div>
<div class="absolute top-0 left-0 transition-all opacity-0 scale-50"></div>
</div>
</div>
<div class="w-fit" data-state="closed">
<div class="text-text-500 group-hover/btn:text-text-100"></div>
</div>
<div class="w-fit" data-state="closed">
<div class="text-text-500 group-hover/btn:text-text-100"></div>
</div>
<div class="flex items-center">
<div class="w-fit" data-state="closed">
<div class="text-text-500 group-hover/btn:text-text-100"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="h-px w-full pointer-events-none" aria-hidden="true"></div>
<div>
<div class="ml-1 flex items-center transition-transform duration-300 ease-out mt-6">
<div class="p-1 -translate-x-px">
<div aria-hidden="true">
<div class="w-8 text-accent-brand inline-block select-none" data-state="closed"></div>
</div>
</div>
</div>
</div>
<div class="h-12"></div>
<div aria-hidden="true"></div>
</div>
<div class="sticky bottom-0 mx-auto w-full pt-6 z-[5]" data-chat-input-container="true">
<div aria-hidden="true">
<div class="absolute blur-md transition duration-300 pointer-events-none opacity-0 w-8 text-accent-brand inline-block select-none" data-state="closed"></div>
</div>
<div class="mix-blend-luminosity"></div>
<div>
<fieldset class="flex w-full min-w-0 flex-col"><input id="chat-input-file-upload-bottom" class="absolute -z-10 h-0 w-0 overflow-hidden opacity-0 select-none" tabindex="-1" accept="" multiple="multiple" type="file" data-testid="file-upload" aria-hidden="true" aria-label="Upload files" />
<div class="px-3 md:px-2" data-alert-band-wrapper="true">
<div role="status" aria-live="polite" aria-atomic="true"></div>
</div>
<div class="relative">
<div class="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none transition-opacity duration-500" data-testid="voice-audio-visualizer"></div>
<div class="!box-content flex flex-col bg-bg-000 mx-2 md:mx-0 items-stretch transition-all duration-200 relative z-10 rounded-[20px] cursor-text relative z-[1] border border-transparent md:w-full shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/3.5%),0_0_0_0.5px_hsla(var(--border-300)/0.15)] hover:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/3.5%),0_0_0_0.5px_hsla(var(--border-200)/0.3)] focus-within:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/7.5%),0_0_0_0.5px_hsla(var(--border-200)/0.3)] hover:focus-within:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/7.5%),0_0_0_0.5px_hsla(var(--border-200)/0.3)]">
<div class="flex flex-col m-3.5 gap-3">
<div class="relative">
<div class="w-full overflow-y-auto font-large break-words transition-opacity duration-200 max-h-96 min-h-[1.5rem] pl-[6px] pt-[6px]">
<div class="tiptap ProseMirror" tabindex="0" role="textbox" contenteditable="true" translate="no" data-testid="chat-input" aria-label="Write your prompt to Claude" aria-multiline="true" aria-required="false" aria-invalid="false" aria-describedby="legacy-model-warning-text claude-code-nudge-body"></div>
</div>
</div>
</div>
</div>
</div></fieldset>
</div>
</div>
&nbsp;', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-01-at-5.21.52-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '855-SEE-CODA', NULL, 'https://codainc.org/', (SELECT id FROM what_topics WHERE slug = 'detox'), 'admin', '2026-05-02 00:22:30', '2026-05-02 00:22:30')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 102: Multnomah County Behavioral Health Call Center (Project Resp
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Multnomah County Behavioral Health Call Center (Project Respond and Urgent Walk-In Clinic)', NULL, '<strong>Free and confidential.</strong>
<p dir="ltr">Our call center is available 24/7 to support anyone experiencing distress. You can also get help for someone else.</p>
Our trained clinicians offer support, and provide resources and referral. Services are free and available in any language. All calls are confidential.
<ul>
 	<li>Free, 24/7 behavioral health support</li>
 	<li>Language interpretation</li>
 	<li>Referral to low-cost or sliding-scale agencies</li>
 	<li>Help finding local behavioral health supports and providers</li>
 	<li>Information about non-crisis community resources</li>
 	<li>Mobile crisis services dispatch</li>
</ul>
<h2 id="section-2">Urgent Walk-In Clinic</h2>
Receive immediate, in-person care for a behavioral health crisis. Serves anyone at no cost.
<p dir="ltr"><strong>Cascadia Health - Mental Health Urgent Walk-in Clinic</strong>
<span translate="no">4212 SE Division St</span>, Portland (<a class="ext" href="https://www.google.com/maps/place/4212+SE+Division+St,+Portland,+OR+97206/@45.5050249,-122.6210346,17z/data=!3m1!4b1!4m5!3m4!1s0x5495a08a1b8630cd:0x9bc8a03dba658e70!8m2!3d45.5050249!4d-122.6188459" rel="noreferrer" data-extlink=""><span class="extlink-nobreak">MAP</span></a>)</p>
<p dir="ltr">Open Monday-Friday, 7am-10:30pm | Saturday-Sunday, closed</p>

<h2 id="section-3">Project Respond</h2>
Mobile crisis services are available if you can’t get to the urgent walk-in clinic, or are trying to get help for someone else. Call <span translate="no">503-988-4888</span> for help.', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-07-at-4.03.09-PM.png', '4212 Southeast Division Street', 'Portland', 'Oregon', '97206', NULL, 'United States', 45.5051333, -122.6186188, '503-988-4888', NULL, 'https://multco.us/services/behavioral-health-crisis-services', (SELECT id FROM what_topics WHERE slug = 'crisis-hotlines'), 'admin', '2026-05-07 23:05:21', '2026-05-07 23:06:50')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Walk In'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 103: Janus Youth Programs
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Janus Youth Programs', NULL, '<div id="gspb_container-id-gsbp-af622ef" class="wp-block-greenshift-blocks-container gspb_container gspb_container-gsbp-af622ef">
<p class="has-text-align-center">Janus Youth Programs has provided a second chance for at-risk youth (~16-24 years old) with few resources and no place to turn for help. Today, we have grown to become one of the largest nonprofits in the Northwest operating more than 20 different programs that span Oregon and Southwest Washington.</p>

</div>
<div id="gspb_container-id-gsbp-ff3f146" class="wp-block-greenshift-blocks-container gspb_container gspb_container-gsbp-ff3f146">

&nbsp;

</div>
<h3 id="shelter-housing" class="wp-block-heading has-text-align-center has-nv-c-2-color has-text-color has-link-color has-large-font-size wp-elements-d5c1bf0eb670e2fbb84cf523151b4434"><strong>Shelter &amp; Housing</strong></h3>
<h4 id="every-year-janus-youth-programs-provides-more-than-43-000-meals-to-homeless-youth" class="wp-block-heading has-text-align-center has-nv-dark-bg-color has-text-color has-link-color wp-elements-3784efab82048dcda6a19ef177b3bf59"><strong>Every year, Janus Youth Programs provides more than 43,000 meals to homeless youth</strong></h4>
Few situations put a young person at greater risk than being homeless where they face exploitation, abuse and violence. For well over a quarter of a century, our shelter and housing programs have been at the forefront of services providing thousands of youth with an accessible and supportive path out of homelessness each year. Part of Portland’s Homeless Youth Continuum, our shelter and housing services include street outreach, assessment, emergency and short-term shelter and case management.

&nbsp;
<h3 id="residential-re-entry" class="wp-block-heading has-text-align-center has-nv-c-2-color has-text-color has-link-color has-large-font-size wp-elements-61bb459afdf5f863ed5108166e2d4006"><strong>Residential &amp; Re-Entry</strong></h3>
<h4 id="more-than-90-of-the-youth-in-our-residential-programs-have-experienced-abuse-in-the-past" class="wp-block-heading has-text-align-center has-nv-dark-bg-color has-text-color has-link-color wp-elements-54299413b6f4658e17d101ba5711f50b"><strong>More than 90% of the youth in our residential programs have experienced abuse in the past</strong></h4>
For over four decades Janus has worked with Oregon’s Department of Human Services and the Oregon Youth Authority to help abused and neglected youth between the ages of 13 to 24 rebuild their lives through community-based residential treatment programs that are recognized in and out of Oregon for their successful outcomes.

Our residential and re-entry services encourage positive youth development and provide normalizing experiences and a sense of community to prepare youth for a successful transition to independent living. Across our highly specialized programs, hundreds of youth call Janus “home” from six months up to three years.

&nbsp;
<h3 id="young-parent-services" class="wp-block-heading has-text-align-center has-neve-link-color-color has-text-color has-link-color has-large-font-size wp-elements-3455d6cd5f33c0909b1956d2cfc365bd"><strong>Young Parent Services</strong></h3>
<h4 id="on-any-given-night-more-than-130-teen-families-have-safe-housing-provided-by-insights" class="wp-block-heading has-text-align-center has-nv-dark-bg-color has-text-color has-link-color wp-elements-c98859dbbcd9ca35bcebf31b2fa03201"><strong>On any given night, more than 130 teen families have safe housing provided by Insights</strong></h4>
Since 1979, thousands of young parents have built positive parenting and child-development skills through Insights’ best practice programs. With a philosophy that is both respect and strength-based, Insights’ case management and home visiting programs provide young parents with parenting skills that will lead to a better future for themselves and their children.

&nbsp;
<h3 id="scholarship-fund" class="wp-block-heading has-text-align-center has-nv-c-2-color has-text-color has-link-color has-large-font-size wp-elements-5770c3e7d9f3b719c199fb76177b8205"><strong>Scholarship Fund</strong></h3>
<h4 id="scholarships-for-success-has-awarded-54-scholarships-since-its-establishment-in-2001" class="wp-block-heading has-text-align-center has-nv-dark-bg-color has-text-color has-link-color wp-elements-e9098d17ad190b20692af614493f51d5"><strong>Scholarships for Success has awarded 54 scholarships since its establishment in 2001</strong></h4>
<h4 class="wp-block-heading has-text-align-center has-nv-dark-bg-color has-text-color has-link-color wp-elements-e9098d17ad190b20692af614493f51d5">Since 2001, the Janus Scholarship Fund has helped open the door to higher education for teen parents, immigrant youth and formerly homeless youth who excelled in our programs.</h4>
From completing an associate degree at a community college, graduating from a four-year university and even medical school, Janus Youth Programs is changing lives and building futures by creating a bridge to the future through our Scholarship Fund.', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-07-at-4.48.57-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(503) 233-6090', NULL, 'https://janusyouth.org/', (SELECT id FROM what_topics WHERE slug = 'shelter'), 'admin', '2026-05-07 23:49:29', '2026-05-07 23:49:29')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Youth & Children'));
END $$;

-- Resource 104: Another Chance Drug & Alcohol Treatment Center
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Another Chance Drug & Alcohol Treatment Center', NULL, '<p class="x_x_gmail-isSelectedEnd" data-olk-copy-source="MessageBody">We are excited to share that Another Chance Drug &amp; Alcohol Treatment Center is now<b> fully staffed</b> and continuing to expand access to care for our community.</p>
<p data-olk-copy-source="MessageBody">We offer a comprehensive range of services including PHP (Partial Hospitalization Program), IOP (Intensive Outpatient Program), OP (Outpatient Program), substance abuse counseling, DUII programs, and evaluations.</p>
<p data-olk-copy-source="MessageBody"></p>
<p class="x_x_gmail-isSelectedEnd">We are currently welcoming walk-ins at both of our locations:</p>
<p class="x_x_gmail-isSelectedEnd"><strong>Eastside Location</strong></p>
<p class="x_x_gmail-isSelectedEnd">211 NE 18th Ave
Walk-ins available Monday–Friday beginning at 7:30 AM</p>
<p class="x_x_gmail-isSelectedEnd"><strong>Westside Location</strong></p>
<p class="x_x_gmail-isSelectedEnd">12670 NW Barnes rd unit 200
Now offering walk-ins every Tuesday beginning at 8:00 AM</p>
<p class="x_x_gmail-isSelectedEnd">Clients are welcome to walk in for a prescreen, or they may call ahead to schedule services in advance.</p>
<p class="x_x_gmail-isSelectedEnd"><strong>Intake Line:</strong> 971-299-2394
<strong>Main Line:</strong> 971-213-7222 (Press Option 1 for Admissions)</p>
<p class="x_x_gmail-isSelectedEnd">If a client would like to complete their prescreen before arriving, they can call either number above and our admissions team will assist them through the process.</p>
<p class="x_x_gmail-isSelectedEnd">We also accept referrals via email at:
<a title="mailto:intakes@anotherchancerehab.com" href="mailto:intakes@anotherchancerehab.com" data-linkindex="0">intakes@anotherchancerehab.com</a></p>
<img class="Do8Zj" tabindex="0" src="data:image/png;base64,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4xnPCL///e/7MTdOtKAJbUsvvXTj9Wa7cvfee2/4wx/+EF74whf203799den/v2BvT7RiYZXvOIViU60yW8VqnMEly9+8Ysht6vurrvumvrUprnfd999w29/+9v+qzc8sGaFN1zdqtcOD7RUAxxjjGH77bcPG2ywQYgxBmm5zGGHHRZe+9rXJmxhfOSRR+as9MSrTfyPjm74NDWy8I9+jedXv/pV6g8mn/70p8Ott966sERI89oJ62741jiMB7bPec5zQp33+zssLwWBSY5AUc4m+QRPxeHZXGfNmhV+8pOfpA3ktttuS8qVTdaGTRmQZgPL+Nxxxx1hzz33DDahu+++O3zsYx8LT33qU8MNN9yQ2pg7d2746le/Gs4999xcJdgg3/nOd4bLL788vP71rw9rr7122HvvvVOdXOjSSy9Nip4+Dz300LDWWmuFrbfeOuhD20sttVT45Cc/GfSf6/z1r38NQqZRm/vss0/KplR1Q1sq3PfnSU96Upg3b1445ZRTAiXKFaK49PPPPz98+MMfTgopevQn/tGPfjRcccUVfbUX/d/mvummm4YTTjghXHjhheGmm24K++23X1JMpOUaNnRKwE477ZTwo9xQ6syJNrbbbrt0nYkmtOnPZpzr52e7cieddFJ4wQtekGhF+4wZM8K3v/3toJ8HH3wwfO9730v+WuaAInHEEUckBdE85PbrT3nVOXINvOKKKwbK8P/+97/EI9tss0047rjj0rhcF+Mb46y2VeWN173udUmxaodHta53Cj2cPve5zwWKn3dp8m6//fbkq8eH0Li22mqrdPi45JJLZId2/E+h7cSnqZHaH2N86UtfGm655ZbEqy95yUuS0ghnoRPW3fCt+fzBD34QYGlcl112WerPQaBGTokWBCY9AotN+hGWAY4yAmPbnY1ik002SZvVe97znmRxeMxjHpOUruc///nhyD4Lw5JLLhlWXXXVtGFmailqyr3qVa8KLCHeN+izWDzhCU9IRZZbbrlkJaNY2Sglvvvd707txBhFk/KzzDLLBEpASuj7Q3F529velixlrAAsPa9+9av7ckLQ9nrrrRee97znhd133z2l+fOVr3wlvPjFL/YaKG9f+9rXQupGAC4AAAlSSURBVFbOuqUtVW7zxxg233zzpHBWcfrUpz4VVl999fCXv/ylsTblDg2/+c1vkhVFIbhuttlm/XGKpnH+6U9/Cnmsiy++ePjud7+bFNeqgqv+YAOl6eMf/3j/HPNfs6lzoj/55JOTNRMNLIz6eNaznpWUs7lz5yZLj7RqoLj/+c9/TopmphsfUOp32WWXpPRtscUWYeONNw7GrK62WYyWWGIJ0f5Q5Y3hxuPJT35y+P73v594Socsp29/+9vDiSeeGLrhfwpxKz61NrRZDw4hH/jABxLW5nKdddYJF1xwQVLOu8Eaz8Cy1ZqiUM+ZMyfxSMbe+qCsrbDCCnVySrwgMOkRKMrZpJ/iqTVAlg6b4SqrrDJg4DHGYIPZf//9UzqF5IADDgg333xziu+8887JisRadvbZZ6d3m0PKXPjHpnbRRRel07ykxz72sWmz8i6Is3RQetAgsMTY1HyRyPLiKkrZHNRZbbXVwlFHHZWTgiu+/kjfi80Qnawe3dLWV63t/6wvLEorrbTSIuXgZJysHfVMFjBXTpTGap44y4o01hXKCmuheA7wtPEee+yxOWlIT9jFuEAx1pCrYoEVjdXlzW9+c3j2s58tqz9Mnz493H///WF+33Vuf+LCF3N03333pSvghUkDHsYVYwysRtUMV7bvete7qkmhSpt6w4kHJWexxR4V3THGZEF0Hd0N/6OtFZ8OGEQlAkfzl5PQgB/xUTdYd+LbK/ostdqyxnIfnvpceeWVvZZQEFiAwBT5++gKnyIDLsOc/Ai4anv5y1+eFKcYY//zQx/6ULqSgYArMJYUV2quF/1cwcyZM2WlwHoV46N1Y4zJX+ucc85JFpRUqOEPK5mN+Pjjj+/3UUNLQ9Geklw7soqoNFja1B1qePjhh0PV/61VezZjvl4xDsSQ5cQm3KrecKa7Go5xYP+sThR0ivJw9tWprdHEoxv+Hw4+peRmHLvBuh3fZt7uhGPJLwhMFQSKcjZVZnqKjNPm6/TNJ8jVXTW4OuHDBAonchYtzt38g1xTLb/88rKCq01XV9W63m0gLC5NvlGpYt8fvlyu17bddtuwxx57pGtP1jh1OFLzB+or1v+/Nn0swHm7P7HNy1BoqzY7bdq0sOyyy6Zr3mq6d47rrGDGIl4NnPhZBFnQqulw4dwvjSXJ5s+iArccKHbG+8Mf/lCxEQ0vetGLgutIc57799Q/iyAfwToB5ujxj3988s+r54kblzYuvvhi0f7AMnbIIYf0x+sv6jXgEUYCj27539w28Wmd9m7i3WDdiW9d4+PJzEO5X1fNVTeBnF6eBYHJjkBRzib7DE+x8bmy+dKXvhQ23HDDfsuVDZWzOr+cqr8TvyBxPkOsauqCy5eSLGkck7OVyG9tcdz3JaUy7YJrGBY2iuD73//+VJQy+OMf/zj43SpO5BJtPHyzrrnmmrDGGmtI6hgGS5trKYoHxUQnMcbA323HHXdMv6MFI2M1Zs7fvm5Vrh4oZ5RaX6ny75LvOo0PlPGIU0Z9WEEJkydN2z5s4OvHUimNgoAuX/GJtwrdlqvWd6UKc/hmulgf0cl6R0mrlveu/M9+9rOw0UYbhTxH6PYBgPG4Xmb9kZ/Hhfb1118/uOLTRlPoFo+munwd4Wx+mvLraXi4W/5v4tN6e93Eu8G6E9+i20cXPjbJ2Js3/qN1ZbgbmkqZgsBER6AoZxN9Bsea/nHYv5+q4NhtI/VTGnykOKPzBfNzCplk/kfiNlYbVU63mXIa9/WY+q7nbED8itZdd91crOWTwuFrUdYZ1qlcEF0cyjlT841SjgWKv5s+c7l2T+UGQ5uPDjjPG68vMilpfNsoZz5UQI+x+vCAxU9eEx0xxuS0zZ+L4gAbCihFjK+aNtTzUQH8+dMpIx3dLIrGrQwrz5e//OWgPl88Pl/S66HbctV6FCkbO98oP7XhCtt8o2P27NnJJ6xaPr/X50jfBx98cPrJDpZP42KR8zECvuJDJ82HFLmNpqcynfBoqucnK3xUYt5dxzaVqacZQzf8bx6a+LTeXqd4N1ij3/y3W1PoNmewhC3+8jVudc3xqXNIYhnvRFfJLwhMZASKcjaRZ6/Q3hIBfl6c7DmHC3zAKADVCjHGQFnwkxI2qmqer/B8PcYywofnyiuvDDYJm71ylBGWMe/14CrNzxr4yQvWmGo+GmxQrDja1oe+chlt5p9MyGni8+bNCyxI0pRXT/0m2pSphxhj+sKPnxAFLLdFYfGzF3yHtOea1xVvvX41zprEAqVvwVUUpU8brvCUjTGmDzBYEJXRtn71Jz8HSot6rntdK+b0+rNejuLLEpfHobx3afLEYc+qpX+WT09WL+nyW4XqHKGtikmMMfgtOPzAouU6lyWRNQ5PaNPTPHrPIcbu8Mjl85OSDEP4ve9970s8UB1jLqdPIce74f92fJrb8cR/9fGYK9blXrDuhm99oGK8sIWxq9cqtpRlhxnKMdpKmPwITNURFuVsqs58GfeIIGDDY4miEHZ7VTkihIxQo66B/W6XL10pabqhOPidqxkzZoTstye9hPGLwGTn0/GLfKGsINAdAkU56w6nUqog0BEBV4X82Pbaa6/wj3/8I/2IbcdKE6wAC5nfZKOAsmK4svSL7n5ri+9ejHGCjWi0yB0//UwFPh0/aBdKCgKDQ6AoZ4PDrdQqCCyCgGs1X5a5Tu10NbhI5QmU4MqMH5QrP1eFrp/8+j3fowk0jClL6lTh0yk7wWXgkwKBopxNimkcvUGUngoCBYGCQEGgIFAQGFkEinI2sviW1gsCBYGCQEGgIFAQ6A6BUmohAkU5WwhEeRQECgIFgYJAQaAgUBAYDwgU5Ww8zEKhoSBQEJhcCJTRFAQKAgWBISBQlLMhgFeqFgQKAgWBgkBBoCBQEBhuBIpyNtyITq72ymgKAgWBgkBBoCBQEBhlBIpyNsqAl+4KAgWBgkBBoCBQEIBACa0QKMpZK2RKekGgIFAQKAgUBAoCBYExQKAoZ2MAeumyIFAQmFwIlNEUBAoCBYHhRKAoZ8OJZmmrIFAQKAgUBAoCBYGCwBARKMrZEAGcXNXLaAoCBYGCQEGgIFAQGGsEinI21jNQ+i8IFAQKAgWBgsBUQKCMsWsEinLWNVSlYEGgIFAQKAgUBAoCBYGRR6AoZyOPcemhIFAQmFwIlNEUBAoCBYERReD/AQAA//9TJ/05AAAABklEQVQDAP3/3IJSzfnmAAAAAElFTkSuQmCC" alt="image.png" width="556" height="384" crossorigin="use-credentials" data-imagetype="AttachmentByCid" data-custom="AAkALgAAAAAAHYQDEapmEc2byACqAC%2FEWg0AqaX3uaL%2FsEm5G0Gn3T3ljAADNiscJgAAARIAEACVTr1zORDxT6Qc%2F%2BRW5IO9" data-outlook-trace="F:1|T:1" />
<p class="x_x_gmail-isSelectedEnd">At Another Chance, we believe recovery is not one-size-fits-all. Our philosophy is rooted in trauma-informed, person-centered care that focuses on meeting individuals where they are with dignity, accountability, compassion, and hope. We strive to create an environment where clients feel supported, challenged, and empowered throughout their recovery journey.</p>
Services we currently offer include:
<ul>
 	<li>Substance Use Disorder Assessments &amp; Prescreens</li>
 	<li>DUII Services</li>
 	<li>Outpatient Treatment</li>
 	<li>Intensive Outpatient Treatment (IOP)</li>
 	<li>High Intensity Outpatient (HIOP) <i>formerly known as PHP</i></li>
 	<li>Case Management &amp; Care Coordination</li>
 	<li>Relapse Prevention &amp; Life Skills</li>
 	<li>Coordination with Community Resources and Partner Agencies</li>
</ul>
We are also happy to share that Another Chance continues to provide Assessment Only services as well as DUII treatment services for individuals needing evaluations, treatment engagement, or support navigating court and DMV-related requirements.', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/as.png', '211 Northeast 18th Avenue', 'Portland', 'Oregon', '97232', NULL, 'United States', 45.5244865, -122.6478213, '971-299-2394', NULL, 'https://anotherchancerehab.com/', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2026-05-20 20:46:14', '2026-05-20 20:46:14')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Walk In'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'By Appointment'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 105: Poised Properties
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Poised Properties', NULL, 'At Poised Properties, we support owners who care about people—teachers, new investors, and anyone working to provide affordable homes. Poised Properties provides caring, reliable property management for housing communities. We support both residents and property owners with clear communication, fair practices, and trusted service.

Housing Listings on website.', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Poised-Properties.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '971-867-2144', NULL, 'https://poisedproperties.com/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2026-05-20 20:51:15', '2026-05-20 20:51:15')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
END $$;

-- Resource 106: Rahab's Sisters
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Rahab''s Sisters', NULL, 'Rahab’s Sisters is a community for women, trans, and nonbinary folks experiencing poverty, houselessness, and isolation. Our weekly gatherings are centered around nourishing meals, authentic relationships, fun, and <a href="https://rahabs-sisters.org/values" target="">radical hospitality</a>. At Rahab’s Sisters, you’ll find a vibrant community of Guests, volunteers, and staff building authentic and lasting connections that transcend life circumstances.
<div class="row sqs-row">
<div class="col sqs-col-10 span-10">
<div id="block-yui_3_17_2_1_1724190888960_6269" class="sqs-block html-block sqs-block-html" data-block-type="2" data-sqsp-block="text">
<div class="sqs-block-content">
<div class="sqs-html-content" data-sqsp-text-block-content="">
<p class=""><strong>Our mission</strong> is to cultivate community with women, trans, and nonbinary people through joy and nourishment of body and mind.</p>
By appointment.

</div>
</div>
</div>
</div>
<div class="col sqs-col-1 span-1">
<div id="block-yui_3_17_2_1_1744677560377_4333" class="sqs-block website-component-block sqs-block-website-component sqs-block-spacer spacer-block sized vsize-1" data-block-css="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.spacer/f5c589ce-c173-4090-9531-c720a459a1bd_891/website.components.spacer.styles.css&quot;]" data-block-scripts="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.spacer/f5c589ce-c173-4090-9531-c720a459a1bd_891/website.components.spacer.visitor.js&quot;]" data-block-type="1337" data-definition-name="website.components.spacer" data-website-component-id="yui_3_17_2_1_1744677560377_4333">
<div class="sqs-block-content"></div>
</div>
</div>
</div>
<div id="block-yui_3_17_2_1_1724194318530_5400" class="sqs-block website-component-block sqs-block-website-component sqs-block-spacer spacer-block" data-aspect-ratio="0.07518796992481203" data-block-css="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.spacer/f5c589ce-c173-4090-9531-c720a459a1bd_891/website.components.spacer.styles.css&quot;]" data-block-scripts="[&quot;https://definitions.sqspcdn.com/website-component-definition/static-assets/website.components.spacer/f5c589ce-c173-4090-9531-c720a459a1bd_891/website.components.spacer.visitor.js&quot;]" data-block-type="1337" data-definition-name="website.components.spacer" data-website-component-id="yui_3_17_2_1_1724194318530_5400">
<div id="yui_3_17_2_1_1779310449303_87" class="sqs-block-content sqs-intrinsic"></div>
</div>
<div id="block-yui_3_17_2_1_1744677560377_8932" class="sqs-block html-block sqs-block-html" data-block-type="2" data-sqsp-block="text">
<div class="sqs-block-content">
<div class="sqs-html-content" data-sqsp-text-block-content=""></div>
</div>
</div>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Rahab.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '971.208.3176', NULL, 'https://rahabs-sisters.org/', (SELECT id FROM what_topics WHERE slug = 'clothing'), 'admin', '2026-05-20 21:04:48', '2026-05-20 21:04:48')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'By Appointment'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'LGBTQIA2S+'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Women'));
END $$;

-- Resource 107: Stronger Oregon
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Stronger Oregon', NULL, '<strong>Stronger Oregon provides therapy and assistance with housing, food, and climate-related benefits — empowering adults, youth, and families statewide.</strong>
<p data-rte-preserve-empty="true"><strong>Personalized Care, Your Way</strong></p>

<ul data-rte-list="default">
 	<li>
<p class="sqsrte-large" data-rte-preserve-empty="true"><strong>Choose your provider</strong> – No more random assignments. You select the therapist who best fits your needs.</p>
</li>
 	<li>
<p class="sqsrte-large" data-rte-preserve-empty="true"><strong>Flexible session formats</strong> – Access therapy <strong>your way</strong>: Telehealth, in-office, in-school, or a hybrid model (when available).</p>
</li>
 	<li>
<p class="sqsrte-large" data-rte-preserve-empty="true"><strong>Comprehensive support</strong> – We offer individual therapy, family therapy, couples counseling, and group therapy to meet diverse needs.</p>
</li>
 	<li>
<p class="sqsrte-large" data-rte-preserve-empty="true"><strong>Scheduling that works for you</strong> – Appointments available early mornings, evenings, and weekends.</p>
</li>
</ul>
&nbsp;', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Stronger-Oregon.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '541-900-4285', NULL, 'https://www.strongeroregon.com/', (SELECT id FROM what_topics WHERE slug = 'mental-behavioral-health'), 'admin', '2026-05-20 22:11:35', '2026-05-20 23:06:48')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 108: Atlas Addiction Treatment Center of Oregon
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Atlas Addiction Treatment Center of Oregon', NULL, '<div class="w-layout-blockcontainer base-container position-relative w-container">
<div class="content-inner-banner">
<p class="text-color-white text-center" data-w-id="f75b64f3-89b7-8282-280b-137e48b7d4f2">Substance-Specific Addiction Treatment Programs in Oregon</p>

<div class="inner-paragraph-block">
<p class="paragraph-large text-white" data-w-id="f75b64f3-89b7-8282-280b-137e48b7d4f5">At Atlas Treatment Center, we understand that every addiction is unique. That’s why we offer substance-specific treatment programs designed to address the distinct challenges of different types of addictions. From fentanyl and methamphetamine to benzodiazepines, our comprehensive approach combines medical care, therapy, and holistic treatments to support you at every stage of recovery.</p>

</div>
</div>
</div>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-21-at-4.54.23-PM.png', '411 Northeast 19th Avenue', 'Portland', 'Oregon', '97232', NULL, 'United States', 45.5256376, -122.6463696, '971-443-1813', NULL, 'https://www.atlastreatmentcenter.com/', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2026-05-21 23:55:06', '2026-05-21 23:55:06')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 109: Boulder Care
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Boulder Care', NULL, '<div class="section is---blue-texture">
<div class="container">
<div class="content is---flex-vertical-center">
<p class="content__eyebrow is---justify-center">Telehealth Addiction Treatment</p>

At Boulder, we care for people with substance use disorders (SUD) — specifically <strong>opioid use disorder (OUD)</strong> and <strong>alcohol use disorder (AUD) </strong>—<strong> </strong>grounded in kindness, respect, and unconditional support.</div>
<div></div>
</div>
</div>
<div class="container is---flex-vertical-center">
<div class="content is---flex-vertical-center is---800px">
<p class="content__heading is---for-michael">Comprehensive <span style="text-decoration: underline;">online</span> care for people with addiction</p>

As a Boulder patient, you get access to all of our clinical and support services at no extra cost. This means you get the treatment you need, whenever you need it.</div>
</div>
<div class="bg__torn-bottom is---grad-peach-1-2">
<div class="bg__edge-bottom"></div>
</div>
<div class="section">
<div class="container">
<p class="content__eyebrow">Clinical Services</p>

<div class="content">
<div class="grid__col-3">
<p class="feature__heading">Medications for addiction treatment</p>

<div class="feature__paragraph__wrapper">
<p class="rte__feature w-richtext">We prescribe FDA approved medicines, including <a href="https://www.boulder.care/suboxone-naloxone-buprenorphine" data-wf-native-id-path="30603bf4-1d1c-d9fc-1973-683dc3fe4b75" data-wf-ao-click-engagement-tracking="true" data-wf-element-id="30603bf4-1d1c-d9fc-1973-683dc3fe4b75">Suboxone</a>, to treat your SUD. Medication for Addiction Treatment (MAT) is the gold standard of care.MAT is very effective at reducing symptoms, like cravings and withdrawal, and is linked to long-term success and well-being. <strong>An evidence-based, MAT path to recovery can help you achieve your health goals.</strong></p>

</div>
<div class="feature__icon"></div>
<p class="feature__heading">Personalized treatment plan</p>

<div class="feature__paragraph__wrapper">
<div class="rte__feature w-richtext">Our clinicians can diagnose, treat, and prescribe medication for your SUD and commonly co-occuring mental health conditions: anxiety, depression, PTSD, and insomnia.<strong>We''re here for you, not just your SUD.</strong></div>
</div>
<div id="w-node-_1b79e167-c5a4-1046-9baa-aa7dd4572cce-d4572cce" class="feature">
Coordinated, streamlined care
<div class="feature__paragraph__wrapper">
<div class="rte__feature w-richtext">Our clinicians work together with your entire Boulder care team to help you reach your health and life goals. We also coordinate with other providers to streamline your care, and can join visits virtually or make referrals to trusted providers.<strong>Our goal is to make sure your whole team is on the same page.</strong></div>
</div>
</div>
</div>
</div>
</div>
</div>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-21-at-5.00.41-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '866-901-4860', NULL, 'https://www.boulder.care/', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2026-05-22 00:01:12', '2026-05-22 00:01:12')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 110: Bridge of Hope
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Bridge of Hope', NULL, '<div class="elementor-element elementor-element-f1bcefa elementor-widget elementor-widget-heading" data-id="f1bcefa" data-element_type="widget" data-e-type="widget" data-widget_type="heading.default">
<div class="elementor-widget-container">
<p class="elementor-heading-title elementor-size-default">We are Ready to Help</p>

</div>
</div>
<div class="elementor-element elementor-element-260a625 elementor-widget elementor-widget-text-editor" data-id="260a625" data-element_type="widget" data-e-type="widget" data-widget_type="text-editor.default">
<div class="elementor-widget-container">

Bridge of Hope Outpatient Treatment Center, located off Sandy Blvd in Portland, Oregon, offers patient-focused, holistic care for substance use and co-occurring disorders. Our experienced team is committed to providing wraparound support to individuals and families suffering from addiction and mental health conditions.

</div>
</div>
<div class="elementor-element elementor-element-a6313ed e-con-full e-flex e-con e-child" data-id="a6313ed" data-element_type="container" data-e-type="container">
<div class="elementor-element elementor-element-e67abd6 e-con-full e-flex e-con e-child" data-id="e67abd6" data-element_type="container" data-e-type="container">
<div class="elementor-element elementor-element-295f334 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="295f334" data-element_type="widget" data-e-type="widget" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
 	<li class="elementor-icon-list-item"><i class="fas fa-check" aria-hidden="true"></i><span class="elementor-icon-list-text">Substance Abuse</span></li>
 	<li class="elementor-icon-list-item"><i class="fas fa-check" aria-hidden="true"></i><span class="elementor-icon-list-text">Mental Health</span></li>
 	<li class="elementor-icon-list-item"><i class="fas fa-check" aria-hidden="true"></i><span class="elementor-icon-list-text">Co-Occurring Disorders</span></li>
 	<li class="elementor-icon-list-item"><i class="fas fa-check" aria-hidden="true"></i><span class="elementor-icon-list-text">Medication Management</span></li>
</ul>
</div>
</div>
</div>
<div class="elementor-element elementor-element-d3fa57d e-con-full e-flex e-con e-child" data-id="d3fa57d" data-element_type="container" data-e-type="container">
<div class="elementor-element elementor-element-6d0aae5 elementor-icon-list--layout-traditional elementor-list-item-link-full_width elementor-widget elementor-widget-icon-list" data-id="6d0aae5" data-element_type="widget" data-e-type="widget" data-widget_type="icon-list.default">
<div class="elementor-widget-container">
<ul class="elementor-icon-list-items">
 	<li class="elementor-icon-list-item"><i class="fas fa-check" aria-hidden="true"></i><span class="elementor-icon-list-text">LGBTQ+ Inclusive</span></li>
 	<li class="elementor-icon-list-item"><i class="fas fa-check" aria-hidden="true"></i><span class="elementor-icon-list-text">Family Services</span></li>
 	<li class="elementor-icon-list-item"><i class="fas fa-check" aria-hidden="true"></i><span class="elementor-icon-list-text">DUII Services</span></li>
 	<li class="elementor-icon-list-item"><i class="fas fa-check" aria-hidden="true"></i><span class="elementor-icon-list-text">Sober Living</span></li>
</ul>
</div>
</div>
</div>
</div>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-21-at-5.04.27-PM.png', '6517 Northeast Sandy Boulevard', 'Portland', 'Oregon', '97213', NULL, 'United States', 45.5458142, -122.5959736, '503-793-0443', NULL, 'https://bridgeofhope-otc.com/', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2026-05-22 00:05:18', '2026-05-22 00:05:18')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Building'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 111: CHAT Team
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('CHAT Team', NULL, '<p class="page-title">Community Health Assess and Treat</p>
Behavioral health and non-emergency medical crises.

Dispatched with calling 911, we can specifically ask for CHAT Team and then 911 dispatcher will decide', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-21-at-5.15.50-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '911', NULL, 'https://www.portland.gov/fire/community-health/chat', (SELECT id FROM what_topics WHERE slug = 'crisis-hotlines'), 'admin', '2026-05-22 00:16:38', '2026-05-22 00:16:38')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
END $$;

-- Resource 112: Harm Reduction & BRidges to Care (HRBR)
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Harm Reduction & BRidges to Care (HRBR)', NULL, 'Our mission is to provide evidence-based, low barrier, on-demand access to medications for addiction treatment to people who are interested in cutting back or stopping their drug or alcohol use.

<strong>Services</strong>

Urgent access to medication/treatment for the following substance use disorders (SUDs):
<ul>
 	<li>Alcohol use disorder (AUD)</li>
 	<li>Opioid use disorder</li>
 	<li>Nicotine use disorder</li>
 	<li>Kratom use disorder</li>
 	<li>Methamphetamine use disorder</li>
 	<li>Limited behavior health support for SUDs/MOUD</li>
 	<li>Peer support services</li>
 	<li>HIV and Hepatitis C screening</li>
 	<li>Hepatitis C treatment</li>
</ul>
<strong>Note:</strong> We do not treat acute alcohol withdrawal or benzodiazepine withdrawal in HRBR. In general, HRBR does not provide individuals with buprenorphine for chronic pain. HRBR is able to care for patients 15 years of age and older. If you have specific questions about what services we do or do not provide in HRBR, please contact the clinic at <a class="phone" href="tel:(503) 494-2100">(503) 494-2100</a>.

<strong>Hours</strong>
Monday-Friday
10am to 7pm

<strong>Location</strong>
Virtual clinic', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-21-at-5.53.45-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(503) 494-2100', NULL, 'https://www.ohsu.edu/school-of-medicine/general-internal-medicine/harm-reduction-bridges-care-hrbr', (SELECT id FROM what_topics WHERE slug = 'recovery'), 'admin', '2026-05-22 00:54:21', '2026-05-22 00:54:21')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Daytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People in Recovery'));
END $$;

-- Resource 113: Call to Safety
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Call to Safety', NULL, 'Call to Safety provides a comprehensive 24/7 crisis line, follow-up advocacy for survivors, support groups, community outreach and education, and sexual assault medical advocacy.

We can support crisis line callers in any language through our international language bank, and connect survivors to local culturally-specific resources or co-advocacy.

Call to Safety advocates provide every caller with a needs assessment, peer support, safety planning, crisis intervention, and information and referrals to community resources.

Our advocates work with specific populations to provide culturally relevant and specialized services for survivors experiencing houselessness, survivors with developmental and intellectual disabilities, survivors that identify as LGBTQ+, and survivors that experience mental illness.

All of our advocates are trained to support sex workers. Sexual assault advocacy provides specialized services to survivors of sexual assault.

Link to Shelter Space: <a href="https://calltosafety.org/services/shelter-space/">https://calltosafety.org/services/shelter-space/ </a>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Screenshot-2026-05-24-at-7.29.05-PM.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '503.235.5333', NULL, 'https://calltosafety.org/', (SELECT id FROM what_topics WHERE slug = 'crisis-hotlines'), 'admin', '2026-05-25 02:36:41', '2026-05-25 02:47:02')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_when_times (resource_id, when_time_id) VALUES (rid, (SELECT id FROM when_times WHERE name = 'Anytime'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Meetings'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Domestic Violence (DV) Survivors'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'Survivors of Human Trafficking'));
END $$;

-- Resource 114: Raíces de Bienestar
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('Raíces de Bienestar', NULL, '<p class="preFade fadeIn">Raíces offers community programs, psychoeducation, and outreach events and activities for Latine community members across the state. We call these community liberation programs, as our intentions are to empower participants to feel a sense of belonging, inclusion, wellbeing,  connection and cultural pride. We honor our participants’ wisdom and experiences and work together on finding freedom from oppression and suffering that may influence their emotional and mental health.</p>
<p class="preFade fadeIn">Raíces de Bienestar offers clinical mental and behavioral health services to Latine community members across Oregon. <span class="sqsrte-text-color--accent"><strong>We are an Oregon Health Plan/Medicaid  provider.</strong> </span>On a limited basis, we provide discounted or free of charge sessions to individuals and families who are uninsured or underinsured thanks to the generosity of donors and funders. Currently we are not able to bill private insurance plans or Medicare.</p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--accent"><strong>Raices clinical services are provided via a HIPAA compliant telehealth platform or by phone for greater accessibility for our community. We are expanding in person services, on limited bases, to our Hillsboro office and Medford office. Raices’ clinic also offers mobile health services, in collaboration with other community partners, in the field in order to meet the community where they are at.</strong>  </span></p>
<p class="preFade fadeIn">Our services include individual, group, couples and family therapy for issues such as relationship difficulties, stress, trauma, depression, sleep difficulties, anxiety, isolation, grief, adjustment disorder, acculturative stress, cultural trauma, etc.</p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--accent"><strong>We offer culturally adapted, personalized, compassionate, and evidence based mental health services for individuals, couples and families in need.</strong></span> Some therapeutic modalities offered by our clinical team include Cognitive Behavioral Therapy, Motivational Interviewing, Trauma Therapy, Solution Focused Therapy, Acceptance and Commitment Therapy, Liberation Psychology, Multicultural therapy, Narrative Therapy, Emotionally Focused Therapy, Family Systems Therapy, Strength-Based Therapy, amongst others. Our clinicians assured that these evidence based modalities are culturally adapted and appropriate for the community we serve.</p>
<p class="preFade fadeIn"><span class="sqsrte-text-color--accent"><strong>Sessions are offered by a team of bilingual (Spanish and English) and bicultural providers, all who are qualified mental health professionals or associates working under the supervision of licensed psychologists.</strong></span></p>', 'https://resources.reentryresource.org/wp-content/uploads/2026/05/Raices.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(971) 417-6054', NULL, 'https://www.raicesdebienestar.org/', (SELECT id FROM what_topics WHERE slug = 'mental-behavioral-health'), 'admin', '2026-05-26 19:54:47', '2026-05-26 19:54:47')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Classes & Workshops'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'BIPOC'));
END $$;

-- Resource 115: QUAD
DO $$
DECLARE
  rid uuid;
BEGIN
  INSERT INTO resources (title, description, content, featured_image, street_address, city, state, zip, region, country, latitude, longitude, phone, email, website, what_topic_id, created_by, created_at, updated_at)
  VALUES ('QUAD', NULL, 'We’re dedicated to advancing the rights and independence of adults living with physical disabilities through the provision of low-cost accessible housing and supportive services that promote self-reliance and self-sufficiency in all aspects of daily living.

QUAD’s programs offer adults with physical disabilities the opportunity to live in their own homes with a greater degree of independence than they may have thought possible. Much different than a nursing center, the unique services offered by QUAD communities play to the individual strengths of each resident. They ensure independence and self-reliance within a fully functional and accessible environment that enhances each resident’s opportunities to pursue vocational, educational, and civic goals of their own choosing.', 'https://resources.reentryresource.org/wp-content/uploads/2026/06/Screenshot-2026-06-18-194706.png', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '503.287.4260', NULL, 'https://quadinc.org/', (SELECT id FROM what_topics WHERE slug = 'housing'), 'admin', '2026-06-19 02:48:07', '2026-06-19 02:48:07')
  RETURNING id INTO rid;
  INSERT INTO resources_where_location_types (resource_id, where_location_type_id) VALUES (rid, (SELECT id FROM where_location_types WHERE name = 'Online'));
  INSERT INTO resources_how_formats (resource_id, how_format_id) VALUES (rid, (SELECT id FROM how_formats WHERE name = 'Service'));
  INSERT INTO resources_who_centerings (resource_id, who_centering_id) VALUES (rid, (SELECT id FROM who_centerings WHERE name = 'People with Disabilities'));
END $$;
