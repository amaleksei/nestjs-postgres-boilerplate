import * as moment from 'moment';

const getDate = (dateString: string):Date => {
    let result: Date = null;
    const stringArray: string[] = dateString.split('.');
    const newFormat = stringArray.join('-');
    const newDate = moment(newFormat, "DD-MM-YYYY", 'ru', true);
    if (newDate.isValid()) {
        result = newDate.toDate()
        return result;
    }
    return result;
}

export default getDate;
