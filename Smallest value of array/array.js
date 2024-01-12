function min(arr, toReturn) {
    var val = Math.min.apply(null, arr);
  
    return toReturn == 'value' ? val : arr.indexOf(val);
  }

  const Test = require('@codewars/test-compat');

describe("Tests", () => {
  it("test", () => {
    Test.assertEquals(min([1,2,3,4,5], 'value'), 1);
    Test.assertEquals(min([1,2,3,4,5], 'index'), 0);
  });
});
