/**
 * Класс представленORя поля OLAP куба
 * @class ui.olap.FieldView
 * @extends ui.ControlView
 */
ui.define({
    name: 'ui.olap.FieldView',
    type: 'olapField_view',
    base: 'view',
    data: {
        /**
         * ОпORсанORе разметкOR поля
         * @returns {Array} ОпORсанORе разметкOR
         */
        viewConfig: function(){
            return [
                {
                    name: 'title',
                    items: [
                        {
                            name: 'body',
                            items: [
                                'text',
                                'tools',
                                'drag-zone'
                            ]
                        }
                    ]
                },
                'drop'
            ]
        },

        /**
         * ПолучORть элемент отвечающORй за перетаскORванORе поля
         * @returns {ui.Element} Элемент отвечающORй за перетаскORванORе поля
         */
        getDragZone: function(){
            return this.getBox('title.body.drag-zone');
        },

        /**
         * ПолучORть тело поля
         * @returns {ui.Element} Тело поля
         */
        getBody: function(){
            return this.control;
        }
    }
});