import { type UserDataStructure } from "../../server/types";

export const mockUserHashed: UserDataStructure = {
  email: "admin@admin.net",
  password: "$2y$10$jmcgTo7iVtrVhtdS6PgpD.tAEb1gW3AbrRNeStJ5rowxE7zLmiwyy",
  role: "admin",
  username: "admin",
};

export const mockUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDc5MDE3YjIxOTVmYzUwM2M1MTMzM2IiLCJpYXQiOjE2ODYzMzcxNTgsImV4cCI6MTY4NjQyMzU1OH0.Kcprnhv32SJU4AFDrDXuxsC2KfTwGwdN67qzC_BhYQs";

export const mockInvalidUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCp6IkpXVCJ9.eyJzdWIiOiI2NDc5MDE3YjIxOTVmYzUwM2M1MTMzM2IiLCJpYXQiOjE2ODYzMzcxNTgsImV4cCI6MTY4NjQyMzU1OH0.Kcprnhv32SJU4AFDrDXuxsC2KfTwGwdN67qzC_BhYQs";
