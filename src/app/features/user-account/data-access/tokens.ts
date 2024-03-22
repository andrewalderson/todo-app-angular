import { InjectionToken, Signal } from '@angular/core';
import { MsalTokenUserAccountService } from './msal-token-user-account.service';

export interface UserAccountService {
  displayName: Signal<string>;
  username: Signal<string>;
  picture: Signal<string | undefined>;
  signout(): void;
}

export const USER_ACCOUNT_SERVICE = new InjectionToken<UserAccountService>(
  'userAccountService',
  { providedIn: 'root', factory: () => new MsalTokenUserAccountService() }
);
