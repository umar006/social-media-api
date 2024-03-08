import axios from "axios";
import type { LoginDto } from "../types/auth";

const baseUrl = "/api/auth";

const login = async (loginDto: LoginDto) => {
  const { data } = await axios.post<{ accessToken: string }>(
    `${baseUrl}/login`,
    loginDto,
  );

  return data;
};

export { login };
