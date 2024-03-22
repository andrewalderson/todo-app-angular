import { Injectable, NgZone, computed, inject, signal } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import {
  AccountInfo,
  AuthenticationResult,
  EventMessage,
} from '@azure/msal-browser';
import { filter, map, take } from 'rxjs';
import { UserAccountService } from './tokens';

@Injectable()
export class MsalTokenUserAccountService implements UserAccountService {
  #broadcastService = inject(MsalBroadcastService);
  #ngZone = inject(NgZone);
  #msalService = inject(MsalService);
  #userAccount = signal<AccountInfo | null>(null);

  readonly displayName = computed(() => this.#userAccount()?.name || '');
  readonly username = computed(() => this.#userAccount()?.username || '');
  readonly picture = computed(
    () => this.#userAccount()?.idTokenClaims?.['picture'] as string
  );
  constructor() {
    const account = this.#msalService.instance.getAllAccounts()[0];
    if (account) {
      this.#userAccount.set(account);
    } else {
      // if we get here before the MSAL library has finished creating
      // the user account we need to wait
      // we only need the first emission of this Observable
      this.#broadcastService.msalSubject$
        .pipe(
          filter(
            (msg: EventMessage) =>
              !!(msg.payload as AuthenticationResult)?.account
          ),
          map((msg) => (msg.payload as AuthenticationResult).account),
          take(1)
        )
        .subscribe((account: AccountInfo) => {
          this.#ngZone.run(() => {
            this.#userAccount.set(account);
          });
        });
    }
  }

  signout() {
    this.#msalService.logout();
  }
}
