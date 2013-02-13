Y.AsientoView = Y.Base.create(NAME + '-view',
    Y.ZeView,
    [] ,
    {

        template: '<label>Asiento</label><div class="asiento">{IdAsiento}</div>'
            + '<label>Fecha</label><div class="fecha">{Fecha}</div>'
            + '<label>Usuario</label><div class="usuario">{Nombre}</div>'
            + '<label>Descripción</label><div class="descr">{Descr}</div>'
            + '<label>Auto-asiento</label><div class="descr"> {aa}</div>',
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
