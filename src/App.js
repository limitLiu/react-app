import React from "react";
import { RefDemo, ContextDemo, ChildrenMapDemo } from './components';

export function App() {
  return (
    <div className="App">
      <RefDemo/>
      <ContextDemo/>
      <ChildrenMapDemo>
        <span>1</span>
        <span>2</span>
      </ChildrenMapDemo>
    </div>
  );
}
