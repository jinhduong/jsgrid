(function(jsGrid, $, undefined) {

    var Field = jsGrid.Field;

    function ControlField(config) {
        Field.call(this, "", config);
    }

    ControlField.prototype = new Field("", {       
        css: "jsgrid-control-field",
        align: "center",
        width: 50,
        filtering: false,
		inserting: false,
        editing: false,
        sorting: false,

        searchModeButtonClass: "jsgrid-button jsgrid-mode-button jsgrid-search-mode-button",
        insertModeButtonClass: "jsgrid-button jsgrid-mode-button jsgrid-insert-mode-button",
        editButtonClass: "jsgrid-button jsgrid-edit-button",
        deleteButtonClass: "jsgrid-button jsgrid-delete-button",
        searchButtonClass: "jsgrid-button jsgrid-search-button",
        clearFilterButtonClass: "jsgrid-button jsgrid-clear-filter-button",
        insertButtonClass: "jsgrid-button jsgrid-insert-button",
        updateButtonClass: "jsgrid-button jsgrid-update-button",
        cancelEditButtonClass: "jsgrid-button jsgrid-cancel-edit-button",

        searchModeButtonTitle: "Switch to searching",
        insertModeButtonTitle: "Switch to inserting",
        editButtonTitle: "Edit",
        deleteButtonTitle: "Delete",
        searchButtonTitle: "Search",
        clearFilterButtonTitle: "Clear filter",
        insertButtonTitle: "Insert",
        updateButtonTitle: "Update",
        cancelEditButtonTitle: "Cancel edit",

        editButton: true,
        deleteButton: true,
        clearFilterButton: true,
        modeSwitchButton: true,

        headerTemplate: function() {
            if(!this.modeSwitchButton) {
                return "";
            }

            var grid = this._grid,
                $searchMode,
                $insertMode,
                result;

            $searchMode = $("<input>", {
                addClass: this.searchModeButtonClass,
                attr: {
                    type: "button",
                    title: this.searchModeButtonTitle
                },
                on: {
                    click: function() {
                        grid.option("inserting", false);
                        grid.option("filtering", true);
                        $insertMode.show();
                        $searchMode.hide();
                    }
                },
                toggle: grid.inserting
            });
            
            $insertMode = $("<input>", {
                addClass: this.insertModeButtonClass,
                attr: {
                    type: "button",
                    title: this.insertModeButtonTitle
                },
                on: {
                    click: function() {
                        grid.option("filtering", false);
                        grid.option("inserting", true);
                        $searchMode.show();
                        $insertMode.hide();
                    }
                },
                toggle: !grid.inserting && grid.filtering
            });

            result = $searchMode.add($insertMode);

            return result;
        },

        itemTemplate: function(value, item) {
            var grid = this._grid,
                result = $([]);

            if(this.editButton) {
                result = result.add($("<input>", {
                    addClass: this.editButtonClass,
                    attr: {
                        type: "button",
                        title: this.editButtonTitle
                    },
                    on: {
                        click: function(e) {
                            grid.editItem(item);
                            e.stopPropagation();
                        }
                    }
                }));
            }

            if(this.deleteButton) {
                result = result.add($("<input>", {
                    addClass: this.deleteButtonClass,
                    attr: {
                        type: "button",
                        title: this.deleteButtonTitle
                    },
                    on: {
                        click: function(e) {
                            grid.deleteItem(item);
                            e.stopPropagation();
                        }
                    }
                }));
            }

            return result;
        },

        filterTemplate: function() {
            var grid = this._grid,
                result;

            result = $("<input>", {
                addClass: this.searchButtonClass,
                attr: {
                    type: "button",
                    title: this.searchButtonTitle
                },
                on: {
                    click: function() {
                        grid.search();
                    }
                }
            });

            if(this.clearFilterButton) {
                result = result.add($("<input>", {
                    addClass: this.clearFilterButtonClass,
                    attr: {
                        type: "button",
                        title: this.clearFilterButtonTitle
                    },
                    on: {
                        click: function() {
                            grid.clearFilter();
                            grid.search();
                        }
                    }
                }));
            }

            return result;
        },

        insertTemplate: function() {
            var grid = this._grid,
                result;

            result = $("<input>", {
                addClass: this.insertButtonClass,
                attr: {
                    type: "button",
                    title: this.insertButtonTitle
                },
                on: {
                    click: function() {
                        grid.insertItem();
                        grid.clearInsert();
                    }
                }
            });

            return result;
        },

        editTemplate: function(value, item) {
            var grid = this._grid,
                result;

            result = $("<input>", {
                addClass: this.updateButtonClass,
                attr: {
                    type: "button",
                    title: this.updateButtonTitle
                },
                on: {
                    click: function(e) {
                        grid.updateItem();
                        e.stopPropagation();
                    }
                }
            });

            result = result.add($("<input>", {
                addClass: this.cancelEditButtonClass,
                attr: {
                    type: "button",
                    title: this.cancelEditButtonTitle
                },
                on: {
                    click: function(e) {
                        grid.cancelEdit();
                        e.stopPropagation();
                    }
                }
            }));

            return result;
        }
    });

    jsGrid.ControlField = ControlField;
    
}(jsGrid, jQuery));