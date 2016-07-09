import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';

import '../styles.css';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    directives: [ROUTER_DIRECTIVES],
    precompile: [HomeComponent, AboutComponent]
})

export class AppComponent {
}
