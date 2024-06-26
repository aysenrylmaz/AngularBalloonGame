import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { IBalloon } from "./balloon.interface";

const colors = ['red', 'blue', 'purple', 'orange'];

export class Balloon implements IBalloon {
    id: string;
    color: string;

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.id = window.crypto.randomUUID();
            this.color = colors[Math.floor(Math.random() * colors.length)];
        } else {
            // Provide a fallback or handle the case where 'window' is not available
            this.id = 'default-id'; // You can change this to some other logic if necessary
            this.color = 'default-color'; // You can change this to some other logic if necessary
        }
    }
}
