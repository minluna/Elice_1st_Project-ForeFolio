import moment from 'moment';
const { DateTime } = require('luxon');

class Util {
    static dateRegexp(data) {
        const regex = new RegExp(/\d{4}-\d{2}-\d{2}/);

        const result = regex.test(data);

        if (result === true) {
            return true;
        } else {
            return false;
        }
    }

    static isFutureDate(inputDate) {
        const formattedInputDate = DateTime.fromISO(inputDate);
        const now = DateTime.now();
        return formattedInputDate > now;
    }
}

export { Util };
