import axios from "axios";
import type { LoginDto } from "../types/auth";

const baseUrl = "http://localhost:3000/api/auth";

const login = async (loginDto: LoginDto) => {
  const { data } = await axios.post<{ accessToken: string }>(
    `${baseUrl}/login`,
    loginDto,
  );

  return data;
};

export { login };
