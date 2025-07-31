import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Image } from 'expo-image';
import { Text } from '~/components/nativewindui/Text';
import { cn } from '~/lib/cn';
import { Cocktail } from '~/lib/types/cocktail';

interface CocktailCardProps {
  cocktail: Cocktail;
  className?: string;
}

export function CocktailCard({ cocktail, className }: CocktailCardProps) {
  const handlePress = () => {
    router.push(`/cocktail/${cocktail.id}`);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={cn(
        'ios:active:opacity-80 mb-3 rounded-lg border border-border bg-card p-4',
        className
      )}>
      <View className="flex-row">
        <View className="flex-1">
          <Text className="mb-1 text-lg font-semibold text-foreground">{cocktail.name}</Text>

          {cocktail.alternateName && (
            <Text className="mb-2 text-sm text-muted-foreground">{cocktail.alternateName}</Text>
          )}

          <View className="mb-2 flex-row flex-wrap gap-2">
            <View className="bg-primary/10 rounded-full px-2 py-1">
              <Text className="text-xs font-medium text-primary">{cocktail.category}</Text>
            </View>
            <View className="bg-secondary/20 rounded-full px-2 py-1">
              <Text className="text-xs text-secondary-foreground">{cocktail.alcoholic}</Text>
            </View>
          </View>

          <Text className="mb-2 text-sm text-muted-foreground">Glass: {cocktail.glass}</Text>

          <Text className="text-sm text-muted-foreground" numberOfLines={2}>
            {cocktail.ingredients
              .slice(0, 3)
              .map((ing) => ing.name)
              .join(', ')}
            {cocktail.ingredients.length > 3 && '...'}
          </Text>
        </View>

        {cocktail.image && (
          <View className="ml-3">
            <Image
              source={{ uri: cocktail.image }}
              style={{ width: 80, height: 80 }}
              className="rounded-lg"
              contentFit="cover"
            />
          </View>
        )}
      </View>
    </Pressable>
  );
}
