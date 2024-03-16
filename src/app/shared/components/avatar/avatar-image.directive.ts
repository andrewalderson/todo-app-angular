import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  inject,
  isDevMode,
  ɵunwrapSafeValue as unwrapSafeUrl,
} from '@angular/core';
import { AvatarComponent } from './avatar.component';

@Directive({
  selector: 'img[todoAvatarImage]',
  standalone: true,
})
export class AvatarImageDirective implements AfterViewInit, OnChanges, OnInit {
  #avatar = inject(AvatarComponent);
  #element: HTMLImageElement = inject(ElementRef).nativeElement;
  #renderer = inject(Renderer2);

  @HostBinding('style')
  style = `position: absolute; display: block; inset: 0; width: 100%; height: 100%; object-fit: cover;`;

  @Input({ required: true, transform: unwrapSafeUrl }) src!: string;

  @Input() width?: string;

  @Input() height?: string;

  ngOnInit(): void {
    if (isDevMode()) {
      assertEmptyWidthAndHeight(this);
    }
  }

  ngAfterViewInit(): void {
    this.#avatar._setUseImage(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.#listenForImageEvents();
      this.#updateSrc();
    }
  }

  #setHostAttribute(name: string, value: string): void {
    this.#renderer.setAttribute(this.#element, name, value);
  }

  #updateSrc() {
    this.#setHostAttribute('src', this.src);
  }

  #listenForImageEvents() {
    const unlistenLoadFn = this.#renderer.listen(this.#element, 'load', () => {
      this.#avatar._setUseImage(true);
      unlistenLoadFn();
      unlistenErrorFn();
    });
    const unlistenErrorFn = this.#renderer.listen(
      this.#element,
      'error',
      () => {
        this.#avatar._setUseImage(false);
        unlistenLoadFn();
        unlistenErrorFn();
      }
    );
  }
}

function assertEmptyWidthAndHeight(dir: AvatarImageDirective) {
  if (dir.width || dir.height) {
    throw new Error(
      `the attributes \`height\` and/or \`width\` are present and should not be. The image directive will handle setting its dimensions`
    );
  }
}
