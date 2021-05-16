
exports.seed = function (knex, Promise) {
  const data = [
    {
      "id": "1",
      "roleGroupId": "1",
      "permissionId": "1",
      "value": "15",
      "key": "admins",
      "createdBy": "1"
    },
    {
      "id": "2",
      "roleGroupId": "1",
      "permissionId": "2",
      "value": "15",
      "key": "roleGroups",
      "createdBy": "1"
    },
    {
      "id": "3",
      "roleGroupId": "1",
      "permissionId": "3",
      "value": "2",
      "key": "adminDecentralization",
      "createdBy": "1"
    },
    {
      "id": "4",
      "roleGroupId": "1",
      "permissionId": "4",
      "value": "4",
      "key": "dashboard",
      "createdBy": "1"
    },
    {
      "id": "5",
      "roleGroupId": "1",
      "permissionId": "5",
      "value": "2",
      "key": "twofa",
      "createdBy": "1"
    },
    {
      "id": "6",
      "roleGroupId": "1",
      "permissionId": "6",
      "value": "15",
      "key": "groups",
      "createdBy": "1"
    },
    {
      "id": "7",
      "roleGroupId": "1",
      "permissionId": "7",
      "value": "15",
      "key": "vn_warehouses",
      "createdBy": "1"
    },
    {
      "id": "8",
      "roleGroupId": "1",
      "permissionId": "8",
      "value": "15",
      "key": "vn_raw_datas",
      "createdBy": "1"
    },
    {
      "id": "9",
      "roleGroupId": "1",
      "permissionId": "9",
      "value": "15",
      "key": "foreign_raw_datas",
      "createdBy": "1"
    },
    {
      "id": "10",
      "roleGroupId": "1",
      "permissionId": "10",
      "value": "15",
      "key": "foreign_warehouses",
      "createdBy": "1"
    },
  ]

  // Deletes ALL existing entries
  return knex('role_group_permissions').del()
    .then(async () => {
      // Inserts seed entries
      await knex('role_group_permissions').insert(data);
      await knex.raw('select setval(\'role_group_permissions_id_seq\', max(id)) from role_group_permissions');
    });
};
