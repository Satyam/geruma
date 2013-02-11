Y.AperturaModel = Y.Base.create(NAME + '-model',
    Y.Model,
    [Y.ModelSync.REST],
    {
        idAttribute: 'fecha',
        getURL: function (action, options) {
            return '/data/apertura/' + Y.Date.format(options.fecha, {format: '%Y%m%d'})
        }
    }
);
