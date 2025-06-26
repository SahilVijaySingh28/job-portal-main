# Job Portal App

A modern, full-featured job portal built with React and Vite.
Live demo: https://job-portal-main-gn2fz6fgr-sahil-vijay-singhs-projects.vercel.app/

## Features

- **Role-based access:**
  - Admin (admin@jobportal.com) can add jobs, view and manage all applications.
  - Users can view jobs and apply for them.
- **Job Management:**
  - Add, view, and persist jobs (admin only).
  - Jobs are saved in your browser (localStorage) and remain after refresh.
- **Application System:**
  - Users can apply for jobs with a message.
  - Admin can accept/reject applications and send a response.
  - Applications are also persisted in localStorage.
- **Dashboard:**
  - See total jobs, applications, and latest jobs in a stylish preview.
- **Sidebar & Navigation:**
  - Collapsible sidebar, role-based links, and responsive layout.
- **Dark Mode:**
  - Toggle dark mode from the navbar. All pages are styled for both light and dark themes.
- **Persistent Login:**
  - Stay logged in after refresh (login state is saved in localStorage).

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app:**
   ```bash
   npm run dev
   ```
3. **Login:**
   - Use `admin@jobportal.com` to log in as admin.
   - Any other email logs in as a user.

## Usage Notes

- **Jobs and applications are stored in your browser.**
  - To reset, clear your browser's localStorage for this site.
- **Admin actions:**
  - Only the admin can add jobs or manage applications.
- **Dark mode:**
  - Use the moon icon in the navbar to toggle dark mode.

## Troubleshooting

### Images Not Loading After Deployment?
If your images (like the logo) are not loading on Vercel or other static hosts, make sure you use the correct path:

- **Use:** `/assets/Logo.png`
- **Do NOT use:** `src/assets/Logo.png`

Update all `<img src="...">` tags in your code to use `/assets/Logo.png` or the correct path relative to the `public` folder.

## Tech Stack
- React
- Vite
- Tailwind CSS
- React Icons

---

Feel free to customize and extend this project for your needs!
