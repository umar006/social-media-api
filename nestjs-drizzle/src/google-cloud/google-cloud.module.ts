import { Module } from '@nestjs/common';
import {
  GCLOUD_STORAGE_PROVIDER,
  gCloudStorageProvider,
} from './cloud-storage.provider';

@Module({
  providers: [gCloudStorageProvider],
  exports: [GCLOUD_STORAGE_PROVIDER],
})
export class GoogleCloudModule {}
