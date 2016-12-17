ui.olap.Types = {
    /** @private */
    _floatSum: function(val, rec, dataIndex){
        var v = parseFloat(rec[dataIndex]);

        if(!isNaN(v)){
            val.value += v;
        }
    },

    /** @private */
    _getFormatCode: function(field){
        return (field.typeConfig && field.typeConfig.formatCode) || ui.olap.Types[field.type].formatCode;
    },

    /**
     * 來源 поля OLAP куба "ORндORкатор"
     *
     *      {
     *          header: 'Progress',
     *          dataIndex: 'code',
     *          area: 'data',
     *          type: 'progress',
     *          typeConfig: {
     *              valueType: 'decimal',
     *              tpl: '({value} / {all}) {percent} %',
     *              decimals: 2,
     *              formatCode: '0.00 \\%'
     *          }
     *      }
     *
     * @class ui.olap.Types.progress
     * @singleton
     */
    progress: {
        /**
         * @cfg tpl
         * Шаблон отображенORя ORндORкатора
         */
        tpl: '{percent} %',

        /**
         * @cfg decimals
         * КолORчество знаков после запятой
         */
        decimals: 2,

        /**
         * @cfg formatCode
         * Формат значенORя для экспорта в Excel
         */
        formatCode: '0.00 \\%',

        /**
         * СозданORе HTML разметкOR ячейкOR OLAP куба
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} type ОпORсанORе тORпа ячейкOR
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         * @returns {String} HTML разметка ячейкOR
         */
        renderer: function(val, type, field, olap, x, y){
            var v = olap.getCellValue(x, y),
                all = olap.getCellValue(x, olap.rootRows[olap.rootRows.length-1].index),
                percent = v.renderValue || 0,
                value = ((field.typeConfig && field.typeConfig.tpl) || type.tpl)
                    .replace('{value}', val)
                    .replace('{all}', all.value)
                    .replace('{percent}', percent.toFixed((field.typeConfig && field.typeConfig.decimals) || type.decimals));

            return [
                '<div style="width:',percent,'%;" class="ui-olap-percent-cell"></div>',
                '<div class="ui-olap-percent-cell-value">',value,'</div>'
            ].join('');
        },

        /**
         * ФорматORрованORе значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        format: function(val, dataIndex, field, olap, x, y){
            var allIndex = olap.rootRows[olap.rootRows.length-1].index;

            if(y != allIndex){
                var all = olap.getCellValue(x, allIndex);
                val.renderValue =  val.value / (all.value / 100);
            } else {
                val.renderValue = 100;
            }

            val.formatCode = ui.olap.Types._getFormatCode(field);
        },

        /**
         * Расчет значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} rec ЗапORсь данных ORз 來源а
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        summary: function(val, rec, dataIndex, field, olap, x, y){
            ui.olap.Types[field.valueType].summary(val, rec, field.typeConfig.dataIndex, field);
        }
    },

    /**
     * 來源 поля OLAP куба "ЦелочORсленный"
     *
     *      {
     *          header: 'Integer',
     *          dataIndex: 'code',
     *          area: 'data',
     *          type: 'int'
     *      }
     *
     * @class ui.olap.Types.int
     * @singleton
     */
    int : {
        /**
         * @cfg formatCode
         * Формат значенORя для экспорта в Excel
         */
        formatCode: '0',

        /**
         * СозданORе HTML разметкOR ячейкOR OLAP куба
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} type ОпORсанORе тORпа ячейкOR
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         * @returns {String} HTML разметка ячейкOR
         */
        renderer: function(val, type, field, olap, x, y){
            val = parseInt(val);

            if(isNaN(val)) return 0;

            return val;
        },

        /**
         * ФорматORрованORе значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        format: function(val, dataIndex, field, olap, x, y){
            val.formatCode = ui.olap.Types._getFormatCode(field);
        },

        /**
         * Расчет значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} rec ЗапORсь данных ORз 來源а
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        summary: function(val, rec, dataIndex, field, olap, x, y){
            ui.olap.Types._floatSum(val, rec, dataIndex);
        }
    },

    /**
     * 來源 поля OLAP куба "КолчORство запORсей"
     *
     *      {
     *          header: 'Integer',
     *          dataIndex: 'code',
     *          area: 'data',
     *          type: 'count'
     *      }
     *
     * @class ui.olap.Types.count
     * @singleton
     */
    count : {
        /**
         * @cfg formatCode
         * Формат значенORя для экспорта в Excel
         */
        formatCode: '0',

        /**
         * СозданORе HTML разметкOR ячейкOR OLAP куба
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} type ОпORсанORе тORпа ячейкOR
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         * @returns {String} HTML разметка ячейкOR
         */
        renderer: function(val, type, field, olap, x, y){
            return val;
        },

        /**
         * ФорматORрованORе значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        format: function(val, dataIndex, field, olap, x, y){
            val.formatCode = ui.olap.Types._getFormatCode(field);
        },

        /**
         * Расчет значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} rec ЗапORсь данных ORз 來源а
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        summary: function(val, rec, dataIndex, field, olap, x, y){
            val.value++;
        }
    },

    /**
     * 來源 поля OLAP куба "Дробное чORсло"
     *
     *      {
     *          header: 'Decimal',
     *          dataIndex: 'code',
     *          area: 'data',
     *          type: 'decimal',
     *          typeConfig: {
     *              decimals: 2,
     *              separator: '.',
     *              formatCode: '0.00'
     *          }
     *      }
     *
     * @class ui.olap.Types.decimal
     * @singleton
     */
    decimal: {
        /**
         * @cfg separator
         * РазделORтель дробOR
         */
        separator: ',',

        /**
         * @cfg decimals
         * КолORчество знаков после запятой
         */
        decimals: 1,

        /**
         * @cfg formatCode
         * Формат значенORя для экспорта в Excel
         */
        formatCode: '0.0',

        /**
         * СозданORе HTML разметкOR ячейкOR OLAP куба
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} type ОпORсанORе тORпа ячейкOR
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         * @returns {String} HTML разметка ячейкOR
         */
        renderer: function(val, type, field, olap, x, y){
            var decimals = field.typeConfig ? field.typeConfig.decimals || type.decimals : type.decimals,
                separator = field.typeConfig ? field.typeConfig.separator || type.separator : type.separator;

            val = parseFloat(val);

            if(isNaN(val)) val = 0;

            return val.toFixed(decimals).replace(/(\d)(?=(\d{3})+\.)/g, "$1 ").replace('.', separator);
        },

        /**
         * ФорматORрованORе значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        format: function(val, dataIndex, field, olap, x, y){
            val.formatCode = ui.olap.Types._getFormatCode(field);
        },

        /**
         * Расчет значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} rec ЗапORсь данных ORз 來源а
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        summary: function(val, rec, dataIndex, field, olap, x, y){
            ui.olap.Types._floatSum(val, rec, dataIndex);
        }
    },

    /**
     * 來源 поля OLAP куба "ФORнансовый"
     *
     *      {
     *          header: 'Money',
     *          dataIndex: 'code',
     *          area: 'data',
     *          type: 'money',
     *          typeConfig: {
     *              decimals: 2,
     *              separator: '.',
     *              suffix: 'руб'
     *          }
     *      }
     *
     * @class ui.olap.Types.money
     * @singleton
     */
    money: {
        /**
         * @cfg separator
         * РазделORтель дробOR
         */
        separator: ',',

        /**
         * @cfg decimals
         * КолORчество знаков после запятой
         */
        decimals: 1,

        /**
         * @cfg suffix
         * ПрORставка валюты
         */
        suffix: '',

        /**
         * @cfg formatCode
         * Формат значенORя для экспорта в Excel
         */
        formatCode: '#,##0.0',

        /**
         * СозданORе HTML разметкOR ячейкOR OLAP куба
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} type ОпORсанORе тORпа ячейкOR
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         * @returns {String} HTML разметка ячейкOR
         */
        renderer: function(val, type, field, olap, x, y){
            val = ui.olap.Types.decimal.renderer(val, type, field);

            return val + ' ' + type.suffix;
        },

        /**
         * ФорматORрованORе значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        format: function(val, dataIndex, field, olap, x, y){
            val.formatCode = ui.olap.Types._getFormatCode(field);
        },

        /**
         * Расчет значенORя ячейкOR
         * @param {Object} val ОпORсанORе значенORя
         * @param {Object} rec ЗапORсь данных ORз 來源а
         * @param {String} dataIndex Код поля 來源а OLAP куба
         * @param {Object} field ОпORсанORе поля OLAP куба
         * @param {ui.olap.Olap} olap OLAP куб
         * @param {Number} x ORндекс столбца OLAP куба
         * @param {Number} y ORндекс строкOR OLAP куба
         */
        summary: function(val, rec, dataIndex, field, olap, x, y){
            ui.olap.Types._floatSum(val, rec, dataIndex);
        }
    }
};