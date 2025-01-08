// userService.js
const User = require('../../models/User');
const bcrypt = require('bcrypt');


async function createUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return User.create(userData);
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
}

//crea varios ususarios

const createUsers = async (users) => {
  try {
    // Encriptar las contraseñas de todos los usuarios
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    }));

    // Crear usuarios en la base de datos
    return await User.bulkCreate(hashedUsers);
  } catch (error) {
    throw new Error('Error al crear usuarios: ' + error.message);
  }
};




async function getUserById(userId) {
  return User.findByPk(userId);
}

async function updateUser(userId, userData) {
  return User.update(userData, { where: { user_id: userId } });
}

async function deleteUser(userId) {
  return User.destroy({ where: { user_id: userId } });
}




module.exports = {createUser, getUserById, updateUser, deleteUser , createUsers  }
