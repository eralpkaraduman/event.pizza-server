import fetch from 'node-fetch'
import keys from '../../keys.json'
import {POEvent} from '../../events/events'

export const createAuthorizationUrl = (state: string) => 'https://secure.meetup.com/oauth2/authorize' +
`?client_id=${keys.meetup.oauth.key}` +
`&response_type=code` +
`&state=${state}` +
`&redirect_uri=${keys.meetup.oauth.redirectUri}`;

interface AccessTokenResponse {
  access_token: string,
  expires_in: string,
  refresh_token: string
};

export const getAccessToken = async (code: string): Promise<AccessTokenResponse> => {
  const response = await fetch('https://secure.meetup.com/oauth2/access', {
    method: 'POST',
    body:
      `client_id=${keys.meetup.oauth.key}`+
      `&client_secret=${keys.meetup.oauth.secret}`+
      '&grant_type=authorization_code'+
      `&redirect_uri=${keys.meetup.oauth.redirectUri}`+
      `&code=${code}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  const responseJson = await response.json()
  return responseJson as AccessTokenResponse
}

export const getEvents = async (accessToken: string, lat: string, lon: string): Promise<POEvent[]> => {
  const url = 'https://api.meetup.com/find/upcoming_events' + 
    `?lat=${lat}` +
    `&lon=${lon}`
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  const responseJson = await response.json()
  // TODO: const city = responseJson.city  // { city: 'Helsinki', country: 'fi', ... }
  return responseJson.events.map((event: any): POEvent => ({
    name: event.name,
    time: event.time,
    lat: event.venue && event.venue.lat,
    lon: event.venue && event.venue.lon,
    venueName: event.venue && event.venue.name,
    link: event.link,
    description: event.description
  }))
}
