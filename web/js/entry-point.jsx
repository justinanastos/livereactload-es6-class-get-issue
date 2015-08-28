import $ from 'jquery';
import React from 'react/addons';
// import Example from './Example';

const Example = require('./Example');
const el = $('.example').get(0);

React.render(<Example />, el);
