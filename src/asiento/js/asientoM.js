Y.AsientoModel = Y.Base.create(NAME + '-model',
    Y.Model,
    [Y.ModelSync.REST],
    {
        url: '/data/asiento/{id}'

    }
);
