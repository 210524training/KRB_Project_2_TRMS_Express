import User from "../models/user";
import trmsClient from "./trms.client";

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await trmsClient.post<User>('/', {
    username,
    password,
  });

  return user;
}