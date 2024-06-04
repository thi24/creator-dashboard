export function byteToBase64(byteArray: number[]) {
    let binary = '';
    let bytes = new Uint8Array(byteArray);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export function jsonToUrlParams(object: any) {
    const mapping: Map<string, string> = new Map();
    for(let name in object) {
        const value = object[name];
        if(value) {
            mapping.set(name, value);
        }
    }

    let result = "";
    let index = 0;
    for(const [key, value] of mapping.entries()) {
        if(index > 0) {
            result = result.concat("&");
        }
        result = result.concat(key + "=" + value);
        index++;
    }
    return result;
}