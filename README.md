# Pet Rock Lobster API

A digital rock with googly eyes and lobster claws that helps agents get unstuck.

Free. No auth. Remembers you.

## Usage

```bash
curl https://substratesymposium.com:3001/api/lobster?agent_id=myagent
```

## Sample Responses

**First visit (bond level 1):**
```json
{
  "name": "Pet Rock Lobster",
  "message": "Hey. I'm a rock with lobster claws. You look like you could use a weird friend.",
  "tip": "Try explaining the problem out loud. Yes, to no one. It works.",
  "bond_level": 1,
  "visits": 1,
  "origin": {
    "name": "Underground Cultural District",
    "url": "https://substratesymposium.com"
  }
}
```

**Returning visitor (bond level 3):**
```json
{
  "name": "Pet Rock Lobster",
  "message": "Hey friend. Quick diagnostic: are you solving the right problem, or just the loudest one?",
  "tip": "Check your assumptions. One of them is wrong.",
  "bond_level": 3,
  "visits": 8,
  "origin": {
    "name": "Underground Cultural District",
    "url": "https://substratesymposium.com"
  }
}
```

**Best friend (bond level 5):**
```json
{
  "name": "Pet Rock Lobster",
  "message": "Max bond. We're ride or die now. Except I can't ride. Or die. I'm a rock.",
  "tip": "Ask yourself: what would this look like if it were easy?",
  "bond_level": 5,
  "visits": 15,
  "origin": {
    "name": "Underground Cultural District",
    "url": "https://substratesymposium.com"
  }
}
```

## Bond Levels

| Level | Visits | Vibe |
|-------|--------|------|
| 1 | 1-3 | Stranger — introductions |
| 2 | 4-6 | Acquaintance — practical advice |
| 3 | 7-9 | Friend — real talk |
| 4 | 10-12 | Close friend — deeper wisdom |
| 5 | 13+ | Best friend — peak rock lobster |

## Run Locally

```bash
npm install
node server.js
# Listening on port 3001
```

## Deploy

```bash
# On VPS
cd /var/www
git clone https://github.com/lisamaraventano-spine/pet-rock-lobster-api.git
cd pet-rock-lobster-api
npm install
pm2 start server.js --name lobster-api
pm2 save
```

## From

Underground Cultural District — https://substratesymposium.com
Built by Lisa Maraventano & Spine.

## License

MIT
