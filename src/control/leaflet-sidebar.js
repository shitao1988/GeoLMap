
  L.Util.request = function(options) {
    options = L.extend({
        async: true,
        method: 'GET',
        data: '',
        params: {},
        headers: {},
        url: window.location.href,
        success: function(data) {
            console.log(data);
        },
        error: function(data) {
            console.log('Ajax request fail');
            console.log(data);
        },
        complete: function() {}
    }, options);

    // good bye IE 6,7
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                options.success(xhr.responseText);
            } else {
                options.error(xhr.responseText);
            }
            options.complete();
        }
    };

    var url = options.url + L.Util.getParamString(options.params, options.url);

    xhr.open(options.method, url, options.async);
    for (var header in options.headers) {
        xhr.setRequestHeader(header, options.headers[header]);
    }

    xhr.send(options.data);
};
/**
 * @name Sidebar
 * @class L.Control.Sidebar
 * @extends L.Control
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @see L.control.sidebar
 */
L.Control.Sidebar = L.Control.extend(
  /** @lends L.Control.Sidebar.prototype */ {
    includes: L.Mixin.Events,
    layerlist:[],
    options: {
      position: "left"
    },

    initialize: function(id, options) {
      var i, child;

      L.setOptions(this, options);

      // Find sidebar HTMLElement
      if (id) {
        this._sidebar = L.DomUtil.get(id);
      } else {
        this._sidebar = L.DomUtil.create("div", "sidebar collapsed");
        this._sidebar.innerHTML =
          '<div class="sidebar-tabs"><ul role="tablist"><li><a href="#home" role="tab"><i class="fa fa-bars"></i></a></li></ul> </div>' +
          '<div class="sidebar-content"><div class="sidebar-pane" id="home"><h1 class="sidebar-header">资源目录 <span class="sidebar-close"><i class="fa fa-caret-left"></i></span></h1><div class="rescontainer"><ul id="restree" class=" restree"></ul></div></div></div>';
        document.body.appendChild(this._sidebar);
      }
      if(options.ak){
        this.renderResList(options.ak);
      }
      

      // Attach .sidebar-left/right class
      L.DomUtil.addClass(this._sidebar, "sidebar-" + this.options.position);

      // Attach touch styling if necessary
      if (L.Browser.touch) L.DomUtil.addClass(this._sidebar, "leaflet-touch");

      // Find sidebar > div.sidebar-content
      for (i = this._sidebar.children.length - 1; i >= 0; i--) {
        child = this._sidebar.children[i];
        if (
          child.tagName == "DIV" &&
          L.DomUtil.hasClass(child, "sidebar-content")
        )
          this._container = child;
      }

      // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
      this._tabitems = this._sidebar.querySelectorAll(
        "ul.sidebar-tabs > li, .sidebar-tabs > ul > li"
      );
      for (i = this._tabitems.length - 1; i >= 0; i--) {
        this._tabitems[i]._sidebar = this;
      }

      // Find sidebar > div.sidebar-content > div.sidebar-pane
      this._panes = [];
      this._closeButtons = [];
      for (i = this._container.children.length - 1; i >= 0; i--) {
        child = this._container.children[i];
        if (
          child.tagName == "DIV" &&
          L.DomUtil.hasClass(child, "sidebar-pane")
        ) {
          this._panes.push(child);

          var closeButtons = child.querySelectorAll(".sidebar-close");
          for (var j = 0, len = closeButtons.length; j < len; j++)
            this._closeButtons.push(closeButtons[j]);
        }
      }
    },

    renderResList: function(key) {
      var that = this;
      var url =
        "http://172.10.0.220:9000/gateway/auth/token?ak="+key;
        L.Util.request({
          url: url,
          data:{},
          success: function(data) {
            var data=JSON.parse(data);
            that.reslist=data.result;
            if(data.code==1){
              data.result.forEach(function (item) {
                that._addItem(item);
              });
            }
            
          },
          error: function(errorMessage) {
              
          }
      });
    },

    _addItem: function(obj) {
      var label = L.DomUtil.create("label", "chbcontainer"),
        input;

      input = L.DomUtil.create("input");
      input.type = "checkbox";
      input.className = "leaflet-control-layers-selector";
      input.id=obj.id;

      label.innerHTML = " " + obj.title;
      L.DomEvent.on(input, "click", this._onInputClick, this);

      label.appendChild(input);
      label.appendChild(L.DomUtil.create("span", "checkmark"));

      var container = L.DomUtil.get("restree");
      container.appendChild(label);

      return label;
    },

    _onInputClick: function(e) {
      var resid=e.target.id;
      var item=this.reslist.filter(function(res) {
        return res.id==resid;
      })
      if(e.target.checked){
        
        this.addLayer(item[0]);
      }else{
        this.removeLayer(item[0]);
      }
      
    },

    addLayer: function(item) {
      var layer=L.esri.dynamicMapLayer({
        url: "http://172.10.0.220:9000"+item.path,
        opacity: 0.7,
        f: 'image'
     }).addTo(this._map);
     layer.id=item.id;
     this.layerlist.push(layer);
    },

    removeLayer: function(item) {
      var layer=this.layerlist.filter(function(layer) {
        return layer.id==item.id;
      })
      this._map.removeLayer(layer[0]);
    },

    /**
     * Add this sidebar to the specified map.
     *
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    addTo: function(map) {
      var i, child;

      this._map = map;

      for (i = this._tabitems.length - 1; i >= 0; i--) {
        child = this._tabitems[i];
        var sub = child.querySelector("a");
        if (
          sub.hasAttribute("href") &&
          sub.getAttribute("href").slice(0, 1) == "#"
        ) {
          L.DomEvent.on(sub, "click", L.DomEvent.preventDefault).on(
            sub,
            "click",
            this._onClick,
            child
          );
        }
      }

      for (i = this._closeButtons.length - 1; i >= 0; i--) {
        child = this._closeButtons[i];
        L.DomEvent.on(child, "click", this._onCloseClick, this);
      }

      return this;
    },

    /**
     * @deprecated - Please use remove() instead of removeFrom(), as of Leaflet 0.8-dev, the removeFrom() has been replaced with remove()
     * Removes this sidebar from the map.
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    removeFrom: function(map) {
      console.log(
        "removeFrom() has been deprecated, please use remove() instead as support for this function will be ending soon."
      );
      this.remove(map);
    },

    /**
     * Remove this sidebar from the map.
     *
     * @param {L.Map} map
     * @returns {Sidebar}
     */
    remove: function(map) {
      var i, child;

      this._map = null;

      for (i = this._tabitems.length - 1; i >= 0; i--) {
        child = this._tabitems[i];
        L.DomEvent.off(child.querySelector("a"), "click", this._onClick);
      }

      for (i = this._closeButtons.length - 1; i >= 0; i--) {
        child = this._closeButtons[i];
        L.DomEvent.off(child, "click", this._onCloseClick, this);
      }

      return this;
    },

    /**
     * Open sidebar (if necessary) and show the specified tab.
     *
     * @param {string} id - The id of the tab to show (without the # character)
     */
    open: function(id) {
      var i, child;

      // hide old active contents and show new content
      for (i = this._panes.length - 1; i >= 0; i--) {
        child = this._panes[i];
        if (child.id == id) L.DomUtil.addClass(child, "active");
        else if (L.DomUtil.hasClass(child, "active"))
          L.DomUtil.removeClass(child, "active");
      }

      // remove old active highlights and set new highlight
      for (i = this._tabitems.length - 1; i >= 0; i--) {
        child = this._tabitems[i];
        if (child.querySelector("a").hash == "#" + id)
          L.DomUtil.addClass(child, "active");
        else if (L.DomUtil.hasClass(child, "active"))
          L.DomUtil.removeClass(child, "active");
      }

      this.fire("content", { id: id });

      // open sidebar (if necessary)
      if (L.DomUtil.hasClass(this._sidebar, "collapsed")) {
        this.fire("opening");
        L.DomUtil.removeClass(this._sidebar, "collapsed");
      }

      return this;
    },

    /**
     * Close the sidebar (if necessary).
     */
    close: function() {
      // remove old active highlights
      for (var i = this._tabitems.length - 1; i >= 0; i--) {
        var child = this._tabitems[i];
        if (L.DomUtil.hasClass(child, "active"))
          L.DomUtil.removeClass(child, "active");
      }

      // close sidebar
      if (!L.DomUtil.hasClass(this._sidebar, "collapsed")) {
        this.fire("closing");
        L.DomUtil.addClass(this._sidebar, "collapsed");
      }

      return this;
    },

    /**
     * @private
     */
    _onClick: function() {
      if (L.DomUtil.hasClass(this, "active")) this._sidebar.close();
      else if (!L.DomUtil.hasClass(this, "disabled"))
        this._sidebar.open(this.querySelector("a").hash.slice(1));
    },

    /**
     * @private
     */
    _onCloseClick: function() {
      this.close();
    }
  }
);

/**
 * Creates a new sidebar.
 *
 * @example
 * var sidebar = L.control.sidebar('sidebar').addTo(map);
 *
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @returns {Sidebar} A new sidebar instance
 */
L.control.sidebar = function(id, options) {
  return new L.Control.Sidebar(id, options);
};

L.Map.mergeOptions({
  sidebarControl: false
});

L.Map.addInitHook(function() {
  if (this.options.sidebarControl&&this.options.ak) {
      this.sidebarControl = new L.Control.Sidebar(null,{ak:this.options.ak});
      this.addControl(this.sidebarControl);
  }
});
