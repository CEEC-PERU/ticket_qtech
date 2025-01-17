const AdminManagement = require('../../models/AdminManagement');
const Campaign = require('../../models/Campaign');
const DetailManagement = require('../../models/DetailManagement');
const DetailRequest = require('../../models/DetailRequest');
const FileDetail = require('../../models/FileDetail');
const Profile = require('../../models/Profile');
const Request = require('../../models/Request');
const State = require('../../models/State');
const TypeClient = require('../../models/TypeClient');
const TypeManagement = require('../../models/TypeManagement');
const User = require('../../models/User');
const getAll = async () => {
  return await AdminManagement.findAll();
};

const getById = async (admin_id) => {
  return await AdminManagement.findByPk(admin_id);
};

const create = async (data) => {
  return await AdminManagement.create(data);
};

const update = async (admin_id, data) => {
  const adminManagement = await AdminManagement.findByPk(admin_id);
  if (!adminManagement) throw new Error('AdminManagement not found');
  return await adminManagement.update(data);
};

const remove = async (admin_id) => {
  const adminManagement = await AdminManagement.findByPk(admin_id);
  if (!adminManagement) throw new Error('AdminManagement not found');
  return await adminManagement.destroy();
};



const filterByUserId = async (user_id) => {
  // Obtener los registros de AdminManagement para el usuario
  const adminManagements = await AdminManagement.findAll({
    where: { user_id },
    attributes: ['management_id'], // Solo necesitamos los management_id
  });

  // Extraer los management_id en un array
  const managementIds = adminManagements.map((item) => item.management_id);

  if (managementIds.length === 0) {
    return []; // Retornar un array vacío si no hay management_id
  }

  // Buscar los Request asociados a esos management_id
  const requests = await Request.findAll({
    where: { management_id: managementIds },
    include: [
              {
                model: User,
                attributes: ['email'],
                as: 'user',
                include: [
                  {
                    model: Profile,
                    attributes: ['name', 'lastname'],
                    as: 'profile'
                  },
                ],
              },
              {
                model: State,
                attributes: ['name'],
                as: 'state'
              },
              {
                model: TypeClient,
                attributes: ['name'],
              },
              {
                model: Campaign,
                attributes: ['name'],
               as: 'campaign'
              },
              {
                model: TypeManagement,
                attributes: ['name'],
              },
              {
                model: DetailManagement,
                attributes: ['name'],
                as: 'detailManagement',
              },
              {
                model: DetailRequest,
                attributes: ['detail_name'],
                include: [
                  {
                    model: FileDetail,
                    attributes: ['file'],
                    as: 'fileDetails',
                  },
                ],
              },

            ],
  });

  return requests;
};


const filterByManagementId = async (management_id) => {
  return await AdminManagement.findAll({
    where: { management_id },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  filterByUserId,
  filterByManagementId,
};