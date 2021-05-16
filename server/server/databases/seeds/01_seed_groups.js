
exports.seed = function (knex, Promise) {
  const data = [
    {
      "id": "1",
      "name": "Admin",
      "description": "Admin",
      "roleGroupId": "1"
    },
    {
      "id": "2",
      "name": "Customer",
      "description": "Customer",
      "roleGroupId": "1"
    }
  ]

  // Deletes ALL existing entries
  return knex('groups').del()
    .then(async () => {
      // Inserts seed entries
      await knex('groups').insert(data);
      await knex.raw('select setval(\'groups_id_seq\', max(id)) from groups');
    });
};
