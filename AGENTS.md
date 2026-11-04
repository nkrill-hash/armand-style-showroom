<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture rules
- The showroom is a single fullscreen route (`/`) driven by an in-app screen stack in `src/showroom/state.tsx`, not router navigation — kiosk back/home/idle-reset must never leave the page.
- All showroom content (products, categories, spaces, services, projects, contacts) lives as typed data in `src/showroom/data` and `src/showroom/config.ts`; screens only render data, so the catalogue can grow without UI changes.
- The imported armand.co.zw homepage stays at `/website` in its own route file with its captured stylesheet; keep its markup in that file.
- The marketing-TV loop (`/tv`, `src/showroom/tv/TvLoop.tsx`) is a separate hands-free route that reuses showroom data/config; it must stay non-interactive and keep contact details on screen.
- The /tv loop only shows products whose photo lives in `public/showroom/hd` or `public/showroom/web` (sharp sources); low-res catalogue crops stay off the big screen.
- TV "All you need for your …" scenes are driven by `src/showroom/data/kits.ts`; kit products must reference catalogue ids with sharp photos (enforced by `src/test/tv-kits.test.ts`).
