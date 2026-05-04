System Design:
The system was designed wth simple logics and single server approach.
Tech Stack: Node/Express.js, MongoDB.
The password is hashed using bcrypt during login.
After every login or registration, a new jwt token is generated with a time limit of 2 minutes.
The system is rate limited such that the use can attempt only 100 requests per 15 minutes.

Security Considerations:
Attacks that I thought about were Spam requests, Data interuption, SQL Injection attacks.
Rate limiting has been set to avoid spam.
The password has been encrypted using Bcrypt so that brute force won't be applicable, since bcrypt is a slow method.
Have included mongo-sanitize to avoid SQL Injection attacks.

Future implementation
Granted more time, I would've implemented redis cache to implement Idempotent Keys.
Granted more time, I would've made an role based access system.
Granted more time, I would've added logs.

TEST API:

LOGIN:
method: POST
url: http://localhost:2313/api/auth/login
body: {
    "email": "mitheshtharun@gmail.com",
    "password": "mithu133"
}
response: {
    "_id": "69f845a61f0351447ceff92e",
    "email": "mitheshtharun@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Zjg0NWE2MWYwMzUxNDQ3Y2VmZjkyZSIsImlhdCI6MTc3Nzg3ODc5NCwiZXhwIjoxNzgwNDcwNzk0fQ.Qsuwg-0iJ67UUUekKfqo8ZhgCm4JeujZyPJ-hgNNDK8"
}
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
REGISTER:
method: POST
url: http://localhost:2313/api/auth/register
body: {
    "email": "mitheshtharun@gmail.com",
    "password": "mithu133"
}
response: {
    "_id": "69f845a61f0351447ceff92e",
    "email": "mitheshtharun@gmail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Zjg0NWE2MWYwMzUxNDQ3Y2VmZjkyZSIsImlhdCI6MTc3Nzg3ODc5NCwiZXhwIjoxNzgwNDcwNzk0fQ.Qsuwg-0iJ67UUUekKfqo8ZhgCm4JeujZyPJ-hgNNDK8"
}
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
PAYMENT PROCESSING:
method: POST
url: http://localhost:2313/api/payment
body: {
    "amount":"50000",
    "currency": "rupee",
    "merchant_id": "967857306798654"
}
response: {"message":"Amount credited to 967857306798654"}
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
TRANSACTION HISTORY:
method: GET
url: http://localhost:2313/api/transactions
body: -
response: {"message":"Transaction history fetched","history":[{"_id":"69f85dc30597910577f12de3","email":"mitheshtharun@gmail.com","amount":50000,"currency":"rupee","merchant_id":967857306798654,"createdAt":"2026-05-04T08:50:11.580Z","updatedAt":"2026-05-04T08:50:11.580Z","__v":0},{"_id":"69f85e830597910577f12de4","email":"mitheshtharun@gmail.com","amount":9000,"currency":"rupee","merchant_id":967857306798654,"createdAt":"2026-05-04T08:53:23.942Z","updatedAt":"2026-05-04T08:53:23.942Z","__v":0},{"_id":"69f85e9bbe0d54169dfbf0c0","email":"mitheshtharun@gmail.com","amount":12000,"currency":"rupee","merchant_id":967857306798654,"createdAt":"2026-05-04T08:53:47.091Z","updatedAt":"2026-05-04T08:53:47.091Z","__v":0}]}
