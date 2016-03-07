import db from './db';
import util from 'util';

async function recreateDB() {
  try {
    await db.sequelize.sync({ force: true });

    await db.Task.bulkCreate([{
      id: 1,
      name: 'Fork the repository',
      position: 1
    }, {
      id: 2,
      name: 'Clone the fork',
      position: 2
    }, {
      id: 3,
      name: 'Make changes',
      position: 3
    }, {
      id: 4,
      name: 'Run tests',
      position: 4
    }, {
      id: 5,
      name: 'Commit and push changes',
      position: 5
    }, {
      id: 6,
      name: 'Submit a PR',
      position: 6
    }]);

    const projectTemplate1 = await db.ProjectTemplate.create({
      id: 1,
      name: 'Submit a pull request'
    });

    await projectTemplate1.setTasks(await db.Task.findAll());

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

recreateDB();
