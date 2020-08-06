var Bicicleta = require('../../models/bicicleta');
var mongoose= require('mongoose');


describe('Testing Bicicletas', function(){
    beforeEach(function(done){
        var mongoDB= 'mongodb://localhost/testbd';
        mongoose.connect(mongoDB, { useNewUrlParser:true});

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

    describe('Bicicleta.createInstance', ()=>{
        it('crea una instancia de bicicleta', ()=>{
            var bici= Bicicleta.createInstance(1, "verde", "urbana", [-34,-54]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toEqual(-34);
            expect(bici.ubicacion[1]).toEqual(-54);
        });
    });

    describe('Bicicleta.allBici',()=>{
        it('comienza vacia',(done)=>{
            Bicicleta.allBicis(function(err, bicis){
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });
    describe('Bicicleta.add', () => {
        it('Agrega una sola bicicleta', (done) => {
            
            const aBici = new Bicicleta({code:1, color:"verde", modelo:"urbana"});
        
            //console.log(aBici);

            Bicicleta.add(aBici, function( err, newBici) {
                if (err) console.log(err);
                Bicicleta.find(function( err, bicis ) { 
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                });
            });
        });
    });

    describe('Bicicleta.findByCode', () => {
        it('debe devolver la bici con code 1', (done) => {
            Bicicleta.allBicis(function(err,bicis){
                expect(bicis.length).toBe(0);
                var aBici = new Bicicleta({code:1, color:"verde", modelo:"urbana"});
                
                Bicicleta.add(aBici, function ( err, newBici) {
                    if (err) console.log(err);

                    var aBici2 = new Bicicleta({code:2, color:"roja", modelo:"urbana"});
                    Bicicleta.add(aBici2,function(err, newBici){
                        if(err) console.log(err);
                        Bicicleta.findByCode(1,function( err, targetBici ) { 

                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            
                            done();
                        });
                    });
                });
            });
        });
    });
});


/*
beforeEach(()=>{ Bicicleta.allBicis= [];});
beforeEach(()=>{ console.log("testeando...");});

describe('Bicicleta.allBicis', ()=>{
    it("comeinza vacia", ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
    })
});
describe('Bicicleta.add', ()=>{
    it("agregamos una", ()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
        var a= new Bicicleta(1,'rojo','urbana',[-12.1247789,-77.0342339]);
        Bicicleta.add(a);

        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});
describe('Bicicleta.findById', ()=>{
    it("debe devolver la bici con el id 1",()=>{
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici= new Bicicleta(1,'rojo','urbana')
        var aBici2= new Bicicleta(2,'negra','deportiva')
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        var targetBici= Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);

    });

});
*/