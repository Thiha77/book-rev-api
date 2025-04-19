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
npx prisma init --datasource-provider mysql 
                      # --output ../generated/prisma # output is omitted in current project
                      # if prisma is generated with --output it will not be in node_modules(recommanded way for later prisma versions)
npx prisma migrate dev --name init
                      # prisma migration initiate
npx prisma generate   # generate prisma client if not already generated or deleted
npx prisma db seed    # run to seed initial data

npm run dev           # run project under localhost
npm run build         # build project
npm run start         # run project built version
</pre>
Routes


Api Prefix - /api/v1
<pre>
e.g localhost:3000/api/v1/auth/login
    localhost:3000/api/v1/books
</pre>

User
<pre>
Register a new user
POST    /auth/register
Payload
{
    "name" : "mike",
    "email" : "mike@gmail.com",
    "password" : "password"
}
Return
{
    "data": {
        "id": 7,
        "name": "mike",
        "email": "mike@gmail.com"
    }
}


Login
POST    /auth/login
Payload
{
    "email" : "admin@gmail.com",
    "password" : "password"
}
Return
{
    "data": {
        "id": 1,
        "name": "Admin",
        "email": "admin@gmail.com",
        "isAdmin": true,
        "token": "eyJhbGciO...."
    }
}

</pre>

Books
<pre>
List all books
GET     /books           

Get details of a specific book by [id]      
GET     /books/[id]     
    
Create a new book
POST    /books 

Update an existing book by [id]
PUT     /books/[id]

Delete a book by [id]
DELETE  /books/[id]
</pre>

Authors
<pre>
List all authors
GET     /authors

Get details of a specific author by [id]  
GET     /authors/[id]

Create a new author
POST    /authors

Update an existing author by [id]
PUT     /authors/[id]

Delete an author by [id]
DELETE  /authors/[id]
</pre>

Reviews
<pre>
List all reviews
GET     /reviews

Get details of a specific review by [id]  
GET     /reviews/[id]

Create a new review
POST    /reviews

Update an existing review by [id]
PUT     /reviews/[id]

Delete a review by [id]
DELETE  /reviews/[id]
</pre>

