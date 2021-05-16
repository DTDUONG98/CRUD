
exports.seed = function (knex, Promise) {
  const data = [
    {
      "id": "1",
      "name": "Account Management",
      "description": "",
      "value": "15",
      "key": "admins",
      "createdBy": "1"
    },
    {
      "id": "2",
      "name": "Role Group Management",
      "description": "",
      "value": "15",
      "key": "roleGroups",
      "createdBy": "1"
    },
    {
      "id": "3",
      "name": "Decentralization Management",
      "description": "",
      "value": "2",
      "key": "adminDecentralization",
      "createdBy": "1"
    },
    {
      "id": "4",
      "name": "Dashboard",
      "description": "",
      "value": "4",
      "key": "dashboard",
      "createdBy": "1"
    },
    {
      "id": "5",
      "name": "Twofa",
      "description": "",
      "value": "2",
      "key": "twofa",
      "createdBy": "1"
    },
    {
      "id": "6",
      "name": "Group Management",
      "description": "",
      "value": "2",
      "key": "groups",
      "createdBy": "1"
    },
    {
      "id": "7",
      "name": "Drugs in Viet Nam",
      "description": "",
      "value": "15",
      "key": "vn_warehouses",
      "createdBy": "1"
    },
    {
      "id": "8",
      "name": "Drugs Raw in Viet Nam",
      "description": "",
      "value": "15",
      "key": "vn_raw_datas",
      "createdBy": "1"
    },
    {
      "id": "9",
      "name": "Drugs Raw in the World",
      "description": "",
      "value": "15",
      "key": "foreign_raw_datas",
      "createdBy": "1"
    },
    {
      "id": "10",
      "name": "Drugs Warehouse in the World",
      "description": "",
      "value": "15",
      "key": "foreign_warehouses",
      "createdBy": "1"
    },
  ]

  // Deletes ALL existing entries
  return knex('admin_permissions').del()
    .then(async () => {
      // Inserts seed entries
      await knex('admin_permissions').insert(data);
      await knex.raw('select setval(\'admin_permissions_id_seq\', max(id)) from admin_permissions');
    });
};
