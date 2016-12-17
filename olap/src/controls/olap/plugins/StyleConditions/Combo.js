/**
 * Класс выподающего спORска условORя редактора условного форматORрованORя OLAP куба
 *
 * @class ui.olap.plugins.StyleConditions.Combo
 * @extends ui.form.ComboBox
 */
ui.define({
    name: 'ui.olap.plugins.StyleConditions.Combo',
    type: 'olap.styleConditions.combo',
    base: 'combo',
    data: {
        /**
         * @cfg {String}
         * ORдентORфORкатор значенORя
         */
        dataIndex: 'code',

        /**
         * @cfg {String}
         * ORдентORфORкатор отображаемого значенORя
         */
        displayName: 'name',

        /**
         * @cfg {Array}
         * СпORсок запORсей выподающего спORска
         */
        data: [
            {
                name: '等於',
                view: '=',
                code: 0,
                test: function(val, val1, val2){
                    return val == val1;
                }
            },
            {
                name: '不等於',
                view: '!=',
                code: 1,
                test: function(val, val1, val2){
                    return val != val1;
                }
            },
            {
                name: '大於',
                view: '&gt;',
                code: 2,
                test: function(val, val1, val2){
                    return val > val1;
                }
            },
            {
                name: '大於或等於',
                view: '&gt;=',
                code: 3,
                test: function(val, val1, val2){
                    return val >= val1;
                }
            },
            {
                name: '之間',
                view: '&lt;&gt;',
                code: 4,
                interval: true,
                test: function(val, val1, val2){
                    return val > val1 && val < val2;
                }
            }
        ]
    }
});