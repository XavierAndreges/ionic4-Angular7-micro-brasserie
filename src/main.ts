import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));


  function androidFetchWorkaround() {
    const originalFetch = (window as any).fetch;
  
    (window as any).fetch = (...args) => {
      const [url] = args;
  
      if (typeof url === 'string' && url.match(/\.svg/)) {
        return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();
          req.open('GET', url, true);
          req.addEventListener('load', () => {
            resolve({ ok: true, text: () => Promise.resolve(req.responseText) });
          });
          req.addEventListener('error', reject);
          req.send();
        });
      } else {
        return originalFetch(...args);
      }
    };
  }

  androidFetchWorkaround();