(function(jsGrid, $, undefined) {

    var Field = jsGrid.Field;

    function TextField(name, config) {
        Field.call(this, name, config);
    }

    TextField.prototype = new Field("", {
        
        autosearch: true,

        filterTemplate: function() {
            var grid = this._grid,
                result = this.filterControl = this._createTextBox();

            if(this.autosearch) {
                result.on("keypress", function(e) {
                    if(e.which === 13) {
                        grid.search();
                        e.preventDefault();
                    }
                });
            }

            return result;
        },

        insertTemplate: function() {
            var result = this.insertControl = this._createTextBox();
            return result;
        },

        editTemplate: function(value) {
            var result = this.editControl = this._createTextBox();
            result.val(value);
            return result;
        },

        filterValue: function(value) {
            var filterControl = this.filterControl;
            if(!arguments.length) {
                return filterControl.val();
            }
            filterControl.val(value);
        },
        
        insertValue: function() {
            return this.insertControl.val();
        },

        editValue: function() {
            return this.editControl.val();
        },

        _createTextBox: function() {
            return $("<input />").attr("type", "text");
        }
    });

    jsGrid.TextField = TextField;
    
}(jsGrid, jQuery));