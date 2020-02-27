( assume have mongodb, yarn and node installed )

cd server-graphql-typescript

yarn build

cp .env.tpl .env

( assume no password for mongodb, or please change the connection string MONGODB_URL )

NODE_ENV=production node dist/server


( more descriptions will be provided later )
