import db from '../db';

const TeamService = {
  async getTeams() {
    return await db.Team.findAll();
  },

  async createTeam(team) {

  },

  async deleteTeam(teamID) {

  },
};

export default TeamService;
