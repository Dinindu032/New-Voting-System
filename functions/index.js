// /**
//  * Import function triggers from their respective submodules:
//  *
//  * const {onCall} = require("firebase-functions/v2/https");
//  * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
//  *
//  * See a full list of supported triggers at https://firebase.google.com/docs/functions
//  */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started

// // exports.helloWorld = onRequest((request, response) => {
// //   logger.info("Hello logs!", {structuredData: true});
// //   response.send("Hello from Firebase!");
// // });


// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// admin.initializeApp();

// exports.getAllUsers = functions.https.onRequest(async (req, res) => {
//   try {
//     const listUsersResult = await admin.auth().listUsers();
//     const users = listUsersResult.users.map(userRecord => ({
//       uid: userRecord.uid,
//       email: userRecord.email,
//     }));
//     res.status(200).json({ users });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


// import * as functions from 'firebase-functions'
// import * as admin from 'firebase-admin'
// import * as cors from 'cors'

// admin.initializeApp()
// const corsHandler = cors({ origin: true })

// export const getAllUsers = functions.https.onRequest((req, res) => {
//   corsHandler(req, res, async () => {
//     try {
//       const listUsersResult = await admin.auth().listUsers()
//       const users = listUsersResult.users.map((userRecord) => ({
//         uid: userRecord.uid,
//         email: userRecord.email,
//       }))
//       res.status(200).json({ users })
//     } catch (error) {
//       console.error('Error listing users:', error)
//       res.status(500).json({ error: 'Failed to list users' })
//     }
//   })
// })



const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')

admin.initializeApp()
const corsHandler = cors({ origin: true })

exports.getAllUsers = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    try {
      const listUsersResult = await admin.auth().listUsers()
      const users = listUsersResult.users.map((userRecord) => ({
        uid: userRecord.uid,
        email: userRecord.email,
      }))
      res.status(200).json({ users })
    } catch (error) {
      console.error('Error listing users:', error)
      res.status(500).json({ error: 'Failed to list users' })
    }
  })
})
