import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovies,
  getUpcomingMovieImages,
  getPopularTv,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const dimensions = Dimensions.get('screen');

const Home = ({navigation}) => {
  const [upcomingMovieImages, setUpcomingMovieImages] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTvs, setPopularTvs] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);
  const [error, setError] = useState(false);

  const getData = () => {
    return Promise.all([
      getPopularMovies(),
      getUpcomingMovieImages(),
      getPopularTv(),
      getFamilyMovies(),
      getDocumentaryMovies(),
    ]);
  };

  useEffect(() => {
    getData()
      .then(
        ([
          popularMovieData,
          upcomingMovieImgData,
          popularTvData,
          familyMovieData,
          documentaryData,
        ]) => {
          setPopularMovies(popularMovieData);
          setUpcomingMovieImages(upcomingMovieImgData);
          setPopularTvs(popularTvData);
          setFamilyMovies(familyMovieData);
          setDocumentaryMovies(documentaryData);
        },
      )
      .catch(err => setError(err));
  }, []);

  return (
    <React.Fragment>
      <ScrollView>
        {upcomingMovieImages ? (
          <View style={styles.sliderContainer}>
            <SliderBox
              images={upcomingMovieImages}
              autoplay={true}
              circleLoop={true}
              sliderBoxHeight={dimensions.height / 1.5}
              dotStyle={styles.sliderStyle}
            />
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}

        {/* Popular Movies */}
        {popularMovies ? (
          <View style={styles.sliderContainer}>
            <List
              title="Popular Movies"
              content={popularMovies}
              navigation={navigation}
            />
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}

        {/* Popular Tvs */}
        {popularTvs ? (
          <View style={styles.sliderContainer}>
            <List
              title="Popular Tv Shows"
              content={popularTvs}
              navigation={navigation}
            />
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}

        {/* Family Movies */}
        {familyMovies ? (
          <View style={styles.sliderContainer}>
            <List
              title="Family Movies"
              content={familyMovies}
              navigation={navigation}
            />
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}

        {/* Documentary Movies */}
        {documentaryMovies ? (
          <View style={styles.sliderContainer}>
            <List
              title="Documentary Movies"
              content={documentaryMovies}
              navigation={navigation}
            />
          </View>
        ) : (
          <ActivityIndicator size="large" />
        )}
      </ScrollView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  sliderStyle: {
    height: 0,
  },
});

export default Home;
