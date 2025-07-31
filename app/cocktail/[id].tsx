import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Icon } from '@roninoss/icons';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { Container } from '~/components/Container';
import { BackButton } from '~/components/BackButton';
import { useCocktails } from '~/lib/hooks/useCocktails';
import { Cocktail } from '~/lib/types/cocktail';

const { width } = Dimensions.get('window');

export default function CocktailDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getCocktailById } = useCocktails();
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

  useEffect(() => {
    if (id) {
      const found = getCocktailById(id);
      setCocktail(found);
    }
  }, [id, getCocktailById]);

  if (!cocktail) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <View className="mb-4 flex-row items-center">
            <BackButton />
            <Text className="ml-2 text-lg font-semibold">Cocktail</Text>
          </View>

          <View className="flex-1 items-center justify-center">
            <Icon
              namingScheme="sfSymbol"
              name="exclamationmark.circle"
              size={48}
              className="mb-4 text-muted-foreground"
            />
            <Text className="mb-2 text-lg font-medium text-foreground">Cocktail not found</Text>
            <Text className="mb-4 text-center text-muted-foreground">
              The cocktail you&apos;re looking for doesn&apos;t exist.
            </Text>
            <Button onPress={() => router.back()}>
              <Text>Go Back</Text>
            </Button>
          </View>
        </Container>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        {/* Header */}
        <View className="px-4 pb-2 pt-4">
          <View className="mb-4 flex-row items-center">
            <BackButton />
          </View>
        </View>

        {/* Image */}
        {cocktail.image && (
          <View className="mb-6">
            <Image
              source={{ uri: cocktail.image }}
              style={{ width, height: width * 0.6 }}
              contentFit="cover"
            />
          </View>
        )}

        <Container>
          {/* Title and Info */}
          <View className="mb-6">
            <Text className="mb-2 text-2xl font-bold text-foreground">{cocktail.name}</Text>

            {cocktail.alternateName && (
              <Text className="mb-3 text-lg text-muted-foreground">{cocktail.alternateName}</Text>
            )}

            <View className="mb-4 flex-row flex-wrap gap-2">
              <View className="bg-primary/10 rounded-full px-3 py-1.5">
                <Text className="text-sm font-medium text-primary">{cocktail.category}</Text>
              </View>
              <View className="bg-secondary/20 rounded-full px-3 py-1.5">
                <Text className="text-sm text-secondary-foreground">{cocktail.alcoholic}</Text>
              </View>
              <View className="bg-accent/20 rounded-full px-3 py-1.5">
                <Text className="text-sm text-accent-foreground">{cocktail.glass}</Text>
              </View>
            </View>

            {cocktail.iba && (
              <View className="mb-4 rounded-lg border border-border bg-card p-3">
                <Text className="text-sm font-medium text-foreground">IBA Official Cocktail</Text>
                <Text className="text-sm text-muted-foreground">{cocktail.iba}</Text>
              </View>
            )}
          </View>

          {/* Ingredients */}
          <View className="mb-6">
            <Text className="mb-3 text-xl font-semibold text-foreground">Ingredients</Text>
            <View className="rounded-lg border border-border bg-card p-4">
              {cocktail.ingredients.map((ingredient, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between border-b border-border py-2 last:border-b-0">
                  <Text className="flex-1 font-medium text-foreground">{ingredient.name}</Text>
                  {ingredient.measure && (
                    <Text className="text-sm text-muted-foreground">{ingredient.measure}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Instructions */}
          <View className="mb-6">
            <Text className="mb-3 text-xl font-semibold text-foreground">Instructions</Text>
            <View className="rounded-lg border border-border bg-card p-4">
              <Text className="leading-6 text-foreground">{cocktail.instructions.en}</Text>
            </View>
          </View>

          {/* Glass Type */}
          <View className="mb-6">
            <Text className="mb-3 text-xl font-semibold text-foreground">Glassware</Text>
            <View className="rounded-lg border border-border bg-card p-4">
              <View className="flex-row items-center">
                <Icon
                  namingScheme="sfSymbol"
                  name="wineglass"
                  size={24}
                  className="mr-3 text-primary"
                />
                <Text className="font-medium text-foreground">{cocktail.glass}</Text>
              </View>
            </View>
          </View>

          {/* Tags */}
          {cocktail.tags.length > 0 && (
            <View className="mb-6">
              <Text className="mb-3 text-xl font-semibold text-foreground">Tags</Text>
              <View className="flex-row flex-wrap gap-2">
                {cocktail.tags.map((tag, index) => (
                  <View key={index} className="rounded-full bg-muted px-3 py-1.5">
                    <Text className="text-sm text-muted-foreground">{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Video Link */}
          {cocktail.video && (
            <View className="mb-6">
              <Button
                variant="secondary"
                onPress={() => {
                  // Handle video opening - could integrate with expo-web-browser
                  console.log('Open video:', cocktail.video);
                }}
                className="flex-row items-center">
                <Icon namingScheme="sfSymbol" name="play.fill" size={16} className="mr-2" />
                <Text>Watch Video Tutorial</Text>
              </Button>
            </View>
          )}

          {/* Attribution */}
          {(cocktail.imageSource || cocktail.imageAttribution) && (
            <View className="bg-muted/30 mb-6 rounded-lg border border-border p-3">
              <Text className="text-xs text-muted-foreground">
                {cocktail.imageSource && <>Source: {cocktail.imageSource}</>}
                {cocktail.imageAttribution && (
                  <>
                    {cocktail.imageSource ? ' • ' : ''}Attribution: {cocktail.imageAttribution}
                  </>
                )}
              </Text>
            </View>
          )}

          <View className="pb-8" />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}
