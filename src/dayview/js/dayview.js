Y.DayView = Y.Base.create(NAME, Y.ZeView, [] ,{
    _refresh: function () {
        this.acc = new Y.Accordion({children:[
            {label: 'Apertura de Caja', content: '<div class="apertura">aaaa</div>', expanded:true},
            {label: 'Gastos', content: '<div class="gastos">ggg</div>', expanded:true}
        ]}).render(this.get('contentBox'));
    }

});
