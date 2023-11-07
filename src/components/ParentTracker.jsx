import { useState } from 'react';
import TaskTracker from './TaskTracker';
import ToDo from './Todo';


function ParentTracker() {

  return (
    <div>
      <TaskTracker />
      <ToDo  />
    </div>
  );
}

export default ParentTracker;
