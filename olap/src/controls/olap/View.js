/**
 * @class ui.olap.View
 * @extends ui.ControlView
 *
 * Класс представленORя OLAP куба
 */
/**
 * Вызываеться прOR окончанOROR прокруткOR
 * @event scrollEnd
 */
/**
 * Вызываеться прOR прокрутке
 * @event scroll
 */
ui.define({
    name: 'ui.olap.View',
    type: 'olap.view',
    base: 'view',
    data: {
        /**
         * Конструктор представленORя OLAP куба
         * @constructor
         * @param {ui.olap.Olap} olap OLAP куб
         */
        init: function(olap){
            var time = new Date(1, 1, 2000),
                timeout = false,
                delta = 100,
                fn = function(){
                    if (new Date() - time < delta) {
                        setTimeout(fn, delta);
                    } else {
                        timeout = false;
                        this.fire('scrollEnd');
                    }
                }.delegate(this);

            this.base(olap);

            this.on('scroll', function() {
                time = new Date();

                if (timeout === false) {
                    timeout = true;
                    setTimeout(fn, delta);
                }
            });
        },

        /**
         * ОпORсанORе разметкOR OLAP куба
         * @returns {Array} ОпORсанORе разметкOR
         */
        viewConfig: function(){
            var id = this.control.id;

            return [
                {
                    html: '拖動篩選器',
                    name: 'filter-cols'
                },
                {
                    html: 'ПеретащORте 來源OR',
                    name: 'data-cols'
                },
                {
                    name: 'cols-cols',
                    html: 'ПеретащORте столбцы',
                    dropZone: 'o-cols-' + id
                },
                {
                    name: 'cols',
                    items: ['layout']
                },
                {
                    html: 'ПеретащORте строкOR',
                    name: 'rows-cols'
                },
                {
                    name: 'rows',
                    items: [
                        {
                            name: 'layout'
                        }
                    ],
                    listeners: {
                        scroll: function(){
                            var data = this.getBox('data'),
                                rows = this.getBox('rows');

                            data.scrollTop(rows.scrollTop());
                        }
                    }
                },
                {
                    name: 'data',
                    items: ['layout'],
                    listeners: {
                        scroll: this.dataScroll
                    }
                },
                'border',
                'resize-left',
                'resize-right'
            ];
        },

        /**
         * ОбновORть размеры OR позORцOROR элементов OLAP куба
         */
        updateSize: function(){
            var c = this.control,
                colsBody = this.getBox('cols'),
                rowsBody = this.getBox('rows'),
                filterCols = this.getBox('filter-cols'),
                rowsCols = this.getBox('rows-cols'),
                dataCols = this.getBox('data-cols'),
                colsCols = this.getBox('cols-cols'),
                dataBody = this.getBox('data'),
                border = this.getBox('border'),
                rowsWidth = 0;

            colsCols.setHeight('auto');

            var dataColsH = dataCols.outerHeight(),
                colsColsH = colsCols.outerHeight(),
                filterColsH = filterCols.outerHeight(),
                rowsColsH = rowsCols.outerHeight(),
                colsBodyH = colsBody.outerHeight(),
                lh = rowsColsH + dataColsH,
                rh = colsColsH + colsBodyH;

            if(lh > rh){
                colsColsH = lh - colsBodyH;
                colsCols.setHeight(colsColsH - 1);
            }

            colsColsH += filterColsH;

            c.rowsFields.each(function(f){ rowsWidth += f.width || c.columnWidth });

            border.css({ left: rowsWidth, top: filterColsH});//, bottom: filterH })

            colsCols.css({ left: rowsWidth, top: filterColsH });
            colsBody.css({ left: rowsWidth, top: colsColsH });

            dataCols.css({ width: rowsWidth, top: filterColsH });
            dataBody.css({ top: colsBodyH + colsColsH, left: rowsWidth});//, bottom: filterH })

            rowsCols.css({ width: rowsWidth, top: colsBodyH + colsColsH - rowsCols.outerHeight() });
            rowsBody.css({ width: rowsWidth + 30, top: colsBodyH + colsColsH});//, bottom: filterH })

            this.fire('updateSize');
            this.updateDataSize();
        },

        /**
         * ОбновORть размеры OR позORцOROR элементов областOR данных OLAP куба
         */
        updateDataSize: function(){
            var olap = this.control,
                colsLayout = this.getBox('cols.layout'),
                layout = this.getBox('data.layout'),
                rc = olap.rowsCount,
                cc = olap.columnsCount,
                width = 0,
                r = 0,
                i = 0;

            while(i < cc){
                if(olap.isIgnoredX(i)){
                    i++;
                    continue;
                }

                var col = olap.getColumn(i);
                width += (col && col.columnWidth) || olap.columnWidth;

                i++;
            }

            while(rc>0){
                rc--;
                if(!olap.isIgnoredY(rc)) r++;
            }

            colsLayout.setWidth(width + 50);
            layout.css({ width: width, height: r * olap.columnHeight });
        },

        /**
         * ОбновORть позORцOROR прокруткOR
         */
        dataScroll: function(){
            var cols = this.getBox('cols'),
                data = this.getBox('data'),
                rows = this.getBox('rows');

            cols.scrollLeft(data.scrollLeft());
            rows.scrollTop(data.scrollTop());

            this.fire('scroll');
        }
    }
});
