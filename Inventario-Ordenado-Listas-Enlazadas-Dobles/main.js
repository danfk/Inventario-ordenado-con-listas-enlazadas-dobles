class Producto {
    constructor(codigo, nombre, cantidad, costo){
        this.codigo = codigo;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.costo = costo;
        this.next = null;
        this.last = null;
    }

    info(){
        return this.codigo + " " + this.nombre + " " + this.cantidad + " " + " $" + this.costo;
    }
}

class Inventario {
    constructor(){
        this.primero = null;
        this.ultimo = null;
    }

    agregar(nuevo){
        let long = 0;
        let temp = this.primero;
        while (temp.next!=null){
            long++;
            temp=temp.next;
        }
        if(!this.primero){
            this.primero = nuevo;
        } else {
            while (this.primero.next!=null){
                this.primero = this.primero.next;
            }
            this.primero = nuevo;
        }
        let aux = long;
        let temporal = this.primero;
        for (let i=0; i < aux; i++){
            for (let j=0; j < aux; j++){
                if(j+1 !== aux){
                    if(temporal.codigo > temporal.next.codigo){
                        let add = temporal.next.codigo;
                        temporal.next.codigo = temporal.codigo;
                        temporal.codigo = add;
                    }
                    temporal = temporal.next
                    j++;
                }
            }
            i++
        }
    }

    buscar(codigo){
        let long = 0;
        let temp = this.primero;
        let temporal = this.primero;
        while (temp.next!=null){
            long++;
            temp=temp.next;
        }
        for (let i = 0; i < long; i++){
            if (codigo == temporal.codigo){      
                return temporal;
            } else {
                temporal = temporal.next;
            }
            i++;
        }
        return null;
    }

    listar(){
      let res="";
      let temp=this.primero;
      while(temp!=null){
          res+=temp.numero + "  ";
          temp=temp.next;
      }
      return res;
    }

    lrec(producto){
        if (producto.next == null){
            return producto.info;
        } else {
            return producto.info + this.lrec(producto.next);
        }
    }

    listarInverso(){
        if (this.primero == null){
            return '';
        } else {
            return this.lrec(this.primero);
        }
    }
}

let btnAgregar = document.getElementById("agregar");
let btnBuscar = document.getElementById("buscar");
let btnListar = document.getElementById("listar");
let btnListarInverso = document.getElementById('listarInvesro');

let resultado = document.getElementById("resultado");

btnAgregar.addEventListener('click', agregar);
btnBuscar.addEventListener('click', buscar);
btnListar.addEventListener('click', listar);
btnListarInverso.addEventListener('click', listarInverso);

let i = new Inventario();


function agregar(codigo, nombre, cantidad, costo){
    codigo = parseFloat(document.getElementById("codigo").value);
    nombre = parseFloat(document.getElementById("nombre").value);
    cantidad = parseFloat(document.getElementById("cantidad").value);
    costo = parseFloat(document.getElementById("costo").value);
    let nuevo = new Producto(codigo, nombre, cantidad, costo);
    i.agregar(nuevo);
    resultado.innerHTML = "Se agrego 1 producto al inventario"
}

function buscar(codigo){
    codigo = parseFloat(document.getElementById("codigo").value);
    resultado.innerHTML = i.buscar(codigo);
}

function listar(){
    resultado.innerHTML = i.listar();
}

function listarInverso(){
    resultado.innerHTML = i.listarInverso();
}

module.exports = {agregar, buscar, listar, listarInverso};