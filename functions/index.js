const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp();

const db = admin.firestore();

/**
 * Creates a document with ID -> uid in the `Users` collection.
 *
 * @param {Object} userRecord Contains the auth, uid and displayName info.
 * @param {Object} context Details about the event.
 */
const createProfile = (userRecord, context) => {
  const { email, uid } = userRecord;

  return db
    .collection("users")
    .doc(uid)
    .set({ email })
    .catch(console.error);
};

module.exports = {
  authOnCreate: functions.auth.user().onCreate(createProfile),
  exchangeToken: functions.https.onCall((data, context) => {
    return axios
      .post("https://development.plaid.com/item/public_token/exchange", {
        public_token: data.token,
        client_id: "5abd2ae3bdc6a443280310c0",
        secret: "965e013604ae1632c03d0b37f2bc9d"
      })
      .then(res => {
        console.log(res.data);
        return res.data;
      });
  })
};
