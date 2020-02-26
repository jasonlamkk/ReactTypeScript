import { gql } from 'apollo-server';

import fs from 'fs';

let schema = fs.readFileSync('./vote-dev.graphql','utf8');
let o = gql(schema);
export default o; 