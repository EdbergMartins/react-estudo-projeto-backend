const projectsModule = require('../modules/projectsModule')

const createProject = async (req, res) => {
  try {
    const project = await projectsModule.createProject(req.body);
    return res.status(200).json(project);
  } catch (error) {
    console.error('Erro ao criar o projeto:', error);
    return res.status(500).json({ error: 'Erro ao criar o projeto' });
  }
};

const editProject = async (req, res) => {
  try {
    const editedProject = await projectsModule.editProject(req.body);
    return res.status(200).json(editedProject);
  } catch (error) {
    console.error('Erro ao editar projeto:', error);
    return res.status(500).json({ error: 'Erro ao editar projeto' });
  }
};


module.exports = {
  createProject,
  editProject
}