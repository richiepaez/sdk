import {CloudCmsService} from './cloudcms.service';

describe('CloudCmsService', () => {

    beforeEach(function() {
        this.cloudCmsService = new CloudCmsService();
    });

    it('should retrieve nodes from Cloud CMS', function() {
        var nodes: Array<any>;

        this.cloudCmsService.queryNodes(null).then(function(nodesArray: any){
            nodes = nodesArray;
            console.log(nodes);
        })

        expect(nodes).toBeTruthy(nodes.length>0);
    });

});