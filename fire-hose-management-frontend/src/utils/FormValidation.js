class FormValidation {

    static validText = (input) => {
        if (input === ""){
            return false
        }
        const re = /^([^0-9]*)$/;
        return !re.test(input)
    }

    static validHouseNumber = (input) =>{
        if (input === ""){
            return false
        }
        const re = /^\d+[a-zA-Z]*$/;
        return !re.test(input)
    }

}

export default FormValidation;