import React from 'react';
import sessiontimeout from '../../../assets/img/Logo.svg';
import Frame from '../../../assets/img/Frame.png';

const SessionTimeOut = () => {


  return (
    <>
      <div classNames="mt-5">
        <div className='mt-4 text-center'>
          <img src={sessiontimeout} className='img-fluid' />
        </div>

        <div className='text-center mt-5'>
          <img src={Frame} className='img-fluid' />
        </div>

        <div className='text-center mt-3'>
          <span style={{ fontSize: '32px', fontWeight: '600', color: '#1e98b0' }}>Your session has expired</span>
        </div>

        <div className='text-center mt-3'>
          <span style={{ fontSize: '27px', fontWeight: '400', color: '#000000' }}>Please Login again</span>
        </div>

        <div className='text-center mt-3'>
          <button onClick={() => {
            window.location.href = '/';
          }} className='px-5 py-2' style={{ backgroundColor: 'rgb(252 115 0)', color: 'white', borderRadius: '69px', fontSize: '24px', fontWeight: '400', border: '0' }}>Login</button>
        </div>

      </div>
    </>

  );
};

export default SessionTimeOut;
