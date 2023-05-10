import React, {useState, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import RowView from '../components/RowView';
import Separator from '../components/Separator';
import {formatDOB, getJoiningDate, getPdfContent} from '../utils';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {DateTime} from 'luxon';
import {useFetchUserById} from '../store/hooks';

const ProfileScreen = () => {
  const {params} = useRoute();
  const [downloading, setDownloading] = useState(false);
  const navigation = useNavigation();
  const user = useFetchUserById(params?.userId);

  useEffect(() => {
    navigation.setOptions({title: `${user?.name?.first} ${user?.name?.last}`});
  }, []);

  //   const downloadiOSFile = async url => {
  //     setDownloading(true);
  //     const filePath =
  //       ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + DateTime.now() + '.pdf';

  //     return ReactNativeBlobUtil.config({
  //       fileCache: true,
  //       path: filePath,
  //     })
  //       .fetch('GET', url)
  //       .then(async res => {
  //         notifyUser();
  //       });
  //   };

  const dateJoined = useMemo(() => {
    return getJoiningDate(user?.registered?.date);
  }, [params]);

  const dob = useMemo(() => {
    return formatDOB(user?.dob?.date);
  }, [params]);

  const onDownload = async () => {
    setDownloading(true);
    let options = {
      html: getPdfContent(user, dateJoined, dob),
      fileName: `document-${DateTime.now()}`,
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    setDownloading(false);
    console.log('file path', file.filePath);
    Alert.alert('File Downloaded', `Pdf downloaded to ${file.filePath}`, [
      {text: 'OK', onPress: () => {}},
    ]);

    // if (Platform.OS === 'ios') {
    // //   downloadiOSFile(filePath);
    // } else {
    //   Alert.alert('File Downloaded', `Pdf downloaded to ${file.filePath}`, [
    //     {text: 'OK', onPress: () => {}},
    //   ]);
    // }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.profilePicture}
        resizeMode="cover"
        source={{uri: user?.picture?.large}}
      />

      <View style={styles.ageView}>
        <Text style={styles.ageStyle}>{user?.dob?.age}</Text>
      </View>
      <Separator dark />

      <RowView header="Email" value={user?.email} />
      <RowView header="Date Joined" value={dateJoined} />
      <RowView header="DOB" value={dob} />

      <Text style={{marginTop: 16}}>LOCATION</Text>
      <Separator dark style={styles.marginT6} />

      <RowView header="city" value={user?.location?.city} />
      <RowView header="state" value={user?.location?.state} />
      <RowView header="country" value={user?.location?.country} />
      <RowView header="postcode" value={user?.location?.postcode} />

      <Pressable
        disabled={downloading}
        onPress={onDownload}
        style={styles.downloadButton}>
        <Text style={styles.downloadText}>Download Profile</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  marginT6: {marginTop: 6},
  ageView: {
    position: 'absolute',
    marginTop: Dimensions.get('screen').height / 3 - 42,
    right: '8%',
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    borderWidth: 3,
    borderColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
  },
  ageStyle: {
    transform: [{rotate: '-45deg'}],
  },
  profilePicture: {
    width: '80%',
    height: Dimensions.get('screen').height / 3,
    alignSelf: 'center',
  },
  downloadButton: {
    backgroundColor: 'orange',
    borderRadius: 10,
    marginTop: 16,
  },
  downloadText: {
    padding: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});

export default ProfileScreen;
