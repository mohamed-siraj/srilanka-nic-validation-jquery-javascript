$().ready(function () {

    /**
     *
     * @type {boolean}
     * check number only
     */
    function checkNumberOnly(value) {
        let isnum = /^\d+$/.test(value);
        return isnum;
    }

    /**
     * @type {number}
     * check Length
     */
    function checkLength(value) {
        let leng = value.length;
        return leng;
    }

    // check digit
    $.validator.addMethod("nic1210DigitRule", function (value, element) {

        if (checkLength(value) === 12 || checkLength(value) === 10) {
            return true;
        } else {
            return false;
        }

    }, "NIC number should be 10 or 12");

    // check 12 digit number format
    $.validator.addMethod("nic12DigitRule", function (value, element) {
        if (checkLength(value) === 12) {
            if (checkNumberOnly(value)) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }

    }, "12 digit NIC should be number format (125478698056)");

    // check 10 digit number format
    $.validator.addMethod("nic10DigitRule", function (value, element) {

        if (checkLength(value) === 10) {
            let getFirstNineDigit = value.substring(0, 9);
            let getLastDigit = value.substring(9, 10).toUpperCase();
            if (checkNumberOnly(getFirstNineDigit) && !checkNumberOnly(getLastDigit) && getLastDigit === "V") {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }

    }, "10 digit NIC should be this format (985651622V)");

    $("#nic-validate-from").validate({
        rules: {
            nic_card: {
                required: true,
                nic1210DigitRule: true,
                nic12DigitRule: true,
                nic10DigitRule: true
            }
        },
        submitHandler: function (form) {

            alert('Successfully validated NIC card')

        }
    });

})