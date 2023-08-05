import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {registerLicense} from '@syncfusion/ej2-base'


registerLicense("Ngo9BigBOggjHTQxAR8/V1NGaF1cWGhBYVB3WmFZfV1gcl9EZVZTQmY/P1ZhSXxQdk1jWH5Wcn1UQmlfUk0=")
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
