// Define constants for roles
const Roles = {
  ROOT: '0',
  MANAGER: '1',
  ADMIN: '2',
};

/**
 * Checks if a user is authorized based on their role and unit.
 *
 * @param {Object} user - The user object containing role and unit information.
 * @param {string} requiredUnit - The unit required to access the resource.
 * @returns {boolean} - Returns true if the user is authorized, false otherwise.
 */
const isAuthorized = (user, requiredUnit) => {
  if (!user || !user.role) {
    console.error('User object is invalid or missing.');
    return false;
  }

  switch (user.role) {
    case Roles.ROOT:
      // ROOT users have access to everything
      return true;
    case Roles.MANAGER:
      // MANAGER users have access to everything
      return true;
    case Roles.ADMIN:
      // ADMIN users can only access their own unit
      return user.unit === requiredUnit;
    default:
      // Unknown roles are not authorized
      return false;
  }
};

module.exports = {
  isAuthorized,
};
