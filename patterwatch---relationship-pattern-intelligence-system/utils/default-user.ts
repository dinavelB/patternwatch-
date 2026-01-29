import { User } from "@/types/types";

const defaultUser = (): User => {
  const userInfo: { username: string; email: string; password: string } = {
    username: "atlazkazuma",
    email: "atlazkazuma@example.com",
    password: "atlasthegreat",
  };

  return userInfo;
};

export default defaultUser;
