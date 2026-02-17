import { Component, signal } from '@angular/core';
import { Header } from "./layout/header/header";


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [Header]
})
export class App {
  protected readonly title = signal('Fellows');
}
