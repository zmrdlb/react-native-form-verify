/**
 * TextInput 输入框字符串验证类
 */
const extend = require('extend');
import VerifyInput from './verifyinput';
import Util from './util';

export default class VerifyString extends VerifyInput{
     /**
      * @param *root: 数据验证的input节点
      * @param opts: 一些额外配置
      */
     constructor(root,opts){
         if(root == null){
             throw new Error('VerifyString必须传入有效root');
         }

         super(...arguments);

         this._verifytype = 'string';
     }
     /**
      * 根据root获取默认验证配置. 要获取的配置包括：
      * ｛
      *      required: true|false //是否是必填，默认false
      *      minLength: 0 //如果填写了数据，最小长度
      *      maxLength: 0 //如果填写了数据，最大长度
      *      errmsg: {
      *          required: '此项必填',
      *          minLength: '最少输入${minLength}个字符',
      *          maxLength: '最多输入${maxLength}个字符',
      *          placeholder: '输入值不能是默认提示文案'
      *      }
      *  ｝
      *  这些配置全部都放在了this.config中
      */
     _getconfig(){
         super._getconfig();

         extend(this.config,{
             minLength: this.root.props.minLength || null,
             maxLength: this.root.props.maxLength || null
         });

         Util.merge(this.config.errmsg,{
             minLength: `最少输入${this.config.minLength}个字符`,
             maxLength: `最多输入${this.config.maxLength}个字符`
         },false,false);
     }
     /**
      * 数据验证
      * @param {String} value 值，可不填。
      * @return {String|Null} 如果发生了err,则返回对应的错误提示信息. 否则，返回null
      */
     verify(value){
         var _supererrmsg = super.verify(value);

         if(_supererrmsg != null){
             return _supererrmsg;
         }

         var config = this.config, val = value != undefined? value: this.root.props.value;

         if(val != ''){
             if(config.minLength != null && val.length < config.minLength){
                 return config.errmsg.minLength;
             }
             if(config.maxLength != null && val.length > config.maxLength){
                 return config.errmsg.maxLength;
             }
         }

         return null;
     }
}
