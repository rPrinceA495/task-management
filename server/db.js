import Sequelize from 'sequelize';
import config from './config';

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password, {
    ...config.db.options,
    define: {
    }
  }
);

const Task = sequelize.define('task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const ProjectTemplate = sequelize.define('projectTemplate', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  tableName: 'project_templates'
});

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Task.belongsToMany(ProjectTemplate, { through: 'project_template_tasks' });
ProjectTemplate.belongsToMany(Task, { through: 'project_template_tasks' });

Task.belongsToMany(Project, { through: 'project_tasks' });
Project.belongsToMany(Task, { through: 'project_tasks' });

const db = {
  sequelize,
  Task,
  ProjectTemplate,
  Project
};

export default db;
