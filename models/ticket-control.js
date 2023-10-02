const path = require('path');
const fs = require('fs');

class Ticket {

    constructor( numero, escritorio ) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}


class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        this.init();
    }

    get ToJson() {
        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }
    }

    init() {
        const { hoy, tickets, ultimo, ultimos4 } = require('../db/data.json');
        if( hoy === this.hoy ) {
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }
        else {
            //es otro dia
            this.guardarDB();
        }
    }

    guardarDB() {
        const dbPath = path.join( __dirname, '../db/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.ToJson ) );
    }

    siguiente() {
        this.ultimo += 1;
        this.tickets.push( new Ticket(this.ultimo, null) );
        this.guardarDB();
        return this.ultimo;
    }

    atender( escritorio ) {

        //No tenemos tickets
        if( this.tickets.length === 0 ) {
            return null;
        }

        //elimina el primer item y lo regresa
        const ticket = this.tickets.shift();

        ticket.escritorio = escritorio;

        //agrega item al inicio
        this.ultimos4.unshift( ticket );
        if( this.ultimos4.length > 4 )  {
            this.ultimos4.splice(-1,1); //elimina el último
        }

        this.guardarDB();

        return ticket;
    }
}

module.exports = TicketControl;