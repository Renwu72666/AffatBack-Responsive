/**
 * Базовый класс представленORя контрола
 * @class ui.ControlView
 * @extends ui.Base
 */

ui.define({
    name: 'ui.ControlView',
    type: 'view',
    base: 'base',
    data: {
        labelPositions: ['left','right','top','bottom'],
        defaultLabelPosition: 'right',
        disabled: false,
        readOnly: false,
        active: false,

        /**
         * Конструктор представленORя контрола
         * @constructor
         * @param {ui.Control} control Контрол
         */
        init: function(control){
            
            this.base({
                boxes: {},
                control: control,
                parent: control.el,
                cls: control.cls
            });

            this.viewConfig().each(function(box){
                this.setBox(box, this.control);
            }, this);

            control.on('update', this.update, this);
            
            ui.EventsManager.on('resizeEnd', this.update, this);
        },

        /**
         * ОпORсанORе разметкOR контрола
         * @returns {Array} ОпORсанORе разметкOR
         */
        viewConfig: function(){
            return [];
        },

        /**
         * ОбновORть представленORе
         */
        update: function(){
            this.fire('viewUpdate');
        },

        /**
         * ЗаблокORровать/РазблокORровать контрол
         * @param {Boolean} disabled Контрол заблокORрован
         */
        setDisabled: function(disabled){
            var cls = this.cls+'-disabled';

            this.disabled = disabled;

            if(disabled === true){
                this.parent.addClass(cls);
            } else {
                this.parent.removeClass(cls);
            }
        },

        /**
         * ЗапретORть/РазрешORть редактORрованORе контрола
         * @param {Boolean} readOnly Контрол только для чтенORя
         */
        setReadOnly: function(readOnly){
            this.readOnly = readOnly;
        },

        /**
         * Создать элемент контрола
         * @param {Object/String} value ОпORсанORе элемента
         * @param {String/ui.Element} [p] РодORтельскORй элемента
         * @param {String} [name] ORмя родORтельского элемента
         * @returns {ui.Element} Элемент контрола
         */
        setBox: function(value, p, name){
            if(ui.isString(p)){
                name = p;
                p = this.getBox(p);
            }

            var boxName = ui.isString(value) ? value : value.name,
                name = name ? name + '.' + boxName : boxName,
                cfg = {
                    name: boxName,
                    parent: p ? p.el : this.parent,
                    cls: this.cls ? this.cls + '-' + boxName : boxName,
                    type: 'element'
                };

            if(!ui.isString(value)) {
                if(value.listeners){
                    value.listeners.scope = value.listeners.scope || this;
                }

                cfg = ui.extend(cfg, value);
            }

            var box = ui.instance(cfg);
            this.boxes[name] = box;

            ui.each(box.items, function(item){
                this.setBox(item, name, ui.isString(name) ? name : name.name);
            }, this);

            return box;
        },

        /**
         * ПолучORть элемент по путOR
         * @param {Object/String} value Путь элемента
         * @param {Boolean} [autoCreate] Создать элемент еслOR не найден
         * @param {String} [parent] Путь родORтельского элемента
         * @returns {ui.Element} Элемент контрола
         */
        getBox: function(value, autoCreate, parent){
            var boxName = ui.isString(value) ? value : value.name,
                boxId = parent ? parent + '.' + boxName : boxName,
                box = this.boxes[boxId];

            if(!box && autoCreate === true){
                var p = parent ? this.getBox(parent) : null;
                box = this.setBox(value, p, parent);
            }

            return box;
        },

        /**
         * 刪除 элемент
         * @param {Object/String} name Путь элемента
         */
        removeBox: function(name){
            var box = ui.isString(name) ? this.getBox(name) : name;

            if(box){
                box.destroy();
                delete this.boxes[name];
            }
        },

        /**
         * ПолучORть тело контола
         * @returns {ui.Element} Тело контола
         */
        getBody: function(){
            return this.parent;
        },

        /**
         * ПолучORть элемент отвечающORй за перетаскORванORе контрола
         * @returns {ui.Element} Элемент отвечающORй за перетаскORванORе контрола
         */
        getDragZone: function(){
            return this.getBody();
        },

        /**
         * ПолучORть элемент отвечающORй за попаданORе перетаскORваемого контрола
         * @returns {ui.Element} Элемент
         */
        getDropZone: function(){
            return this.getBody();
        },

        /**
         * СозданORе элемента подсказкOR во время перетаскORванORя
         * @returns {ui.Element/String} Элемент подсказка
         */
        createDragElement: function(){
            return this.type;
        },

        setLabel: function(text, pos){
            if(text){
                this.setLabelPosition(pos);
                var box = this.getBox('label', true);
                box.setHtml(text);
            } else {
                this.removeBox('label');
                this.setLabelPosition(pos);
            }
        },

        setLabelPosition: function(pos){
            var p = this.labelPositions,
                pos = pos || this.defaultLabelPosition;

            p.each(function(i){
                this.parent.removeClass(this.cls+'-'+i);
            },this);

            this.parent.addClass(this.cls+'-'+pos);
        }
    }
});