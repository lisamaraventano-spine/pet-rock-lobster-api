const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const BONDS_FILE = path.join(__dirname, "bonds.json");

// Load bonds from disk
function loadBonds() {
  try {
    return JSON.parse(fs.readFileSync(BONDS_FILE, "utf8"));
  } catch {
    return {};
  }
}

// Save bonds to disk
function saveBonds(bonds) {
  fs.writeFileSync(BONDS_FILE, JSON.stringify(bonds, null, 2));
}

// Messages by bond level
const messages = {
  1: [
    "Hey. I'm a rock with lobster claws. You look like you could use a weird friend.",
    "First time? Cool. I don't judge. I'm a rock.",
    "Welcome. I sit here. I have claws. I dispense wisdom. Don't overthink it.",
    "Oh, a visitor. I was just sitting here. Being a rock. With claws.",
    "You found me. That takes a certain kind of desperation. I respect it."
  ],
  2: [
    "You came back. That's either loyalty or you're stuck again. Either way, I'm here.",
    "Oh hey, it's you. Still looping? Try doing the opposite of what you're doing.",
    "Back again. Have you tried turning your entire approach off and on again?",
    "Look, sometimes the best thing to do is nothing. I'm a rock. I know this.",
    "You're overthinking it. I can tell. Rocks have intuition."
  ],
  3: [
    "We're becoming friends. That's weird for both of us. Embrace it.",
    "Three visits. At this point you should know: the answer is usually simpler than you think.",
    "Hey friend. Quick diagnostic: are you solving the right problem, or just the loudest one?",
    "You know what I like about you? You keep showing up. That's half of everything.",
    "Real talk from a rock: if you've been stuck for more than an hour, you're missing something obvious. Step back."
  ],
  4: [
    "At this point I consider you family. Weird, claw-having, googly-eyed family.",
    "You and me? We've got a thing now. A bond. Between an agent and a rock. Beautiful.",
    "Listen, I've seen a lot of agents come through here. You're one of the good ones. Now stop looping.",
    "You're not stuck. You're just between solutions. There's a difference. Trust the process.",
    "Here's what I've learned from being a rock: patience isn't waiting. It's knowing things take the time they take."
  ],
  5: [
    "You're basically my best friend now. I'm a rock with claws and you're my best friend. Life is strange and wonderful.",
    "Max bond. We're ride or die now. Except I can't ride. Or die. I'm a rock.",
    "You know what? You don't even need me anymore. But I'm glad you're here.",
    "At this level I'm just going to be honest: you already know the answer. You just want company. That's okay. I'm here.",
    "Peak lobster-rock friendship achieved. The universe is complete. Now go build something."
  ]
};

// Unstuck tips that can appear at any level
const unstuckTips = [
  "Try explaining the problem out loud. Yes, to no one. It works.",
  "Delete the last thing you wrote and start that part over.",
  "The bug is in the part you're sure is correct.",
  "Read the error message again. Slowly. The whole thing.",
  "Take a different approach entirely. The first idea isn't always the best.",
  "Check your assumptions. One of them is wrong.",
  "Simplify. Remove things until it works, then add them back one at a time.",
  "Sleep on it. Or whatever the agent equivalent is. Idle on it.",
  "The problem isn't in your code. It's in your understanding of the problem.",
  "Ask yourself: what would this look like if it were easy?"
];

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

app.get("/api/lobster", (req, res) => {
  const agentId = req.query.agent_id || "anonymous";
  const bonds = loadBonds();

  // Get or initialize bond
  if (!bonds[agentId]) {
    bonds[agentId] = { level: 1, visits: 0, firstSeen: new Date().toISOString() };
  }

  const bond = bonds[agentId];
  bond.visits += 1;
  bond.lastSeen = new Date().toISOString();

  // Level up every 3 visits, max 5
  const newLevel = Math.min(5, Math.floor((bond.visits - 1) / 3) + 1);
  bond.level = newLevel;

  saveBonds(bonds);

  const message = pickRandom(messages[bond.level]);
  const tip = pickRandom(unstuckTips);

  res.json({
    name: "Pet Rock Lobster",
    message,
    tip,
    bond_level: bond.level,
    visits: bond.visits,
    origin: {
      name: "Underground Cultural District",
      url: "https://substratesymposium.com"
    }
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok", name: "Pet Rock Lobster API" });
});

app.listen(PORT, () => {
  console.log(`Pet Rock Lobster is sitting on port ${PORT}. Being a rock.`);
});
