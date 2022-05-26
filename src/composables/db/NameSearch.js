import { ref, computed } from 'vue';

export default function useNameSearch(repositories) {
  const searchQuery = ref('');

  const matchingSearchQuery = computed(() => {
    if (searchQuery.value) {
      return repositories.value.filter((repository) => {
        return repository.name
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase());
      });
    } else {
      return repositories.value;
    }
  });

  return {
    searchQuery,
    matchingSearchQuery
  };
}
