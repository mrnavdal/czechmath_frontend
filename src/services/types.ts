// src/types/api.ts
export interface TokenInfo {
    roles: string[];
    permissions: string[];
  }
  
  export interface PageAccessResponse {
    status: 'granted' | 'denied';
    permissions: string[];
    redirectPath: string | null;
  }
  
  export interface PageAccessRequest {
    accessToken: string;
    requestedPath: string;
  }