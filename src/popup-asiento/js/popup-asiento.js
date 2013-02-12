Y.PopupAsiento = Y.Base.create(NAME,
    Y.ZeView,
    [] ,
    {
        template: '<div class="header"></div><div class="asiento"></div>',
        initializer: function (config) {
            this.model = new Y.AsientoModel(config);
            this.view = new Y.AsientoView({model:this.model});
        },
        _refresh: function () {
            var self = this,
                cbx = self._contentBox;
                
            cbx.append(self.template);
            self.model.load(function (err) {
                if (err) throw err;
                self.view.render(cbx.one('.asiento'));

            });
            Y.one('body').append(cbx);
        }
    }
);