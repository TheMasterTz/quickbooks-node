export interface QuickbooksConfig {
  accessToken: string;
  refreshToken: string;
  realmId: string | number;
  minorVersion?: number | null | string;
  useSandbox?: boolean;
  debug?: boolean;
}

export interface optionsType {
  method: 'head' | 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options';
  headers?: object;
  params?: object;
}

export interface entityType {
  allowDuplicateDocNum?: boolean;
  requestId?: string;
  [key: string]: any;
}