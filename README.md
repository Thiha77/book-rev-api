.env 
<pre>
PORT=3000
NODE_ENV=development
JWT_SECRET=my_app_secret #not in use yet
DATABASE_URL="mysql://root@localhost:3306/mydb"
Update this to connect db
</pre>
npm
<pre>
npm install           #install dependencies
npx prisma init --datasource-provider mysql --output ../generated/prisma
                      # output is omitted in current project
                      # if prisma is generated with --output it will not be in node_modules(recommanded way for later prisma versions)
npx prisma migrate dev --name init
                      # prisma migration initiate
npx prisma generate   # generate prisma client if not already generated or deleted
npx prisma db seed    # run to seed initial data

npm run dev           # run project under localhost
npm run build         # build project
npm run start         # run project built version
</pre>
