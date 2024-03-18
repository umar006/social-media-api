import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const gCloudSchema = z.object({
  CLOUD_STORAGE_SERVICE_ACCOUNT_KEYFILE_PATH: z.string(),
});

export default registerAs('gcloud', () => {
  const validatedSchema = gCloudSchema.parse(process.env);

  return validatedSchema;
});
