// StateContext.jsx
import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export function StateProvider({ children }) {
  const [taskCount, setTaskCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);

  return (
    <StateContext.Provider value={{ taskCount, setTaskCount, eventCount, setEventCount }}>
      {children}
    </StateContext.Provider>
  );
}

export function useAppState() {
  return useContext(StateContext);
}
