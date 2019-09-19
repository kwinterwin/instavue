export const formMixin = {
    methods: {
        getFormValues(form) {
            const formData = {};
            Object.values(form).forEach(obj => {
                if (obj.name) {
                    formData[obj.name] = obj.value;
                }
            });
            return formData;
        }
    }
};
