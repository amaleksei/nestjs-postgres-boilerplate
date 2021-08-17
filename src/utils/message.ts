interface Options {
    one: string;
    moreOne: string;
    many: string;
}

export const getMessage = (message: string, value: number, options: Options):string => {
    let result = '';
    if (value === 0) {
        result = `${message} ${value} ${options.many}`
    }
    if (value === 1) {
        result = `${message} ${value} ${options.one}`
    }

    if (value > 1 && value < 5) {
        result = `${message} ${value} ${options.moreOne}`
    }

    if (value > 5) {
        result = `${message} ${value} ${options.many}`
    }

    return result;
}

export const record = {
    one: 'запись',
    moreOne: 'записи',
    many: 'записей'
}