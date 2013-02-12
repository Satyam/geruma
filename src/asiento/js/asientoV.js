Y.AsientoView = Y.Base.create(NAME + '-view',
    Y.ZeView,
    [] ,
    {

        template: '<label>Asiento</label><div class="asiento">{IdAsiento}</div>'
            + '<label>Usuario</label><div class="usuario">{Nombre}</div>'
            + '<label>Importe</label><div class="importe">{importe}</div>'
            + '<label>Cerrado en: </label><div class="cerrado"> {asientoCierre}</div>',
        events: {
            '.asiento': {
                click: 'onAsientoClick'
            },
            '.cerrado': {
                click: 'onCerradoClick'
            }
        }
    }
);
