import {Component} from '@angular/core';
import {OnInit} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CloudCmsService} from './cloudcms.service';
import {Node} from './cloudcms.service';
import '../styles.css';

@Component({
    selector: 'my-app',
    template: require('./app.component.html'),
    directives: [ROUTER_DIRECTIVES],
    precompile: [HomeComponent, AboutComponent],
    providers: [CloudCmsService]
})

export class AppComponent implements OnInit {
    
    nodes: Array<any>;

    constructor(private cloudCmsService: CloudCmsService) {
    }
    
    getNodes() {
        this.cloudCmsService.queryNodes(null).then(function(nodes){
            this.nodes = nodes;
        });
    }

    ngOnInit() {
        this.getNodes();
        // console.log("nodes " + JSON.stringify(this.nodes[0]));
    }
}
