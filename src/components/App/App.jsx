import { Oval } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';

import SearchBar from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import FetchQuery from 'API/Api';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loaderDisabled, setLoaderDisabled] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setStatus('pending');

    FetchQuery(query, page)
      .then(ruk => {
        const totalData = [...data, ...ruk.hits];

        setData(totalData);
        setStatus('resolve');

        if (totalData.length === ruk.totalHits) {
          setLoaderDisabled(true);
          return;
        }

        setLoaderDisabled(false);
      })
      .catch(error => console.log(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page]);

  const receiveSubmit = query => {
    setQuery(query);
    reset();
  };

  const pageIncrement = () => {
    setPage(page + 1);
  };

  const reset = () => {
    setData([]);
    setPage(1);
  };

  const changeModalData = () => {
    setModalData(null);
  };

  const receiveImage = e => {
    if (e.target.nodeName !== 'IMG') {
      return;
    }

    const fil = data.filter(i => i.webformatURL === e.target.src);

    setModalData({
      src: fil[0].largeImageURL,
      alt: fil[0].tags,
    });
  };

  return (
    <div className="container">
      <SearchBar submit={receiveSubmit} />

      {status === 'resolve' || status === 'pending' ? (
        <ImageGallery data={data} onClick={receiveImage} />
      ) : null}

      {status === 'pending' ? (
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass="loader"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : null}

      {status === 'resolve' && data.length >= 12 ? (
        <Loader onClick={pageIncrement} dis={loaderDisabled} />
      ) : null}

      {modalData && <Modal data={modalData} onClose={changeModalData} />}
    </div>
  );
}

export default App;
