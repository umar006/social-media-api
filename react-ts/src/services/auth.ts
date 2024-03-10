import axios from "axios";
import type { LoginDto, RegisterDto } from "../types/auth";

const baseUrl = "/api/auth";

const login = async (loginDto: LoginDto) => {
  const { data } = await axios.post<{ accessToken: string }>(
    `${baseUrl}/login`,
    loginDto,
  );

  return data;
};

const register = async (registerDto: RegisterDto) => {
  const { data } = await axios.post<{ accessToken: string }>(
    `${baseUrl}/register`,
    registerDto,
  );

  return data;
};

export { login, register };
