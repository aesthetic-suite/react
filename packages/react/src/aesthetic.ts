import { Aesthetic, ClassName, ElementStyles } from '@aesthetic/core';
import { createClientEngine } from '@aesthetic/style';

const aesthetic = new Aesthetic<ClassName, ElementStyles>();

aesthetic.configureEngine(createClientEngine());

export default aesthetic;
