import React from 'react';
import { AppColors } from '../styles';
import { View, Image, ViewProps, ImageStyle } from 'react-native';

export interface ThumbnailProps extends ViewProps {
  imagePath?: string;
  size?: number;
}

export const Thumbnail = ({
  imagePath,
  size = 52,
  style = {},
  ...otherProps
}: ThumbnailProps): JSX.Element => {
  const styles = {
    thumbnail: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    noImageThumbnail: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: AppColors.pink600,
      opacity: 0.93,
    },
  };

  return imagePath ? (
    <Image
      source={{ uri: imagePath }}
      style={[style as ImageStyle, styles.thumbnail]}
      {...otherProps}
    />
  ) : (
    <View style={[style, styles.noImageThumbnail]} {...otherProps} />
  );
};
