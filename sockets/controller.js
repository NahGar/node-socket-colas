const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    socket.on('disconnect', () => {

    });

    socket.emit( 'ultimo-ticket', ticketControl.ultimo );
    socket.emit( 'estado-actual', ticketControl.ultimos4 );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );

        //TODO: Notificar que hay un nuevo ticket pendiente de asignar
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
            socket.broadcast.emit( 'estado-actual', ticketControl.ultimos4 );
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

