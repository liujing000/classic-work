import http from 'http';
import { URL } from 'url';

let rootUrl = 'http://172.16.1.26/tp5/public/index.php/bench/classic';
// rootUrl = '';

const request = {
  get(url, callback, headers) {
    const urlObject = new URL(rootUrl + url);
    const options = {
      hostname: urlObject.hostname,
      port: urlObject.port ? urlObject.port : 80,
      path: urlObject.pathname,
      method: 'GET',
      headers: {
        Application: 'mb-custom',
      },
    };
    if (headers.cookie) {
      options.headers.Cookie = headers.cookie;
    }
    const req = http.request(options, res => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        if (callback) {
          callback(rawData, res.statusCode);
        }
      });
    });
    req.end();
  },
  post(url, body, callback, headers) {
    const postData = JSON.stringify(body);
    if (url === '/wander/user/login') {
      url = '../../../wander/classic/user/login';
    }
    const urlObject = new URL(rootUrl + url);
    console.log(urlObject);
    const options = {
      hostname: urlObject.hostname,
      port: urlObject.port ? urlObject.port : 80,
      path: urlObject.pathname,
      method: 'POST',
      headers: {
        Application: 'mb-custom',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      },
    };
    if (headers.cookie) {
      options.headers.Cookie = headers.cookie;
    }
    const req = http.request(options, res => {
      res.setEncoding('utf8');
      let rawData = '';
      res.on('data', chunk => {
        rawData += chunk;
      });
      res.on('end', () => {
        if (callback) {
          callback(rawData, res.statusCode, res.headers);
        }
      });
    });
    req.write(postData);
    req.end();
  },
  fix(req, resp) {
    if (req.method == 'GET') {
      request.get(
        req.url,
        (res, code) => {
          resp.status(code).send(res);
        },
        {
          cookie: req.headers['cookie'],
        }
      );
    }
    if (req.method == 'POST') {
      let body = req.body;
      request.post(
        req.url,
        body,
        (res, code, headers) => {
          if (headers['set-cookie']) {
            resp.setHeader('Set-Cookie', headers['set-cookie']);
          }
          resp.status(code).send(res);
        },
        {
          cookie: req.headers['cookie'],
        }
      );
    }
  },
};

export function proxy(apiDefines) {
  const allApis = {};
  for (const key in apiDefines) {
    const keyPieces = key.split(' ');
    if (keyPieces[1].slice(0, 5) === '/api/' || !rootUrl) {
      allApis[key] = apiDefines[key];
    } else {
      allApis[key] = (req, resp) => {
        request.fix(req, resp);
      };
    }
  }
  return allApis;
  console.log(allApis);
}
