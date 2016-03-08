import db from './db';

async function recreateDB() {
  try {
    await db.sequelize.sync({ force: true });

    await db.Project.create({
      name: 'Submit a pull request',
      isTemplate: true,
      tasks: [{
        name: 'Fork the repository',
        position: 1,
      }, {
        name: 'Clone the fork',
        position: 2,
      }, {
        name: 'Make changes',
        position: 3,
      }, {
        name: 'Run tests',
        position: 4,
      }, {
        name: 'Commit and push changes',
        position: 5,
      }, {
        name: 'Submit a PR',
        position: 6,
      }]
    }, {
      include: [db.Task]
    });
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

recreateDB();
