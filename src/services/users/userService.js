// userService.js
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


async function createUser(userData) {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;
    return User.create(userData);
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
}


const updatePassword = async (userId, oldPassword, newPassword) => {
  // Buscar al usuario por su ID
  const user = await User.findOne({ where: { user_id: userId } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Verificar la contraseña actual
  const isMatch = await User.comparePassword(oldPassword, user.password);
  if (!isMatch) {
    throw new Error('La contraseña actual es incorrecta');
  }

  // Validar que la nueva contraseña sea diferente
  if (oldPassword === newPassword) {
    throw new Error('La nueva contraseña no puede ser la misma que la anterior');
  }

    // Verificar que la nueva contraseña cumpla con ciertos requisitos de seguridad
    if (newPassword.length < 8) {
      throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
    }

    
  // Encriptar la nueva contraseña
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Actualizar la contraseña del usuario
  await user.update({ password: hashedPassword });

  return 'Contraseña actualizada correctamente';
};




const createUserAndProfile = async (userData, profileData) => {
  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Creación del usuario
    const user = await User.create({
      email: userData.email,
      password: hashedPassword,
      role_id: userData.role_id, // Asegúrate de que role_id esté en userData
    });

    // Crear perfil para el usuario
    const profile = await Profile.create({
      user_id: user.user_id,
      name: profileData.name,
      lastname: profileData.lastname,
    });

    return { user, profile };
  } catch (error) {
    throw new Error('Error al crear el usuario o el perfil');
  }
};


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



const getUserWithProfile = async (userId) => {
  try {
    const user = await User.findOne({
      attributes: ['user_id', 'email', 'role_id', 'is_active'],
      where: { user_id: userId },
      include: [{
        model: Profile,
        attributes: ['name', 'lastname'],
        as: 'profile',
        required: true, // Esto asegura que solo se devuelvan los usuarios que tengan perfil
      }],
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  } catch (error) {
    throw error;
  }
};






module.exports = {createUser, getUserById, updateUser, deleteUser , createUsers , createUserAndProfile , getUserWithProfile , updatePassword}
