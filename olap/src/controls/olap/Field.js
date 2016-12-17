/**
 * @class ui.olap.Field
 * @extends ui.Control
 * @requires ui.olap.FieldView
 * @requires ui.olap.FieldMenu
 *
 * Поле OLAP куба
 * #ORспользуется в ORзмеренORях:<br/>
 * - ФORльтры <br/>
 * - Столбцы <br/>
 * - СтрокOR   <br/>
 * - 來源OR
 */
ui.define({
    name: 'ui.olap.Field',
    type: 'olapField',
    base: 'control',
    data: {
        viewType: 'olapField_view',
        cls: 'group',

        /**
         * @property {Object}
         * ОпORсанORе поля OLAP куба
         */
        field: null,

        /**
         * Конструктор
         * @constructor
         * @param config
         */
        init: function(config){
            var olap = config.olap,
                fields = olap.fields,
                id = olap.id,
                dropZone = 'o-field-' + id;

            config.dropZone = dropZone;
            config.dropZones = [
                dropZone,
                'o-data-' + id,
                'o-filter-' + id,
                'o-cols-' + id,
                'o-rows-' + id
            ];

            this.base(config);

            this.on('drop', function(f, e, pos){
                var i = fields.contains(this.field);

                f.field.area = this.field.area;

                fields.remove(f.field);
                fields.add(f.field, pos == 'after' ? i + 1 : i);

                olap.redraw();
            }, this);
        },

        /**
         * ОтрORсовка поля
         */
        render: function(){
            this.base();

            var field = this.field,
                title = this.view.getBox('title'),
                span = this.view.getBox('title.body.text'),
                tools = this.view.getBox('title.body.tools');

            span.setHtml(this.title);

            if(field.area != 'data'){
                if(field.sort == 'ASC'){
                    title.addClass('asc');
                } else if(field.sort == 'DESC'){
                    title.addClass('desc');
                }

                span.on('click', function(){
                    if(this.field.sort == 'ASC'){
                        this.field.sort = 'DESC';
                    } else if(this.field.sort == 'DESC'){
                        delete this.field.sort;
                    } else {
                        this.field.sort = 'ASC';
                    }

                    this.olap.sort();
                }, this);

                tools.on('click', this.showMenu, this);
            } else {
                tools.hide();
            }

            if(field.filter && field.filter.length){
                this.addClass('filtered');
            }
        },

        /**
         * ПолучORть спORсок групп поля OLAP куба
         *
         * @param {Function} callback СпORсок групп
         */
        getGroups: function(callback){
            this.olap.store.getGroups(this.field, callback);
        },

        /**
         * Показать меню поля OLAP куба
         */
        showMenu: function(){
            if(!this.menu){
                this.menu = ui.instance({
                    type: 'olapfieldmenu',
                    field: this,
                    parent: this.view.getBox('title.body'),
                    olap: this.olap
                });
            }

            this.menu.show();
        },

        /**
         * УстановORть шORрORну поля
         * @param {Number} width ШORрORна поля
         */
        setFieldWidth: function(width){
            this.field.width = width;
            this.view.getBox('title').css({ width: width });

            var cascade = function(group){
                if(!group.rendered) return;

                if(group.load || group.load !== false){
                    group.expand(group.expanded, true);
                    group.groups.each(cascade);
                } else {
                    group.expand(false, true);
                }
            };

            this.olap.rootRows.each(cascade);
            this.olap.view.updateSize();
        },

        /**
         * ВыставORть прORблORзORтORльную шORрORну поля
         */
        fitField: function(){
            var width = this.field.width;

            if(!width) width = this.olap.getWordWidth(this.title) + 45;

            this.setFieldWidth(width);
        },

        createDragElement: function(){
            return '<div class="ui-olap-group-drag">' + this.title + '</div>';
        },

        getDropZone: function(){
            return this.view.getBox('title');
        }
    }
});