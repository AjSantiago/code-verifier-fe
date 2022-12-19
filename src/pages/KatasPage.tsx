import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../hooks/useSessionStorage';
import { getAllKatas } from '../services/katasService';
import { AxiosResponse } from 'axios';
import { Kata } from '../utils/types/Kata.type';

export const KatasPage = () => {
  let loggedIn = useSessionStorage('sessionJWTToken');
  //* Variable to navigate between stack of routes
  let navigate = useNavigate();
  const [katas, setKatas] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loggedIn) {
      return navigate('/login');
    } else {
      getAllKatas(loggedIn, 2, 1)
        .then((response: AxiosResponse) => {
          if (
            response.status === 200 &&
            response.data.katas &&
            response.data.totalPages &&
            response.data.currentPage
          ) {
            console.table(response.data);
            let { katas, totalPage, currentPage } = response.data;
            setKatas(katas);
            setTotalPages(totalPage);
            setCurrentPage(currentPage);
          } else {
            throw new Error(`Error obtaining katas: ${response.data}`);
          }
        })
        .catch((error) => console.error(`Get all katas error ${error}`));
    }
  }, [loggedIn]);

  /**
   * Method to navigate to Kata details
   * @param id of Kata to navigate to
   */
  const navigateToKataDetail = (id: number) => {
    navigate(`/katas/${id}`);
  };

  return (
    <div>
      <h1>Katas Page</h1>
      {katas.length > 0 ? (
        <div>
          {/* TODO: Export to isolated component */}
          {katas.map((kata: Kata) => (
            <div key={kata._id}>
              <h3 onClick={() => navigateToKataDetail(kata._id)}>
                {kata.name}
              </h3>
              <h4>{kata.description}</h4>
              <h5>Creator: {kata.creator}</h5>
              <h5>Rating: {kata.stars}/5</h5>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h5>No katas found</h5>
        </div>
      )}
    </div>
  );
};
