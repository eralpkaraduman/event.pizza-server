import * as functions from 'firebase-functions';
import {getFoodEvents} from './events'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const foodEvents = functions.https.onRequest(async (request, response) => {
  const lat: String = request.query.lat
  const lon: String = request.query.lon
  if (!lat || !lon) {
    response.status(400).json({error: 'Missing parameters: lat or lon'})
  } else {
    try {
      response.json(await getFoodEvents(lat, lon))
    } catch(e) {
      response.status(500).json({error: e})
    }
  }
});
