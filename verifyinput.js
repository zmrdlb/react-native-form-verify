/**
 * 输入框基本验证类, 不作为直接使用
 */
 const extend = require('extend');
 export default class VerifyInput {
      /**
       * @param *root: 数据验证的input节点
       * @param opts: 一些额外配置
       */
      constructor(root,opts){
          if(root == null){
              throw new Error('VerifyInput必须传入有效root');
          }else{
              this.root = root;
          }

          //获取额外配置
          this.extra = {
              trim: true //是否将value去掉首位空格。如果_verifytype是password, 则force此项是false
          };
          if(opts){
              extend(this.extra,opts);
          }

          this._verifytype = 'base'; //验证类型，字符串
          this._getconfig();
      }
      /**
       * 根据root获取默认验证配置. 要获取的配置包括：
       * ｛
       *      required: true|false //是否是必填，默认false
       *      errmsg: {
       *          required: '此项必填',
       *          placeholder: '输入值不能是默认提示文案'
       *      }
       *  ｝
       *  这些配置全部都放在了this.config中
       */
      _getconfig(){
          this.config = {
              required: this.root.props.required || false,
              placeholder: this.root.props.placeholder || null
          };
          this.config.errmsg = {
              required: '此项必填',
              placeholder: '输入值不能是默认提示文案'
          };
          extend(this.config.errmsg,this.root.props.errmsg);
      }
      /**
       * 数据验证
       * @param {String} value 值，可不填。
       * @return {String|Null} 如果发生了err,则返回对应的错误提示信息. 否则，返回null
       */
      verify(value){
          var config = this.config, extra = this.extra, val = value != undefined? value: this.root.props.value;
          if(extra.trim){
              val = val.trim();
          }

          //开始验证
          if(config.required){ //必填
              if(val == ''){
                  return config.errmsg.required;
              }
          }
          if(config.placeholder != null && val == config.placeholder){ //验证是否等于placeholder
              return config.errmsg.placeholder;
          }
          
          return null;
      }
 }
