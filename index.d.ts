import * as https from 'https';
import * as http from 'http';
import * as url from 'url';
import { Readable, Writable } from 'stream';
import { EventEmitter } from 'events';

declare interface IRequestOptions {
  /** Request method, defaults to GET. Could be GET, POST, DELETE or PUT. Alias 'type'. */
  method?: "GET" | "POST" | "DELETE" | "PUT";
  /** Data to be sent. Will be stringify automatically. */
  data?: object;
  /** Force convert data to query string. */
  dataAsQueryString?: boolean;
  /** Manually set the content of payload. If set, data will be ignored. */
  content?: string | Buffer;
  /** Stream to be pipe to the remote.If set, data and content will be ignored. */
  stream?: Readable;
  /**
   * A writable stream to be piped by the response stream.
   * Responding data will be write to this stream and callback
   * will be called with data set null after finished writing.
   */
  writeStream?: Writable;
  /** consume the writeStream, invoke the callback after writeStream close. */
  consumeWriteStream?: boolean;
  /** Type of request data.Could be json.If it's json, will auto set Content-Type: application/json header. */
  contentType?: string;
  /**
   * urllib default use querystring to stringify form data which don't support nested object,
   * will use qs instead of querystring to support nested object by set this option to true.
   */
  nestedQuerystring?: boolean;
  /**
   * Type of response data. Could be text or json.
   * If it's text, the callbacked data would be a String.
   * If it's json, the data of callback would be a parsed JSON Object
   * and will auto set Accept: application/json header. Default callbacked data would be a Buffer.
   */
  dataType?: string;
  /** Fix the control characters (U+0000 through U+001F) before JSON parse response. Default is false. */
  fixJSONCtlChars?: boolean;
  /** Request headers. */
  headers?: object;
  /**
   * Request timeout in milliseconds for connecting phase and response receiving phase.
   * Defaults to exports.
   * TIMEOUT, both are 5s.You can use timeout: 5000 to tell urllib use same timeout on two phase or set them seperately such as
   * timeout: [3000, 5000], which will set connecting timeout to 3s and response 5s.
   */
  timeout?: number | number[];
  /** username:password used in HTTP Basic Authorization. */
  auth?: string;
  /** username:password used in HTTP Digest Authorization. */
  digestAuth?: string;
  /** HTTP Agent object.Set false if you does not use agent. */
  agent?: http.Agent;
  /** HTTPS Agent object. Set false if you does not use agent. */
  httpsAgent?: https.Agent;
  /**
   * An array of strings or Buffers of trusted certificates.
   * If this is omitted several well known "root" CAs will be used, like VeriSign.
   * These are used to authorize connections.
   * Notes: This is necessary only if the server uses the self - signed certificate
   */
  ca?: string | Buffer | string[] | Buffer[];
  /**
   * If true, the server certificate is verified against the list of supplied CAs.
   * An 'error' event is emitted if verification fails.Default: true.
   */
  rejectUnauthorized?: boolean;
  /** A string or Buffer containing the private key, certificate and CA certs of the server in PFX or PKCS12 format. */
  pfx?: string | Buffer;
  /**
   * A string or Buffer containing the private key of the client in PEM format.
   * Notes: This is necessary only if using the client certificate authentication
   */
  key?: string | Buffer;
  /**
   * A string or Buffer containing the certificate key of the client in PEM format.
   * Notes: This is necessary only if using the client certificate authentication
   */
  cert?: string | Buffer;
  /** A string of passphrase for the private key or pfx. */
  passphrase?: string;
  /** A string describing the ciphers to use or exclude. */
  ciphers?: string;
  /** The SSL method to use, e.g.SSLv3_method to force SSL version 3. */
  secureProtocol?: string;
  /** follow HTTP 3xx responses as redirects. defaults to false. */
  followRedirect?: boolean;
  /** The maximum number of redirects to follow, defaults to 10. */
  maxRedirects?: number
  /** Format the redirect url by your self. Default is url.resolve(from, to). */
  formatRedirectUrl?: Function;
  /** Before request hook, you can change every thing here. */
  beforeRequest?: Function;
  /** let you get the res object when request connected, default false. alias customResponse */
  streaming?: boolean;
  /** Accept gzip response content and auto decode it, default is false. */
  gzip?: boolean;
  /** Enable timing or not, default is false. */
  timing?: boolean;
  /** Enable proxy request, default is false. */
  enableProxy?: boolean;
  /** proxy agent uri or options, default is null. */
  proxy?: string | object;
}

/**
 * @param err Error
 * @param data Outgoing message
 * @param res http response
 */
type Callback = (err: Error, data: any, res: http.IncomingMessage) => void;

/**
 * Handle all http request, both http and https support well.
 *
 * @example
 * // GET http://httptest.cnodejs.net
 * urllib.request('http://httptest.cnodejs.net/test/get', function(err, data, res) {});
 * // POST http://httptest.cnodejs.net
 * var args = { type: 'post', data: { foo: 'bar' } };
 * urllib.request('http://httptest.cnodejs.net/test/post', args, function(err, data, res) {});
 *
 * @param url The URL to request, either a String or a Object that return by url.parse.
 * @param options Optional, @see IRequestOptions.
 */
declare function request(url: string | url.URL, options?: IRequestOptions): Promise<any>;
/**
 * @param url The URL to request, either a String or a Object that return by url.parse.
 * @param callback @see Callback
 */
declare function request(url: string | url.URL, callback: Callback): void;
/**
 * @param url The URL to request, either a String or a Object that return by url.parse.
 * @param options Optional, @see IRequestOptions.
 * @param callback @see Callback
 */
declare function request(url: string | url.URL, options: IRequestOptions, callback: Callback): void;

/**
 * Handle request with a callback.
 * @param url The URL to request, either a String or a Object that return by url.parse.
 * @param callback @see Callback
 */
declare function requestWithCallback(url: string | url.URL, callback: Callback): void;
/**
* @param url The URL to request, either a String or a Object that return by url.parse.
* @param options Optional, @see IRequestOptions.
* @param callback @see Callback
*/
declare function requestWithCallback(url: string | url.URL, options: IRequestOptions, callback: Callback): void;

/**
 * yield urllib.requestThunk(url, args)
 * @param url The URL to request, either a String or a Object that return by url.parse.
 * @param options Optional, @see IRequestOptions.
 */
declare function requestThunk(url: string | url.URL, options: IRequestOptions): (callback: Function) => void;

/**
 * alias to request.
 * Handle all http request, both http and https support well.
 *
 * @example
 * // GET http://httptest.cnodejs.net
 * urllib.request('http://httptest.cnodejs.net/test/get', function(err, data, res) {});
 * // POST http://httptest.cnodejs.net
 * var args = { type: 'post', data: { foo: 'bar' } };
 * urllib.request('http://httptest.cnodejs.net/test/post', args, function(err, data, res) {});
 *
 * @param url The URL to request, either a String or a Object that return by url.parse.
 * @param options Optional, @see IRequestOptions.
 */
declare function curl(url: string | url.URL, options?: IRequestOptions): Promise<any>;
/**
 * @param url The URL to request, either a String or a Object that return by url.parse.
 * @param callback @see Callback
 */
declare function curl(url: string | url.URL, callback: Callback): void;
/**
 * @param url The URL to request, either a String or a Object that return by url.parse.
 * @param options Optional, @see IRequestOptions.
 * @param callback @see Callback
 */
declare function curl(url: string | url.URL, options: IRequestOptions, callback: Callback): void;


/**
 * The default request timeout(in milliseconds).
 * @type {Number}
 * @const
 */
declare const TIMEOUT: number;
/**
 * The default request & response timeout(in milliseconds).
 * @type {Array}
 * @const
 */
declare const TIMEOUTS: [number, number];

/**
 * Request user agent.
 * @type {String}
 * @const
 */
declare const USER_AGENT: string;

/**
 * Request http agent.
 * @type {http.Agent}
 */
declare const agent: http.Agent;

/**
 * Request https agent.
 * @type {https.Agent}
 */
declare const httpsAgent: https.Agent;

declare class HttpClient extends EventEmitter {
  constructor(options?: IRequestOptions);

  request(url: string | url.URL, callback: Callback): void;
  request(url: string | url.URL, options: IRequestOptions, callback: Callback): void;

  curl(url: string | url.URL, callback: Callback): void;
  curl(url: string | url.URL, options: IRequestOptions, callback: Callback): void;

  requestThunk(url: string | url.URL, options?: IRequestOptions): (callback: Function) => void;
}

/**
 * request method only return a promise,
 * compatible with async/await and generator in co.
 * @constructor {IRequestOptions} Optional @see IRequestOptions
 */
declare class HttpClient2 extends EventEmitter {
  constructor(options?: IRequestOptions);

  request(url: string | url.URL, options?: IRequestOptions): Promise<any>;

  curl(url: string | url.URL, options?: IRequestOptions): Promise<any>;

  requestThunk(url: string | url.URL, options?: IRequestOptions): (callback: Function) => void;
}

/**
 * Create a HttpClient incetance.
 * @param options
 * @return {HttpClient} HttpClient incetance.
 */
declare function create(options?: IRequestOptions): HttpClient;
