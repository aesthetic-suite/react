import React from 'react';
import aesthetic from './aesthetic';
import { DirectionContextType } from './types';

export default React.createContext<DirectionContextType>(aesthetic.getActiveDirection() || 'ltr');
