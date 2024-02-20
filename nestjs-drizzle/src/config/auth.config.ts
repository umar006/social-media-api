import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const authSchema = z.object({
  JWT_SECRET: z.string(),
  JWT_EXPIRES: z.string(),
});

export default registerAs('auth', () => {
  const validatedAuth = authSchema.parse(process.env);

  return validatedAuth;
});
