import { mockedBackend } from "./MockedBackend";
import { PageAccessRequest, PageAccessResponse } from "./types";

export const getPageAccessPermission = async (
  request: PageAccessRequest
): Promise<PageAccessResponse> => {
  try {
    // Simulovana latence
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // Pro zadany token a cestu vrati, jestli uzivatel ma pristup k dane strance
    const response = mockedBackend.getPageAccessPermission(request.accessToken, request.requestedPath);
    
    return response;
  } catch (error) {
    console.error('Chyba pri kontrole pristupu k strance:', error);
    throw error;
  }
};

export const getTokenDashboard = async (accessToken: string): Promise<{ dashboardPath: string[] }> => {
  // Pro zadany token vrati z backendu dashboard, na ktery ma uzivatel pristup
  return mockedBackend.getTokenDashboard(accessToken);
};
