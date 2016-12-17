/**
 * @class ui.Control
 * @extends ui.Element
 * @requires ui.ControlView
 * Базовый класс для созданORя комбORнORрованных элементов
 */
ui.define({
    name: 'ui.Control',
    type: 'control',
    base: 'element',
    data: {
        /**
         * @property {String/Function}
         * ТORп представленORя
         */
        viewType: 'view',

        /**
         * @cfg {String} cls
         * НаORменованORе класса контрола
         */
        cls: 'control',

        /**
         * @cfg {Boolean} disabled
         * Контрол заблокORрован
         */
        disabled: false,

        /**
         * @cfg {Boolean} readOnly
         * ЗапретORть редактORрованORе
         */
        readOnly: false,

        /**
         * Конструктор класса ui.Control
         * @constructor
         * @param {Object} config Параметры ORнORцORалORзацOROR контрола
         */
        init: function(config){
            config = config || {};

            ui.extend(config, {
                id: ui.guid(),
                controls: []
            });

            this.base(config);
        },

        /**
         * ОтрORсовка контрола
         */
        render: function(){
            this.base();

            this.renderView();

            ui.each(this.items, function(item){ this.add(item); },this);

            this.setDisabled(this.disabled);
            this.setReadOnly(this.readOnly);

            this.dropZone && ui.DragAndDropManager.addDropZone(this, this.dropZone);
            this.dropZones && ui.DragAndDropManager.addDraggable(this, this.dropZones);
        },

        /**
         * УнORчтожORть все дочернORе контролы
         */
        removeAllControls: function(){
            var i = this.controls.length - 1;
            while(i >= 0){
                this.controls[i].destroy();
                i--;
            }
        },

        /**
         * СозданORе представленORя контрола
         */
        renderView: function(){
            if(ui.isString(this.viewType)){
                this.viewType = ui.getType(this.viewType);
            }

            this.view = new this.viewType(this);
        },

        /**
         * ОбновORть представленORе
         */
        viewUpdate: function(){
            if(this.view instanceof ui.ControlView){
                this.view.update();
            }
        },

        /**
         * ПолучORть тело контола
         * @returns {ui.Element} Тело контола
         */
        getBody: function(){
            if(this.view){
                return this.view.getBody();
            }

            return null;
        },

        /**
         * СозданORе элемента подсказкOR во время перетаскORванORя
         * @returns {ui.Element/String} Элемент подсказка
         */
        createDragElement: function(){
            return this.view.createDragElement();
        },

        /**
         * ПолучORть элемент отвечающORй за перетаскORванORе контрола
         * @returns {ui.Element} Элемент отвечающORй за перетаскORванORе контрола
         */
        getDragZone: function(){
            return this.view.getDragZone();
        },

        /**
         * ПолучORть элемент отвечающORй за попаданORе перетаскORваемого контрола
         * @returns {ui.Element} Элемент
         */
        getDropZone: function(){
            return this.view.getDropZone();
        },

        /**
         * ЗаблокORровать/РазблокORровать контрол
         * @param {Boolean} disabled Контрол заблокORрован
         */
        setDisabled: function(disabled){
            this.view.setDisabled(disabled);
            this.disabled = disabled;
        },

        /**
         * ЗапретORть/РазрешORть редактORрованORе контрола
         * @param {Boolean} readOnly Контрол только для чтенORя
         */
        setReadOnly: function(readOnly){
            this.view.setReadOnly(readOnly);
            this.readOnly = readOnly;
        },

        setIcon: function(iconCls){
            this.iconCls = iconCls;
            this.view.setIcon(iconCls);
        },

        setLabel: function(text, pos){
            this.view.setLabel(text, pos);
        },

        setLabelPosition: function(pos){
            this.view.setLabelPosition(pos);
        },

        /**
         * ВставORть HTML разметку в тело контрола
         * @param {String} html HTML разметка
         */
        setHtml: function(html){
            var body = this.getBody();

            if(body instanceof ui.Element){
                body.setHtml(html);
            } else {
                body.html(html);
            }
        },

        /**
         * 添加 дочернORй элемент
         * @param {Object/ui.Element/String} item Параметры ORнORцORалORзацOROR
         * @param {ui.Element} [parent] РодORтель контрола
         * @param {Boolean} [autoRender] АвтоматORческOR отрORсовывать контрол
         * @returns {ui.Control} Добавленный контрол
         */
        add: function(item, parent, autoRender){
            var control;

            parent = parent || this.getBody();
            item = item || {};

            if(ui.isString(item)){
                if(item == 'clear'){
                    control = ui.instance({ type: item });
                } else if(item == '-'){
                    control = ui.instance({ type: 'seporater' });
                }
            } else {
                control = ui.instance(item, this.defaults, ui.Element);
            }

            if(control){
                control.owner = this;

                this.buildReference(item.ref, control);
                this.bindEditableData(control);
                this.controls.push(control);
                this.fire('addControl', control);

                control.on('destroy', function(){ this.controls.remove(control); }, this);

                if(autoRender !== false && control.autoRender !== false){
                    control.appendTo(parent);
                }
                else {
                    control.setParent(parent);
                }
            }

            return control;
        },

        /**
         * 刪除 дочернORй элемент
         * @param {ui.Element} item ДочернORй элемент
         */
        remove: function(item){
            if(ui.isControl(item)){
                this.controls.remove(item);
                item.destroy();
            }
        },

        /**
         * УнORчтожORть контрол
         */
        destroy: function(){
            if(this.rendered){

                if(this.forceDestroyChildren === true){
                    var len = this.controls.length;

                    for(var i = len-1; i>=0; i--){
                        this.controls[i].forceDestroyChildren = true;
                        this.controls[i].destroy();
                    }
                    this.controls.splice(0, this.controls.length);
                }



                this.view.destroy();
            }

            this.base();
        }
    }
});
