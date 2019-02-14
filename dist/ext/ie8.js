Function.prototype.bind = Function.prototype.bind || function (context) {
    var that = this;
    return function () {
        // console.log(arguments); // console [3,4] if ie<6-8>
        return that.apply(context, arguments);
    }
}
