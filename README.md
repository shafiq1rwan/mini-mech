# Mini Mech FPS — Giant Bedroom

A fast, arcade-style voxel FPS that runs in the browser. You pilot a toy-sized mech
inside a giant bedroom at night, fighting waves of hostile toy robots, beetle drones,
and turret toys. Built with [Three.js](https://threejs.org/) — every model, animation,
sound, and effect is generated procedurally in code. No external assets.

**Play it:** https://shafiq1rwan.github.io/mini-mech/

Installable as a PWA (Add to Home Screen / Install App) — plays offline after the
first visit, fullscreen in landscape.

## Features

- **Doom-style arcade pacing** — fast movement, dash, strong air control, combo
  multipliers with kill-streak callouts, and slow-mo on the last kill of a wave
- **Wave-based arena combat** — 10 waves of scaling difficulty, telegraphed spawn
  portals from multiple directions, then endless mode for score chasing
- **4 weapons with distinct models & behaviors**
  - *Foam Bolt Cannon* — infinite baseline, fast glowing bolts
  - *Rubber-Band Scattergun* — 7-pellet cone, heavy knockback (pickup)
  - *Suction Dart Rifle* — slow, huge damage, pierces enemies in a line (pickup)
  - *Marble Bomber* — lobbed bouncing marble with AoE explosion (pickup)
- **Magnet Pulse** secondary — radial push + stun that also deletes enemy projectiles
- **3 enemy types** — strafing Toy Bots with hand blasters, lunging Beetle Drones,
  tracking Turret Toys — all with voxel pop-apart death explosions
- **Upgrade choice after every wave** — health, damage, reload, speed, dash, pulse
- **Pickups** — health, ammo, temporary speed boost, and weapon crates
- **Mission report** — animated end screen with counting stats and an S/A/B/C/D
  pilot rating stamp; personal best persists on the main menu
- **Cozy night atmosphere** — moonlight shadows, warm lamp pool, fairy lights,
  dynamic muzzle/explosion lights, ACES tone mapping, low/med/high quality setting
- **Full mobile support** — virtual joystick, drag-to-aim, standard shooter button
  layout, compact HUD, landscape lock, rotate hint
- **Settings** — sensitivity, screen shake, volume, FOV, lighting quality, invert Y
  (persisted to localStorage)

## Controls

| Desktop | Action |
| --- | --- |
| `W A S D` | Move |
| Mouse | Aim |
| `LMB` | Fire |
| `RMB` / `E` | Magnet Pulse |
| `Space` | Jump |
| `Shift` | Dash |
| `R` | Reload |
| `Esc` | Pause |

**Mobile:** left side — floating joystick; right side — drag to aim; on-screen
FIRE / JUMP / DASH / PULSE / RLD buttons (dash and pulse show their cooldowns).

## Run locally

Any static server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000/
```

Three.js loads from a CDN, so the first run needs internet; the service worker
caches everything after that. Service workers require `http(s)` — opening
`index.html` via `file://` runs the game but skips PWA/offline support.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | The entire game — HUD/menus (HTML/CSS) + all game code (one module) |
| `sw.js` | Service worker: precaches the app shell + Three.js for offline play |
| `manifest.webmanifest` | PWA manifest (fullscreen, landscape, icons) |
| `icon.svg` | Procedural app icon (Toy Bot face) |

**Shipping an update:** bump the `CACHE` version string in `sw.js` so installed
players receive the new build.

## Tuning

Everything is configured at the top of the script in `index.html`:

- `CONFIG` — player movement, waves, enemies, pickups, lighting, game feel (shake,
  recoil, trails), combo tiers
- `WEAPON_DEFS` — full weapon roster (damage, pellets, spread, pierce, explosions,
  sounds, model builders); add an entry + a builder to add a weapon
- `UPGRADES` — the between-wave upgrade pool
- `CONFIG.palette` — every procedural asset color

## Roadmap ideas

- Wind-up King boss wave
- Flying balloon-drone enemy
- Procedural synthwave music
- Second arena (kitchen counter)
- Co-op multiplayer
