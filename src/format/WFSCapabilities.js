L.GeoFormat.WFSCapabilities  = L.GeoFormat.XML.VersionedOGC.extend({
/**
     * APIProperty: defaultVersion
     * {String} Version number to assume if none found.  Default is "1.1.0".
     */
    defaultVersion: "1.1.0",

    /**
     * Constructor: L.GeoFormat.WFSCapabilities
     * Create a new parser for WFS capabilities.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    /**
     * APIMethod: read
     * Read capabilities data from a string, and return a list of layers. 
     * 
     * Parameters: 
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     * {Array} List of named layers.
     */
    
    CLASS_NAME: "L.GeoFormat.WFSCapabilities" 
});

L.GeoFormat.WFSCapabilities.v1  = L.GeoFormat.XML.extend({
/**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        wfs: "http://www.opengis.net/wfs",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        ows: "http://www.opengis.net/ows"
    },


    /**
     * APIProperty: errorProperty
     * {String} Which property of the returned object to check for in order to
     * determine whether or not parsing has failed. In the case that the
     * errorProperty is undefined on the returned object, the document will be
     * run through an OGCExceptionReport parser.
     */
    errorProperty: "featureTypeList",

    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "wfs",
    
    /**
     * Constructor: L.GeoFormat.WFSCapabilities.v1_1
     * Create an instance of one of the subclasses.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    /**
     * APIMethod: read
     * Read capabilities data from a string, and return a list of layers. 
     * 
     * Parameters: 
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     * {Array} List of named layers.
     */
    read: function(data) {
        if(typeof data == "string") {
            data = L.GeoFormat.XML.prototype.read.call(this, data);
        }
        var raw = data;
        if(data && data.nodeType == 9) {
            data = data.documentElement;
        }
        var capabilities = {};
        this.readNode(data, capabilities);
        return capabilities;
    },

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "wfs": {
            "WFS_Capabilities": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "FeatureTypeList": function(node, request) {
                request.featureTypeList = {
                    featureTypes: []
                };
                this.readChildNodes(node, request.featureTypeList);
            },
            "FeatureType": function(node, featureTypeList) {
                var featureType = {};
                this.readChildNodes(node, featureType);
                featureTypeList.featureTypes.push(featureType);
            },
            "Name": function(node, obj) {
                var name = this.getChildValue(node);
                if(name) {
                    var parts = name.split(":");
                    obj.name = parts.pop();
                    if(parts.length > 0) {
                        obj.featureNS = this.lookupNamespaceURI(node, parts[0]);
                    }
                }
            },
            "Title": function(node, obj) {
                var title = this.getChildValue(node);
                if(title) {
                    obj.title = title;
                }
            },
            "Abstract": function(node, obj) {
                var abst = this.getChildValue(node);
                if(abst) {
                    obj["abstract"] = abst;
                }
            }
        }
    },

    CLASS_NAME: "L.GeoFormat.WFSCapabilities.v1" 
});

L.GeoFormat.WFSCapabilities.v1_0_0  = L.GeoFormat.WFSCapabilities.v1.extend({
/**
     * Constructor: L.GeoFormat.WFSCapabilities.v1_0_0
     * Create a new parser for WFS capabilities version 1.0.0.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "wfs": L.Util.applyDefaults({
            "Service": function(node, capabilities) {
                capabilities.service = {};
                this.readChildNodes(node, capabilities.service);
            },
            "Fees": function(node, service) {
                var fees = this.getChildValue(node);
                if (fees && fees.toLowerCase() != "none") {
                    service.fees = fees;
                }
            },
            "AccessConstraints": function(node, service) {
                var constraints = this.getChildValue(node);
                if (constraints && constraints.toLowerCase() != "none") {
                    service.accessConstraints = constraints;
                }
            },
            "OnlineResource": function(node, service) {
                var onlineResource = this.getChildValue(node);
                if (onlineResource && onlineResource.toLowerCase() != "none") {
                    service.onlineResource = onlineResource;
                }
            },
            "Keywords": function(node, service) {
                var keywords = this.getChildValue(node);
                if (keywords && keywords.toLowerCase() != "none") {
                    service.keywords = keywords.split(', ');
                }
            },
            "Capability": function(node, capabilities) {
                capabilities.capability = {};
                this.readChildNodes(node, capabilities.capability);
            },
            "Request": function(node, obj) {
                obj.request = {};
                this.readChildNodes(node, obj.request);
            },
            "GetFeature": function(node, request) {
                request.getfeature = {
                    href: {}, // DCPType
                    formats: [] // ResultFormat
                };
                this.readChildNodes(node, request.getfeature);
            },
            "ResultFormat": function(node, obj) {
                var children = node.childNodes;
                var childNode;
                for(var i=0; i<children.length; i++) {
                    childNode = children[i];
                    if(childNode.nodeType == 1) {
                        obj.formats.push(childNode.nodeName);
                    }
                }
            },
            "DCPType": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "HTTP": function(node, obj) {
                this.readChildNodes(node, obj.href);
            },
            "Get": function(node, obj) {
                obj.get = node.getAttribute("onlineResource");
            },
            "Post": function(node, obj) {
                obj.post = node.getAttribute("onlineResource");
            },
            "SRS": function(node, obj) {
                var srs = this.getChildValue(node);
                if (srs) {
                    obj.srs = srs;
                }
            },
            "LatLongBoundingBox": function(node, obj) {
                obj.latLongBoundingBox = [
                    parseFloat(node.getAttribute("minx")),
                    parseFloat(node.getAttribute("miny")),
                    parseFloat(node.getAttribute("maxx")),
                    parseFloat(node.getAttribute("maxy"))
                ];
            }
        }, L.GeoFormat.WFSCapabilities.v1.prototype.readers["wfs"])
    },
    
    CLASS_NAME: "L.GeoFormat.WFSCapabilities.v1_0_0" 
});

L.GeoFormat.WFSCapabilities.v1_1_0   = L.GeoFormat.WFSCapabilities.v1.extend({
/**
     * Property: regExes
     * Compiled regular expressions for manipulating strings.
     */
    regExes: {
        trimSpace: (/^\s*|\s*$/g),
        removeSpace: (/\s*/g),
        splitSpace: (/\s+/),
        trimComma: (/\s*,\s*/g)
    },
    
    /**
     * Constructor: L.GeoFormat.WFSCapabilities.v1_1_0
     * Create a new parser for WFS capabilities version 1.1.0.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "wfs": L.Util.applyDefaults({
            "DefaultSRS": function(node, obj) {
                var defaultSRS = this.getChildValue(node);
                if (defaultSRS) {
                    obj.srs = defaultSRS;
                }
            }
        }, L.GeoFormat.WFSCapabilities.v1.prototype.readers["wfs"]),
        //"ows": L.GeoFormat.OWSCommon.v1.prototype.readers.ows
    },

    CLASS_NAME: "L.GeoFormat.WFSCapabilities.v1_1_0" 
});


L.GeoFormat.WFSCapabilities.v2_0_0   = L.GeoFormat.XML.extend({
/**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        wfs: "http://www.opengis.net/wfs/2.0",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        ows: "http://www.opengis.net/ows/1.1"
    },

    /**
     * Property: regExes
     * Compiled regular expressions for manipulating strings.
     */
    regExes: {
        trimSpace: (/^\s*|\s*$/g),
        removeSpace: (/\s*/g),
        splitSpace: (/\s+/),
        trimComma: (/\s*,\s*/g)
    },

    /**
     * APIProperty: errorProperty
     * {String} Which property of the returned object to check for in order to
     * determine whether or not parsing has failed. In the case that the
     * errorProperty is undefined on the returned object, the document will be
     * run through an OGCExceptionReport parser.
     */
    errorProperty: "featureTypeList",

    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "wfs",
    
    /**
     * Constructor: L.GeoFormat.WFSCapabilities.v1_1
     * Create an instance of one of the subclasses.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    /**
     * APIMethod: read
     * Read capabilities data from a string, and return a list of layers. 
     * 
     * Parameters: 
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     * {Array} List of named layers.
     */
    read: function(data) {
        if(typeof data == "string") {
            data = L.GeoFormat.XML.prototype.read.call(this, data);
        }
        var raw = data;
        if(data && data.nodeType == 9) {
            data = data.documentElement;
        }
        var capabilities = {};
        this.readNode(data, capabilities);
        return capabilities;
    },

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "wfs": {
            "WFS_Capabilities": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "FeatureTypeList": function(node, request) {
                request.featureTypeList = {
                    featureTypes: []
                };
                this.readChildNodes(node, request.featureTypeList);
            },
            "FeatureType": function(node, featureTypeList) {
                var featureType = {};
                this.readChildNodes(node, featureType);
                featureTypeList.featureTypes.push(featureType);
            },
            "Name": function(node, obj) {
                var name = this.getChildValue(node);
                if(name) {
                    var parts = name.split(":");
                    obj.name = parts.pop();
                    if(parts.length > 0) {
                        obj.featureNS = this.lookupNamespaceURI(node, parts[0]);
                    }
                }
            },
            "Title": function(node, obj) {
                var title = this.getChildValue(node);
                if(title) {
                    obj.title = title;
                }
            },
            "Abstract": function(node, obj) {
                var abst = this.getChildValue(node);
                if(abst) {
                    obj["abstract"] = abst;
                }
            },
            "DefaultCRS": function(node, obj) {
                var defaultCRS = this.getChildValue(node);
                if (defaultCRS) {
                    obj.srs = defaultCRS;
                }
            }
        },
        //"ows": L.GeoFormat.OWSCommon.v1_1_0.prototype.readers.ows
    },

    CLASS_NAME: "L.GeoFormat.WFSCapabilities.v2_0_0" 
});