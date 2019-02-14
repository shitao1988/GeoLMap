(function(window, document, undefined) {

    "use strict";

    L.CToolbar = (L.Layer || L.Class).extend({
        statics: {
            baseClass: 'leaflet-toolbar'
        },

        includes: L.Mixin.Events,

        options: {
            className: '',
            filter: function() { return true; },
            actions: []
        },

        initialize: function(options) {
            L.setOptions(this, options);
            this._toolbar_type = this.constructor._toolbar_class_id;
        },

        addTo: function(map) {
            this._arguments = [].slice.call(arguments);

            map.addLayer(this);

            return this;
        },

        onAdd: function(map) {
            var currentToolbar = map._toolbars[this._toolbar_type];

            if (this._calculateDepth() === 0) {
                if (currentToolbar) { map.removeLayer(currentToolbar); }
                map._toolbars[this._toolbar_type] = this;
            }
        },

        onRemove: function(map) {
            /* 
             * TODO: Cleanup event listeners. 
             * For some reason, this throws:
             * "Uncaught TypeError: Cannot read property 'dragging' of null"
             * on this._marker when a toolbar icon is clicked.
             */
            // for (var i = 0, l = this._disabledEvents.length; i < l; i++) {
            // 	L.DomEvent.off(this._ul, this._disabledEvents[i], L.DomEvent.stopPropagation);
            // }

            if (this._calculateDepth() === 0) {
                delete map._toolbars[this._toolbar_type];
            }
        },

        appendToContainer: function(container) {
            var baseClass = this.constructor.baseClass + '-' + this._calculateDepth(),
                className = baseClass + ' ' + this.options.className,
                Action, action,
                i, j, l, m;

            this._container = container;
            this._ul = L.DomUtil.create('ul', className, container);

            /* Ensure that clicks, drags, etc. don't bubble up to the map. */
            this._disabledEvents = ['click', 'mousemove', 'dblclick'];

            for (j = 0, m = this._disabledEvents.length; j < m; j++) {
                L.DomEvent.on(this._ul, this._disabledEvents[j], L.DomEvent.stopPropagation);
            }

            /* Instantiate each toolbar action and add its corresponding toolbar icon. */
            for (i = 0, l = this.options.actions.length; i < l; i++) {
                Action = this._getActionConstructor(this.options.actions[i]);

                action = new Action();
                action._createIcon(this, this._ul, this._arguments);
            }
        },

        _getActionConstructor: function(Action) {
            var args = this._arguments,
                toolbar = this;

            return Action.extend({
                initialize: function() {
                    Action.prototype.initialize.apply(this, args);
                },
                enable: function(e) {
                    /* Ensure that only one action in a toolbar will be active at a time. */
                    if (toolbar._active) { toolbar._active.disable(); }
                    toolbar._active = this;

                    Action.prototype.enable.call(this, e);
                }
            });
        },

        /* Used to hide subToolbars without removing them from the map. */
        _hide: function() {
            this._ul.style.display = 'none';
        },

        /* Used to show subToolbars without removing them from the map. */
        _show: function() {
            this._ul.style.display = 'block';
        },

        _calculateDepth: function() {
            var depth = 0,
                toolbar = this.parentToolbar;

            while (toolbar) {
                depth += 1;
                toolbar = toolbar.parentToolbar;
            }

            return depth;
        }
    });

    L.toolbar = {};

    var toolbar_class_id = 0;

    L.CToolbar.extend = function extend(props) {
        var statics = L.extend({}, props.statics, {
            "_toolbar_class_id": toolbar_class_id
        });

        toolbar_class_id += 1;
        L.extend(props, { statics: statics });

        return L.Class.extend.call(this, props);
    };

    L.Map.addInitHook(function() {
        this._toolbars = {};
    });

    L.ToolbarAction = L.Handler.extend({
        statics: {
            baseClass: 'leaflet-toolbar-icon'
        },

        options: {
            toolbarIcon: {
                html: '',
                className: '',
                tooltip: ''
            },
            subToolbar: new L.CToolbar()
        },

        initialize: function(options) {
            var defaultIconOptions = L.ToolbarAction.prototype.options.toolbarIcon;

            L.setOptions(this, options);
            this.options.toolbarIcon = L.extend({}, defaultIconOptions, this.options.toolbarIcon);
        },

        enable: function() {
            if (this._enabled) { return; }
            this._enabled = true;
            L.DomUtil.addClass(this._link, 'enable');
            if (this.addHooks) { this.addHooks(); }
        },

        disable: function() {
            if (!this._enabled) { return; }
            this._enabled = false;
            L.DomUtil.removeClass(this._link, 'enable');
            if (this.removeHooks) { this.removeHooks(); }
        },

        _createIcon: function(toolbar, container, args) {
            var iconOptions = this.options.toolbarIcon;

            this.toolbar = toolbar;
            this._icon = L.DomUtil.create('li', '', container);
            this._link = L.DomUtil.create('a', '', this._icon);

            this._link.innerHTML = iconOptions.html;
            this._link.setAttribute('href', '#');
            this._link.setAttribute('title', iconOptions.tooltip);

            L.DomUtil.addClass(this._link, this.constructor.baseClass);
            if (iconOptions.className) {
                L.DomUtil.addClass(this._link, iconOptions.className);
            }

            L.DomEvent.on(this._link, 'click', this._click, this);

            /* Add secondary toolbar */
            this._addSubToolbar(toolbar, this._icon, args);
        },
        _click: function() {
            if (this._enabled) { this.disable() } else {
                this.enable()
            }
        },

        _addSubToolbar: function(toolbar, container, args) {
            var subToolbar = this.options.subToolbar,
                addHooks = this.addHooks,
                removeHooks = this.removeHooks;

            /* For calculating the nesting depth. */
            subToolbar.parentToolbar = toolbar;

            if (subToolbar.options.actions.length > 0) {
                /* Make a copy of args so as not to pollute the args array used by other actions. */
                args = [].slice.call(args);
                args.push(this);

                subToolbar.addTo.apply(subToolbar, args);
                subToolbar.appendToContainer(container);

                this.addHooks = function(map) {
                    if (typeof addHooks === 'function') { addHooks.call(this, map); }
                    subToolbar._show();
                };

                this.removeHooks = function(map) {
                    if (typeof removeHooks === 'function') { removeHooks.call(this, map); }
                    subToolbar._hide();
                };
            }
        }
    });

    L.toolbarAction = function toolbarAction(options) {
        return new L.ToolbarAction(options);
    };

    L.ToolbarAction.extendOptions = function(options) {
        return this.extend({ options: options });
    };

    L.ToolbarClickAction = L.Handler.extend({
        statics: {
            baseClass: 'leaflet-toolbar-icon'
        },

        options: {
            toolbarIcon: {
                html: '',
                className: '',
                tooltip: ''
            },
            subToolbar: new L.CToolbar()
        },

        initialize: function(options) {
            var defaultIconOptions = L.ToolbarClickAction.prototype.options.toolbarIcon;

            L.setOptions(this, options);
            this.options.toolbarIcon = L.extend({}, defaultIconOptions, this.options.toolbarIcon);
        },

        enable: function() {
            if (this._enabled) { return; }
            this._enabled = true;
            L.DomUtil.addClass(this._link, 'enable');
            //	if (this.addHooks) { this.addHooks(); }
        },

        disable: function() {
            if (!this._enabled) { return; }
            this._enabled = false;
            L.DomUtil.removeClass(this._link, 'enable');
            //	if (this.removeHooks) { this.removeHooks(); }
        },

        _createIcon: function(toolbar, container, args) {
            var iconOptions = this.options.toolbarIcon;

            this.toolbar = toolbar;
            this._icon = L.DomUtil.create('li', '', container);
            this._link = L.DomUtil.create('a', '', this._icon);

            this._link.innerHTML = iconOptions.html;
            this._link.setAttribute('href', '#');
            this._link.setAttribute('title', iconOptions.tooltip);

            L.DomUtil.addClass(this._link, this.constructor.baseClass);
            if (iconOptions.className) {
                L.DomUtil.addClass(this._link, iconOptions.className);
            }

            L.DomEvent.on(this._link, 'click', this._click, this);

            /* Add secondary toolbar */
            this._addSubToolbar(toolbar, this._icon, args);
        },
        _click: function() {
            if (this._enabled) { this.disable() } else {
                this.enable()
            }
            if (this.addHooks) { this.addHooks(); }
        },

        _addSubToolbar: function(toolbar, container, args) {
            var subToolbar = this.options.subToolbar,
                addHooks = this.addHooks,
                removeHooks = this.removeHooks;

            /* For calculating the nesting depth. */
            subToolbar.parentToolbar = toolbar;

            if (subToolbar.options.actions.length > 0) {
                /* Make a copy of args so as not to pollute the args array used by other actions. */
                args = [].slice.call(args);
                args.push(this);

                subToolbar.addTo.apply(subToolbar, args);
                subToolbar.appendToContainer(container);
                // subToolbar._hide();
                this.addHooks = function(map) {
                    if (typeof addHooks === 'function') { addHooks.call(this, map); }
                    subToolbar._show();
                };

                this.removeHooks = function(map) {
                    if (typeof removeHooks === 'function') { removeHooks.call(this, map); }
                    subToolbar._hide();
                };
            }
        }
    });

    L.toolbarClickAction = function toolbarClickAction(options) {
        return new L.ToolbarClickAction(options);
    };

    L.ToolbarClickAction.extendOptions = function(options) {
        return this.extend({ options: options });
    };


    L.CToolbar.Control = L.CToolbar.extend({
        statics: {
            baseClass: 'leaflet-control-toolbar ' + L.CToolbar.baseClass
        },

        initialize: function(options) {
            L.CToolbar.prototype.initialize.call(this, options);

            this._control = new L.Control.CToolbar(this.options);
        },

        onAdd: function(map) {
            this._control.addTo(map);

            L.CToolbar.prototype.onAdd.call(this, map);

            this.appendToContainer(this._control.getContainer());
        },

        onRemove: function(map) {
            L.CToolbar.prototype.onRemove.call(this, map);
            if (this._control.remove) { this._control.remove(); } // Leaflet 1.0
            else { this._control.removeFrom(map); }
        }
    });

    L.Control.CToolbar = L.Control.extend({
        options: {
            position: 'bottomright',
        },
        onAdd: function() {
            return L.DomUtil.create('div', 'leaflet-toolbar');
        }
    });

    L.toolbar.control = function(options) {
        return new L.CToolbar.Control(options);
    };

    // A convenience class for built-in popup toolbars.

    L.CToolbar.Popup = L.CToolbar.extend({
        statics: {
            baseClass: 'leaflet-popup-toolbar ' + L.CToolbar.baseClass
        },

        options: {
            anchor: [0, 0]
        },

        initialize: function(latlng, options) {
            L.CToolbar.prototype.initialize.call(this, options);

            /* 
             * Developers can't pass a DivIcon in the options for L.CToolbar.Popup
             * (the use of DivIcons is an implementation detail which may change).
             */
            this._marker = new L.Marker(latlng, {
                icon: new L.DivIcon({
                    className: this.options.className,
                    iconAnchor: [0, 0]
                })
            });
        },

        onAdd: function(map) {
            this._map = map;
            this._marker.addTo(map);

            L.CToolbar.prototype.onAdd.call(this, map);

            this.appendToContainer(this._marker._icon);

            this._setStyles();
        },

        onRemove: function(map) {
            map.removeLayer(this._marker);

            L.CToolbar.prototype.onRemove.call(this, map);

            delete this._map;
        },

        setLatLng: function(latlng) {
            this._marker.setLatLng(latlng);

            return this;
        },

        _setStyles: function() {
            var container = this._container,
                toolbar = this._ul,
                anchor = L.point(this.options.anchor),
                icons = toolbar.querySelectorAll('.leaflet-toolbar-icon'),
                buttonHeights = [],
                toolbarWidth = 0,
                toolbarHeight,
                tipSize,
                tipAnchor;

            /* Calculate the dimensions of the toolbar. */
            for (var i = 0, l = icons.length; i < l; i++) {
                if (icons[i].parentNode.parentNode === toolbar) {
                    buttonHeights.push(parseInt(L.DomUtil.getStyle(icons[i], 'height'), 10));
                    toolbarWidth += Math.ceil(parseFloat(L.DomUtil.getStyle(icons[i], 'width')));
                }
            }
            toolbar.style.width = toolbarWidth + 'px';

            /* Create and place the toolbar tip. */
            this._tipContainer = L.DomUtil.create('div', 'leaflet-toolbar-tip-container', container);
            this._tipContainer.style.width = toolbarWidth + 'px';

            this._tip = L.DomUtil.create('div', 'leaflet-toolbar-tip', this._tipContainer);

            /* Set the tipAnchor point. */
            toolbarHeight = Math.max.apply(undefined, buttonHeights);
            tipSize = parseInt(L.DomUtil.getStyle(this._tip, 'width'), 10);
            tipAnchor = new L.Point(toolbarWidth / 2, toolbarHeight + 0.7071 * tipSize);

            /* The anchor option allows app developers to adjust the toolbar's position. */
            container.style.marginLeft = (anchor.x - tipAnchor.x) + 'px';
            container.style.marginTop = (anchor.y - tipAnchor.y) + 'px';
        }
    });

    L.toolbar.popup = function(options) {
        return new L.CToolbar.Popup(options);
    };

    L.Text = L.Layer.extend({
        includes: L.Mixin.Events,
        options: {
            autoPan: true,
            offset: new L.Point(0, 30),
            autoPanPadding: new L.Point(5, 5),
            latlng: null,
            content: "",
            className: ""
        },
        layerType: 'textLayer',
        initialize: function(options) {
            L.Util.setOptions(this, options);
        },
        onAdd: function(map) {
            this._map = map;
            this._container || this._initLayout();
            map._panes.popupPane.appendChild(this._container);
            map.on("viewreset", this._updatePosition, this);
            if (L.Browser.any3d) map.on("zoomanim", this._zoomAnimation, this);
            this._update();
        },
        addTo: function(map) {
            map.addLayer(this);
            return this;
        },
        onRemove: function(map) {
            map._panes.popupPane.removeChild(this._container);
            map.off({
                    viewreset: this._updatePosition,
                    zoomanim: this._zoomAnimation
                },
                this);
            this._map = null;
        },
        setLatLng: function(latlng) {
            this.options.latlng = L.latLng(latlng);
            this._updatePosition();
            return this;
        },
        setContent: function(content) {
            this.options.content = content;
            this._updateContent();
            return this;
        },
        _initLayout: function() {
            this._container = L.DomUtil.create("lable", "imap-text " + this.options.className + " imap-zoom-animated");
            this._contentNode = L.DomUtil.create("span", "imap-text-content", this._container);
        },
        _update: function() {
            this._map && (this._updateContent(), this._updatePosition());
        },
        _updateContent: function() {
            if (this.options.content) typeof this.options.content == "string" ? this._contentNode.innerHTML = this.options.content : (this._contentNode.innerHTML = "", this._contentNode.appendChild(this.options.content));
        },
        _updatePosition: function() {
            var point = this._map.latLngToLayerPoint(this.options.latlng),
                is3D = L.Browser.any3d,
                offset = this.options.offset;
            is3D && L.DomUtil.setPosition(this._container, point);
            this._containerBottom = -offset.y - (is3D ? 0 : point.y);
            this._containerLeft = offset.x + (is3D ? 0 : point.x);
            this._container.style.bottom = this._containerBottom + "px";
            this._container.style.left = this._containerLeft + "px";
        },
        _zoomAnimation: function(a) {
            a = this._map._latLngToNewLayerPoint(this.options.latlng, a.zoom, a.center);
            L.DomUtil.setPosition(this._container, a);
        }
    });


    L.ComputeDist = L.ToolbarClickAction.extend({
        options: {
            toolbarIcon: { className: 'leaflet-ComputeDist' }
        },
        _rad: Math.PI / 180,
        initialize: function(map, options) {
            this._map = map;
            this._map._distControl = this;
            L.setOptions(this, options);
            L.ToolbarClickAction.prototype.initialize.call(this, map, options);
        },



        _onMouseClick: function() {
            this._map._areaControl._startCompute && this._map._areaControl._finishCompute();
            this._startCompute ? this._finishCompute() : this._enableCompute();
        },
        _setPath: function(event) {
            var latlng = event.latlng || this._map.mouseEventToLatLng(event);
            if (this._startPath) {
                if (!latlng.equals(this._lastPoint)) {
                    var latlngs = this._currentDist._latlngs;
                    latlngs.push(latlng);
                    var length = latlngs.length;
                    this._totalDist += this._getDistance(latlngs[length - 2], latlngs[length - 1]);
                    this._addMarker(latlng);
                    this._addLable(latlng, this._getDistanceString(this._totalDist), "dist-point");
                }
            } else this._currentDist = {
                    _layers: [],
                    _latlngs: []
                },
                this._addPath(latlng),
                this._totalDist = 0,
                this._startPath = true,
                this._addMarker(latlng),
                this._addLable(latlng, "\u8d77\u70b9", "dist-start"),
                this._currentDist._latlngs.push(latlng);
            this._lastPoint = latlng;
            this._startMove = false;
        },
        _onMove: function(event) {
            var latlng = event.latlng,
                point = event.containerPoint,
                tip = this._map._cursorTip;
            tip.style.left = point.x + 7 + "px";
            tip.style.top = point.y + 23 + "px";
            tip.style.display = "";
            if (this._startPath) this._startMove ? this._currentPath.setLatLngs(this._currentDist._latlngs.concat(latlng)) : (this._currentPath.addLatLng(latlng), this._startMove = true);
        },
        _finishCompute: function(event) {
            if (this._startPath) this._currentDist._latlngs.length > 1 ? ((!event || event.type === "contextmenu") && this._currentPath.setLatLngs(this._currentDist._latlngs), this._addReomveMarker(this._lastPoint), this._currentDist.lastLable._container.style.display = "none", this._addLable(this._lastPoint, this._getDistanceString(this._totalDist), "dist-end")) : this._clearLayers.call(this._currentDist);
            this._disableCompute();
        },
        _enableCompute: function() {
            var map = this._map;
            map.contextMenu && map.contextMenu.disable();
            this._startCompute = true;
            // L.DomUtil.addClass(this._container, "active");
            map.on("click", this._setPath, this);
            map.on("dblclick contextmenu", this._finishCompute, this);
            map.doubleClickZoom.disable();
            if (true) {
                var tip = map._cursorTip = L.DomUtil.create("div", "imap-cursorTip", map._container);
                tip.style.cssText = " z-index: 1000;position:absolute;background-color:#fff;border:1px solid #f00;display:none;padding:2px;white-space:nowrap;";
                tip.innerHTML = "\u5355\u51fb\u786e\u5b9a\u5730\u70b9\uff0c\u53cc\u51fb\u7ed3\u675f";
            }
            map.on("mousemove", this._onMove, this);
        },
        _disableCompute: function() {
            var map = this._map;
            map.contextMenu && map.contextMenu.enable();
            map._cursorTip.style.display = "none";
            //L.DomUtil.removeClass(this._container, "active");
            map.off("click", this._setPath, this);
            map.off("dblclick contextmenu", this._finishCompute, this);
            map.off("mousemove", this._onMove, this);
            map.doubleClickZoom.enable();
            this._startCompute = this._startMove = this._startPath = false;
        },
        _addMarker: function(latLng) {
            var icon = new L.Icon({
                    iconUrl: "../src/Control/images/transparent.png",
                    iconSize: [11, 11],
                    iconAnchor: [6, 6],
                    className: "md-icon"
                }),
                marker = new L.Marker(latLng, {
                    icon: icon,
                    clickable: false
                });;
            this._map.addLayer(marker);
            this._currentDist._layers.push(marker);
        },
        _addPath: function(latLngs) {
            var path = this._currentPath = new L.Polyline([latLngs], {
                weight: 2
            });
            this._map.addLayer(path);
            this._currentDist._layers.push(path);
            this._currentDist._map = this._map;
        },
        _addLable: function(latlng, content, className) {
            var text = this._currentDist.lastLable = new L.Text({
                latlng: latlng,
                content: content,
                className: className
            });
            this._map.addLayer(text);
            this._currentDist._layers.push(text);
        },
        _addReomveMarker: function(latlng) {
            var icon = new L.Icon({
                    iconUrl: "../src/Control/images/transparent.png",
                    iconSize: [12, 12],
                    iconAnchor: [-10, 7],
                    className: "md-remove-icon"
                }),
                marker = new L.Marker(latlng, {
                    icon: icon
                });
            marker.on("click", this._clearLayers, this._currentDist);
            this._map.addLayer(marker);
            this._currentDist._layers.push(marker);
        },
        _clearLayers: function() {
            var i, layers = this._layers,
                length;
            i = 0;
            for (length = layers.length; i < length; i++) this._map.removeLayer(layers[i]);
        },
        _getDistanceString: function(distance) {
            return distance < 1E3 ? distance + "\u7c73" : (distance / 1E3).toFixed(1) + "\u516c\u91cc";
        },
        _getDistance: function(a, b) {
            var c = this._rad,
                d = c * a.lat,
                e = c * b.lat,
                c = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((d - e) / 2), 2) + Math.cos(d) * Math.cos(e) * Math.pow(Math.sin((c * a.lng - c * b.lng) / 2), 2)));
            return c = Math.round(c * 6378137);
        }
    });


    L.ComputeArea = L.ToolbarClickAction.extend({
        options: {
            toolbarIcon: { className: 'leaflet-ComputeDist' }
        },
        _rad: Math.PI / 180,
        _deg: 180 / Math.PI,
        initialize: function(map, options) {
            this._map = map;
            this._map._areaControl = this;
            L.setOptions(this, options);
            L.ToolbarClickAction.prototype.initialize.call(this, map, options);
        },

        addHooks: function() {
            this._onMouseClick();
        },

        _onMouseClick: function() {
            this._map._distControl._startCompute && this._map._distControl._finishCompute();
            this._startCompute ? this._finishCompute() : this._enableCompute();
        },
        _setArea: function(event) {
            var latlng = event.latlng || this._map.mouseEventToLatLng(event);
            this._startArea ? latlng.equals(this._lastPoint) || (this._addMarker(latlng), this._compute._latlngs.push(latlng)) : (this._compute = {
                    _layers: [],
                    _latlngs: []
                },
                this._addArea(latlng), this._map.on("mousemove", this._onMove, this), this._startArea = true, this._addMarker(latlng), this._compute._latlngs.push(latlng));
            this._lastPoint = latlng;
            this._startMove = false;
        },
        _onMove: function(event) {
            var latlng = event.latlng,
                point = event.containerPoint,
                tip = this._map._cursorTip;
            tip.style.left = point.x + 7 + "px";
            tip.style.top = point.y + 23 + "px";
            tip.style.display = "";
            if (this._startArea) this._startMove ? this._area.setLatLngs(this._compute._latlngs.concat(latlng)) : (this._area.addLatLng(latlng), this._startMove = true);
        },
        _finishCompute: function(event) {
            this._startArea && (this._compute._latlngs.length > 2 ? ((!event || event.type === "contextmenu") && this._area.setLatLngs(this._compute._latlngs), this._addReomveMarker(this._lastPoint), this._addLable(this._lastPoint, this._getAreaString(this._compute._latlngs), "area-result")) : this._clearLayers.call(this._compute));
            this._disableCompute();
        },
        _enableCompute: function() {
            var map = this._map;
            map.contextMenu && map.contextMenu.disable();
            this._startCompute = true;
            // L.DomUtil.addClass(this._container, "active");
            map.on("click", this._setArea, this);
            map.on("dblclick contextmenu", this._finishCompute, this);
            map.doubleClickZoom.disable();
            if (true) {
                var tip = map._cursorTip = L.DomUtil.create("div", "imap-cursorTip", map._container);
                tip.style.cssText = " z-index: 1000;position:absolute;background-color:#fff;border:1px solid #f00;display:none;padding:2px;white-space:nowrap;";
                tip.innerHTML = "\u5355\u51fb\u786e\u5b9a\u5730\u70b9\uff0c\u53cc\u51fb\u7ed3\u675f";
            }
            map.on("mousemove", this._onMove, this);
        },
        _disableCompute: function() {
            var map = this._map;
            map.contextMenu && map.contextMenu.enable();
            map._cursorTip.style.display = "none";
            //L.DomUtil.removeClass(this._container, "active");
            map.off("click", this._setArea, this);
            map.off("dblclick contextmenu", this._finishCompute, this);
            map.off("mousemove", this._onMove, this);
            map.doubleClickZoom.enable();
            this._startCompute = this._startMove = this._startArea = false;
        },
        _addMarker: function(latlng) {
            var iocn = new L.Icon({
                    iconUrl: "../src/Control/images/transparent.png",
                    iconSize: [11, 11],
                    iconAnchor: [6, 6],
                    className: "md-icon"
                }),
                marker = new L.Marker(latlng, {
                    icon: iocn,
                    clickable: false
                });
            this._map.addLayer(marker);
            this._compute._layers.push(marker);
        },
        _addArea: function(latlng) {
            var area = this._area = new L.Polygon([latlng], {
                weight: 2,
                clickable: false
            });
            this._map.addLayer(area);
            this._compute._layers.push(area);
            this._compute._map = this._map;
        },
        _addLable: function(latlng, content, className) {
            var label = this._compute.lastLable = new L.Text({
                latlng: latlng,
                content: content,
                className: className
            });
            this._map.addLayer(label);
            this._compute._layers.push(label);
        },
        _addReomveMarker: function(latlng) {
            var icon = new L.Icon({
                    iconUrl: "../src/Control/images/transparent.png",
                    iconSize: [12, 12],
                    iconAnchor: [-10, 7],
                    className: "md-remove-icon"
                }),
                marker = new L.Marker(latlng, {
                    icon: icon
                });
            marker.on("click", this._clearLayers, this._compute);
            this._map.addLayer(marker);
            this._compute._layers.push(marker);
        },
        _clearLayers: function() {
            var a, b = this._layers,
                c;
            a = 0;
            for (c = b.length; a < c; a++) this._map.removeLayer(b[a])
        },
        _getAreaString: function(a) {
            a = Math.round(this._computeArea(a));
            return a < 1E6 ? a + "\u5e73\u65b9\u7c73" : (a / 1E6).toFixed(2) + "\u5e73\u65b9\u516c\u91cc"
        },
        _computeArea: function(a) {
            var b = 0,
                c, d, e, f = a.length;
            for (c = 0; c < f; ++c) d = (c + 1) % f,
                e = (c + 2) % f,
                b += this._angle(a[c], a[d], a[e]);
            a = (f - 2) * 180;
            c = b - a;
            c > 420 ? c = f * 360 - b - a : c > 300 && c < 420 && (c = Math.abs(360 - c));
            return c * this._rad * 40680631590769;
        },
        _angle: function(a, b, c) {
            a = this._bearing(b, a);
            b = this._bearing(b, c);
            b = a - b;
            b < 0 && (b += 360);
            return b;
        },
        _bearing: function(a, b) {
            var c = this._rad,
                d = a.lat * c,
                e = a.lng * c,
                f = b.lat * c;
            c *= b.lng;
            d = -Math.atan2(Math.sin(e - c) * Math.cos(f), Math.cos(d) * Math.sin(f) - Math.sin(d) * Math.cos(f) * Math.cos(e - c));
            d < 0 && (d += Math.PI * 2);
            d *= this._deg;
            return d;
        }
    });


})(window, document);