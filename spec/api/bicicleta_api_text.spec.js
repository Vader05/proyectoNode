var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var server= require('../../bin/www');
var request = require('request');

var base_url= "http://localhost:5000/api/bicicletas";

describe("Bicicleta API", ()=>{
    beforeEach(function(done){
        var mongoDB= 'mongodb://localhost/testbd';
        mongoose.connect(mongoDB, { useNewUrlParser:true, useUnifiedTopology: true});

        const db= mongoose.connection;
        db.on('error', console.error.bind(console, "conection error"));
        db.once('open', function(){
            console.log("we are conected to test database! ");
            done();
        });
    });
    afterEach(function(done){
        Bicicleta.deleteMany({}, function(err, success){
            if(err) console.log(err);
            done();
        });
    });

    describe("GET BICICLETAS /", ()=>{
        it("status 200", (done)=>{
            request.get(base_url,function(err, response, body){
                //var result = JSON.parse(body);
                expect(response.statusCode).toBe(200);
                //expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    });

    describe("POST BICICLETAS /create",()=>{
        it("status 200", function(done){
            var headers= {'content-type': 'application/json'};
            var aBici= {"code":10,"color":"rojo","modelo":"urbana","lat":-132,"long":-77};
            request.post({
                headers: headers,
                url: base_url+'/create',
                body: aBici
            }, function(error, response, body){
                expect(response.statusCode).toBe(200);
                var bici= JSON.parse(body).bicicleta;
                console.log(bici);
                expect(bici.color).toBe("roja");
                expect(bici.ubicacion[0]).toBe(-132);
                expect(bici.ubicacion[1]).toBe(-77);
                done();
            });
        });
    });
});









    /*
    describe("DELETE BICICLETAS /delete ", function(){
        it("status 200", (done)=>{
            var a= Bicicleta.createInstance(1, "verde", "urbana", [-34,-54]);
            Bicicleta.add(a, function(err, newBici){


            })
            
        })
    })

*/




/*
describe('Bicicleta Api', ()=>{
    describe('GET BICICLETAS /',()=>{
        it("status 200", ()=>{
            expect(Bicicleta.allBicis.length).toBe(0);
            var a= new Bicicleta(1,'rojo','urbana',[-12.1247789,-77.0342339]);
            Bicicleta.add(a);
            request.get('http://localhost:4000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST BICICLETAS /create',() => {
        it("status 200", (done)=>{
            var headers= {'content-type': 'application/json'};
            var aBici= {"id2":10,"color":"rojo","modelo":"urbana","lat":-132,"long":-77};
            request.post({ 
                headers:headers,
                url:    'http://localhost:4000/api/bicicletas/create',
                body:   aBici
            },function(error, response, body) {
                expect(Bicicleta.findById(10).color).toBe('rojo');
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });
});

*/