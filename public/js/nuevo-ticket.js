//Referencias HTML
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnGenerarTicket = document.querySelector("#btnGenerarTicket");

const socket = io();

socket.on('connect', () => {

    btnGenerarTicket.disabled = false;
});

socket.on('ultimo-ticket', ( ultimoTicket ) => {
    lblNuevoTicket.innerText = 'Ticket: ' + ultimoTicket;
});

socket.on('disconnect', () => {
    
    btnGenerarTicket.disabled = true;
});


btnGenerarTicket.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = 'Ticket: ' + ticket;
    });

});