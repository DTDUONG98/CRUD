
exports.seed = function (knex, Promise) {
  const data = [
    {
      "id": "1",
      "name": "Root",
      "description": "Root",
      "key": "root"
    },
    {
      "id": "2",
      "name": "Customer",
      "description": "Customer",
      "parentId": "1",
      "key": ""
    },
    
  ]

  // Deletes ALL existing entries
  return knex('role_groups').del()
    .then(async () => {
      // Inserts seed entries
      await knex('role_groups').insert(data);
      await knex.raw('select setval(\'role_groups_id_seq\', max(id)) from role_groups');
    });
};
