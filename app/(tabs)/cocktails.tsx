import React, { useState, useEffect, useMemo } from 'react';
import { View, TextInput, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@roninoss/icons';
import { Text } from '~/components/nativewindui/Text';
import { Button } from '~/components/nativewindui/Button';
import { Container } from '~/components/Container';
import { CocktailCard } from '~/components/CocktailCard';
import { SearchFilters } from '~/components/SearchFilters';
import { useCocktails } from '~/lib/hooks/useCocktails';
import { SearchFilters as SearchFiltersType, Cocktail } from '~/lib/types/cocktail';

export default function CocktailsScreen() {
  const {
    cocktails,
    isLoading,
    error,
    searchCocktails,
    getAllCocktails,
    getCategories,
    getGlassTypes,
    getStats,
  } = useCocktails();

  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({});
  const [showFilters, setShowFilters] = useState(false);
  const [searchResults, setSearchResults] = useState<Cocktail[]>([]);

  // Get filter options
  const categories = useMemo(() => getCategories(), [getCategories]);
  const glassTypes = useMemo(() => getGlassTypes(), [getGlassTypes]);
  const stats = useMemo(() => getStats(), [getStats]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Perform search when debounced query or filters change
  useEffect(() => {
    const hasQuery = debouncedQuery.trim().length > 0;
    const hasFilters = Object.values(filters).some((value) => value !== undefined && value !== '');

    if (hasQuery || hasFilters) {
      const results = searchCocktails(debouncedQuery, filters);
      setSearchResults(results);
    } else {
      setSearchResults(cocktails);
    }
  }, [debouncedQuery, filters, cocktails, searchCocktails]);

  const handleRefresh = () => {
    getAllCocktails();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setDebouncedQuery('');
    setFilters({});
    setShowFilters(false);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== ''
  );

  const displayedCocktails = searchResults;

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <Container>
          <View className="flex-1 items-center justify-center">
            <Text className="mb-4 text-center text-destructive">{error}</Text>
            <Button onPress={handleRefresh}>
              <Text>Try Again</Text>
            </Button>
          </View>
        </Container>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Container>
        {/* Header */}
        <View className="pb-4">
          <Text className="mb-2 text-2xl font-bold text-foreground">Cocktails</Text>
          <Text className="text-sm text-muted-foreground">
            {stats.totalCocktails} recipes • {stats.categories} categories
          </Text>
        </View>

        {/* Search Bar */}
        <View className="mb-4">
          <View className="flex-row items-center rounded-lg border border-border bg-card px-3 py-2">
            <Icon
              namingScheme="sfSymbol"
              name="magnifyingglass"
              size={20}
              className="mr-2 text-muted-foreground"
            />
            <TextInput
              placeholder="Search cocktails, ingredients..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 text-foreground"
              placeholderTextColor="#9CA3AF"
            />
            {(searchQuery || hasActiveFilters) && (
              <Button variant="plain" size="sm" onPress={handleClearSearch} className="ml-2">
                <Icon
                  namingScheme="sfSymbol"
                  name="xmark"
                  size={16}
                  className="text-muted-foreground"
                />
              </Button>
            )}
          </View>

          {/* Filter Button */}
          <View className="mt-3 flex-row items-center justify-between">
            <Button
              variant={hasActiveFilters ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setShowFilters(!showFilters)}
              className="flex-row items-center">
              <Icon
                namingScheme="sfSymbol"
                name="line.3.horizontal.decrease"
                size={16}
                className="mr-1"
              />
              <Text>
                Filters
                {hasActiveFilters
                  ? ` (${Object.values(filters).filter((v) => v !== undefined && v !== '').length})`
                  : ''}
              </Text>
            </Button>

            <Text className="text-sm text-muted-foreground">
              {displayedCocktails.length} results
            </Text>
          </View>
        </View>

        {/* Filters */}
        <SearchFilters
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          glassTypes={glassTypes}
          isVisible={showFilters}
          onClose={() => setShowFilters(false)}
        />

        {/* Results */}
        <FlatList
          data={displayedCocktails}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <CocktailCard cocktail={item} />}
          refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
          ListEmptyComponent={() => (
            <View className="flex-1 items-center justify-center py-20">
              <Icon
                namingScheme="sfSymbol"
                name="magnifyingglass"
                size={48}
                className="mb-4 text-muted-foreground"
              />
              <Text className="mb-2 text-lg font-medium text-foreground">
                {isLoading ? 'Loading cocktails...' : 'No cocktails found'}
              </Text>
              <Text className="text-center text-muted-foreground">
                {isLoading
                  ? 'Please wait while we load the cocktail database'
                  : searchQuery || hasActiveFilters
                    ? 'Try adjusting your search or filters'
                    : 'Pull to refresh and load cocktails'}
              </Text>
            </View>
          )}
        />
      </Container>
    </SafeAreaView>
  );
}
