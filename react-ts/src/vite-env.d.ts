/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PSM_HOST: string;
  readonly VITE_PSM_PORT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
