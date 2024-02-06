// routes/playerRoutes.js
const express = require('express');
const router = express.Router();
const playerController = require('../controller/player');

router.get('/', playerController.getAllPlayers);
router.post('/', playerController.createPlayer);

module.exports = router;
