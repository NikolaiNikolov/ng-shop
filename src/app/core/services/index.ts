import { AuthenticationService } from "./authentication/authentication.service";
import { HttpClientService } from "./http-client/http-client.service";
import { HttpService } from "./http-service/http.service";

export const allServices  = [AuthenticationService, HttpClientService, HttpService];
