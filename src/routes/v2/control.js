"use strict"

const express = require("express")
const router = express.Router()
const axios = require("axios")

const logger = require("./logging.js")
const routeUtils = require("./route-utils")
const wlogger = require("../../util/winston-logging")

// Used for processing error messages before sending them to the user.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

router.get("/", root)
router.get("/getInfo", getInfo)

function root(req, res, next) {
  return res.json({ status: "control" })
}

// Execute the RPC getinfo call.
async function getInfo(req, res, next) {
  const {
    BitboxHTTP,
    username,
    password,
    requestConfig
  } = routeUtils.setEnvVars()

  requestConfig.data.id = "getinfo"
  requestConfig.data.method = "getinfo"
  requestConfig.data.params = []

  try {
    const response = await BitboxHTTP(requestConfig)

    return res.json(response.data.result)
  } catch (error) {
    wlogger.error(`Error in control.ts/getInfo().`, error)

    // Write out error to error log.
    //logger.error(`Error in control/getInfo: `, error)

    res.status(500)
    if (error.response && error.response.data && error.response.data.error)
      return res.json({ error: error.response.data.error })
    return res.json({ error: util.inspect(error) })
  }
}

// router.get('/getMemoryInfo', (req, res, next) => {
//   BitboxHTTP({
//     method: 'post',
//     auth: {
//       username: username,
//       password: password
//     },
//     data: {
//       jsonrpc: "1.0",
//       id:"getmemoryinfo",
//       method: "getmemoryinfo"
//     }
//   })
//   .then((response) => {
//     res.json(response.data.result);
//   })
//   .catch((error) => {
//     res.send(error.response.data.error.message);
//   });
// });
//
// router.get('/help', (req, res, next) => {
//   BITBOX.Control.help()
//   .then((result) => {
//     res.json(result);
//   }, (err) => { console.log(err);
//   });
// });
//
// router.post('/stop', (req, res, next) => {
//   BITBOX.Control.stop()
//   .then((result) => {
//     res.json(result);
//   }, (err) => { console.log(err);
//   });
// });

module.exports = {
  router,
  testableComponents: {
    root,
    getInfo
  }
}
