# Admin Guide

## Logging In

1. Click **Login** in the sidebar (or navigate to `/login`)
2. Enter your admin email and password
3. Once logged in, the sidebar shows admin menu items: Resources, Shelters, Users

## Managing Resources

### Adding a Resource

1. Click **Resources** in the admin sidebar
2. Click **Add New**
3. Fill in the form:
   - **Title** (required)
   - **Organization Name** / **Facility Name** (optional)
   - **Short Description** — shown on resource cards in the grid
   - **Content** — full details, supports HTML and Markdown. Use the **Insert Image** button to add images
   - **What (Topic)** — select the service type. This auto-assigns WHY categories
   - **Featured Image** — upload or paste a URL, shown on cards and map popups
   - **Contact** — phone, email, website
   - **Location** — street address, city, state, ZIP, region, country. Click **Lookup Coordinates** to auto-fill lat/lng
   - **Classifications** — check applicable WHERE, WHEN, HOW, WHO values
4. Click **Save Resource**

### Editing a Resource

1. Go to **Resources** in the admin sidebar
2. Click the pencil icon next to the resource
3. Edit any fields and click **Save Changes**

### Deleting a Resource

1. Go to **Resources** in the admin sidebar
2. Click the trash icon next to the resource
3. Confirm the deletion

### Importing Resources via CSV

1. Go to **Resources** in the admin sidebar
2. Click **Import CSV**
3. Select a CSV file. Required column: `title`. Optional columns: `description`, `content`, `street_address`, `city`, `state`, `zip`, `region`, `country`, `phone`, `email`, `website`, `featured_image`, `latitude`, `longitude`

### Exporting Resources to CSV

1. Go to **Resources** in the admin sidebar
2. Click **Export CSV**
3. A CSV file downloads with all resource data

## Managing Shelters

### Adding a Shelter

1. Click **Shelters** in the admin sidebar
2. Fill in Name, Slug (auto-generated from name), and Password
3. Click **Create Shelter**

### Setting/Changing a Shelter Password

1. Go to **Shelters** in the admin sidebar
2. Click **Change** in the Password column
3. Enter the new password and click **Save**

### Managing Shelter Pages

1. In the shelters list, click the page icon next to a shelter
2. **Add Page**: fill in Title, Slug, Parent Page (optional, for sub-pages), Sort Order, and Content
3. Content supports HTML and Markdown. Use **Insert Image** to add images
4. **Edit**: click the pencil icon next to a page
5. **Delete**: click the trash icon next to a page

### Page Tree Structure

Pages can have parent pages, creating a nested tree in the sidebar. Set the **Parent Page** dropdown when creating or editing a page. Child pages appear indented under their parent.

## Managing Users

### Adding an Admin User

1. Click **Users** in the admin sidebar
2. Fill in Email and Password (min 8 characters)
3. Click **Create User**

### Inviting a User

1. In the Users page, fill in the email under **Invite User**
2. Click **Send Invitation** — they receive an email to set their password

### Deleting a User

1. Click the trash icon next to the user
2. Confirm deletion (you cannot delete yourself)

### Changing Your Password

1. Go to **Users** in the admin sidebar
2. Scroll to **Change Your Password**
3. Enter and confirm your new password
4. Click **Update Password**

## Resource Filter (Public)

The **Resource Filter** dropdown appears on all resource pages. It shows counts per option:
- **What** — filter by service topic
- **Where** — filter by location type
- **When** — filter by availability
- **How** — filter by delivery format
- **Who** — filter by population served

On WHY category pages (Health, Housing, etc.), counts and WHAT topics are scoped to that category only.

## Dark Mode

Click the **Dark Mode** / **Light Mode** button at the bottom of the sidebar to toggle.
