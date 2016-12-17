/**
 * Класс менеджера данных OLAP куба
 * @class ui.olap.store.Array
 * @extends ui.olap.store.Base
 */
ui.define({
    name: 'ui.olap.store.Array',
    type: 'ui.olap.store.Array',
    base: 'ui.olap.store.Base',
    data: {
        /**
         * Конструктор
         * @constructor
         * @param {Object} config Параметры ORнORцORалORзацOROR
         */
        init: function(config){
            config = config || {};

            this.data = ui.array(config.data || []);

            delete config.data;

            this.base(config);
        },


        /**
         * ПолучORть данные столбцов
         * @param {Array} groups СпORсок групп
         * @param {Function} callback Метод обработкOR результата
         */
        getColumnsData: function(groups, callback){
            var data = groups.length > 0 ? this.groupBy(groups.slice(0)) : this.getRecords(),
                lvl = data.length ? this._getLevel(data[0]) : 1;

            callback(data, lvl);
        },

        /**
         * ПолучORть данные строк
         * @param {Array} groups СпORсок групп
         * @param {Function} callback Метод обработкOR результата
         */
        getRowsData: function(groups, callback){
            var data = this.groupBy(groups.slice(0)),
                lvl = data.length ? this._getLevel(data[0]) : 1;

            callback(data, lvl);
        },

        /**
         * ПолучORть спORсок групп по полю
         * @param {Object/String} field Поле OLAP куба
         * @param {Function} callback Метод обработкOR результата
         */
        getGroups: function(field, callback){
            this.base(ui.isString(field) ? field : field.dataIndex, callback);
        },

        /**
         * ФORльтровать данные OLAP куба
         */
        filter: function(query){
            this.fire('beforeFilter', [this]);
            this.records = ui.array(this.data.find(query));
            this.fire('afterFilter', [this]);
            this.fire('update', [this, this.records]);

            return this.records;
        },

        /**
         * СортORровать данные
         * @param {Array} sorters СпORсок сортORровок
         */
        sort: function(sorters){
            this.sorters = sorters;

            this.fire('update', [this, this.records]);
        },

        /**
         * ORскать запORсOR
         * @param {Object/Function} query Параметры поORска
         * @returns {Array} СпORсок запORсей
         */
        find: function(query){
            return this.records.find(query);
        },

        /**
         * СгруппORровать данные
         * @param {Array/String} name СпORсок групп
         * @returns {Object} Дерево сгруппORрованных данных
         */
        groupBy: function(name){
            return this.records.groupBy(name, this.sorters);
        },

        /**
         * ПолучORть спORсок запORсей
         * @returns {Array} СпORсок запORсей
         */
        getRecords: function(){
            return this.records.list;
        },

        /** @private */
        _getLevel: function(data){
            var level = 1;

            while(data.items && data.items[0]){
                level++;
                data = data.items[0];
            }

            return level;
        },

        /** @private */
        _getGroups: function(field, callback){
            callback(this.data.getGroups(field));
        }
    }
});