const Graphql = require('graphql-tools');
const { mergeSchemas } = Graphql;
const devSchema = require('./Dev.schema');

const mergedSchemas = mergeSchemas({
  schemas: [ devSchema ]
});

module.exports = mergedSchemas;
