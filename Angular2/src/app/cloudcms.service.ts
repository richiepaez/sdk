import { Injectable } from '@angular/core';
var Gitana = require('gitana');
var Chain = Gitana.Chain;

@Injectable()
export class CloudCmsService {

    connection: any;
    gitanaConfig: string;
    branchId: string;

    constructor() {
        this.connection = null;
    }

    getNodes() {
        return new Node();
    }

    getConnection() {
        return new Promise(function(resolve, reject){
            if (this.connection)
            {
                resolve(this.connection);
                return;
            }

            this.connect(this.gitanaConfig, this.branchId).then(function (resultArray: Array<any>) {
                resolve(resultArray[0]);
            }).catch(function(error: any){
                reject(error);
            });
        });
    }

    connect(gitanaConfig: string, branchId: string) {
        this.gitanaConfig = gitanaConfig;
        this.branchId = branchId;

        return new Promise(function(resolve, reject){
            Gitana.connect(gitanaConfig, function(err: string) {
                if (err) {
                    console.log("Failed to connect: " + JSON.stringify(err));
                    reject(err);
                    return;
                }

                this.datastore("content").trap(function(err: string) {
                    console.log("Failed to retrieve datastore: " + JSON.stringify(err));
                    reject(err);
                }).readBranch(branchId || "master").trap(function(err: string) {
                    console.log("Failed to retrieve branch: " + JSON.stringify(err));
                    reject(err);
                }).then(function () {
                    console.log("Connected: " + JSON.stringify(this));
                    this.connection = this;
                    resolve([this.connection]);
                })
            })
        });
    }
    
    getNodesById(iDs: Array<string>) {
        var query = {};

        if (Gitana.isArray(iDs))
        {
            query["_doc"] = {
                "$in": iDs
            }
        }
        else
        {
            query["_doc"] = iDs;
        }

        return new Promise(function(resolve, reject){
            this.queryNodes(query).then(function(resultArray: Array<any>){
                resolve(resultArray);
            });
        });
    }
    
    queryNodes(query: Object) {
        var nodes: Array<any>;
        if (!query) {
            query = {
                "_type": "n:node"
            }
        }

        return new Promise(function(resolve, reject){
            this.getConnection().then(function(connection: any) {
                Chain(connection).trap(function(err: any) {
                    reject(err);
                    return;
                })
                .queryNodes(query, {"limit": 100})
                .each(function(){
                    var node = this;
                    this.enhanceNode(node);
                    console.log("queryNodes result " + JSON.stringify(node));
                    nodes.push( JSON.parse(JSON.stringify(node)));
                }).then(function() {
                    // console.log("queryNodes result " + JSON.stringify(nodes));
                    return resolve(nodes);
                });
            });
        });
    }

    private enhanceNode(node: any) {
        // add in the "attachments" as a top level property
        // if "attachments" already exists, we'll set to "_attachments"
        var attachments = {};
        for (var id in node.getSystemMetadata()["attachments"])
        {
            var attachment = node.getSystemMetadata()["attachments"][id];

            attachments[id] = JSON.parse(JSON.stringify(attachment));
            attachments[id]["url"] = "/static/node/" + node.getId() + "/" + id;
            attachments[id]["preview32"] = "/static/node/" + node.getId() + "/preview32/?attachment=" + id + "&size=32";
            attachments[id]["preview64"] = "/static/node/" + node.getId() + "/preview64/?attachment=" + id + "&size=64";
            attachments[id]["preview128"] = "/static/node/" + node.getId() + "/preview128/?attachment=" + id + "&size=128";
            attachments[id]["preview256/"] = "/static/node/" + node.getId() + "/preview256/?attachment=" + id + "&size=256";
        }

        if (!node.attachments) {
            node.attachments = attachments;
        }
        else if (!node._attachments) {
            node._attachments = attachments;
        }

        // add in the "_system" block as a top level property
        if (node.getSystemMetadata) {
            node._system = node.getSystemMetadata();
        }
    };

}

export class Node {

}
