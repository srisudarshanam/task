// routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const teamController = require('../controller/team');
const {createPlayer,getAllPlayers,getPlayerById,updatePlayer,deletePlayer} = require('../controller/player');
const {createTeam,getAllTeams,getTeamById,updateTeam,deleteTeam} = require('../controller/team')

//team
router.route("/getAllTeams").get(getAllTeams);

router.route("/createTeam").post(createTeam);

router.route("/getTeamById").get(getTeamById);

router.route("/updateTeam").put(updateTeam);

router.route("/deleteTeam").delete(deleteTeam);


//player
//router.get('/', playerController.getAllPlayers);
//router.post('/players', playerController);

router.route("/getAllPlayers/").get(getAllPlayers);

router.route("/createPlayer").post(createPlayer);

router.route("/getPlayerById/:id").get(getPlayerById);

router.route("/updatePlayer/:id").put(updatePlayer);

router.route("/deletePlayer").delete(deletePlayer);



module.exports = router;

