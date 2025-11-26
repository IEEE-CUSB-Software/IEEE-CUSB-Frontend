import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import {
  selectItem,
  selectSelectedItem,
  addToFavorites,
  removeFromFavorites,
  selectFavorites,
} from '../store';
import { useItems, useCreateItem, useDeleteItem } from '../queries';

/**
 * Example Feature Component
 * This demonstrates the proper separation of concerns:
 *
 * - React Query for SERVER STATE (API calls, data fetching, caching)
 * - Redux for CLIENT STATE (UI state, selections, favorites, preferences)
 */
export const ExampleFeature = () => {
  // React Query - for server state
  const { data: items, isLoading, error } = useItems();
  const createMutation = useCreateItem();
  const deleteMutation = useDeleteItem();

  // Redux - for client/global state
  const dispatch = useAppDispatch();
  const selectedItem = useAppSelector(selectSelectedItem);
  const favorites = useAppSelector(selectFavorites);

  const handleCreateItem = () => {
    createMutation.mutate({
      name: `Item ${(items?.length ?? 0) + 1}`,
      description: 'Created via React Query mutation',
    });
  };

  const handleSelectItem = (id: string) => {
    dispatch(selectItem(id));
  };

  const handleToggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      dispatch(removeFromFavorites(id));
    } else {
      dispatch(addToFavorites(id));
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div>Loading items...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Example Feature</h2>

      <div>
        <h3>Server State (React Query)</h3>
        <button onClick={handleCreateItem} disabled={createMutation.isPending}>
          {createMutation.isPending ? 'Creating...' : 'Create New Item'}
        </button>

        <ul>
          {items?.map(item => (
            <li
              key={item.id}
              style={{
                background:
                  selectedItem === item.id ? '#e0e0e0' : 'transparent',
              }}
            >
              <strong>{item.name}</strong> - {item.description}
              <button onClick={() => handleSelectItem(item.id)}>Select</button>
              <button onClick={() => handleToggleFavorite(item.id)}>
                {favorites.includes(item.id) ? '★' : '☆'}
              </button>
              <button
                onClick={() => handleDeleteItem(item.id)}
                disabled={deleteMutation.isPending}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Client State (Redux)</h3>
        <p>Selected Item: {selectedItem ?? 'None'}</p>
        <p>Favorites: {favorites.join(', ') || 'None'}</p>
      </div>
    </div>
  );
};
