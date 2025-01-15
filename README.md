# Crypto Portfolio Management System
# Getting Started
## Install Dependencies
`pnpm i`
## Create .env file
Copy the .env.sample file and update the values accordingly. If you are using docker compose you can leave the values as is.
`cp .env.sample .env`

## Migrate the DB
`pnpm run db:migrate`

## Start the Example API
`npm run dev`
