import db from '../db';

const UserService = {
  async getUsers() {
    return await db.User.findAll();
  },
};

export default UserService;
