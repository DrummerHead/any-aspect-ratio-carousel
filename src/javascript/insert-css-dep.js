import { readFileSync } from 'fs';
import insertCss from 'insert-css';
import { join } from 'path';

// TODO: Find a way to not require join codebase
const css = readFileSync(join(__dirname, '../../.tmp/stylesheets/main.css'), 'utf8');
insertCss(css);

export default () => insertCss(css);
