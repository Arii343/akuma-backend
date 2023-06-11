import { type UserDataStructure } from "../../server/types";

export const mockUserHashed: UserDataStructure = {
  email: "admin@admin.net",
  password: "$2y$10$jmcgTo7iVtrVhtdS6PgpD.tAEb1gW3AbrRNeStJ5rowxE7zLmiwyy",
  role: "admin",
  username: "admin",
};

export const mockUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDc5MDE3YjIxOTVmYzUwM2M1MTMzM2IiLCJpYXQiOjE2ODY0ODQ2MTQsImV4cCI6MTY4NjU3MTAxNH0.8KlqvI37zpxc9FuN3tKu17NGf34RaPQHw78SL4vTGMc";

export const mockInvalidUserToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCp6IkpXVCJ9.eyJzdWIiOiI2NDc5MDE3YjIxOTVmYzUwM2M1MTMzM2IiLCJpYXQiOjE2ODYzMzcxNTgsImV4cCI6MTY4NjQyMzU1OH0.Kcprnhv32SJU4AFDrDXuxsC2KfTwGwdN67qzC_BhYQs";
