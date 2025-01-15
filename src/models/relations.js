const User = require('./User');
const Role = require('./Role');
const TypeManagement = require('./TypeManagement');
const TypeClient = require('./TypeClient');
const AdminTicket = require('./AdminTicket');
const TimeTicket = require('./TimeTicket');
const State = require('./State');
const Request = require('./Request');
const Profile = require('./Profile');
const FileDetail = require('./FileDetail');
const DetailRequest = require('./DetailRequest');
const DetailManagement = require('./DetailManagement');
const Campaign = require('./Campaign');
const AppSession = require('./AppSession');
const AdminManagement = require('./AdminManagement');

// Define Associations

// User and Role
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });

// User and Profile
User.hasOne(Profile, { foreignKey: 'user_id', as: 'profile' });
Profile.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Relación entre User y AppSession
User.hasMany(AppSession, { foreignKey: 'user_id', as: 'appSessions' ,  onDelete: 'CASCADE'  });
AppSession.belongsTo(User, { foreignKey: 'user_id', as: 'userSession' , onDelete: 'CASCADE',});


// User and Request
User.hasMany(Request, { foreignKey: 'user_id', as: 'requests' });
Request.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// User and AdminManagement
User.hasMany(AdminManagement, { foreignKey: 'user_id', as: 'adminManagements' });
AdminManagement.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Role and AdminManagement indirectly via User
Role.hasMany(AdminManagement, {
  sourceKey: 'role_id',
  foreignKey: 'user_id',
  as: 'adminRoles',
});

// Campaign and TypeClient
Campaign.belongsTo(TypeClient, { foreignKey: 'client_id', as: 'client' });
TypeClient.hasMany(Campaign, { foreignKey: 'client_id', as: 'campaigns' });

// Campaign and Request
Campaign.hasMany(Request, { foreignKey: 'campaign_id', as: 'requests' });
Request.belongsTo(Campaign, { foreignKey: 'campaign_id', as: 'campaign' });

TypeClient.hasMany(Request, { foreignKey: 'client_id'});
Request.belongsTo(TypeClient, { foreignKey: 'client_id' });

TypeManagement.hasMany(Request, { foreignKey: 'management_id'});
Request.belongsTo(TypeManagement, { foreignKey: 'management_id' });

// Request and State
Request.belongsTo(State, { foreignKey: 'state_id', as: 'state' });
State.hasMany(Request, { foreignKey: 'state_id', as: 'requests' });

// Request and DetailManagement
Request.belongsTo(DetailManagement, {
  foreignKey: 'det_management_id',
  as: 'detailManagement',
});
DetailManagement.hasMany(Request, {
  foreignKey: 'det_management_id',
  as: 'requests',
});


// AdminTicket and Request
AdminTicket.belongsTo(Request, { foreignKey: 'request_id', as: 'request' });
Request.hasMany(AdminTicket, { foreignKey: 'request_id', as: 'adminTickets' });

// AdminTicket and User
AdminTicket.belongsTo(User, { foreignKey: 'user_id', as: 'adminUser' });
User.hasMany(AdminTicket, { foreignKey: 'user_id', as: 'adminTickets' });

// AdminTicket and TimeTicket
TimeTicket.belongsTo(AdminTicket, { foreignKey: 'adminticket_id', as: 'adminTicket' });
AdminTicket.hasMany(TimeTicket, { foreignKey: 'adminticket_id', as: 'timeTickets' });

// FileDetail and DetailRequest
FileDetail.belongsTo(DetailRequest, {
  foreignKey: 'id_det_request',
  as: 'detailRequest',
});
DetailRequest.hasMany(FileDetail, {
  foreignKey: 'id_det_request',
  as: 'fileDetails',
});

DetailRequest.belongsTo(Request, {
  foreignKey: 'request_id',
});

Request.hasMany(DetailRequest, {
  foreignKey: 'request_id',
});


// DetailManagement and TypeManagement
DetailManagement.belongsTo(TypeManagement, {
  foreignKey: 'management_id',
  as: 'typeManagement',
});
TypeManagement.hasMany(DetailManagement, {
  foreignKey: 'management_id',
  as: 'detailManagements',
});
