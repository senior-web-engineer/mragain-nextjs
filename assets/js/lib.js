export default {
  formatZipcodeString: str => {
    if (str.length > 0) {
      let result = str.replace(/\s/g, "");
      let firstChr = str.charAt(0);
      if (isNaN(firstChr) === false) {
        let rege = /^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i;
        if (rege.test(result) === true) {
          result = result.toUpperCase();
        } else {
          result = "zipcode-error";
        }
      } else {
        firstChr = firstChr.toUpperCase();
        result = result.toLowerCase();
        result = firstChr + result.slice(1, result.length);
      }
      return result;
    }
    return "";
  }
};
