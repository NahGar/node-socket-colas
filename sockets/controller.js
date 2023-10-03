const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = ( socket ) => {
    
    //socket.on('disconnect', () => {    });

    //cuando un cliente se conecta
    socket.emit('ultimo-ticket', ticketControl.ultimo );
    socket.emit('estado-actual', ticketControl.ultimos4 );
    socket.emit('tickets-pendientes', ticketControl.tickets.length );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();

        //para las terminales restantes
        socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length );
        
        callback( siguiente );

    });

    socket.on('atender-ticket', ( payload, callback ) => {
        
        const { escritorio } = payload;

        if(!escritorio) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atender( escritorio );

        if(!ticket) {
            return callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }
        else {
            socket.broadcast.emit('estado-actual', ticketControl.ultimos4 );
            //para la terminal que está atendiendo
            socket.emit('tickets-pendientes', ticketControl.tickets.length );
            //para las terminales restantes
            socket.broadcast.emit('tickets-pendientes', ticketControl.tickets.length );
            callback({ 
                ok: true,
                ticket
            });
        }
        
    });

}


module.exports = {
    socketController
}

