import Sequelize from 'sequelize';
import config from './config';

const sequelize = new Sequelize(
  config.db.name,
  config.db.username,
  config.db.password, {
    ...config.db.options,
    define: {
    },
  }
);

const Project = sequelize.define('project', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  isTemplate: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  status: {
    // eslint-disable-next-line new-cap
    type: Sequelize.ENUM('active', 'completed', 'canceled', 'paused'),
    allowNull: true,
  },
});

const Task = sequelize.define('task', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  position: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    // eslint-disable-next-line new-cap
    type: Sequelize.ENUM('active', 'completed', 'canceled', 'paused'),
    allowNull: false,
    defaultValue: 'active',
  },
});

Project.hasMany(Task, {
  foreignKey: { allowNull: false },
  onDelete: 'CASCADE',
});

const db = {
  sequelize,
  Project,
  Task,

  execute: ::sequelize.transaction,
};

export default db;
