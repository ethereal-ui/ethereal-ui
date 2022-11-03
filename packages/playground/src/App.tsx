import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { Button } from './components/index.js';

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Button>Hello Ethereal UI</Button>
    </div>
  );
};

export default App;
