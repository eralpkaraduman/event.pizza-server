# event.pizza 🍕📅

## Firebase cloud function

## Install

`nvm use`  
`npm install -g firebase-tools`  
`npm install`

## Dev

`nvm use`
`npm run dev`

## Deploy

`nvm use`
`npm run deploy`

## Authentication

- Navigate to: `/meetup/authorize?platform=web`
- After successful auth you should get a redirect to whatever uri configured to `web` in `src/keys.json`
- Parse `access_token` from query params

## EP's

### /events

Returns events which contain the words dictionary  
Required params;

- `X-MeetupAccessToken` Header
- `lat` query param
- `lon` query param
