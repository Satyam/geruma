Y.DayView = Y.Base.create(NAME,
    Y.ZeView,
    [] ,
    {
        _refresh: function () {
            var self = this,
                aperturaM,
                aperturaV;
            this.acc = new Y.Accordion({children:[
                {label: 'Apertura de Caja', content: 'aaaa', expanded:true},
                {label: 'Gastos', content: 'ggg'}
            ]}).render(this.get('contentBox'));
            aperturaM = new Y.AperturaModel().load({
                fecha: new Date(2013, 1, 8)
            }, function (err) {
                if (err  && err.code !== 404) {
                    throw err;
                }
                aperturaV = new Y.AperturaView({
                    model: aperturaM
                });
                aperturaV.render(self.getBody(0));
            });
        },
        getBody: function(index) {
            return this.acc.item(index).getBody();
        }

    }
);
