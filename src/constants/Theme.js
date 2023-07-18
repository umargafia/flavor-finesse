import { Dimensions, Platform } from 'react-native';

export const Theme = () => {
  return {
    palette: {
      primary: '#FFA500', // Orange
      secondary: '#FFFF00', // Yellow
      tertiary: '#fa6064',
      white: '#F8F8F8',
      black: '#424242',
      error: '#c5221f',
      link: '#486be8',
    },

    window: {
      windowWidth: Dimensions.get('window').width,
      windowHeight: Dimensions.get('window').height,
    },
    shadow: {
      elevation: 4,
      shadowColor: 'rgba(0, 0, 0, 0.5)',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.8,
      shadowRadius: 6,
    },
    ShadowLight: {
      elevation: 2,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
    },
    font: {
      firasansBold: 'firaSans-Bold',
      DancingScriptMedium: 'DancingScript-Medium',
      sansRegular: 'Belanosima-Regular',
    },
    os: Platform.OS,
  };
};
