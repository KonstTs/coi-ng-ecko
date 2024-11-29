import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `
    <section>
        <h1>{{title}}</h1>
    </section>
  `,
  styles: [

  ]
})
export class PfAboutComponent {
  title = 'README.md';
}
