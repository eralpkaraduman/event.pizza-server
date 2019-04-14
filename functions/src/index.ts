import * as functions from 'firebase-functions';
import app from './app';

exports.api = functions.https.onRequest(app);
