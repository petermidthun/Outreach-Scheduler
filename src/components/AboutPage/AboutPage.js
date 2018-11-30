import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        This application helps instructors with scheduling and feedback around the various programs they need to go out and present.
      </p>
    </div>
    <div>
      <p>
        Technologies:  Javascript, Html, Node, sql, express, React, 
      </p>
    </div>
  </div>
);

export default AboutPage;
