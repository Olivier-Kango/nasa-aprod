import React, { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getApods } from '../../redux/actions/apodActions';
import { Apod as ApodType } from '../../types/apodTypes';
import StarrySky from '../starySky/StarrySky'; // Importez le composant StarrySky
import styles from './Apod.module.css'; 

const Apod: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const apods = useSelector((state: RootState) => state.apods.apods);
  const error = useSelector((state: RootState) => state.apods.error);

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [count, setCount] = useState<number | undefined>(undefined);
  const [date, setDate] = useState<string>('');
  const [isGallery, setIsGallery] = useState<boolean>(false);
  

  useEffect(() => {
    dispatch(getApods(startDate, endDate, count, date));
  }, [count, date, dispatch, endDate, startDate]);

  const toggleGallery = () => {
    setIsGallery(!isGallery);
    if (isGallery) {
      setStartDate('');
      setEndDate('');
      setCount(undefined);
      setDate('');
    }
  };

 
  // Render a single APOD
  const renderApod = (apod: ApodType | null) => (
    <>
      <p>{apod?.date}</p>
      <div key={apod?.date} className={styles.singleCard}>
        <a href={apod?.hdurl}>
          <img src={apod?.hdurl} alt={apod?.title} />
        </a>
        <div className={styles.cardContent}>
          <h1>{apod?.title}</h1>
          <p>{apod?.explanation}</p>
        </div>
      </div>
    </>
  );

 
  return (
    <div className={styles.container}>
      <StarrySky />
      <h1 className={styles.headerTitle}>Astronomy Picture of the Day</h1>
      <p>
        <span className={styles.toggleLink} onClick={toggleGallery}>
          {isGallery ? 'Back to Home Page' : ' Discover our Image Gallery'}
        </span>
        {' '}
        ! &nbsp;Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.
      </p>
      <div className={styles.searchContainer}>
        {!isGallery ? (
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Date"
            className={styles.dateInput}
          />
        ) : (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
              className={styles.dateInput}
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
              className={styles.dateInput}
            />
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              placeholder="Or Search by Count"
              className={`${styles.dateInput} ${styles.hiddenInput}`}
            />
          </>
        )}
      </div>

      {error ? (
          <div className={styles.errorContainer}>
            <StarrySky error />
            <p className={styles.errorMessage}>{error}</p>
          </div>
        ) : !apods ? (
          <div className={styles.loadingContainer}>
            <StarrySky error />
            <RingLoader color="#123abc" size={200} />
          </div>
        ) : Array.isArray(apods) ?  (
        <div className={styles.gallery}>
          {apods.map((apod) => (
            <>
              <div key={apod.date} className={styles.card}>
                <a href={apod.url}>
                  <img src={apod.url} alt={apod.title} />
                </a>
                <div className={styles.cardContent}>
                  <p>{apod.date}</p>
                  <p className={styles.cardTitle}>{apod.title}</p>
                </div>
              </div>
            </>
          ))}
        </div>
      ) : (
        renderApod(apods)
      )}
  </div>
  );
};

export default Apod;
