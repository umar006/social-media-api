import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const loggerSchema = z.object({
  LOKI_URL: z.string(),
});

export default registerAs('logger', () => {
  const validatedSchema = loggerSchema.parse(process.env);

  return validatedSchema;
});
