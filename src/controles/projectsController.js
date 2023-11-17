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

const deleteProject = async (rec, res) => {
  try {
    const deleteProject = await projectsModule.deleteProject(rec.body);
    if (deleteProject === "Projeto não encontrado.") {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    } else {
      return res.status(200).json({ sucess: 'Projeto deletado com sucesso.' })
    }
  } catch (error) {
    console.error('Erro ao deletar o projeto:', error);
    return res.status(500).json({ error: 'Erro ao deletar o projeto' });
  }
}

const getProjectsUser = async (rec, res) => {
  try {
    const getProjectsUser = await projectsModule.getProjectsUser(rec.query.idUser)
    return res.status(200).json(getProjectsUser)
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao encontrar o projeto' });
  }

}


module.exports = {
  getProjectsUser,
  createProject,
  editProject,
  deleteProject
}