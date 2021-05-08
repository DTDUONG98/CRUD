
exports.seed = function (knex, Promise) {
  const data = [
    {
      "id": "1",
      "username": "admin1",
      "password": "$2b$10$iNT.d38.rdsRvRMU95WTSu0ZMUBi/Dbwsrzw7yu0vT60T9EPu8eNi",//123456@
      "firstName": "Admin",
      "lastName": "MQ",
      "groupId": "1"
    }
  ]

  // Deletes ALL existing entries
  return knex('admins').del()
    .then(async () => {
      // Inserts seed entries
      await knex('admins').insert(data);
      await knex.raw('select setval(\'admins_id_seq\', max(id)) from admins');
    });
};
