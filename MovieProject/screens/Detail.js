import React, {useState, useEffect} from 'react';
import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import dateFormat from 'dateformat';
import {getMovie} from '../services/services';
import PlayButton from '../components/PlayButton';
import {IMAGE_PATH, DATE_FORMAT} from '../constants';
import CustomModal from '../components/CustomModal';
const placeholderImg = require('../assets/images/placeholder.png');
const dimensions = Dimensions.get('screen');
const imgHeight = dimensions.height / 2;

const Detail = ({route, navigation}) => {
  const {movieId} = route.params;
  const [movieDetail, setMovieDetail] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getMovie(movieId)
      .then(detailData => {
        setMovieDetail(detailData);
        setLoaded(true);
      })
      .catch(err => setError(err));
  }, [movieId]);

  const styledImage = () => {
    return (
      <Image
        style={styles.image}
        source={
          movieDetail.poster_path
            ? {uri: `${IMAGE_PATH}${movieDetail.poster_path}`}
            : placeholderImg
        }
      />
    );
  };

  const renderRating = () => {
    return (
      movieDetail.vote_average && (
        <StarRating
          maxStars={5}
          disabled={true}
          rating={movieDetail.vote_average / 2}
          fullStarColor="gold"
          starSize={30}
        />
      )
    );
  };

  const handleButtonClick = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <React.Fragment>
      {loaded ? (
        <View>
          <ScrollView>
            {styledImage()}
            <View style={styles.container}>
              <View style={styles.playButton}>
                <PlayButton handleButtonClick={handleButtonClick} />
              </View>
              <Text style={styles.movieTitle}>{movieDetail.title}</Text>

              {movieDetail.genres && (
                <View style={styles.genresContainer}>
                  {movieDetail.genres.map(genre => (
                    <Text key={genre.id} style={styles.movieGenre}>
                      {genre.name}
                    </Text>
                  ))}
                </View>
              )}
              {renderRating()}
              <Text style={styles.overview}>{movieDetail.overview}</Text>
              {movieDetail.release_date && (
                <Text style={styles.releaseDate}>
                  Release Date:{' '}
                  {dateFormat(movieDetail.release_date, DATE_FORMAT)}
                </Text>
              )}
            </View>
          </ScrollView>
          <CustomModal
            modalVisible={modalVisible}
            handleButtonClick={handleButtonClick}
            navigation={navigation}
          />
        </View>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    height: imgHeight,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  genresContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  movieGenre: {
    marginRight: 8,
    fontWeight: 'bold',
    marginTop: 10,
  },
  overview: {
    padding: 15,
  },
  releaseDate: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
});

export default Detail;
