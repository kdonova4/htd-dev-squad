import React from 'react';
import ReactDOM from 'react-dom';
import { RestroomProvider } from './RestroomContext';  // Adjust the path as needed
import App from './App';

ReactDOM.render(
  <RestroomProvider>
    <App />
  </RestroomProvider>,
  document.getElementById('root')
);
