import { mockedBackend } from "./MockedBackend";

interface PageAccessRequest {
  accessToken: string;
  requestedPath: string;
}

interface PageAccessResponse {
  status: 'granted' | 'denied';
  permissions: string[];
  redirectPath: string | null;
}

export const getPageAccessPermission = async (
  request: PageAccessRequest
): Promise<PageAccessResponse> => {
  try {
    // Simulovana latence
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const response = mockedBackend.getPageAccessPermission(request.accessToken, request.requestedPath);
    
    return response;
  } catch (error) {
    console.error('Error checking page access:', error);
    throw error;
  }
};

export const getTokenDashboard = async (accessToken: string): Promise<{ dashboardPath: string[] }> => {
  return mockedBackend.getTokenDashboard(accessToken);
};
