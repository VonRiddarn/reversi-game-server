# Reversi game server :white_circle: :black_circle: :computer:

A game server for managing users, games and realtime lobbies for the game reversi.

## How to use 🤔

1️⃣ Clone the repo using `git clone link-to-repo`  
2️⃣ Install dependencies with `npm i`  
3️⃣ Generate database types using `npx prisma generate`  
_This will generate TypeScript types for all entities._  
4️⃣ ORM STEP - NOT SETUP  
_This will create the tables in your local Postgres, so make sure your user has proper privileges!_  
5️⃣ Run the project using `npm run dev`  
_Note, this just transpiles and runs the project. It does not actually create a hot reload developer environment._

## Extra resources 💡

_Stuff I found useful._  
🐘 [PostgreSQL - docs](https://www.postgresql.org/docs/)  
🐍 NOT SETUP  
🚅 [Express.JS - docs](https://expressjs.com/en/starter/hello-world.html)  
⚛️ [Module augmentation - TS docs](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)  
🤓 [How to extend Request object - Stackoverflow](https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript)

## Dependencies 📦

Here I will list the tech-stack and why I use what.

## Pre-post mortem notes 📝

_Development insgits and comments. May or may not be used on presentation day._

### 🧠 Accept smooth brain activity

When working in a new environment with new tools and terminology the brain sometimes goes limp.  
It sucks, but that's life - walk it off.  
_Or just get rid of Drizzle and use Prisma, that's what I did._

### 🧩 Start small

Instead of adding types, models, controllers and AI-powered drone strike systems all at once just create a damn MVP.  
Overconfidence alongside a fair share of arrogance cost me so much startup time.

### 📖 > 🤖

Speed is king, so I kept spending 30 minutes arguing with ChatGPT before finally consulting the docs to prove them wrong.  
Success?

### 🐋 USE DOCKER FOR THE LOVE OF GOD

I wanted to get started real fast, so I declined using Docker with their preconfigured environments.  
Instead I was going to just run the postgres server as a service - easy.  
Turns out, Postgres is real stinchy when it comes to permissions.
