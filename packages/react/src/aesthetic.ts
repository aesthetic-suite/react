import { Aesthetic, LocalBlock } from '@aesthetic/core';
import { createClientEngine } from '@aesthetic/style';
import { ClassName } from '@aesthetic/types';

const aesthetic = new Aesthetic<ClassName, LocalBlock>();

aesthetic.configureEngine(createClientEngine());

export default aesthetic;
