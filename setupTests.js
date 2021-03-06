global.requestAnimationFrame = cb => setTimeout(cb, 0);

global.matchMedia =
  window.matchMedia
  || function() {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  };

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });
