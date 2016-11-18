L.GeoFormat.OWSCommon = L.GeoFormat.XML.VersionedOGC.extend({
 /**
     * APIProperty: defaultVersion
     * {String} Version number to assume if none found.  Default is "1.0.0".
     */
    defaultVersion: "1.0.0",
    
    /**
     * Constructor: L.GeoFormat.OWSCommon
     * Create a new parser for OWSCommon.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    /**
     * Method: getVersion
     * Returns the version to use. Subclasses can override this function
     * if a different version detection is needed.
     *
     * Parameters:
     * root - {DOMElement}
     * options - {Object} Optional configuration object.
     *
     * Returns:
     * {String} The version to use.
     */
    getVersion: function(root, options) {
        var version = this.version;
        if(!version) {
            // remember version does not correspond to the OWS version
            // it corresponds to the WMS/WFS/WCS etc. request version
            var uri = root.getAttribute("xmlns:ows");
            // the above will fail if the namespace prefix is different than
            // ows and if the namespace is declared on a different element
            if (uri && uri.substring(uri.lastIndexOf("/")+1) === "1.1") {
                version ="1.1.0";
            } 
            if(!version) {
                version = this.defaultVersion;
            }
        }
        return version;
    },

    /**
     * APIMethod: read
     * Read an OWSCommon document and return an object.
     *
     * Parameters:
     * data - {String | DOMElement} Data to read.
     * options - {Object} Options for the reader.
     *
     * Returns:
     * {Object} An object representing the structure of the document.
     */

    CLASS_NAME: "L.GeoFormat.OWSCommon" 
});


L.GeoFormat.OWSCommon.v1 = L.GeoFormat.XML.extend({
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
     * Method: read
     *
     * Parameters:
     * data - {DOMElement} An OWSCommon document element.
     * options - {Object} Options for the reader.
     *
     * Returns:
     * {Object} An object representing the OWSCommon document.
     */
    read: function(data, options) {
        options = L.Util.applyDefaults(options, this.options);
        var ows = {};
        this.readChildNodes(data, ows);
        return ows;
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
        "ows": {
            "Exception": function(node, exceptionReport) {
                var exception = {
                    code: node.getAttribute('exceptionCode'),
                    locator: node.getAttribute('locator'),
                    texts: []
                };
                exceptionReport.exceptions.push(exception);
                this.readChildNodes(node, exception);
            },
            "ExceptionText": function(node, exception) {
                var text = this.getChildValue(node);
                exception.texts.push(text);
            },
            "ServiceIdentification": function(node, obj) {
                obj.serviceIdentification = {};
                this.readChildNodes(node, obj.serviceIdentification);
            },
            "Title": function(node, obj) {
                obj.title = this.getChildValue(node);
            },
            "Abstract": function(node, serviceIdentification) {
                serviceIdentification["abstract"] = this.getChildValue(node);
            },
            "Keywords": function(node, serviceIdentification) {
                serviceIdentification.keywords = {};
                this.readChildNodes(node, serviceIdentification.keywords);
            },
            "Keyword": function(node, keywords) {
                keywords[this.getChildValue(node)] = true;
            },
            "ServiceType": function(node, serviceIdentification) {
                serviceIdentification.serviceType = {
                    codeSpace: node.getAttribute('codeSpace'), 
                    value: this.getChildValue(node)};
            },
            "ServiceTypeVersion": function(node, serviceIdentification) {
                serviceIdentification.serviceTypeVersion = this.getChildValue(node);
            },
            "Fees": function(node, serviceIdentification) {
                serviceIdentification.fees = this.getChildValue(node);
            },
            "AccessConstraints": function(node, serviceIdentification) {
                serviceIdentification.accessConstraints = 
                    this.getChildValue(node);
            },
            "ServiceProvider": function(node, obj) {
                obj.serviceProvider = {};
                this.readChildNodes(node, obj.serviceProvider);
            },
            "ProviderName": function(node, serviceProvider) {
                serviceProvider.providerName = this.getChildValue(node);
            },
            "ProviderSite": function(node, serviceProvider) {
                serviceProvider.providerSite = this.getAttributeNS(node, 
                    this.namespaces.xlink, "href");
            },
            "ServiceContact": function(node, serviceProvider) {
                serviceProvider.serviceContact = {};
                this.readChildNodes(node, serviceProvider.serviceContact);
            },
            "IndividualName": function(node, serviceContact) {
                serviceContact.individualName = this.getChildValue(node);
            },
            "PositionName": function(node, serviceContact) {
                serviceContact.positionName = this.getChildValue(node);
            },
            "ContactInfo": function(node, serviceContact) {
                serviceContact.contactInfo = {};
                this.readChildNodes(node, serviceContact.contactInfo);
            },
            "Phone": function(node, contactInfo) {
                contactInfo.phone = {};
                this.readChildNodes(node, contactInfo.phone);
            },
            "Voice": function(node, phone) {
                phone.voice = this.getChildValue(node);
            },
            "Facsimile": function(node, phone) {
                phone.facsimile = this.getChildValue(node);
            },
            "Address": function(node, contactInfo) {
                contactInfo.address = {};
                this.readChildNodes(node, contactInfo.address);
            },
            "DeliveryPoint": function(node, address) {
                address.deliveryPoint = this.getChildValue(node);
            },
            "City": function(node, address) {
                address.city = this.getChildValue(node);
            },
            "AdministrativeArea": function(node, address) {
                address.administrativeArea = this.getChildValue(node);
            },
            "PostalCode": function(node, address) {
                address.postalCode = this.getChildValue(node);
            },
            "Country": function(node, address) {
                address.country = this.getChildValue(node);
            },
            "ElectronicMailAddress": function(node, address) {
                address.electronicMailAddress = this.getChildValue(node);
            },
            "Role": function(node, serviceContact) {
                serviceContact.role = this.getChildValue(node);
            },
            "OperationsMetadata": function(node, obj) {
                obj.operationsMetadata = {};
                this.readChildNodes(node, obj.operationsMetadata);
            },
            "Operation": function(node, operationsMetadata) {
                var name = node.getAttribute("name");
                operationsMetadata[name] = {};
                this.readChildNodes(node, operationsMetadata[name]);
            },
            "DCP": function(node, operation) {
                operation.dcp = {};
                this.readChildNodes(node, operation.dcp);
            },
            "HTTP": function(node, dcp) {
                dcp.http = {};
                this.readChildNodes(node, dcp.http);
            },
            "Get": function(node, http) {
                if (!http.get) {
                    http.get = [];
                }
                var obj = {
                    url: this.getAttributeNS(node, this.namespaces.xlink, "href")
                };
                this.readChildNodes(node, obj);
                http.get.push(obj);
            },
            "Post": function(node, http) {
                if (!http.post) {
                    http.post = [];
                }
                var obj = {
                    url: this.getAttributeNS(node, this.namespaces.xlink, "href")
                };
                this.readChildNodes(node, obj);
                http.post.push(obj);
            },
            "Parameter": function(node, operation) {
                if (!operation.parameters) {
                    operation.parameters = {};
                }
                var name = node.getAttribute("name");
                operation.parameters[name] = {};
                this.readChildNodes(node, operation.parameters[name]);
            },
            "Constraint": function(node, obj) {
                if (!obj.constraints) {
                    obj.constraints = {};
                }
                var name = node.getAttribute("name");
                obj.constraints[name] = {};
                this.readChildNodes(node, obj.constraints[name]);
            },
            "Value": function(node, allowedValues) {
                allowedValues[this.getChildValue(node)] = true;
            },
            "OutputFormat": function(node, obj) {
                obj.formats.push({value: this.getChildValue(node)});
                this.readChildNodes(node, obj);
            },
            "WGS84BoundingBox": function(node, obj) {
                var boundingBox = {};
                boundingBox.crs = node.getAttribute("crs");
                if (obj.BoundingBox) {
                    obj.BoundingBox.push(boundingBox);
                } else {
                    obj.projection = boundingBox.crs;
                    boundingBox = obj;
               }
               this.readChildNodes(node, boundingBox);
            },
            "BoundingBox": function(node, obj) {
                // FIXME: We consider that BoundingBox is the same as WGS84BoundingBox
                // LowerCorner = "min_x min_y"
                // UpperCorner = "max_x max_y"
                // It should normally depend on the projection
                this.readers['ows']['WGS84BoundingBox'].call(this, [node, obj]);
            },
            "LowerCorner": function(node, obj) {
                var str = this.getChildValue(node).replace(
                    this.regExes.trimSpace, "");
                str = str.replace(this.regExes.trimComma, ",");
                var pointList = str.split(this.regExes.splitSpace);
                obj.left = pointList[0];
                obj.bottom = pointList[1];
            },
            "UpperCorner": function(node, obj) {
                var str = this.getChildValue(node).replace(
                    this.regExes.trimSpace, "");
                str = str.replace(this.regExes.trimComma, ",");
                var pointList = str.split(this.regExes.splitSpace);
                obj.right = pointList[0];
                obj.top = pointList[1];

                obj.bounds = new L.Bounds( L.point(obj.left, obj.bottom), L.point(obj.right, obj.top));
                delete obj.left;
                delete obj.bottom;
                delete obj.right;
                delete obj.top;
            },
            "Language": function(node, obj) {
                obj.language = this.getChildValue(node);
            }
        }
    },

    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "ows": {
            "BoundingBox": function(options, nodeName) {
                var node = this.createElementNSPlus(nodeName || "ows:BoundingBox", {
                    attributes: {
                        crs: options.projection
                    }
                });
                this.writeNode("ows:LowerCorner", options, node);
                this.writeNode("ows:UpperCorner", options, node);
                return node;
            },
            "LowerCorner": function(options) {
                var node = this.createElementNSPlus("ows:LowerCorner", {
                    value: options.bounds.left + " " + options.bounds.bottom });
                return node;
            },
            "UpperCorner": function(options) {
                var node = this.createElementNSPlus("ows:UpperCorner", {
                    value: options.bounds.right + " " + options.bounds.top });
                return node;
            },
            "Identifier": function(identifier) {
                var node = this.createElementNSPlus("ows:Identifier", {
                    value: identifier });
                return node;
            },
            "Title": function(title) {
                var node = this.createElementNSPlus("ows:Title", {
                    value: title });
                return node;
            },
            "Abstract": function(abstractValue) {
                var node = this.createElementNSPlus("ows:Abstract", {
                    value: abstractValue });
                return node;
            },
            "OutputFormat": function(format) {
                var node = this.createElementNSPlus("ows:OutputFormat", {
                    value: format });
                return node;
            }
        }
    },

    CLASS_NAME: "L.GeoFormat.OWSCommon.v1"
});

 L.GeoFormat.OWSCommon.v1_1_0 = L.GeoFormat.OWSCommon.v1.extend({
  /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        ows: "http://www.opengis.net/ows/1.1",
        xlink: "http://www.w3.org/1999/xlink"
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
        "ows": L.Util.applyDefaults({
            "ExceptionReport": function(node, obj) {
                obj.exceptionReport = {
                    version: node.getAttribute('version'),
                    language: node.getAttribute('xml:lang'),
                    exceptions: []
                };
                this.readChildNodes(node, obj.exceptionReport);
            },
            "AllowedValues": function(node, parameter) {
                parameter.allowedValues = {};
                this.readChildNodes(node, parameter.allowedValues);
            },
            "AnyValue": function(node, parameter) {
                parameter.anyValue = true;
            },
            "DataType": function(node, parameter) {
                parameter.dataType = this.getChildValue(node);
            },
            "Range": function(node, allowedValues) {
                allowedValues.range = {};
                this.readChildNodes(node, allowedValues.range);
            },
            "MinimumValue": function(node, range) {
                range.minValue = this.getChildValue(node);
            },
            "MaximumValue": function(node, range) {
                range.maxValue = this.getChildValue(node);
            },
            "Identifier": function(node, obj) {
                obj.identifier = this.getChildValue(node);
            },
            "SupportedCRS": function(node, obj) {
                obj.supportedCRS = this.getChildValue(node);
            }
        },  L.GeoFormat.OWSCommon.v1.prototype.readers["ows"])
    },

    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "ows": L.Util.applyDefaults({
            "Range": function(range) {
                var node = this.createElementNSPlus("ows:Range", {
                    attributes: {
                        'ows:rangeClosure': range.closure
                    }
                });
                this.writeNode("ows:MinimumValue", range.minValue, node);
                this.writeNode("ows:MaximumValue", range.maxValue, node);
                return node;
            },
            "MinimumValue": function(minValue) {
                var node = this.createElementNSPlus("ows:MinimumValue", {
                    value: minValue
                });
                return node;
            },
            "MaximumValue": function(maxValue) {
                var node = this.createElementNSPlus("ows:MaximumValue", {
                    value: maxValue
                });
                return node;
            },
            "Value": function(value) {
                var node = this.createElementNSPlus("ows:Value", {
                    value: value
                });
                return node;
            }
        },  L.GeoFormat.OWSCommon.v1.prototype.writers["ows"])
    },

    CLASS_NAME: " L.GeoFormat.OWSCommon.v1_1_0"
});



L.GeoFormat.WMTSCapabilities = L.GeoFormat.XML.VersionedOGC.extend({
     /**
     * APIProperty: defaultVersion
     * {String} Version number to assume if none found.  Default is "1.0.0".
     */
    defaultVersion: "1.0.0",

    /**
     * APIProperty: yx
     * {Object} Members in the yx object are used to determine if a CRS URN
     *     corresponds to a CRS with y,x axis order.  Member names are CRS URNs
     *     and values are boolean.  By default, the following CRS URN are
     *     assumed to correspond to a CRS with y,x axis order:
     *
     * * urn:ogc:def:crs:EPSG::4326
     */
    yx: {
        "urn:ogc:def:crs:EPSG::4326": true
    },

    /**
     * Constructor: L.GeoFormat.WMTSCapabilities
     * Create a new parser for WMTS capabilities.
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */

    /**
     * APIMethod: read
     * Read capabilities data from a string, and return information about
     * the service (offering and observedProperty mostly).
     *
     * Parameters:
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     * {Object} Info about the WMTS Capabilities
     */

    /**
     * APIMethod: createLayer
     * Create a WMTS layer given a capabilities object.
     *
     * Parameters:
     * capabilities - {Object} The object returned from a <read> call to this
     *     format.
     * config - {Object} Configuration properties for the layer.  Defaults for
     *     the layer will apply if not provided.
     *
     * Required config properties:
     * layer - {String} The layer identifier.
     *
     * Optional config properties:
     * matrixSet - {String} The matrix set identifier, required if there is 
     *      more than one matrix set in the layer capabilities.
     * projection - {String} The desired CRS when no matrixSet is specified.
     *     eg: "EPSG:3857". If the desired projection is not available, 
     *     an error is thrown.
     * style - {String} The name of the style
     * format - {String} Image format for the layer. Default is the first
     *     format returned in the GetCapabilities response.
     * param - {Object} The dimensions values eg: {"Year": "2012"}
     *
     * Returns:
     * {<L.Layer.WMTS>} A properly configured WMTS layer.  Throws an
     *     error if an incomplete config is provided.  Returns undefined if no
     *     layer could be created with the provided config.
     */
    createLayer: function(capabilities, config) {
        var layer;

        // confirm required properties are supplied in config
        if (!('layer' in config)) {
            throw new Error("Missing property 'layer' in configuration.");
        }

        var contents = capabilities.contents;

        // find the layer definition with the given identifier
        var layers = contents.layers;
        var layerDef;
        for (var i=0, ii=contents.layers.length; i<ii; ++i) {
            if (contents.layers[i].identifier === config.layer) {
                layerDef = contents.layers[i];
                break;
            }
        }
        if (!layerDef) {
            throw new Error("Layer not found");
        }
        
        var format = config.format;
        if (!format && layerDef.formats && layerDef.formats.length) {
            format = layerDef.formats[0];
        }

        // find the matrixSet definition
        var matrixSet;
        if (config.matrixSet) {
            matrixSet = contents.tileMatrixSets[config.matrixSet];
        } else if (config.projection) {
            for (var i=0,l=layerDef.tileMatrixSetLinks.length;i<l;i++) {
                if (contents.tileMatrixSets[
                        layerDef.tileMatrixSetLinks[i].tileMatrixSet
                    ].supportedCRS.replace(
                        /urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3"
                    ) === config.projection) {

                    matrixSet = contents.tileMatrixSets[
                        layerDef.tileMatrixSetLinks[i].tileMatrixSet];
                    break;
                }
            }
        } else if (layerDef.tileMatrixSetLinks.length >= 1) {
            matrixSet = contents.tileMatrixSets[
                layerDef.tileMatrixSetLinks[0].tileMatrixSet];
        }
        if (!matrixSet) {
            throw new Error("matrixSet not found");
        }

        // get the default style for the layer
        var style;
        for (var i=0, ii=layerDef.styles.length; i<ii; ++i) {
            style = layerDef.styles[i];
            if (style.isDefault) {
                break;
            }
        }

        var requestEncoding = config.requestEncoding;
        if (!requestEncoding) {
            requestEncoding = "KVP";
            if (capabilities.operationsMetadata.GetTile.dcp.http) {
                var http = capabilities.operationsMetadata.GetTile.dcp.http;
                // Get first get method
                if (http.get[0].constraints) {
                    var constraints = http.get[0].constraints;
                    var allowedValues = constraints.GetEncoding.allowedValues;
                    // The OGC documentation is not clear if we should use
                    // REST or RESTful, ArcGis use RESTful,
                    if (!allowedValues.KVP &&
                            (allowedValues.REST || allowedValues.RESTful)) {
                        requestEncoding = "REST";
                    }
                }
            }
        }

        var dimensions = [];
        var params = config.params || {};
        // to don't overwrite the changes in the applyDefaults
        delete config.params;
        for (var id = 0, ld = layerDef.dimensions.length ; id < ld ; id++) {
            var dimension = layerDef.dimensions[id];
            dimensions.push(dimension.identifier);
            if (!params.hasOwnProperty(dimension.identifier)) {
                params[dimension.identifier] = dimension['default'];
            }
        }

        var projection = config.projection || matrixSet.supportedCRS.replace(
                /urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/, "$1:$3");
        var units = config.units ||
                (projection === ("EPSG:4326" || "OGC:CRS84") ? "degrees" : "m");

        /*// compute server-supported resolutions array
        var resolutions = [], minScaleDenominator, maxScaleDenominator,
            reducedMatrixIds = [], tileMatrixSetLink,
            tileMatrixSetLinks = layerDef.tileMatrixSetLinks;
        var buildResolutionsArray = function(scaleDenominator) {
            resolutions.push(
                scaleDenominator * 0.28E-3 / OpenLayers.METERS_PER_INCH /
                    OpenLayers.INCHES_PER_UNIT[units]
            );
            if (!minScaleDenominator || minScaleDenominator > scaleDenominator) {
                minScaleDenominator = scaleDenominator;
            }
            if (!maxScaleDenominator || maxScaleDenominator < scaleDenominator) {
                maxScaleDenominator = scaleDenominator;
            }
        };
        for (var j=0, l=tileMatrixSetLinks.length; j<l; j++) {
            tileMatrixSetLink = tileMatrixSetLinks[j];
            if (tileMatrixSetLink.tileMatrixSet === matrixSet.identifier) {
                if (tileMatrixSetLink.tileMatrixSetLimits) {
                    // reformat matrixSet.matrixIds so that identifiers become keys
                    var tmpMatrixIds = {}, mid;
                    for (var k=0, ll=matrixSet.matrixIds.length; k<ll; k++) {
                        tmpMatrixIds[matrixSet.matrixIds[k].identifier] = matrixSet.matrixIds[k];
                    }
                    // compute resolutions array + scale limits
                    for (var k=0, ll=tileMatrixSetLink.tileMatrixSetLimits.length; k<ll; k++) {
                        mid = tmpMatrixIds[tileMatrixSetLink.tileMatrixSetLimits[k].tileMatrix];
                        reducedMatrixIds.push(mid);
                        buildResolutionsArray(mid.scaleDenominator);
                    }
                } else {
                    // if there are no limits in the tileMatrixSetLink, 
                    // use the resolutions from the full tile matrix set
                    for (var k=0, ll=matrixSet.matrixIds.length; k<ll; k++) {
                        buildResolutionsArray(matrixSet.matrixIds[k].scaleDenominator);
                    };
                }
                break;
            }
        }*/

        var url;
        if (requestEncoding === "REST" && layerDef.resourceUrls) {
            url = [];
            var resourceUrls = layerDef.resourceUrls,
                resourceUrl;
            for (var t = 0, tt = layerDef.resourceUrls.length; t < tt; ++t) {
                resourceUrl = layerDef.resourceUrls[t];
                if (resourceUrl.format === format && resourceUrl.resourceType === "tile") {
                    url.push(resourceUrl.template);
                }
            }
        } else {
            var httpGet = capabilities.operationsMetadata.GetTile.dcp.http.get;
            url = [];
            var constraint;
            for (var i = 0, ii = httpGet.length; i < ii; i++) {
                constraint = httpGet[i].constraints;
                if (!constraint || (constraint && constraint.
                        GetEncoding.allowedValues[requestEncoding])) {
                    url.push(httpGet[i].url);
                }
            }
        }

        /*resolutions.sort(function(a,b){
            return b-a;
        });*/
        var options = L.Util.applyDefaults(config, {
            requestEncoding: requestEncoding,
            name: layerDef.title,
            style: style && style.identifier || "",
            format: format,
            matrixIds: reducedMatrixIds.length ? 
                reducedMatrixIds : matrixSet.matrixIds,
            matrixSet: matrixSet.identifier,
            projection: projection,
            units: units,
            tileFullExtent: matrixSet.bounds,
            dimensions: dimensions,
            params: params,
            /*resolutions: config.isBaseLayer === false ? undefined :
                resolutions,
            serverResolutions: resolutions,*/
            minScale: 1/Math.ceil(maxScaleDenominator),
            maxScale: 1/Math.floor(minScaleDenominator)
        });
        return new new L.GeoWMTSLayer(url,options);
    },

    CLASS_NAME: "L.GeoFormat.WMTSCapabilities"
});


L.GeoFormat.WMTSCapabilities.v1_0_0 =  L.GeoFormat.OWSCommon.v1_1_0.extend({
 /**
     * Property: version
     * {String} The parser version ("1.0.0").
     */
    version: "1.0.0",

    /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.
     */
    namespaces: {
        ows: "http://www.opengis.net/ows/1.1",
        wmts: "http://www.opengis.net/wmts/1.0",
        xlink: "http://www.w3.org/1999/xlink"
    },    
    
    /**
     * Property: yx
     * {Object} Members in the yx object are used to determine if a CRS URN
     *     corresponds to a CRS with y,x axis order.  Member names are CRS URNs
     *     and values are boolean.  Defaults come from the 
     *     <L.GeoFormat.WMTSCapabilities> prototype.
     */
    yx: null,

    /**
     * Property: defaultPrefix
     * {String} The default namespace alias for creating element nodes.
     */
    defaultPrefix: "wmts",

    /**
     * Constructor: L.GeoFormat.WMTSCapabilities.v1_0_0
     * Create a new parser for WMTS capabilities version 1.0.0. 
     *
     * Parameters:
     * options - {Object} An optional object whose properties will be set on
     *     this instance.
     */
    initialize: function(options) {
        L.GeoFormat.XML.prototype.initialize.call(this, options);
        this.options = options;
        var yx = L.Util.extend(
            {}, L.GeoFormat.WMTSCapabilities.prototype.yx
        );
        this.yx = L.Util.extend(yx, this.yx);
    },

    /**
     * APIMethod: read
     * Read capabilities data from a string, and return info about the WMTS.
     * 
     * Parameters: 
     * data - {String} or {DOMElement} data to read/parse.
     *
     * Returns:
     * {Object} Information about the SOS service.
     */
    read: function(data) {
        if(typeof data == "string") {
            data = L.GeoFormat.XML.prototype.read.call(this, data);
        }
        if(data && data.nodeType == 9) {
            data = data.documentElement;
        }
        var capabilities = {};
        this.readNode(data, capabilities);
        capabilities.version = this.version;
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
        "wmts": {
            "Capabilities": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "Contents": function(node, obj) {
                obj.contents = {};                
                obj.contents.layers = [];
                obj.contents.tileMatrixSets = {};                
                this.readChildNodes(node, obj.contents);
            },
            "Layer": function(node, obj) {
                var layer = {
                    styles: [],
                    formats: [],
                    dimensions: [],
                    tileMatrixSetLinks: []
                };
                this.readChildNodes(node, layer);
                obj.layers.push(layer);
            },
            "Style": function(node, obj) {
                var style = {};
                style.isDefault = (node.getAttribute("isDefault") === "true");
                this.readChildNodes(node, style);
                obj.styles.push(style);
            },
            "Format": function(node, obj) {
                obj.formats.push(this.getChildValue(node)); 
            },
            "TileMatrixSetLink": function(node, obj) {
                var tileMatrixSetLink = {};
                this.readChildNodes(node, tileMatrixSetLink);
                obj.tileMatrixSetLinks.push(tileMatrixSetLink);
            },
            "TileMatrixSet": function(node, obj) {
                // node could be child of wmts:Contents or wmts:TileMatrixSetLink
                // duck type wmts:Contents by looking for layers
                if (obj.layers) {
                    // TileMatrixSet as object type in schema
                    var tileMatrixSet = {
                        matrixIds: []
                    };
                    this.readChildNodes(node, tileMatrixSet);
                    obj.tileMatrixSets[tileMatrixSet.identifier] = tileMatrixSet;
                } else {
                    // TileMatrixSet as string type in schema
                    obj.tileMatrixSet = this.getChildValue(node);
                }
            },
            "TileMatrixSetLimits": function(node, obj) {
                obj.tileMatrixSetLimits = [];
                this.readChildNodes(node, obj);
            },
            "TileMatrixLimits": function(node, obj) {
                var tileMatrixLimits = {};
                this.readChildNodes(node, tileMatrixLimits);
                obj.tileMatrixSetLimits.push(tileMatrixLimits);
            },
            "MinTileRow": function(node, obj) {
                obj.minTileRow = parseInt(this.getChildValue(node)); 
            },
            "MaxTileRow": function(node, obj) {
                obj.maxTileRow = parseInt(this.getChildValue(node)); 
            },
            "MinTileCol": function(node, obj) {
                obj.minTileCol = parseInt(this.getChildValue(node)); 
            },
            "MaxTileCol": function(node, obj) {
                obj.maxTileCol = parseInt(this.getChildValue(node)); 
            },
            "TileMatrix": function(node, obj) {
                // node could be child of wmts:TileMatrixSet or wmts:TileMatrixLimits
                if (obj.identifier) {
                    // node is child of wmts:TileMatrixSet
                    var tileMatrix = {
                        supportedCRS: obj.supportedCRS
                    };
                    this.readChildNodes(node, tileMatrix);
                    obj.matrixIds.push(tileMatrix);
                } else {
                    obj.tileMatrix = this.getChildValue(node);
                }
            },
            "ScaleDenominator": function(node, obj) {
                obj.scaleDenominator = parseFloat(this.getChildValue(node)); 
            },
            "TopLeftCorner": function(node, obj) {                
                var topLeftCorner = this.getChildValue(node);
                var coords = topLeftCorner.split(" ");
                // decide on axis order for the given CRS
                var yx;
                if (obj.supportedCRS) {
                    // extract out version from URN
                    var crs = obj.supportedCRS.replace(
                        /urn:ogc:def:crs:(\w+):.+:(\w+)$/, 
                        "urn:ogc:def:crs:$1::$2"
                    );
                    yx = !!this.yx[crs];
                }
                if (yx) {
                    obj.topLeftCorner = new L.latLng(
                        coords[0], coords[1]
                    );
                } else {
                    obj.topLeftCorner = new L.latLng(
                        coords[1], coords[0]
                    );
                }
            },
            "TileWidth": function(node, obj) {
                obj.tileWidth = parseInt(this.getChildValue(node)); 
            },
            "TileHeight": function(node, obj) {
                obj.tileHeight = parseInt(this.getChildValue(node)); 
            },
            "MatrixWidth": function(node, obj) {
                obj.matrixWidth = parseInt(this.getChildValue(node)); 
            },
            "MatrixHeight": function(node, obj) {
                obj.matrixHeight = parseInt(this.getChildValue(node)); 
            },
            "ResourceURL": function(node, obj) {
                obj.resourceUrl = obj.resourceUrl || {};
                var resourceType = node.getAttribute("resourceType");
                if (!obj.resourceUrls) {
                    obj.resourceUrls = [];
                }
                var resourceUrl = obj.resourceUrl[resourceType] = {
                    format: node.getAttribute("format"),
                    template: node.getAttribute("template"),
                    resourceType: resourceType
                };
                obj.resourceUrls.push(resourceUrl);
            },
            "LegendURL": function(node, obj) {
                obj.legends = obj.legends || [];
                var legend = {
                    format: node.getAttribute("format"),
                    href: node.getAttribute("xlink:href")
                };
                var width = node.getAttribute("width"),
                    height = node.getAttribute("height"),
                    minScaleDenominator = node.getAttribute("minScaleDenominator"),
                    maxScaleDenominator = node.getAttribute("maxScaleDenominator");
                if (width !== null) {
                    legend.width = parseInt(width);
                }
                if (height !== null) {
                    legend.height = parseInt(height);
                }
                if (minScaleDenominator !== null) {
                    legend.minScaleDenominator = parseInt(minScaleDenominator);
                }
                if (maxScaleDenominator !== null) {
                    legend.maxScaleDenominator = parseInt(maxScaleDenominator);
                }
                obj.legends.push(legend);
            },
            "InfoFormat": function(node, obj) {
                obj.infoFormats = obj.infoFormats || [];
                obj.infoFormats.push(this.getChildValue(node));
            },
            // not used for now, can be added in the future though
            /*"Themes": function(node, obj) {
                obj.themes = [];
                this.readChildNodes(node, obj.themes);
            },
            "Theme": function(node, obj) {
                var theme = {};                
                this.readChildNodes(node, theme);
                obj.push(theme);
            },*/
            "WSDL": function(node, obj) {
                obj.wsdl = {};
                obj.wsdl.href = node.getAttribute("xlink:href");
                // TODO: other attributes of <WSDL> element                
            },
            "ServiceMetadataURL": function(node, obj) {
                obj.serviceMetadataUrl = {};
                obj.serviceMetadataUrl.href = node.getAttribute("xlink:href");
                // TODO: other attributes of <ServiceMetadataURL> element                
            },
            "Dimension": function(node, obj) {
                var dimension = {values: []};
                this.readChildNodes(node, dimension);
                obj.dimensions.push(dimension);
            },
            "Default": function(node, obj) {
                obj["default"] = this.getChildValue(node);
            },
            "Value": function(node, obj) {
                obj.values.push(this.getChildValue(node));
            }
        },
        "ows": L.GeoFormat.OWSCommon.v1_1_0.prototype.readers["ows"]
    },    
    
    CLASS_NAME: "L.GeoFormat.WMTSCapabilities.v1_0_0" 

});



