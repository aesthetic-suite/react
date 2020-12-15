import { Aesthetic } from '@aesthetic/core';
import { createClientEngine } from '@aesthetic/style';

const aesthetic = new Aesthetic();

aesthetic.configureEngine(createClientEngine());

export default aesthetic;
