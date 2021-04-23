/**
 * Helper to encode, decode, and break apart a URL 
 *
 * @example
 *   {{uri "encodeURI" "URL"}}   
 *   {{uri "decodeURIComponent" "URL"}} 
 *
 * @param {string} operator or method 
 * @param {string} string    
 * @returns {any}  result
 */

module.exports = function(operator, string) {
  const URL = (typeof string === 'string') ? string : string.toString();
  const segments = URL.match('://') ? URL.split('://',2) : [URL];
    switch (operator) {
    case 'decodeURI':
      return decodeURI(URL);
    case 'decodeURIComponent':
      return decodeURIComponent(URL);
    case 'encodeURI':
      return encodeURI(URL);
    case 'encodeURIComponent':
      return encodeURIComponent(URL);
    case 'getHash':
      const hash = URL.match('#') ? URL.split('#')[1] : '';
      return null;
    case 'getHostName':
      return segments[1].split(/[/?#]/)[0];
    case 'getPageName':
      if (URL.lastIndexOf('/') >= 0 ){
        return URL.slice(URL.lastIndexOf('/') - URL.length +1).split(/[?#]/)[0];
      }
      else {
        return null;
      }
    case 'getProtocol':
      return URL.split('://',2)[0];
    case 'getRelativePath':
      if (segments.length > 1 && segments[1].indexOf('/') >= 0 ){
        return segments[1].slice(segments[1].indexOf('/')).split(/[?#]/)[0];
      }
      else {
        return "/";
      }
    case 'getQueryString':
      return URL.split('?',2)[1].split('#')[0];
    case 'stripProtocol':
      return URL.split(':',2)[1];
    case 'stripQueryString':
      return URL.split('?',2)[0];
    default:
      return URL;
  }
}