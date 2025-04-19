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

Seed default admin user
    admin@gmail.com
    password
Auth Type - Bearer Token for all routes except login and register
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
Return
[
    {
        "id": 4,
        "title": "Chamber of Secret",
        "releaseDate": "2023-10-18T00:00:00.000Z",
        "description": "Fantasy",
        "authorId": 1,
        "createdAt": "2025-04-18T08:36:02.516Z",
        "updatedAt": "2025-04-18T08:36:02.516Z",
        "isActive": true
    }
]           

Get details of a specific book by [id]      
GET     /books/[id]
Return
{
    "id": 4,
    "title": "Chamber of what",
    "releaseDate": "2023-10-18T00:00:00.000Z",
    "description": "Fantasy",
    "authorId": 1,
    "createdAt": "2025-04-18T08:36:02.516Z",
    "updatedAt": "2025-04-18T08:36:02.516Z",
    "isActive": true
}
    
Create a new book
POST    /books
Payload
{
    "title" : "Some Book",
    "releaseDate" : "02/02/2012",
    "description" : "Some description",
    "authorId" : 1
}
Return
{
    "id": 7,
    "title": "Some Book",
    "releaseDate": "2012-02-01T17:00:00.000Z",
    "description": "Some description",
    "authorId": 1,
    "createdAt": "2025-04-19T17:58:46.017Z",
    "updatedAt": "2025-04-19T17:58:46.017Z",
    "isActive": true
}

Update an existing book by [id]
PUT     /books/[id]
Payload
{
    "title" : "Some Edited Book",
    "releaseDate" : "02/02/2012",
    "description" : "Some description",
    "authorId" : 1
}
Return
{
    "id": 7,
    "title": "Some Edited Book",
    "releaseDate": "2012-02-01T17:00:00.000Z",
    "description": "Some description",
    "authorId": 1,
    "createdAt": "2025-04-19T17:58:46.017Z",
    "updatedAt": "2025-04-19T18:03:32.779Z",
    "isActive": true
}

Delete a book by [id]
DELETE  /books/[id]
Return
{
    "id": 7,
    "title": "Some Edited Book",
    "releaseDate": "2012-02-01T17:00:00.000Z",
    "description": "Some description",
    "authorId": 1,
    "createdAt": "2025-04-19T17:58:46.017Z",
    "updatedAt": "2025-04-19T18:05:06.139Z",
    "isActive": false
}
</pre>

Authors
<pre>
List all authors
GET     /authors
Return
[
    {
        "id": 1,
        "name": "Jk Rowling",
        "dob": "2015-04-22T14:09:00.000Z",
        "nationality": "U.S",
        "createdAt": "2025-04-18T14:26:53.000Z",
        "updatedAt": "2025-04-18T14:26:53.000Z",
        "isActive": true
    }
]

Get details of a specific author by [id]  
GET     /authors/[id]
Return
{
    "id": 1,
    "name": "Jk Rowling",
    "dob": "2015-04-22T14:09:00.000Z",
    "nationality": "U.S",
    "createdAt": "2025-04-18T14:26:53.000Z",
    "updatedAt": "2025-04-18T14:26:53.000Z",
    "isActive": true
}

Create a new author
POST    /authors
Payload
{
    "name" : "Jane",
    "dob" : "02/02/1981",
    "nationality" : "Singapore"
}
Return
{
    "id": 4,
    "name": "Jane",
    "dob": "1981-02-01T17:00:00.000Z",
    "nationality": "Singapore",
    "createdAt": "2025-04-19T18:09:32.320Z",
    "updatedAt": "2025-04-19T18:09:32.320Z",
    "isActive": true
}

Update an existing author by [id]
PUT     /authors/[id]
Payload
{
    "name" : "Jane Bobie",
    "dob" : "02/02/1981",
    "nationality" : "Singapore"
}
Return
{
    "id": 4,
    "name": "Jane Bobie",
    "dob": "1981-02-01T17:00:00.000Z",
    "nationality": "Singapore",
    "createdAt": "2025-04-19T18:09:32.320Z",
    "updatedAt": "2025-04-19T18:10:12.777Z",
    "isActive": true
}

Delete an author by [id]
DELETE  /authors/[id]
Return
{
    "id": 4,
    "name": "Jane Bobie",
    "dob": "1981-02-01T17:00:00.000Z",
    "nationality": "Singapore",
    "createdAt": "2025-04-19T18:09:32.320Z",
    "updatedAt": "2025-04-19T18:11:11.826Z",
    "isActive": false
}
</pre>

Reviews
<pre>
List all reviews
GET     /reviews
Return
[
    {
        "id": 1,
        "rating": 4,
        "content": "nice zzz",
        "userId": 1,
        "bookId": 2,
        "createdAt": "2025-04-18T11:04:46.239Z",
        "updatedAt": "2025-04-18T11:06:12.661Z",
        "isActive": true
    },
    {
        "id": 2,
        "rating": 4,
        "content": "woh yayy",
        "userId": 1,
        "bookId": 2,
        "createdAt": "2025-04-18T11:15:24.037Z",
        "updatedAt": "2025-04-18T11:15:24.037Z",
        "isActive": true
    }
]

Get details of a specific review by [id] 
GET     /reviews/[id]
Return
{
    "id": 1,
    "rating": 4,
    "content": "nice zzz",
    "userId": 1,
    "bookId": 2,
    "createdAt": "2025-04-18T11:04:46.239Z",
    "updatedAt": "2025-04-18T11:06:12.661Z",
    "isActive": true
}

Create a new review
POST    /reviews
Payload
{
    "rating" : 5,
    "content" : "This is the one!!",
    "bookId" : 8
}
Return
{
    "id": 4,
    "rating": 5,
    "content": "This is the one!!",
    "userId": 1,
    "bookId": 8,
    "createdAt": "2025-04-19T18:16:56.112Z",
    "updatedAt": "2025-04-19T18:16:56.112Z",
    "isActive": true
}


Update an existing review by [id]
PUT     /reviews/[id]
Payload
{
    "rating" : 5,
    "content" : "This is the edit the one!!",
    "bookId" : 8
}
Return
{
    "id": 4,
    "rating": 5,
    "content": "This is the edit the one!!",
    "userId": 1,
    "bookId": 8,
    "createdAt": "2025-04-19T18:16:56.112Z",
    "updatedAt": "2025-04-19T18:18:03.874Z",
    "isActive": true
}

Delete a review by [id]
DELETE  /reviews/[id]
Return
{
    "id": 4,
    "rating": 5,
    "content": "This is the edit the one!!",
    "userId": 1,
    "bookId": 8,
    "createdAt": "2025-04-19T18:16:56.112Z",
    "updatedAt": "2025-04-19T18:19:26.358Z",
    "isActive": false
}
</pre>

