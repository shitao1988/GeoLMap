
L.GeoFormat.WMSCapabilities = L.GeoFormat.XML.VersionedOGC.extend({
    /**
     * APIProperty: defaultVersion
     * {String} Version number to assume if none found.  Default is "1.1.1".
     */
    defaultVersion: "1.1.1",
    /**
     * APIProperty: profile
     * {String} If provided, use a custom profile.
     *
     * Currently supported profiles:
     * - WMSC - parses vendor specific capabilities for WMS-C.
     */
    profile: null,
    CLASS_NAME: "L.GeoFormat.WMSCapabilities"
});
L.GeoFormat.WMSCapabilities.v1 = L.GeoFormat.XML.extend({
    /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        wms: "http://www.opengis.net/wms",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance"
    },
    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "wms",
    /**
     * Constructor: L.GeoFormat.WMSCapabilities.v1
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
        if (typeof data == "string") {
            data = L.GeoFormat.XML.prototype.read.apply(this, [data]);
        }
        var raw = data;
        if (data && data.nodeType == 9) {
            data = data.documentElement;
        }
        var capabilities = {};
        this.readNode(data, capabilities);
        if (capabilities.service === undefined) {
            // an exception must have occurred, so parse it
            var parser = new L.GeoFormat.XML.OGCExceptionReport();
            capabilities.error = parser.read(raw);
        }
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
        "wms": {
            "Service": function(node, obj) {
                obj.service = {};
                this.readChildNodes(node, obj.service);
            },
            "Name": function(node, obj) {
                obj.name = this.getChildValue(node);
            },
            "Title": function(node, obj) {
                obj.title = this.getChildValue(node);
            },
            "Abstract": function(node, obj) {
                obj["abstract"] = this.getChildValue(node);
            },
            "BoundingBox": function(node, obj) {
                var bbox = {};
                bbox.bbox = [
                    parseFloat(node.getAttribute("minx")),
                    parseFloat(node.getAttribute("miny")),
                    parseFloat(node.getAttribute("maxx")),
                    parseFloat(node.getAttribute("maxy"))
                ];
                var res = {
                    x: parseFloat(node.getAttribute("resx")),
                    y: parseFloat(node.getAttribute("resy"))
                };
                if (!(isNaN(res.x) && isNaN(res.y))) {
                    bbox.res = res;
                }
                // return the bbox so that descendant classes can set the
                // CRS and SRS and add it to the obj
                return bbox;
            },
            "OnlineResource": function(node, obj) {
                obj.href = this.getAttributeNS(node, this.namespaces.xlink, "href");
            },
            "ContactInformation": function(node, obj) {
                obj.contactInformation = {};
                this.readChildNodes(node, obj.contactInformation);
            },
            "ContactPersonPrimary": function(node, obj) {
                obj.personPrimary = {};
                this.readChildNodes(node, obj.personPrimary);
            },
            "ContactPerson": function(node, obj) {
                obj.person = this.getChildValue(node);
            },
            "ContactOrganization": function(node, obj) {
                obj.organization = this.getChildValue(node);
            },
            "ContactPosition": function(node, obj) {
                obj.position = this.getChildValue(node);
            },
            "ContactAddress": function(node, obj) {
                obj.contactAddress = {};
                this.readChildNodes(node, obj.contactAddress);
            },
            "AddressType": function(node, obj) {
                obj.type = this.getChildValue(node);
            },
            "Address": function(node, obj) {
                obj.address = this.getChildValue(node);
            },
            "City": function(node, obj) {
                obj.city = this.getChildValue(node);
            },
            "StateOrProvince": function(node, obj) {
                obj.stateOrProvince = this.getChildValue(node);
            },
            "PostCode": function(node, obj) {
                obj.postcode = this.getChildValue(node);
            },
            "Country": function(node, obj) {
                obj.country = this.getChildValue(node);
            },
            "ContactVoiceTelephone": function(node, obj) {
                obj.phone = this.getChildValue(node);
            },
            "ContactFacsimileTelephone": function(node, obj) {
                obj.fax = this.getChildValue(node);
            },
            "ContactElectronicMailAddress": function(node, obj) {
                obj.email = this.getChildValue(node);
            },
            "Fees": function(node, obj) {
                var fees = this.getChildValue(node);
                if (fees && fees.toLowerCase() != "none") {
                    obj.fees = fees;
                }
            },
            "AccessConstraints": function(node, obj) {
                var constraints = this.getChildValue(node);
                if (constraints && constraints.toLowerCase() != "none") {
                    obj.accessConstraints = constraints;
                }
            },
            "Capability": function(node, obj) {
                obj.capability = {
                    nestedLayers: [],
                    layers: []
                };
                this.readChildNodes(node, obj.capability);
            },
            "Request": function(node, obj) {
                obj.request = {};
                this.readChildNodes(node, obj.request);
            },
            "GetCapabilities": function(node, obj) {
                obj.getcapabilities = {
                    formats: []
                };
                this.readChildNodes(node, obj.getcapabilities);
            },
            "Format": function(node, obj) {
                if (L.Util.isArray(obj.formats)) {
                    obj.formats.push(this.getChildValue(node));
                } else {
                    obj.format = this.getChildValue(node);
                }
            },
            "DCPType": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "HTTP": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "Get": function(node, obj) {
                obj.get = {};
                this.readChildNodes(node, obj.get);
                // backwards compatibility
                if (!obj.href) {
                    obj.href = obj.get.href;
                }
            },
            "Post": function(node, obj) {
                obj.post = {};
                this.readChildNodes(node, obj.post);
                // backwards compatibility
                if (!obj.href) {
                    obj.href = obj.get.href;
                }
            },
            "GetMap": function(node, obj) {
                obj.getmap = {
                    formats: []
                };
                this.readChildNodes(node, obj.getmap);
            },
            "GetFeatureInfo": function(node, obj) {
                obj.getfeatureinfo = {
                    formats: []
                };
                this.readChildNodes(node, obj.getfeatureinfo);
            },
            "Exception": function(node, obj) {
                obj.exception = {
                    formats: []
                };
                this.readChildNodes(node, obj.exception);
            },
            "Layer": function(node, obj) {
                var parentLayer, capability;
                if (obj.capability) {
                    capability = obj.capability;
                    parentLayer = obj;
                } else {
                    capability = obj;
                }
                var attrNode = node.getAttributeNode("queryable");
                var queryable = (attrNode && attrNode.specified) ? node.getAttribute("queryable") : null;
                attrNode = node.getAttributeNode("cascaded");
                var cascaded = (attrNode && attrNode.specified) ? node.getAttribute("cascaded") : null;
                attrNode = node.getAttributeNode("opaque");
                var opaque = (attrNode && attrNode.specified) ? node.getAttribute('opaque') : null;
                var noSubsets = node.getAttribute('noSubsets');
                var fixedWidth = node.getAttribute('fixedWidth');
                var fixedHeight = node.getAttribute('fixedHeight');
                var parent = parentLayer || {},
                    extend = L.Util.extend;
                var layer = {
                    nestedLayers: [],
                    styles: parentLayer ? [].concat(parentLayer.styles) : [],
                    srs: parentLayer ? extend({}, parent.srs) : {},
                    metadataURLs: [],
                    bbox: parentLayer ? extend({}, parent.bbox) : {},
                    llbbox: parent.llbbox,
                    dimensions: parentLayer ? extend({}, parent.dimensions) : {},
                    authorityURLs: parentLayer ? extend({}, parent.authorityURLs) : {},
                    identifiers: {},
                    keywords: [],
                    queryable: (queryable && queryable !== "") ? (queryable === "1" || queryable === "true") : (parent.queryable || false),
                    cascaded: (cascaded !== null) ? parseInt(cascaded) : (parent.cascaded || 0),
                    opaque: opaque ? (opaque === "1" || opaque === "true") : (parent.opaque || false),
                    noSubsets: (noSubsets !== null) ? (noSubsets === "1" || noSubsets === "true") : (parent.noSubsets || false),
                    fixedWidth: (fixedWidth != null) ? parseInt(fixedWidth) : (parent.fixedWidth || 0),
                    fixedHeight: (fixedHeight != null) ? parseInt(fixedHeight) : (parent.fixedHeight || 0),
                    minScale: parent.minScale,
                    maxScale: parent.maxScale,
                    attribution: parent.attribution
                };
                obj.nestedLayers.push(layer);
                layer.capability = capability;
                this.readChildNodes(node, layer);
                delete layer.capability;
                if (layer.name) {
                    var parts = layer.name.split(":"),
                        request = capability.request,
                        gfi = request.getfeatureinfo;
                    if (parts.length > 0) {
                        layer.prefix = parts[0];
                    }
                    capability.layers.push(layer);
                    if (layer.formats === undefined) {
                        layer.formats = request.getmap.formats;
                    }
                    if (layer.infoFormats === undefined && gfi) {
                        layer.infoFormats = gfi.formats;
                    }
                }
            },
            "Attribution": function(node, obj) {
                obj.attribution = {};
                this.readChildNodes(node, obj.attribution);
            },
            "LogoURL": function(node, obj) {
                obj.logo = {
                    width: node.getAttribute("width"),
                    height: node.getAttribute("height")
                };
                this.readChildNodes(node, obj.logo);
            },
            "Style": function(node, obj) {
                var style = {};
                obj.styles.push(style);
                this.readChildNodes(node, style);
            },
            "LegendURL": function(node, obj) {
                var legend = {
                    width: node.getAttribute("width"),
                    height: node.getAttribute("height")
                };
                obj.legend = legend;
                this.readChildNodes(node, legend);
            },
            "MetadataURL": function(node, obj) {
                var metadataURL = {
                    type: node.getAttribute("type")
                };
                obj.metadataURLs.push(metadataURL);
                this.readChildNodes(node, metadataURL);
            },
            "DataURL": function(node, obj) {
                obj.dataURL = {};
                this.readChildNodes(node, obj.dataURL);
            },
            "FeatureListURL": function(node, obj) {
                obj.featureListURL = {};
                this.readChildNodes(node, obj.featureListURL);
            },
            "AuthorityURL": function(node, obj) {
                var name = node.getAttribute("name");
                var authority = {};
                this.readChildNodes(node, authority);
                obj.authorityURLs[name] = authority.href;
            },
            "Identifier": function(node, obj) {
                var authority = node.getAttribute("authority");
                obj.identifiers[authority] = this.getChildValue(node);
            },
            "KeywordList": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "SRS": function(node, obj) {
                obj.srs[this.getChildValue(node)] = true;
            }
        }
    },
    CLASS_NAME: "L.GeoFormat.WMSCapabilities.v1"
});
L.GeoFormat.WMSCapabilities.v1_3 = L.GeoFormat.WMSCapabilities.v1.extend({
    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "wms": L.Util.applyDefaults({
            "WMS_Capabilities": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "LayerLimit": function(node, obj) {
                obj.layerLimit = parseInt(this.getChildValue(node));
            },
            "MaxWidth": function(node, obj) {
                obj.maxWidth = parseInt(this.getChildValue(node));
            },
            "MaxHeight": function(node, obj) {
                obj.maxHeight = parseInt(this.getChildValue(node));
            },
            "BoundingBox": function(node, obj) {
                var bbox = L.GeoFormat.WMSCapabilities.v1.prototype.readers["wms"].BoundingBox.apply(this, [node, obj]);
                bbox.srs = node.getAttribute("CRS");
                obj.bbox[bbox.srs] = bbox;
            },
            "CRS": function(node, obj) {
                // CRS is the synonym of SRS
                this.readers.wms.SRS.apply(this, [node, obj]);
            },
            "EX_GeographicBoundingBox": function(node, obj) {
                // replacement of LatLonBoundingBox
                obj.llbbox = [];
                this.readChildNodes(node, obj.llbbox);
            },
            "westBoundLongitude": function(node, obj) {
                obj[0] = this.getChildValue(node);
            },
            "eastBoundLongitude": function(node, obj) {
                obj[2] = this.getChildValue(node);
            },
            "southBoundLatitude": function(node, obj) {
                obj[1] = this.getChildValue(node);
            },
            "northBoundLatitude": function(node, obj) {
                obj[3] = this.getChildValue(node);
            },
            "MinScaleDenominator": function(node, obj) {
                var maxScale = parseFloat(this.getChildValue(node)).toPrecision(16);
                if (maxScale != 0) {
                    obj.maxScale = maxScale;
                }
            },
            "MaxScaleDenominator": function(node, obj) {
                var minScale = parseFloat(this.getChildValue(node)).toPrecision(16);
                if (minScale != Number.POSITIVE_INFINITY) {
                    obj.minScale = minScale;
                }
            },
            "Dimension": function(node, obj) {
                // dimension has extra attributes: default, multipleValues, 
                // nearestValue, current which used to be part of Extent. It now
                // also contains the values.
                var name = node.getAttribute("name").toLowerCase();
                var dim = {
                    name: name,
                    units: node.getAttribute("units"),
                    unitsymbol: node.getAttribute("unitSymbol"),
                    nearestVal: node.getAttribute("nearestValue") === "1",
                    multipleVal: node.getAttribute("multipleValues") === "1",
                    "default": node.getAttribute("default") || "",
                    current: node.getAttribute("current") === "1",
                    values: this.getChildValue(node).split(",")
                };
                // Theoretically there can be more dimensions with the same
                // name, but with a different unit. Until we meet such a case,
                // let's just keep the same structure as the WMS 1.1 
                // GetCapabilities parser uses. We will store the last
                // one encountered.
                obj.dimensions[dim.name] = dim;
            },
            "Keyword": function(node, obj) {
                // TODO: should we change the structure of keyword in v1.js?
                // Make it an object with a value instead of a string?
                var keyword = {
                    value: this.getChildValue(node),
                    vocabulary: node.getAttribute("vocabulary")
                };
                if (obj.keywords) {
                    obj.keywords.push(keyword);
                }
            }
        }, L.GeoFormat.WMSCapabilities.v1.prototype.readers["wms"]),
        "sld": {
            "UserDefinedSymbolization": function(node, obj) {
                this.readers.wms.UserDefinedSymbolization.apply(this, [node, obj]);
                // add the two extra attributes
                obj.userSymbols.inlineFeature = parseInt(node.getAttribute("InlineFeature")) == 1;
                obj.userSymbols.remoteWCS = parseInt(node.getAttribute("RemoteWCS")) == 1;
            },
            "DescribeLayer": function(node, obj) {
                this.readers.wms.DescribeLayer.apply(this, [node, obj]);
            },
            "GetLegendGraphic": function(node, obj) {
                this.readers.wms.GetLegendGraphic.apply(this, [node, obj]);
            }
        }
    },
    CLASS_NAME: "L.GeoFormat.WMSCapabilities.v1_3"
});
L.GeoFormat.WMSCapabilities.v1_3_0 = L.GeoFormat.WMSCapabilities.v1_3.extend({
    version: "1.3.0",
    CLASS_NAME: "L.GeoFormat.WMSCapabilities.v1_3_0"
});