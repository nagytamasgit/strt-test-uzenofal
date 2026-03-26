# Üzenőfal (Message Wall)

Egyszerű üzenőfal alkalmazás — Next.js, Supabase, Tailwind CSS.

## Előfeltételek

- Node.js 18+
- Supabase projekt (ingyenes tier is megfelelő)

## Telepítés

### 1. Repo klónozása

```bash
git clone https://github.com/nagytamasgit/strt-test-uzenofal.git
cd strt-test-uzenofal
npm install
```

### 2. Supabase beállítása

1. Hozz létre egy projektet a [Supabase](https://supabase.com) felületen
2. Menj a **SQL Editor** menüpontra
3. Futtasd le a `supabase-schema.sql` fájl tartalmát — ez létrehozza a `messages` táblát és az RLS policy-kat

### 3. Környezeti változók

```bash
cp .env.local.example .env.local
```

Töltsd ki a `.env.local` fájlt a Supabase dashboard **Settings > API** menüjéből:

- `NEXT_PUBLIC_SUPABASE_URL` — Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — anon/public key

### 4. Fejlesztői szerver indítása

```bash
npm run dev
```

Nyisd meg: [http://localhost:3000](http://localhost:3000)

## Vercel Deploy

1. Importáld a GitHub repót a [Vercel](https://vercel.com) felületen
2. Add meg a környezeti változókat (ugyanazok mint `.env.local`-ban)
3. Deploy — zero config, működik

## Technológiák

- **Next.js 15** (App Router, TypeScript)
- **Supabase** (PostgreSQL + RLS)
- **Tailwind CSS v4**
- **Vercel** (hosting)
