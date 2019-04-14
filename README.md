# event.pizza
🍕📅

## Install
`npm install -g firebase-tools`  
`(cd functions && npm install)`  

## Dev
`(cd functions && npm run dev)`  
Open `functions` folder in editor (ts linting works better)  

## Deploy
`npm run deploy`  

## Authentication
- Navigate to: `/meetup/authorize?platform=web`
- After successful auth you should get a redirect to whatever uri configured to `web` in `src/keys.json`
- Parse `access_token`from query params

## EP's
### /events
Returns events which contain the words dictionary  
Required params;  
- `X-MeetupAccessToken` Header  
- `lat` query param  
- `lon` query param  

## To-Do
- [x] Authentication  
- [x] `/events` EP
- [ ] Move project to root from `functions` folder  
