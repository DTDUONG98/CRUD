//CREATE EXTENSION IF NOT EXISTS pg_partman schema partman;
    
exports.up = function (knex) {
  return knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  `)
};

exports.down = function (knex) {
  return knex.raw(`
    DROP EXTENSION IF EXISTS "uuid-ossp";
  `)
};

/**
 * install postgresql12-devel
 * install postgresql12-contrib
 * install pg_partman
*/

/**
  * Run Daily:
  * CALL partman.partition_data_proc('public.test');
  * SELECT partman.run_maintenance(p_analyze := false);
 */