L.GeoFormat.XML.VersionedOGC =  L.GeoFormat.XML.extend({

     /**
     * APIProperty: defaultVersion
     * {String} Version number to assume if none found.
     */
    defaultVersion: null,
    
    /**
     * APIProperty: version
     * {String} Specify a version string if one is known.
     */
    version: null,

    /**
     * APIProperty: profile
     * {String} If provided, use a custom profile.
     */
    profile: null,

    /**
     * APIProperty: allowFallback
     * {Boolean} If a profiled parser cannot be found for the returned version,
     * use a non-profiled parser as the fallback. Application code using this
     * should take into account that the return object structure might be
     * missing the specifics of the profile. Defaults to false.
     */
    allowFallback: false,

    /**
     * Property: name
     * {String} The name of this parser, this is the part of the CLASS_NAME
     * except for "L.Format."
     */
    name: null,

    /**
     * APIProperty: stringifyOutput
     * {Boolean} If true, write will return a string otherwise a DOMElement.
     * Default is false.
     */
    stringifyOutput: false,

    /**
     * Property: parser
     * {Object} Instance of the versioned parser.  Cached for multiple read and
     *     write calls of the same version.
     */
    parser: null,

    /**
     * Constructor: L.GeoFormat.XML.VersionedOGC.
     * Constructor.
     *
     * Parameters:
     * options - {Object} Optional object whose properties will be set on
     *     the object.
     */
    initialize: function(options) {
        L.GeoFormat.XML.prototype.initialize.call(this, options);
        var className = this.CLASS_NAME;
        this.name = className.substring(className.lastIndexOf(".")+1);
    },

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
        var version;
        // read
        if (root) {
            version = this.version;
            if(!version) {
                version = root.getAttribute("version");
                if(!version) {
                    version = this.defaultVersion;
                }
            }
        } else { // write
            version = (options && options.version) || 
                this.version || this.defaultVersion;
        }
        return version;
    },

    /**
     * Method: getParser
     * Get an instance of the cached parser if available, otherwise create one.
     *
     * Parameters:
     * version - {String}
     *
     * Returns:
     * {<L.GeoFormat>}
     */
    getParser: function(version) {
        version = version || this.defaultVersion;
        var profile = this.profile ? "_" + this.profile : "";
        if(!this.parser || this.parser.VERSION != version) {
            var format = L.GeoFormat[this.name][
                "v" + version.replace(/\./g, "_") + profile
            ];
            if(!format) {
                if (profile !== "" && this.allowFallback) {
                    // fallback to the non-profiled version of the parser
                    profile = "";
                    format = L.GeoFormat[this.name][
                        "v" + version.replace(/\./g, "_")
                    ];
                }
                if (!format) {
                    throw "Can't find a " + this.name + " parser for version " +
                          version + profile;
                }
            }
            this.parser = new format(this.options);
        }
        return this.parser;
    },

    /**
     * APIMethod: write
     * Write a document.
     *
     * Parameters:
     * obj - {Object} An object representing the document.
     * options - {Object} Optional configuration object.
     *
     * Returns:
     * {String} The document as a string
     */
    write: function(obj, options) {
        var version = this.getVersion(null, options);
        this.parser = this.getParser(version);
        var root = this.parser.write(obj, options);
        if (this.stringifyOutput === false) {
            return root;
        } else {
            return L.GeoFormat.XML.prototype.write.call(this, root);
        }
    },

    /**
     * APIMethod: read
     * Read a doc and return an object representing the document.
     *
     * Parameters:
     * data - {String | DOMElement} Data to read.
     * options - {Object} Options for the reader.
     *
     * Returns:
     * {Object} An object representing the document.
     */
    read: function(data, options) {
        if(typeof data == "string") {
            data = L.GeoFormat.XML.prototype.read.call(this, data);
        }
        var root = data.documentElement;
        var version = this.getVersion(root);
        this.parser = this.getParser(version);          // Select the parser
        var obj = this.parser.read(data, options);      // Parse the data

        var errorProperty = this.parser.errorProperty || null;
        if (errorProperty !== null && obj[errorProperty] === undefined) {
            // an error must have happened, so parse it and report back
            var format = new L.GeoFormat.OGCExceptionReport();
            obj.error = format.read(data);
        }
        obj.version = version;
        obj.requestType = this.name;
        return obj;
    },
    wmsusable: function(data, options) {
        var data = this.read(data, options);
        if (data.version && data.capability.layers.length > 0) {
            return true;
        } else {
            return false;
        }
    },
    wfsusable:function(data, options) {
        var json = this.read(data, options);
        if (json.version&&json.featureTypeList.featureTypes.length>0) {
            return true;
        } else {
            return false;
        }
    },
    
     CLASS_NAME: "L.GeoFormat.XML.VersionedOGC" 


});