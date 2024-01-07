import React, { useEffect } from 'react';

const Error = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>404: Project Not Found!</div>;
};

export default Error;
