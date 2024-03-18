import { Storage } from '@google-cloud/storage';
import { FactoryProvider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import googleCloudConfig from 'src/config/google-cloud.config';

export const GCLOUD_STORAGE_PROVIDER = Symbol('GCLOUD_STORAGE_PROVIDER');
export type GCloudStorage = Storage;

export const gCloudStorageProvider: FactoryProvider = {
  provide: GCLOUD_STORAGE_PROVIDER,
  inject: [googleCloudConfig.KEY],
  useFactory: (gCloudCfg: ConfigType<typeof googleCloudConfig>) => {
    const keyFilename = gCloudCfg.CLOUD_STORAGE_SERVICE_ACCOUNT_KEYFILE_PATH;
    const storage = new Storage({
      keyFilename: keyFilename,
    });

    return storage;
  },
};
