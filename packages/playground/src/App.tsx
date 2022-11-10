import type { Component } from 'solid-js';

import styles from './App.module.css';
import { Button } from './classic-theme/Button.js';
import { Dialog } from './classic-theme/Dialog.js';

const App: Component = () => {
  return (
    <div>
      <Dialog />
      <Button variant="outline">Hello Ethereal UI</Button>
    </div>
  );
};

export default App;
