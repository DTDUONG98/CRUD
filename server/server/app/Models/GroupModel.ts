import BaseModel from './BaseModel'

class GroupModel extends BaseModel {
  static tableName = "groups"

  //fields
  id: number;
  code: string;
  name: string;
  description: any;

  static async getChildren(id, includeMe = true) {
    let childrens = await GroupModel.query().where('parentIds', '@>', id)
    let childrenIds = childrens.map(children => children.id);
    if (includeMe) childrenIds.push(id);
    return childrenIds;
  }

  static async attachPartition(id: number) {
    await Promise.all([
      this.knex().raw(`
      CREATE TABLE IF NOT EXISTS "black_numbers_p${id}" PARTITION OF "black_numbers"
      FOR VALUES FROM (${id}) TO (${Number(id) + 1});
    `),
      this.knex().raw(`
      CREATE TABLE IF NOT EXISTS "white_numbers_p${id}" PARTITION OF "white_numbers"
      FOR VALUES FROM (${id}) TO (${Number(id) + 1});
    `),
      this.knex().raw(`
      CREATE TABLE IF NOT EXISTS "mno_dncs_p${id}" PARTITION OF "mno_dncs"
      FOR VALUES FROM (${id}) TO (${Number(id) + 1});
    `),
    ])

  }

  static async detachPartition(id: number) {
    try {
      await Promise.all([
        this.knex().raw(`
          ALTER TABLE IF EXISTS "black_numbers" DETACH PARTITION "black_numbers_p${id}";
          DROP TABLE IF EXISTS "black_numbers_p${id}" CASCADE;
        `),
        this.knex().raw(`
          ALTER TABLE IF EXISTS "white_numbers" DETACH PARTITION "white_numbers_p${id}";
          DROP TABLE IF EXISTS "white_numbers_p${id}" CASCADE;
        `),
        this.knex().raw(`
          ALTER TABLE IF EXISTS "mno_dncs" DETACH PARTITION "mno_dncs_p${id}";
          DROP TABLE IF EXISTS "mno_dncs_p${id}" CASCADE;
        `)
      ])
    }
    catch (e) { }
  }

}

export default GroupModel
