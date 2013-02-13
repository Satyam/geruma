Y.Tabs = Y.Base.create(
    'tabview',
    Y.TabView,
    [],{
        initializer: function () {
            this.newPanel();
            this.after('selectionChange', this._afterSelectionChange);
        },
        getActive: function () {
            return this._selected;

        },
        setLabel: function (label) {
            this._selected.set('label', label);
        },
        getPanel: function () {
            return this._selected.get('panelNode');
        },
        newPanel: function () {
            this.add({label: 'new', content:''});
            this.selectChild(this.size() -1);

        },
        addDestroyable: function () {
            var dl = this._selected._destroyList;
            if (dl === undefined) {
                dl = this._selected._destroyList = [];
            }
            Array.prototype.push.apply(dl, arguments);
        },
        _afterSelectionChange: function (ev) {
            this._selected = ev.newVal;
        },
        setURL: function (url) {
            this._selected.url = url;
        },
        hasURL: function (url) {
            return this.some(function (tab, i) {
                if (tab.url === url) {
                    this.selectChild(i);
                    return true;
                }
            }, this);
        },
        destroyContent: function () {
            Y.Array.each(this._selected._destroyList, function (item) {
                if (item.destroy) {
                    item.destroy();
                }
            });
            this._selected._destroyList = [];
        }
    }
);