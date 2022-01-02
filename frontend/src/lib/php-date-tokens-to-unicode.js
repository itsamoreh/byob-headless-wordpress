export default function phpDateTokensToUnicode(tokens) {
  // Convert PHP date tokens to Unicode Locale Data Markup.
  // @see https://www.php.net/manual/en/datetime.format.php
  // @see https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
  var conversions = {
    d: 'dd',
    D: 'iii',
    j: 'd',
    l: 'iiii',
    N: 'i',
    S: '',
    w: '',
    z: '',
    W: 'I',
    F: 'LLLL',
    m: 'LL',
    M: 'LLL',
    n: 'L',
    t: '',
    L: '',
    o: 'R',
    Y: 'yyyy',
    y: 'yy',
    a: 'aaa',
    A: 'aa',
    B: '',
    g: 'h',
    G: 'H',
    h: 'hh',
    H: 'HH',
    i: 'mm',
    s: 'ss',
    u: '',
    v: 'SSSS',
    e: 'zzz',
    I: '',
    O: 'xx',
    P: 'xxx',
    T: 'x',
    Z: '',
    c: '', // ISO 8601 date - 2004-02-12T15:19:21+00:00
    r: '', // RFC 2822 formatted date - Thu, 21 Dec 2000 16:01:07 +0200
    U: '',
  }

  return tokens.replace(/[A-Za-z]+/g, function (match) {
    return conversions[match] || match
  })
}
