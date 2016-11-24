/**
 * TextInput 数字验证类
 */
 const extend = require('extend');
 import VerifyInput from './verifyinput';
 import Util from './util';

 export default class VerifyNumber extends VerifyInput{
      /**
       * @param *root: 数据验证的input节点
       * @param opts: 一些额外配置
       */
      constructor(root,opts){
          if(root == null){
              throw new Error('VerifyNumber必须传入有效root');
          }

          super(...arguments);

          this._verifytype = 'number';
      }
      /**
       * 根据root获取默认验证配置. 要获取的配置包括：
       * ｛
       *      required: true|false //是否是必填，默认false
       *      isinteger: false, //是否必须是整数，默认为false，允许小数
       *      decimaldigits: 2|null, //如果integer为false, 则验证传入的小数位数。默认为null, 不验证
       *      min: 0, //最小值，默认为null
       *      max: 0, //最大值, 默认为null
       *      errmsg: {
       *          required: '此项必填',
       *          typeerror: '必须是数字' //类型错误
       *          isinteger: '输入值必须是整数',
       *          decimaldigits: '最多允许${decimaldigits}位小数',
       *          min: '最小值为${min}',
       *          max: '最大值为${max}',
       *          placeholder: '输入值不能是默认提示文案'
       *      }
       *  ｝
       *  这些配置全部都放在了this.config中
       */
      _getconfig(){
          super._getconfig();

          extend(this.config,{
              isinteger: this.root.props.isinteger || false,
              decimaldigits: this.root.props.decimaldigits || null,
              min: this.root.props.min || null,
              max: this.root.props.max || null
          });

          Util.merge(this.config.errmsg,{
              typeerror: '必须是数字',
              isinteger: '输入值必须是整数',
              decimaldigits: `最多允许${this.config.decimaldigits}位小数`,
              min: `最小值为${this.config.min}`,
              max: `最大值为${this.config.max}`
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

          var config = this.config, val = value != undefined? value: this.root.props.value,
          numreg = /^\-?\d+(\.\d+)?$/; //运行整数和小数同时存在的正则

          if(val == ''){
              return null;
          }

          //验证数据有效性
          if(config.isinteger){ //必须是整数
              numreg = /^\-?\d+$/;
              if(!numreg.test(val)){
                  return config.errmsg.isinteger;
              }
          }else{
              if(!numreg.test(val)){
                  return config.errmsg.typeerror;
              }
              if(config.decimaldigits != null && typeof config.decimaldigits == 'number'){ //允许是小数，且指定了小数位数
                  numreg = new RegExp('^\-?\\d+(\.\\d{1,'+config.decimaldigits+'})?$');
                  if(!numreg.test(val)){
                      return config.errmsg.decimaldigits;
                  }
              }
          }

          val = Number(val);

          if(config.min != null && val < config.min){
              return config.errmsg.min;
          }
          if(config.max != null && val > config.max){
              return config.errmsg.max;
          }

          return null;
      }
 }
