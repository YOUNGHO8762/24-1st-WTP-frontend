import React, { Component } from 'react';
import MovieList from './MovieList/MovieList';
import MoviesCarousel from './MoviesCarousel/MoviesCarousel';
import './Main.scss';
import { GET_MOVIES_LIST } from '../../config';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      movies1: [],
      movies2: [],
      movies3: [],
      movies4: [],
    };
  }

  getData = (key, api) => {
    fetch(`${GET_MOVIES_LIST}${api}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          [key]: data.MOVIE_LIST,
        });
      });
  };

  componentDidMount() {
    this.getData('movies1', 'country=한국');
    this.getData('movies2', 'country=외국');
    this.getData('movies3', 'genre1=드라마&genre2=로맨스');
    this.getData('movies4', 'rating=0');
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { movies1, movies2, movies3, movies4 } = this.state;
    return (
      <main className="main">
        <MoviesCarousel />
        <MovieList collectionMovies="한국 영화 순위" data={movies1} />
        <MovieList collectionMovies="외국 영화 순위" data={movies2} />
        <MovieList collectionMovies="드라마 액션 순위" data={movies3} />
        <MovieList collectionMovies="별점 높은 영화" data={movies4} />
      </main>
    );
  }
}
