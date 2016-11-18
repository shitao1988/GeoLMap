L.WFSQuery = L.Class.extend({
    includes: L.Mixin.Events,
    options: {
        crs: L.CRS.EPSG3857,
        showExisting: true,
        geometryField: 'Shape',
        url: '',
        version: '1.1.0',
        typeNS: '',
        typeName: '',
        typeNSName: '',
        maxFeatures: null,
        filter: null,
        style: {
            color: 'black',
            weight: 1
        },
        namespaceUri: ''
    },
    initialize: function(options, readFormat) {
        L.setOptions(this, options);
        this.readFormat = readFormat || new L.Format.GML({
            crs: this.options.crs,
            geometryField: this.options.geometryField
        });
        this.options.typeNSName = this.namespaceName(this.options.typeName);
        this.options.srsName = this.options.crs.code;
    },
    Query: function(filter) {
        var filter = filter || this.options.filter;
        var that = this;
        this.describeFeatureType(function() {
            if (that.options.showExisting) {
                that.loadFeatures(filter);
            }
        }, function(errorMessage) {
            that.fire('error', {
                error: new Error(errorMessage)
            });
        });
    },
    namespaceName: function(name) {
        return this.options.typeNS + ':' + name;
    },
    describeFeatureType: function(successCallback, errorCallback) {
        var requestData = L.XmlUtil.createElementNS('wfs:DescribeFeatureType', {
            service: 'WFS',
            version: this.options.version
        });
        requestData.appendChild(L.XmlUtil.createElementNS('TypeName', {}, {
            value: this.options.typeNSName
        }));
        var that = this;
        L.Util.request({
            url: this.options.url,
            data: L.XmlUtil.serializeXmlDocumentString(requestData),
            success: function(data) {
                // If some exception occur, WFS-service can response successfully, but with ExceptionReport,
                // and such situation must be handled.
                var exceptionReport = L.XmlUtil.parseOwsExceptionReport(data);
                if (exceptionReport) {
                    if (typeof(errorCallback) === 'function') {
                        errorCallback(exceptionReport.message);
                    }
                    return;
                }
                var xmldoc = L.XmlUtil.parseXml(data);
                var featureInfo = xmldoc.documentElement;
                that.readFormat.setFeatureDescription(featureInfo);
                that.options.namespaceUri = featureInfo.attributes.targetNamespace.value;
                if (typeof(successCallback) === 'function') {
                    successCallback();
                }
            },
            error: function(errorMessage) {
                if (typeof(errorCallback) === 'function') {
                    errorCallback(errorMessage);
                }
            }
        });
    },
    getFeature: function(filter) {
        var request = L.XmlUtil.createElementNS('wfs:GetFeature', {
            service: 'WFS',
            version: this.options.version,
            maxFeatures: this.options.maxFeatures,
            outputFormat: this.readFormat.outputFormat
        });
        var query = request.appendChild(L.XmlUtil.createElementNS('wfs:Query', {
            typeName: this.options.typeNSName,
            srsName: this.options.srsName
        }));
        if (filter && filter.toGml) {
            query.appendChild(filter.toGml());
        }
        return request;
    },
    loadFeatures: function(filter) {
        var that = this;
        L.Util.request({
            url: this.options.url,
            data: L.XmlUtil.serializeXmlDocumentString(that.getFeature(filter)),
            success: function(responseText) {
                // If some exception occur, WFS-service can response successfully, but with ExceptionReport,
                // and such situation must be handled.
                var exceptionReport = L.XmlUtil.parseOwsExceptionReport(responseText);
                if (exceptionReport) {
                    that.fire('error', {
                        error: new Error(exceptionReport.message)
                    });
                    return that;
                }
                that.fire('load', {
                    layers: that.readFormat.responseToLayers(responseText)
                });
                return that;
            },
            error: function(errorMessage) {
                that.fire('error', {
                    error: new Error(errorMessage)
                });
                return that;
            }
        });
    },
    CLASS_NAME: "L.WFSQuery"
});