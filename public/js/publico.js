//Referencias HTML
const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');

const socket = io();

socket.on('estado-actual', ( payload ) => {
    //Fernando
    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    if( ticket1 ) {
        lblTicket1.innerText = 'Ticket ' + ticket1.numero;
        lblEscritorio1.innerText = ticket1.escritorio;
    }

    if( ticket2 ) {
        lblTicket2.innerText = 'Ticket ' + ticket2.numero;
        lblEscritorio2.innerText = ticket2.escritorio;
    }
    if( ticket3 ) {
        lblTicket3.innerText = 'Ticket ' + ticket3.numero;
        lblEscritorio3.innerText = ticket3.escritorio;
    }
    if( ticket4 ) {
        lblTicket4.innerText = 'Ticket ' + ticket4.numero;
        lblEscritorio4.innerText = ticket4.escritorio;
    }
    
/*
    if( payload[0] ) {
        lblTicket1.innerText = 'Ticket: ' + payload[0].numero;
        lblEscritorio1.innerText = payload[0].escritorio;
    }
    if( payload[1] ) {
        lblTicket2.innerText = 'Ticket: ' + payload[1].numero;
        lblEscritorio2.innerText = payload[1].escritorio;
    }
    if( payload[2] ) {
        lblTicket3.innerText = 'Ticket: ' + payload[2].numero;
        lblEscritorio3.innerText = payload[2].escritorio;
    }
    if( payload[3] ) {
        lblTicket4.innerText = 'Ticket: ' + payload[3].numero;
        lblEscritorio4.innerText = payload[3].escritorio;
    }
    */
});

