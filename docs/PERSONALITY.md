# PERSONALITY.md — The /me Page ("Control Room")

> The interactive personality page. Everything here is Layer 2 (delight);
> it must degrade to a clean static About page with all effects off.

## Concept
A bento grid of interactive tiles. Each tile reveals a facet of personality
through interaction — hover, click, scroll, or cursor proximity.

## Component Budget: ≤ 6 React Bits + 1 canvas max

## Tiles

| Tile | Interaction | React Bits | Mobile/Fallback |
|---|---|---|---|
| Trust Score | Client-side toy: session analysis counter | Decrypted Text + Count Up | Static number |
| Variable Bio | Font weight shifts near cursor | Variable Proximity | Static text |
| Music Grid | Hoverable album covers with tilt | Tilt Card / Glare Hover | Static grid |
| Click Sparks | Accent-colored sparks on every click | Click Spark | Off |
| Dot Grid BG | Background reacts to cursor | Dot Grid | Static pattern |
| Photo | Portrait with spotlight/parallax tilt | Spotlight Card | Static image |

## Rules
- Every toy has a keyboard path and text alternative
- Trust score is explicitly a client-side toy — must say so, no real fingerprinting or tracking
- Calm mode / reduced motion: swap to static equivalents
- Must not impact home page performance (lazy-loaded entirely)
- The page must look intentional and finished with all effects off

