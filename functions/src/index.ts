import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";
import * as dotEnv from "dotenv";
dotEnv.config();

admin.initializeApp();

const apiKey = process.env.API_KEY;
const spreadSheetId = process.env.SPREADSHEET_ID;

export const helloWorld = functions.https.onRequest(
  async (request, response) => {
    const sheets = google.sheets({ version: "v4", auth: apiKey });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: spreadSheetId,
      range: "Sheet1!A1:C2"
    });

    const rows = res.data.values;
    response.send(rows);
  }
);
