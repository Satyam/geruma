Y.AperturaView = Y.Base.create(NAME + '-view',
    Y.ZeView,
    [] ,
    {
        template: '<label>Asiento</label><div class="asiento">{IdAsiento}</div>'
            + '<label>Usuario</label><div class="usuario">{Nombre}</div>'
            + '<label>Importe</label><div class="importe">{importe}</div>'
            + '<label>Cerrado en: </label><div class="cerrado">{asientoCierre}</div>',
        events: {
            '.asiento': {
                click: 'onAsientoClick'
            },
            '.cerrado': {
                click: 'onCerradoClick'
            }
        },
        onAsientoClick: function (ev) {
            console.log('asiento click', ev.currentTarget.getHTML());
            new Y.PopupAsiento(parseInt(ev.currentTarget.getHTML(),10))
        },
        onCerradoClick: function (ev) {
            new Y.PopupAsiento(parseInt(ev.currentTarget.getHTML(),10))
        }
    }
);
