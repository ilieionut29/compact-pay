import { AiFillWarning } from 'react-icons/ai';

import './style.scss';

const WarningMessage = () => {
  return (
    <div className='warning'>
      <AiFillWarning />
      <span>
        Please do not add real information about your credit cards on this site.
        This is a demo project, to showcase my coding skills to potential
        employers.
      </span>
    </div>
  );
};

export default WarningMessage;
