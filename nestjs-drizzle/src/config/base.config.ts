import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const baseSchema = z.object({
  NODE_ENV: z.string(),
});

export default registerAs('base', () => {
  const validatedSchema = baseSchema.parse(process.env);

  return validatedSchema;
});
