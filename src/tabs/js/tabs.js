Y.Tabs = Y.Base.create(
    'tabview',
    Y.TabView,
    [],{
        _dest: null,
        initializer: function () {
            this.newPanel();
            this.after('selectionChange', this._afterSelectionChange);
            this._dest = [];

        },
        getActive: function () {
            return this._selected;

            /*var tab = this.get('selection');
            if (!tab) {
                console.log('no current tab');
                this.selectChild(0);
                tab = this.get('selection');
            }
            return tab;*/
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
        addDestroyable: function (obj) {
            this._destroy.push(obj);
        },
        _afterSelectionChange: function (ev) {
            this._selected = ev.newVal;
        },
        setURL: function (url) {
            this._selected.url = url;
        },
        hasUrl: function (url) {
            this.each(function (tab, i) {
                if (tab.url === url) {
                    this.selectChild(i);
                    return true;
                }
            });
            return false;
        },
        destroyContent: function () {
            Y.Array.each(this._destroy, function (item) {
                if (item.destroy) {
                    item.destroy();
                }
            });
            this._destroy = [];
        }
    }
);