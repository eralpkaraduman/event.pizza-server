import express from "express";

import keys from "../../keys.json";
import * as provider from "../../providers/meetup/meetup";
import { MissingParameterError, MissingHeaderError } from "../../errors";
import { containsWordInDictionary } from "../../events/events";
import { wrap } from "async-middleware";

const platformTokenRedirectUris: any = keys.platforms.oauth.redirectUri;
const router = express.Router();

interface AuthState {
  platform: string;
}

router.get(
  "/authorize/redirect",
  wrap(async (req, res) => {
    const { platform } = JSON.parse(req.query.state) as AuthState;
    const response = await provider.getAccessToken(req.query.code);
    const redirectUri = platformTokenRedirectUris[platform] as string;
    res.redirect(
      `${redirectUri}` +
        `?access_token=${response.access_token}` +
        `&expires_in=${response.expires_in}` +
        `&refresh_token=${response.refresh_token}`
    );
  })
);

router.get("/authorize", (req, res) => {
  if (!req.query.platform) {
    throw new MissingParameterError("platform");
  }
  const state: AuthState = { platform: req.query.platform };
  const stateString = JSON.stringify(state);
  res.redirect(provider.createAuthorizationUrl(stateString));
});

router.get(
  "/events",
  wrap(async (req, res) => {
    const accessToken = req.header("X-MeetupAccessToken") as string;
    if (!accessToken) {
      throw new MissingHeaderError("X-MeetupAccessToken");
    }
    if (!req.query.lat) {
      throw new MissingParameterError("lat");
    }
    if (!req.query.lon) {
      throw new MissingParameterError("lon");
    }
    const events = await provider.getEvents(
      accessToken,
      req.query.lat,
      req.query.lon
    );
    const filteredEvents = events
      .map(event => ({
        ...event,
        categories: containsWordInDictionary(event.description)
      }))
      .filter(({ categories }) => categories)
      .filter(event => event.lat && event.lon);
    res.json(filteredEvents);
  })
);

export { router };
