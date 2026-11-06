# RogueAXF — Cara Pakai

Startup by **Rogue — ARF**

## Jalankan di komputer Anda

```bash
cd rogueaxf
npm install
npm run dev
```

Buka: http://localhost:3000

## Fitur siap pakai

| Fitur | Cara |
|-------|------|
| Beranda / Feed | Buka `/` — demo post + post lokal |
| Buat postingan | `/create` → pilih foto → Bagikan |
| Like / komentar / save | Ketuk ikon di post |
| Story fullscreen | Ketuk avatar story di atas |
| Messages | `/messages` → buka chat → kirim |
| Reels | Tab Reels di bawah |
| Password + signature | `/login` (opsional) |
| Donate kripto | `/donate` atau ikon hati |

## Tidak wajib login

Anda bisa pakai semua fitur utama tanpa login.
Password + signature hanya jika ingin identitas tersimpan di perangkat.

## Donasi (Rogue — ARF)

- **BTC:** bc1q0v85wdphm88cg5wlrfhrnue67sh2g6s30wlfam
- **ETH / USDC:** 0x78af25067c39a12887a3a29628e69b30d244c381
- **SOL:** EKzMxC4Yiad9THBbu8XREe4naigpPRqko6Z2HJLU9k8n

## Deploy Vercel

1. Push repo ke GitHub
2. Import project di vercel.com
3. Set env (opsional):
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY

## Catatan teknis

- Post lokal disimpan di localStorage browser
- Supabase siap jika env diisi; tanpa env tetap jalan (mode lokal + demo)
