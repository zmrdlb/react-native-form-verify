/**
 * TextInput 密码验证类
 */
import VerifyInput from './verifyinput';

export default class VerifyPassword extends VerifyInput {
    constructor(root,opts){
        super(...arguments);

        this._verifytype = 'password';
        this.extra.trim = false;
    }
}
