/* eslint-disable comma-dangle */
import React from 'react';
import {render} from 'react-dom';

import RootRoutes from './routes';

const rootElement = document.getElementById('root');
render(<RootRoutes />, rootElement);
