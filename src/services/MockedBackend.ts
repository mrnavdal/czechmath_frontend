interface TokenInfo {
  roles: string[];
  permissions: string[];
}

interface PageAccessResponse {
  status: 'granted' | 'denied';
  permissions: string[];
  redirectPath: string | null;
}

export class MockedBackend {
  private tokenStorage: Map<string, TokenInfo> = new Map();
  private pathPermissions: Map<string, string[]> = new Map([
    ['/dashboard', ['user']],
    ['/admin/dashboard', ['admin']],
  ]);

  registerToken(token: string, roles: string[], permissions: string[]) {
    this.tokenStorage.set(token, { roles, permissions });
    console.log('Token registered:', token);
  }

  getPageAccessPermission(accessToken: string, requestedPath: string): PageAccessResponse {
    const tokenInfo = this.tokenStorage.get(accessToken);
    
    if (!tokenInfo) {
      return {
        status: 'denied',
        permissions: [],
        redirectPath: '/login'
      };
    }

    const requiredPermissions = this.pathPermissions.get(requestedPath) || [];
    const hasAllPermissions = requiredPermissions.every(
      permission => tokenInfo.permissions.includes(permission)
    );

    if (hasAllPermissions) {
      return {
        status: 'granted',
        permissions: tokenInfo.permissions,
        redirectPath: null
      };
    }

    return {
      status: 'denied',
      permissions: [],
      redirectPath: '/unauthorized'
    };
  }

  // Zjisti jaky dashboard pro token se ma otevrit
  getTokenDashboard(accessToken: string): { dashboardPath: string[] } {
    const tokenInfo = this.tokenStorage.get(accessToken);
    if (!tokenInfo) {
      return { dashboardPath: [] };
    }
    return { dashboardPath: tokenInfo.permissions };
  }
}

export const mockedBackend = new MockedBackend();