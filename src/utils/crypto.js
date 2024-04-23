const SECRET_KEY = 'qwerty.ytrewq.qwe.rty';
import * as CryptoJS from 'crypto-js';

export const encryptLocalStorageData =(name,data)=> {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    localStorage.setItem(name, encrypted);
}

export const decryptLocalStorageData = (name) => {
    const encrypted = localStorage.getItem(name);
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
}