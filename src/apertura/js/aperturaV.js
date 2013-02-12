Y.AperturaView = Y.Base.create(NAME + '-view',
    Y.ZeView,
    [] ,
    {
        template: '<label>Asiento</label><div class="asiento">{IdAsiento}</div>'
            + '<label>Usuario</label><div class="usuario">{Nombre}</div>'
            + '<label>Importe</label><div class="importe">{efvoApertura}</div>'
            + '<label>Cerrado en: </label><div class="cerrado">{cerradaEn}</div>',
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
            Y.router.save('/newTab/asiento/' + parseInt(ev.currentTarget.getHTML(),10));
            // new Y.PopupAsiento({id:parseInt(ev.currentTarget.getHTML(),10)}).render();
        },
        onCerradoClick: function (ev) {
            console.log('asiento cierre click', ev.currentTarget.getHTML());
            new Y.PopupAsiento({id:parseInt(ev.currentTarget.getHTML(),10)}).render();
        }
    }
);
