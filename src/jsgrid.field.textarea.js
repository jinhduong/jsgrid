(function(jsGrid, $, undefined) {

    var TextField = jsGrid.TextField;

    function TextAreaField(name, config) {
        TextField.call(this, name, config);
    }

    TextAreaField.prototype = new TextField("", {
        
        insertTemplate: function() {
            var result = this.insertControl = this._createTextArea();
            return result;
        },

        editTemplate: function(value) {
            var result = this.editControl = this._createTextArea();
            result.val(value);
            return result;
        },

        _createTextArea: function() {
            return $("<textarea />");
        }
    });

    jsGrid.TextAreaField = TextAreaField;
    
}(jsGrid, jQuery));