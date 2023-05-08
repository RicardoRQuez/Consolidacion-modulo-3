import { v4 as uuidv4 } from "https://jspm.dev/uuid";

class Finanzas {
    constructor() {
        this.presupuesto = 0;
        this.gastos = [];
        this.obtenerSaldo = function () {
            return this.presupuesto - this.totalGastos();
        };
        this.totalGastos = function () {
/*             console.log("ALGO");
 */            let totalGastos = 0;
            this.gastos.forEach((gasto) => { 
                totalGastos += gasto.monto;
            });

            return totalGastos;
        };

        this.agregarGasto = function (gasto) {
            if (this.presupuesto - gasto.monto < 0) {
                alert("Usted no tiene presupuesto para comprar: " + gasto.glosa);
            } else {
                this.gastos.push(gasto);
            }
        };

        this.agregarPresupuesto = function (monto) {
            this.presupuesto += monto;
        };

        this.eliminarGasto = function (id) {
            console.log("A BORRAR", id);

            let nuevoGastos = [];

            this.gastos.forEach((elemnet) => {

                if (elemnet.id !== id) {
                    nuevoGastos.push(elemnet);
                }

            });

            this.gastos = nuevoGastos;

            console.log(this.gastos);
        };

    }
}


class Gasto {
    constructor(glosa, monto) {
        this.id = uuidv4().slice(0, 6);
        this.glosa = glosa;
        this.monto = monto;
    }
}

let misFinanzas = new Finanzas();

let formGasto = document.getElementById("formGasto");
formGasto.addEventListener("submit", function (event) {
    event.preventDefault();
    let glosa = nombreGasto.value;
    let monto = parseFloat(cantidadGasto.value);
    let nuevoGasto = new Gasto(glosa, monto);
    misFinanzas.agregarGasto(nuevoGasto);
    formGasto.reset();
    actualizarVista();
});

let formDataUsuario = document.getElementById("formDataUsuario");

formDataUsuario.addEventListener("submit", function (event) {
    event.preventDefault();
    let presupuesto = parseInt(
        document.querySelector("#presupuestoInicial").value
    );
    misFinanzas.agregarPresupuesto(presupuesto);
    formDataUsuario.reset();
    actualizarVista();
});

const actualizarVista = () => {
    let presupuesto = document.querySelector("#presupuesto");
    let gastos = document.querySelector("#gastos");
    let saldo = document.querySelector("#saldo");
    presupuesto.innerText = misFinanzas.presupuesto;
    gastos.innerText = misFinanzas.totalGastos();
    saldo.innerText = misFinanzas.obtenerSaldo();

    let cuerpoTablaGastos = document.getElementById("cuerpoTablaGastos");

    cuerpoTablaGastos.innerHTML = "";

    let filas = "";
    misFinanzas.gastos.forEach((gasto1, index) => {

        filas += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${gasto1.glosa}</td>
                <td>${gasto1.monto}</td>
                <td><button class="btn btn-danger" data-id="${gasto1.id}" 
                onclick="eliminarGastoGeneral('${gasto1.id}')">Eliminar</button></td>
               
            </tr> 
        `;
    });
    cuerpoTablaGastos.innerHTML = filas;
};

window.eliminarGastoGeneral = function (id) {

    misFinanzas.eliminarGasto(id)

    actualizarVista()
};
