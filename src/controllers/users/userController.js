const userService = require('../../services/users/userService');


async function createUser(req, res) {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
}

const createUsersController = async (req, res) => {
  try {
    const users = req.body;
    if (!Array.isArray(users) || users.length === 0) {
      return res.status(400).json({ message: 'Invalid user data' });
    }
    
    await userService.createUsers(users);
    res.status(201).json({ message: 'Usuarios creados con éxito' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const userData = req.body;
    const result = await userService.updateUser(userId, userData);
    if (result[0] === 1) {
      res.json({ message: 'Usuario actualizado con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
}




async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    if (result === 1) {
      res.json({ message: 'Usuario eliminado con éxito' });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
}


module.exports = { createUser,  updateUser, deleteUser , createUsersController }
