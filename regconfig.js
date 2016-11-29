module.exports = {
    /**
     * 是否为Email
     * @param {String} agr1
     * @return {boolean} flag
     */
    isEmail: function (text) {
      var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return reg.test(text);
    },

    /**
     * 是否为合法手机号
     * @param {string}  text
     * @returns {boolean}
     */
    isMobile: function (text) {
      var reg = /^(1[2-8][0-9])\d{8}$/;
      return reg.test(text);
    },
    /**
     * 是否为中文字符
     * @param {string}  text
     * @returns {boolean}
     */
    isChinese: function (text) {
      var reg = /^[\u4e00-\u9fff]{0,}$/;
      return reg.test(text);
    },

    /**
     * 是否为英文字符
     * @param {string}  text
     * @returns {boolean}
     */
    isEnglish: function (text) {
      var reg = /^[A-Za-z]+$/;
      return reg.test(text);
    },
    /**
     * 是否为合法身份证有效证
     * @param {String} text
     * @returns {boolean} flag
     */
    isIdcard: function (idCard) {
      var num = idCard.toLowerCase().match(/\w/g);
      if (idCard.match(/^\d{17}[\dx]$/i)) {
        var sum = 0, times = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        for (var i = 0; i < 17; i++)
          sum += parseInt(num[i], 10) * times[i];
        if ("10x98765432".charAt(sum % 11) != num[17]) {
          return false;
        }
        return !!idCard.replace(/^\d{6}(\d{4})(\d{2})(\d{2}).+$/, "$1-$2-$3");
      }
      if (idCard.match(/^\d{15}$/)) {
        return !!idCard.replace(/^\d{6}(\d{2})(\d{2})(\d{2}).+$/, "19$1-$2-$3");
      }
      return false;
    },

    /**
     * 是否为合法Url
     * @param {String} target
     * @returns {boolean} flag
     */
    isUrl: function (target) {
      return /^http(s)?:\/\/[A-Za-z0-9\-]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/.test(target);
    },

  /**
   * 判断银行卡号是否正确
   * @param cardNumber {String} or {Number}
   * @returns {boolean} flag
   */
    isCardno: function (cardNumber) {
        return /^(\d{16}|\d{18,19})$/.test(cardNumber);
    }
};
