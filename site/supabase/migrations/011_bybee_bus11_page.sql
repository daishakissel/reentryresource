-- Add Bus #11 Schedule page to Bybee shelter
INSERT INTO shelter_pages (shelter_id, title, slug, content, sort_order)
VALUES (
  (SELECT id FROM shelters WHERE slug = 'bybee'),
  'Bus #11 Schedule',
  'bus-11-schedule',
  '<h2>Route 11 – Rivergate/Marine Dr</h2>
<p>This route connects <strong>East Columbia, Expo Center, Smith/Bybee Lakes, Rivergate</strong> and <strong>St Johns</strong> via Marine Dr, Lombard, Columbia, Fessenden, and Ivanhoe.</p>

<h3>Service Hours</h3>
<p><strong>Weekday service only</strong> — No service on Saturday or Sunday.</p>

<h3>To Vancouver Way &amp; Middlefield</h3>
<table style="width:100%; border-collapse:collapse;">
  <tr style="border-bottom:1px solid #ddd;">
    <th style="text-align:left; padding:8px;">Stop</th>
    <th style="text-align:left; padding:8px;">First Bus</th>
    <th style="text-align:left; padding:8px;">Last Bus</th>
  </tr>
  <tr style="border-bottom:1px solid #eee;">
    <td style="padding:8px;">N Richmond &amp; Princeton</td>
    <td style="padding:8px;">6:00 AM</td>
    <td style="padding:8px;">7:04 PM</td>
  </tr>
  <tr style="border-bottom:1px solid #eee;">
    <td style="padding:8px;">N Macrum &amp; Powers</td>
    <td style="padding:8px;">—</td>
    <td style="padding:8px;">—</td>
  </tr>
  <tr style="border-bottom:1px solid #eee;">
    <td style="padding:8px;">N Marine &amp; Pier 99 St</td>
    <td style="padding:8px;">—</td>
    <td style="padding:8px;">—</td>
  </tr>
  <tr>
    <td style="padding:8px;">NE Middlefield Rd &amp; N Vancouver Way</td>
    <td style="padding:8px;">—</td>
    <td style="padding:8px;">—</td>
  </tr>
</table>

<h3>To St Johns</h3>
<table style="width:100%; border-collapse:collapse;">
  <tr style="border-bottom:1px solid #ddd;">
    <th style="text-align:left; padding:8px;">Stop</th>
    <th style="text-align:left; padding:8px;">First Bus</th>
    <th style="text-align:left; padding:8px;">Last Bus</th>
  </tr>
  <tr style="border-bottom:1px solid #eee;">
    <td style="padding:8px;">NE Middlefield Rd &amp; N Vancouver Way</td>
    <td style="padding:8px;">5:08 AM</td>
    <td style="padding:8px;">6:48 PM</td>
  </tr>
  <tr style="border-bottom:1px solid #eee;">
    <td style="padding:8px;">N Marine &amp; Pier 99 St</td>
    <td style="padding:8px;">—</td>
    <td style="padding:8px;">—</td>
  </tr>
  <tr style="border-bottom:1px solid #eee;">
    <td style="padding:8px;">N Fessenden &amp; Midway</td>
    <td style="padding:8px;">—</td>
    <td style="padding:8px;">—</td>
  </tr>
  <tr>
    <td style="padding:8px;">N Richmond &amp; Princeton</td>
    <td style="padding:8px;">—</td>
    <td style="padding:8px;">—</td>
  </tr>
</table>

<p><em>Dashes (—) indicate intermediate stops — check <a href="https://trimet.org/schedules/r011.htm" target="_blank">TriMet Route 11</a> for exact times.</em></p>',
  10
);
