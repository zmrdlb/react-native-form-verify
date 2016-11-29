# react-native-form-verify

针对react-natived里面的输入框组件，进行值验证，即我们普通意义上的表单验证。

注意：文档里，参数标记了*的，都说明是必填

现在提供的验证类型有3种：

- 字符串验证：VerifyString

- 数字验证：VerifyPassword

- 密码验证：VerifyPassword

它们都是简单的js类

# 使用

## 1. 安装

npm install react-native-form-verify --save

## 2. 引入

const {VerifyString,VerifyPassword,VerifyNumber} = require('react-native-form-verify');

## 3. example 字符串验证

```
constructor(props){
         super(props);
         this.state = {
             username: '',
             errmsg: {
                 username: ''
             }
         };
     }
```

render(){} 包含如下代码
```
{this.state.errmsg.username != '' && <Text style={[styles.text,{color: 'red'}]}>{this.state.errmsg.username}</Text>}
<TextInput style={styles.input}
                    ref="username" //指定ref
                    placeholder="姓名"
                    selectionColor="#007eff"
                    autoFocus={true}
                    value={this.state.username}
                    onChangeText={(username) => this.setState({username})}
                    onEndEditing={(e) => {
                        this._verifyresult('username');
                    }}
                    
                    //输入框验证参数
                    required={true}
                    minLength={5}
                    maxLength={10}
                    errmsg={{
                        required: '姓名不能为空'
                    }}

                />
```

componentDidMount() 包含如下代码
```
this._verify.username = new VerifyString(this.refs.username); //实例化
```

添加自定义方法
```
/**
      * verify
      * @param {String} *refname 命名
      * @param {String} val 值
      */
     _verifyresult(refname,val){
         var args = [];
         if(val != undefined){
             args = [val];
         }
         var _errmsg = this._verify[refname].verify(...args); //验证
         if(_errmsg == null){
             _errmsg = '';
         }
         var errmsg = this.state.errmsg;
         errmsg[refname] = _errmsg;
         this.setState({
             errmsg: errmsg
         });
     }
```

为了全面了解，我们还是来看下api介绍吧

# API

## 公共配置或使用说明

无论是VerifyString|VerifyPassword|VerifyNumber等，它们都有一些公共的配置。下面统一说明

### 1. constructor(root,opts)

- root: * 待验证的输入框TextInput(后面或许引入其他类型)节点

- opts: 一些额外的配置。如下：
```
{
    trim: true //是否将输入框的值去掉首位空格。默认为true. 但是VerifyPassword里面强制为false
}
```
### 2. 验证配置

每种类型都有各自的验证配置，大体分为2大类。

- 1.数据验证配置。如required等，后面会有具体说明

- 2.错误信息配置，errmsg {Object}, 后面也有具体说明

以上两种配置，`都不是必填`，都有默认值或者文案。都以`props`的方式配置在TextInput中

### 3. prototype

- verify(value) {Function}

#### @param

- value: 输入框值。默认不用传，会自动从TextInput.props.value读取。但是有个例外，通过props.value读取不到值，这个时候得传递value。在说明VerifyPassword中说明

#### @return {String|Null} 

返回验证错误信息。如果没有错误，则返回null

## VerifyString：字符串验证

### 数据验证配置

  Name  |  默认值  |  说明  
----    |----      |----
required| false | {Boolean} 输入框值是否必填
minLength| null | {Number} 数据最小长度，如果不设置则不验证
maxLength| null | {Number} 数据最大长度，如果不设置则不验证
verifytype| null | {String} 数据验证类型，如果不设置则不验证。可枚举的类型如下：

> email 邮箱 | 
  mobile 手机号码 | 
  chinese 中文 | 
  english 英文 | 
  idcard 合法身份证 | 
  url 合法url | 
  cardno 有效银行卡号

### 错误信息配置

  Name  |  默认值 
----    |----   
required| 此项必填
placeholder|输入值不能是默认提示文案
minLength|最少输入${minLength}个字符
maxLength|最多输入${maxLength}个字符
verifytype|数据类型错误

## VerifyNumber：数字验证

### 数据验证配置

  Name  |  默认值  |  说明  
----    |----      |----
required| false | {Boolean} 输入框值是否必填
isinteger| false | {Boolean} 数据是否必须是整数。如果设置为true, 则输入的数据必须为整数
decimaldigits| null| {Number整数 >= 1} 如果isinteger为false, 则设置此值表示，如果输入的是小数，最多允许多少位小数
min| null | {Number} 数据最小值，如果不设置则不验证
max| null | {Number} 数据最大值，如果不设置则不验证

### 错误信息配置

  Name  |  默认值 
----    |----   
required| 此项必填
placeholder|输入值不能是默认提示文案
typeerror| 必须是数字
isinteger| 输入值必须是整数
decimaldigits| 最多允许${decimaldigits}位小数
min| 最小值为${min}
max| 最大值为${max}

## VerifyPassword: 密码验证

同VerifyString

### 其他说明

#### 1. constructor(root,opts)

opts中的trim强制为false, 用户设置为true也没用

### 以VerifyPassword为例，说明下什么时候调用verify(value)方法，必须传入value

```
{this.state.errmsg.password != '' && <Text style={[styles.text,{color: 'red'}]}>{this.state.errmsg.password}</Text>}
                <TextInput style={styles.input}
                    ref="password"
                    placeholder="密码"
                    secureTextEntry={true}
                    defaultValue=''

                    /**
                     * 这个例子中，没有写入以下代码，那么从props.value中是取不到值的，这个时候调用.verify(value)手动传入value值
                     */
                    // value={this.state.password}
                    // onChangeText={(password) => {
                    //     console.log(password);
                    // }}

                    onEndEditing={(e) => { //当输入框失去焦掉，或者submit(点击enter)时调用
                        this.setState({
                            password: e.nativeEvent.text
                        });
                        this._verifyresult('password',e.nativeEvent.text);
                    }}

                    required={true}
                    minLength={6}
                />
```

大家重点观察以下两处：

> defaultValue

> value和onChangeText

如果不想采用value,onChangeText这两个方法来实时更新value数据，那么可以指定defaultValue, 此时通过props.value是取不到值的。所以在onEndEditing中，通过
e.nativeEvent.text获取了value值来传入。[点击进入官方说明](http://reactnative.cn/docs/0.38/textinput.html#content)

# 我的使用demo

[点击查看在线实例](https://github.com/zmrdlb/react-native-demo/blob/master/AwesomeProject/page/setting.js)
