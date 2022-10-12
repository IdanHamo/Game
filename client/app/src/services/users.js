import httpService from "./httpservice";

async function createUser(user) {
  return await httpService.post("/users/createUser", user);
}

const usersService = {
  createUser,
};

export default usersService;
