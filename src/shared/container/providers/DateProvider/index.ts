import { container } from 'tsyringe';

import { IDateProvider } from './IDateProvider';
import { DateJsProvider } from './implementations/DateJsProvider';

container.registerSingleton<IDateProvider>('DateJsProvider', DateJsProvider);
