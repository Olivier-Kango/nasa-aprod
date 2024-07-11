import React, { useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { allApods } from '../../redux/actions/apodActions';

const Apod: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const apods = useSelector((state: RootState) => state.apods.apods);

  useEffect(() => {
    dispatch(allApods());
  }, [dispatch]);

  if (!apods) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <RingLoader color="#123abc" size={200} />
        <p className="s">
          Loading...
        </p>
      </div>
    );
  }

 
  return (
    <div>
      <h1>{apods.title}</h1>
      <img src={apods.hdurl} alt={apods.title} style={{ maxWidth: '70%', height: 'auto' }} />
      <p>{apods.explanation}</p>
      <p>{apods.date}</p>
    </div>
  );
};

export default Apod;
