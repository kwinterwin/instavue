export const messageBoxesMixins = {
    data: function () {
        return {
            isShowMessageBox: false,
            messageBoxProperties: {}
        }
    },
    methods: {
        messageBoxPropertiesSetter: function (value) {
            this.messageBoxProperties = value;
            this.isShowMessageBox = true;
        }
    }
};