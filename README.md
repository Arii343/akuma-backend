
# あ kuma

あ kuma is an anime series and movies application that facilitates the experience of finding an anime that meets your expectations. With a catalog of more than 3800 animes.
## Endpoints

<br>

### **GET /ping**

<br>

- Method: GET

- Dev URL: http://localhost:4000/

- Prod URL: https://akuma-api.onrender.com/

- Response: Status 200, {
  "message": "🏓 Pong"
  }

<br>

### **POST /user/login**

<br>

- Method: POST

- Dev URL: http://localhost:4000/user/login

- Prod URL: https://akuma-api.onrender.com/user/login

- Request body: {"email": admin@admin.net, "password": admin}

- Response: Status 200, {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDc5MDE3YjIxOTVmYzUwM2M1MTMzM2IiLCJpYXQiOjE2ODU2NTE5NDksImV4cCI6MTY4NTczODM0OX0.nZyumE1_KkIVy9eeb5HW9739Vop5cpaF6YSnXsgXJb4"
  }

<br>

### **GET /anime**

<br>

- Method: GET

- Dev URL: http://localhost:4000/anime

- Prod URL: https://akuma-api.onrender.com/anime

- Response: Status 200, { animes: []}

---
