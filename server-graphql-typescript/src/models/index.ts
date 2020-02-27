import { gql } from 'apollo-server';

import fs from 'fs';

const schema = fs.readFileSync('./vote-dev.graphql','utf8');
const o = gql(schema);
export default o; 