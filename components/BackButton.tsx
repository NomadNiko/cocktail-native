import { Icon } from '@roninoss/icons';
import { router } from 'expo-router';
import { Pressable } from 'react-native';
import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';

interface BackButtonProps {
  onPress?: () => void;
  className?: string;
}

export const BackButton = ({ onPress, className }: BackButtonProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.back();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn('ios:active:opacity-70 flex-row items-center', className)}>
      <Icon namingScheme="sfSymbol" name="chevron.left" size={20} className="mr-1 text-primary" />
      <Text className="font-medium text-primary">Back</Text>
    </Pressable>
  );
};
