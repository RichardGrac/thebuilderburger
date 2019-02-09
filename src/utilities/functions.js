export function isObjectEmpty(object) {
    let hasProperties = false
    for(let key in object) {
        if(object.hasOwnProperty(key)) {
            hasProperties = true
            break
        }
    }

    if (hasProperties) {
        for (let key in object) {
            if(object[key] > 0) {
                return false
            }
        }
    }

    return true
}