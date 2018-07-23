'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        "firstName": "Beasley",
        "lastName": "Dennis",
        "email": "beasleydennis@supportal.com"
      },
      {
        "firstName": "Rojas",
        "lastName": "Farrell",
        "email": "rojasfarrell@supportal.com"
      },
      {
        "firstName": "Benita",
        "lastName": "Alston",
        "email": "benitaalston@supportal.com"
      },
      {
        "firstName": "Brittany",
        "lastName": "Maddox",
        "email": "brittanymaddox@supportal.com"
      },
      {
        "firstName": "Wiley",
        "lastName": "Russell",
        "email": "wileyrussell@supportal.com"
      },
      {
        "firstName": "Sanders",
        "lastName": "French",
        "email": "sandersfrench@supportal.com"
      }].map((user) => Object.assign(user, {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })), {});
  }, down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }};
