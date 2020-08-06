var mongoose= require('mongoose');
var schema=mongoose.schema;

var bicicletaSchema= new mongoose.Schema({
    code: Number,
    color : String,
    modelo: String,
    ubicacion: {
        type: [Number], index: {type: '2dsphere', sparse: true}
    }
});

bicicletaSchema.statics.createInstance= function(code, color , modelo, ubicacion){
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
}

bicicletaSchema.methods.toString= function(){
    return 'code: '+this.code+'| color: '+this.color
}
bicicletaSchema.statics.allBicis= function(cb){
    return this.find({}, cb);
}

bicicletaSchema.statics.add = function(aBici,cb){
    this.create(aBici,cb);
}

bicicletaSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({ code:aCode }, cb);
};

bicicletaSchema.statics.updateOne = function(aBici, cb){    
    this.update({code:aBici.code}, {$set: aBici}, cb);
};

bicicletaSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({ code:aCode }, cb);
};

module.exports = mongoose.model('Bicicleta', bicicletaSchema);

 /*
var bicicleta = function(id, color, modelo, ubicacion){
    this.id=id;
    this.color=color;
    this.modelo=modelo;
    this.ubicacion=ubicacion;
}

bicicleta.prototype.toString= function(){
    return 'id: '+this.id + "| color: " +this.color;
}

bicicleta.allBicis=[];
bicicleta.add=function(aBici){
    bicicleta.allBicis.push(aBici);
}

bicicleta.findById= function(aBiciId){
    var aBici=bicicleta.allBicis.find(x=> x.id==aBiciId);
    if(aBici)
        return aBici;
    else
        return (`no existe la bicicleta con el ${aBiciId}`);
}
bicicleta.removeById= function(aBiciId){
    for(var i=0;i<bicicleta.allBicis.length;i++){
        if (bicicleta.allBicis[i].id==aBiciId){
            bicicleta.allBicis.splice(i,1);
            break;
        }
    }
}


var a= new bicicleta(1,'rojo','urbana',[-12.1247789,-77.0342339]);
var b= new bicicleta(2,'blanca','urbana',[-12.1242487,-77.0344748]);
var c= new bicicleta(3,'verde','urbana',[-12.1276181,-77.0354018]);

bicicleta.add(a);
bicicleta.add(b);
bicicleta.add(c);
*/
//module.exports = bicicleta;
 