// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import ComponentRepository from './architecture/componentRepository';
import svg4Everybody from './vendor/SVG4Everybody.js';

svg4Everybody();

document.addEventListener("DOMContentLoaded", function () {
    window.cr = new ComponentRepository();
    window.cr.load();
});
