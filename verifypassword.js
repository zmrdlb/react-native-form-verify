/**
 * TextInput 密码验证类
 */
import VerifyString from './verifystring';

export default class VerifyPassword extends VerifyString {

    constructor(root,opts){
        if(root == null){
            throw new Error('VerifyPassword必须传入有效root');
        }

        super(...arguments);

        this._verifytype = 'password';
        this.extra.trim = false;
    }
}
