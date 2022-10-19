const customReplaceData = (key: any, value: any): any => value instanceof Map ?
    {dataType: 'Map', value: Array.from(value.entries())} : value

const customReviveData = (key: any, value: any): any => !!value && typeof value === 'object' && value.dataType === 'Map' ?
    new Map(value.value) : value

export const copyObject = (object: any): any => JSON.parse(JSON.stringify(object, customReplaceData), customReviveData)