import { AuthProvidersList, IAuthProvider } from "@/utils/interfaces/user.interface";
import { GoogleAuthProvider } from "./provider/GoogleAuthProvider ";

export class AuthProviderFactory {
  static createProvider(
    providerName: AuthProvidersList,
    credentials: { clientId: string; clientSecret: string; redirectUri: string }
  ): IAuthProvider;

  static createProvider(
    providerName: AuthProvidersList,
    clientId: string,
    clientSecret: string,
    redirectUri: string
  ): IAuthProvider;

  static createProvider(
    providerName: AuthProvidersList,
    clientIdOrCredentials: string | { clientId: string; clientSecret: string; redirectUri: string },
    clientSecret?: string,
    redirectUri?: string
  ): IAuthProvider {
    // If credentials object is passed
    if (typeof clientIdOrCredentials === "object") {
      const { clientId, clientSecret, redirectUri } = clientIdOrCredentials;
      this.validateInputs(clientId, clientSecret, redirectUri);
      switch (providerName.toLowerCase()) {
        case "google":
          return new GoogleAuthProvider(clientId, clientSecret, redirectUri);
        default:
          throw new Error(`Provider ${providerName} not supported.`);
      }

    }

    // If individual string arguments are passed
    if (typeof clientIdOrCredentials === "string" && clientSecret && redirectUri) {
      this.validateInputs(clientIdOrCredentials, clientSecret, redirectUri);
      switch (providerName.toLowerCase()) {
        case "google":
          return new GoogleAuthProvider(clientIdOrCredentials, clientSecret, redirectUri);
        default:
          throw new Error(`Provider ${providerName} not supported.`);
      }
    }

    throw new Error("Invalid arguments passed to createProvider.");
  }
  private static validateInputs(clientId: string, clientSecret: string, redirectUri: string): void {
    if (!clientId || clientId.trim() === "") {
      throw new Error("Client ID cannot be empty.");
    }

    if (!clientSecret || clientSecret.trim() === "") {
      throw new Error("Client Secret cannot be empty.");
    }

    if (!redirectUri || redirectUri.trim() === "") {
      throw new Error("Redirect URI cannot be empty.");
    }

    const redirectUrlRegex = /^(https?):\/\/[^\s$.?#].[^\s]*$/;
    if (!redirectUrlRegex.test(redirectUri)) {
      throw new Error("Redirect URI is not a valid URL.");
    }
  }
}
