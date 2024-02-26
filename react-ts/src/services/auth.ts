import axios from "axios";
import type { LoginDto } from "../types/auth";

const host = import.meta.env.VITE_PSM_HOST;
const port = import.meta.env.VITE_PSM_PORT;
const baseUrl = `${host}:${port}/api/auth`;

const login = async (loginDto: LoginDto) => {
  const { data } = await axios.post<{ accessToken: string }>(
    `${baseUrl}/login`,
    loginDto,
  );

  return data;
};

export { login };
