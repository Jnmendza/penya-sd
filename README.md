# Penya Blaugrana San Diego 🔵🔴

The official website and membership management platform for the FC Barcelona Supporters Group of San Diego.

Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## 🚀 Features

### 1. Dynamic Match Scheduler

- **Automated Sync:** Fetches match schedules via API (or manual input).
- **Smart Display:** The homepage automatically updates to show the _next_ upcoming match based on current time.
- **Location Awareness:** distinct display logic for Home (Barcelona) vs. Away matches.

### 2. Membership Engine ("The Identity System")

A custom-built membership tracking system designed to handle seasonality without data duplication.

- **Upsert Logic:** Uses specific SQL functions to distinguish between _New Members_ and _Returning Veterans_.
- **Historical Tracking:** Uses a PostgreSQL Text Array (`text[]`) column (`seasons_active`) to track every season a member has been active (e.g., `['2024/2025', '2026/2027']`).
- **Conflict Resolution:** Prevents duplicate emails while allowing profile updates (phone, name) during renewal.

### 3. Admin Dashboard (`/admin`)

A protected portal for board members to manage the Penya.

- **Role-Based Access:** Secured via Supabase Auth.
- **Member Management:** View, search, and export the member roster.
- **Match Control:** Toggle specific matches as "Official Watch Parties" to highlight them on the frontend.
- **Config Control:** Open/Close membership registration globally.

### 4. Venue & Community

- **Interactive Maps:** Google Maps integration for the Novo Brazil watch party location.
- **Bento Grid Gallery:** A responsive CSS grid layout showcasing the atmosphere, tech, and family-friendly vibe.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## ⚙️ Local Development Setup

### 1. Clone the repository

```bash
git clone [https://github.com/your-username/penya-sd.git](https://github.com/your-username/penya-sd.git)
cd penya-sd
```
