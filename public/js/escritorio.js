//Referencias HTML
const lblEscritorio = document.querySelector('#lblEscritorio');
const btnAtender = document.querySelector('#btnAtender');
const lblTicket = document.querySelector('#lblTicket');
const divAlerta = document.querySelector('#divAlerta');
const lblPendientes = document.querySelector('#lblPendientes');

const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ) {
    window.location = "index.html";
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {

    btnAtender.disabled = false;
});

socket.on( 'ultimo-ticket', ( ultimoTicket ) => {
    //lblNuevoTicket.innerText = 'Ticket: ' + ultimoTicket;
});

socket.on('disconnect', () => {
    
    btnAtender.disabled = true;
});

socket.on('nuevos-en-cola', ( cantTickets ) => {
        
});

btnAtender.addEventListener( 'click', () => {

    socket.emit( 'atender-ticket', { escritorio }, ( payload ) => {
    
        if( !payload.ok ) {
            divAlerta.innerText = payload.msg;
            divAlerta.style.display = '';
            lblTicket.innerText = 'Nadie';
        }
        else {
            const {ticket} = payload;
            lblTicket.innerText = 'Ticket: ' + ticket.numero;
        }
        
    }); 

});