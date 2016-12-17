/**
 * Класс представленORя меню поля OLAP куба
 * @class ui.olap.FieldMenuView
 * @extends ui.ControlView
 */
ui.define({
    name: 'ui.olap.FieldMenuView',
    type: 'olapfieldmenu_view',
    base: 'view',
    data: {
        /**
         * ОпORсанORе разметкOR меню
         * @returns {Array} ОпORсанORе разметкOR
         */
        viewConfig: function(){
            return [
                {
                    name: 'tbar',
                    items: [
                        { name: 'select-all', extraCls: 'ui-btn', html: '<span class="icon"></span>' },
                        { name: 'unselect-all', extraCls: 'ui-btn', html: '<span class="icon"></span>' },
                        { name: 'reverse', extraCls: 'ui-btn', html: '<span class="icon icon-reverse"></span>' },
                        { name: 'asc', extraCls: 'ui-btn', html: '<span class="icon icon-asc"></span>' },
                        { name: 'desc', extraCls: 'ui-btn', html: '<span class="icon icon-desc"></span>' }
                    ]
                },
                {
                    name: 'body',
                    items: [
                        'groups'
                    ]
                },
                {
                    name: 'bbar',
                    items: [
                        { name: 'yes', extraCls: 'ui-btn',   html: '<span class="text">執行</span>' },
                        { name: 'no', extraCls: 'ui-btn',    html: '<span class="text">取消</span>' }
                    ]
                }
            ]
        },

        /**
         * ПолучORть тело меню
         * @returns {ui.Element} Тело меню
         */
        getBody: function(){
            return this.getBox('body');
        }
    }
});