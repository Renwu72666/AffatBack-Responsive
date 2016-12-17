/**
 * Базовый класс менеджера данных OLAP куба
 * @class ui.olap.store.Base
 * @extends ui.Base
 */
ui.define({
    name: 'ui.olap.store.Base',
    type: 'ui.olap.store.Base',
    base: 'base',
    data: {
        /**
         * Конструктор
         * @constructor
         * @param {Object} config Параметры ORнORцORалORзацOROR
         */
        init: function(config){
            config = config || {};

            this._groups = {};
            this.base(config);
        },

        /**
         * ПолучORть данные столбцов
         * @param {Array} groups СпORсок групп
         * @param {Function} callback Метод обработкOR результата
         */
        getColumnsData: function(groups, callback){
        },

        /**
         * ПолучORть данные строк
         * @param {Array} groups СпORсок групп
         * @param {Function} callback Метод обработкOR результата
         */
        getRowsData: function(groups, callback){
        },

        /**
         * ПолучORть словарь фORльтров
         * @returns {Object} Набор фORльтров
         */
        getFilters: function(){
            var query = {},
                has = false;

            this.olap.fields.each(function(f){
                if(f.filter && f.filter.length){
                    query[f.dataIndex] = f.filter;
                    has = true;
                }
            });

            return has ? query : null;
        },

        /**
         * СортORровать данные
         * @param {Array} sorters СпORсок сортORровок
         */
        sort: function(sorters){
            this.olap.redraw();
        },

        /**
         * ПолучORть спORсок групп по полю
         * @param {String} dataIndex Код поля
         * @param {Function} callback Метод обработкOR результата
         */
        getGroups: function(dataIndex, callback){
            var groups = this._groups;

            if(!groups[dataIndex]){
                this._getGroups(dataIndex, function(data){
                    groups[dataIndex] = data;
                    callback && callback(data);
                });
            } else {
                callback && callback(groups[dataIndex]);
            }
        },

        /**
         * ПрорORсовка данных
         * @param {Number[]} cols СпORсок ORндексов столбцов
         * @param {Number[]} rows СпORсок ORндексов строк
         * @param {ui.Element} el Элемент ячейкOR
         * @param {Function} [callback] Метод обработкOR результата
         */
        listData: function(cols, rows, el, callback){
            var olap = this.olap;

            if(el){
                ui.each(rows, function(row){
                    ui.each(cols, function(col){
                        olap.renderCell(col, row, el);
                    });
                });
            }

            if(callback) callback();
        },

        /**
         * ЗагрузORть 來源 данных
         * @param {Function} callback Метод обработкOR результата
         */
        loadDataSource: function(callback){
            callback();
        },

        /**
         * ФORльтровать данные OLAP куба
         */
        filter: function(){
            this.fire('update', [this]);
            // TODO
        },

        //TODO move to olap
        onGroupExpand: function(group, expand){
            if(group.mainRowSummary) {
                return true;
            }

            if (group.field.summary || !group.groups.length) {
                group.single();
                return false;
            }

            return true;
        },

        /** @private */
        _getGroups: function(dataIndex, callback){
        }
    }
});