const connection = require('./conections')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const createProject = async (project) => {
  const { name, budget, category, idUser } = project
  const createdDateUtc = new Date(Date.now());
  const id = uuidv4();
  const createdProject = await connection.execute('INSERT INTO projects (id, id_user, category, name, budget, created_at) VALUES (?, ?, ?, ?, ?, ?)', [id, idUser, category, name, budget, createdDateUtc]);
  const [projectCreated] = await connection.execute('SELECT * FROM projects ORDER BY created_at DESC LIMIT 1; ')
  return projectCreated
};

const editProject = async (project) => {
  const { id, budget, category } = project;
  const [editProjectResult] = await connection.execute(`UPDATE projects SET budget = ?,category = ? WHERE id = ?`, [budget, category, id]);
  const [projectCreated] = await connection.execute(`SELECT * FROM projects WHERE id = ?`, [id]);
  return projectCreated[0];
};




module.exports = {
  createProject,
  editProject
};