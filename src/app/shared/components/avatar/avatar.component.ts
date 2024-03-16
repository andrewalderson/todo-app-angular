/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { coerceElement } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  computed,
  signal,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export type AvatarColors = {
  foreground: string;
  background: string;
  border?: string; // uses foreground if not set
};

@Directive({
  selector: '[todoAvatarFallback]',
  standalone: true,
})
export class AvatarFallbackDirective {}

@Component({
  selector: 'todo-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnChanges {
  @HostBinding('class') get themeClass() {
    return this.color ? `mat-${this.color}` : 'mat-unthemed';
  }

  @Input() color?: ThemePalette;

  protected readonly useImage = computed(() => this.#useImage() === true);

  #customColors: AvatarColors | null = null;

  #useImage = signal(false);

  constructor(
    public _elementRef: ElementRef<HTMLElement>,
    @Attribute('aria-hidden') ariaHidden: string
  ) {
    if (!ariaHidden) {
      coerceElement(this._elementRef).setAttribute('aria-hidden', 'true');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const color = changes['color'];
    if (color) {
      if (color.currentValue) {
        this._removeCustomColors();
      } else if (this.#customColors) {
        this._setCustomAvatarColors(this.#customColors);
      }
    }
  }

  _setUseImage(value: boolean) {
    this.#useImage.set(value);
  }

  _setCustomAvatarColors(colors: AvatarColors) {
    this.#customColors = colors;
    // only do this if the avatar is unthemed
    if (!this.color) {
      const style = coerceElement(this._elementRef).style;
      style.setProperty('--todo-avatar-color', colors.foreground);
      style.setProperty('--todo-avatar-background-color', colors.background);
      style.setProperty(
        '--todo-avatar-border-color',
        colors.border ?? colors.foreground
      );
    }
  }

  _removeCustomColors(reset = false) {
    const style = coerceElement(this._elementRef).style;
    style.removeProperty('--todo-avatar-color');
    style.removeProperty('--todo-avatar-background-color');
    style.removeProperty('--todo-avatar-border-color');
    if (reset) {
      this.#customColors = null;
    }
  }
}
