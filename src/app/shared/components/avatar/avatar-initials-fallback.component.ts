import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  inject,
  isDevMode,
  signal
} from '@angular/core';
import { AvatarColors, AvatarComponent } from './avatar.component';

// these colors are the 700 values from the material color spec
// the default contrast for all is white
const COLOR_TABLE = [
  '#D32F2F',
  '#C2185B',
  '#7B1FA2',
  '#512DA8',
  '#303F9F',
  '#1976D2',
  '#0288D1',
  '#0097A7',
  '#00796B',
  '#388E3C',
  '#689F38',
  '#AFB42B',
  '#FBC02D',
  '#FFA000',
  '#F57C00',
  '#E64A19',
  '#5D4037',
  '#616161',
  '#455A64',
];

export type AvatarInitialsInitialsFn = (name?: string) => string;

export type AvatarInitialsColorFn = (name?: string) => AvatarColors;

function AVATAR_INITIALS_INITIALS_FUNCTION_FACTORY(): AvatarInitialsInitialsFn {
  return (name?: string) => {
    if (!name) {
      return '';
    }
    const parts = name.split(' ');
    let initials = parts[0].charAt(0);
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0);
    }
    return initials;
  };
}

function AVATAR_INITIALS_COLORS_FUNCTION_FACTORY(): AvatarInitialsColorFn {
  return (name?: string) => {
    if (!name) {
      return { background: 'transparent', foreground: '#ffffff' };
    }
    let hashCode = 0;
    for (let i = name.length - 1; i >= 0; i--) {
      const ch = name.charCodeAt(i);
      const shift = i % 8;
      // eslint-disable-next-line no-bitwise
      hashCode ^= (ch << shift) + (ch >> (8 - shift));
    }
    return {
      background: COLOR_TABLE[hashCode % COLOR_TABLE.length],
      foreground: '#ffffff',
    };
  };
}

export const AVATAR_INITIALS_INITIALS_FUNCTION =
  new InjectionToken<AvatarInitialsInitialsFn>(
    'todoAvatarInitialsInitialsFunction',
    {
      providedIn: 'root',
      factory: AVATAR_INITIALS_INITIALS_FUNCTION_FACTORY,
    }
  );

export const AVATAR_INITIALS_COLORS_FUNCTION =
  new InjectionToken<AvatarInitialsColorFn>(
    'todoAvatarInitialsColorsFunction',
    {
      providedIn: 'root',
      factory: AVATAR_INITIALS_COLORS_FUNCTION_FACTORY,
    }
  );

@Component({
  selector: 'todo-avatar-initials-fallback',
  standalone: true,
  imports: [CommonModule],
  template: `<span>{{ initials() }}</span> `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        font-size: var(--todo-avatar-font-size);
        font-weight: var(--todo-avatar-font-weight);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarInitialsFallbackComponent implements OnChanges, OnDestroy {
  #avatar = inject(AvatarComponent);
  #initialsFn = inject(AVATAR_INITIALS_INITIALS_FUNCTION);
  #colorsFn = inject(AVATAR_INITIALS_COLORS_FUNCTION);

  protected readonly initials = signal<string>('');
  /**
   * Name (usually persons email address) used to render the colors
   * If not set the colors will be rendered from the initialsName
   */
  @Input() colorsName?: string;

  /**
   * Name (usually persons first and last name) used to render the initials
   */
  @Input({ required: true }) initialsName!: string;

  ngOnChanges(changes: SimpleChanges): void {
    const initialsName = changes['initialsName'];
    const colorsName = changes['colorsName'];
    if (initialsName) {
      this.#setInitials(this.initialsName);
    }
    if (colorsName || initialsName) {
      this.#setAvatarColors(this.colorsName || this.initialsName);
    }
  }

  ngOnDestroy(): void {
    this.#avatar._removeCustomColors(true);
  }

  #setInitials(name?: string) {
    if (isDevMode() && !this.#initialsFn) {
      throw new Error('An initials function must be provided');
    }
    this.initials.set(this.#initialsFn(name));
  }

  #setAvatarColors(name?: string) {
    if (isDevMode() && !this.#colorsFn) {
      throw new Error('A colors function must be provided');
    }
    this.#avatar._setCustomAvatarColors(this.#colorsFn(name));
  }
}
