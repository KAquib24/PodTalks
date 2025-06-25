// env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LISTEN_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
