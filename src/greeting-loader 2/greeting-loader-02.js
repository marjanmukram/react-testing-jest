import React, { useState } from "react";
import * as api from "./api";

const GreetingLoader = ({ loadGreeting = api.loadGreeting }) => {
  const [greeting, setGreeting] = useState("");
  const loadGreetingForInput = async e => {
    e.preventDefault();
    const { data } = await loadGreeting(e.target.elements.name.value);
    setGreeting(data.greeting);
  };
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor='name'>Name</label>
      <input id='name' />
      <button type='submit'>Load Greeting</button>
      <div aria-label='greeting'>{greeting}</div>
    </form>
  );
};

export default GreetingLoader;
