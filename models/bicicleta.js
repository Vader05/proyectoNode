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

module.exports = bicicleta;