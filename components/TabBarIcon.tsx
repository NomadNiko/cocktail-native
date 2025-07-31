import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Icon } from '@roninoss/icons';
import { StyleSheet } from 'react-native';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'] | string;
  color: string;
  useNative?: boolean;
  fallbackName?: React.ComponentProps<typeof FontAwesome>['name'];
}) => {
  if (props.useNative) {
    return (
      <Icon
        namingScheme="sfSymbol"
        name={props.name as string}
        color={props.color}
        size={28}
        style={styles.tabBarIcon}
        fallback={
          props.fallbackName ? (
            <FontAwesome
              size={28}
              style={styles.tabBarIcon}
              name={props.fallbackName}
              color={props.color}
            />
          ) : undefined
        }
      />
    );
  }

  return (
    <FontAwesome
      size={28}
      style={styles.tabBarIcon}
      {...props}
      name={props.name as React.ComponentProps<typeof FontAwesome>['name']}
    />
  );
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
