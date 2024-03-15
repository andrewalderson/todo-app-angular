import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { signal } from '@angular/core';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatSidenavHarness } from '@angular/material/sidenav/testing';
import { render } from '@testing-library/angular';
import { IS_SMALL_SCREEN } from '../app.tokens';
import { ShellComponent } from './shell.component';

const isSmallScreen = signal(true);
let loader: HarnessLoader;

describe('ShellComponent', () => {
  beforeEach(async () => {
    const { fixture } = await render(ShellComponent, {
      providers: [{ provide: IS_SMALL_SCREEN, useValue: isSmallScreen }],
    });
    loader = TestbedHarnessEnvironment.loader(fixture);
  });
  describe('Sidenav behaviour', () => {
    let sidenavHarness: MatSidenavHarness;
    let toggleButtonHarness: MatButtonHarness | null;

    beforeEach(async () => {
      sidenavHarness = await loader.getHarness(MatSidenavHarness);
      toggleButtonHarness = await loader.getHarnessOrNull(MatButtonHarness);
    });
    describe('given the display is a small screen', () => {
      beforeEach(() => {
        isSmallScreen.set(true);
      });
      it('should have a closed sidenav', async () => {
        expect(await sidenavHarness.isOpen()).toBe(false);
      });
      it('should be able to toggle sidenav', async () => {
        expect(toggleButtonHarness).not.toBeNull();

        toggleButtonHarness?.click();

        expect(await sidenavHarness?.isOpen()).toBe(true);

        toggleButtonHarness?.click();

        expect(await sidenavHarness?.isOpen()).toBe(false);
      });

      it('should be be over the content', async () => {
        expect(await sidenavHarness.getMode()).toBe('over');
      });

      it('should be fixed in the view port', async () => {
        expect(await sidenavHarness.isFixedInViewport()).toBe(true);
      });
    });

    describe('given the display is not a small screen', () => {
      beforeEach(() => {
        isSmallScreen.set(false);
      });
      it('should have an open sidenav', async () => {
        expect(await sidenavHarness.isOpen()).toBe(true);
      });
      it('should not be able to toggle sidenav', async () => {
        expect(toggleButtonHarness).toBeNull();
      });
      it('should be beside the content', async () => {
        expect(await sidenavHarness.getMode()).toBe('side');
      });

      it('should not be fixed in the view port', async () => {
        expect(await sidenavHarness.isFixedInViewport()).toBe(false);
      });
    });
  });
});
