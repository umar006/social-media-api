import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const EnvVariables = z.object({
  POSTGRES_URL: z.string().url(),
});

export type DatabaseConfig = z.infer<typeof EnvVariables>;

export default registerAs('database', () => {
  const validatedConfig = EnvVariables.parse(process.env);

  return validatedConfig;
});
