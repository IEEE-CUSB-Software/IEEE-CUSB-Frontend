import { http, HttpResponse } from 'msw';
import type { Item, CreateItemDto } from '../types';

/**
 * Mock data for items
 */
let mockItems: Item[] = [
  {
    id: '1',
    name: 'Item 1',
    description: 'First example item',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Item 2',
    description: 'Second example item',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Item 3',
    description: 'Third example item',
    createdAt: new Date().toISOString(),
  },
];

/**
 * MSW Handlers for Example Feature Items API
 */
export const itemHandlers = [
  // GET /api/items - Fetch all items
  http.get('/api/items', () => {
    return HttpResponse.json(mockItems, { status: 200 });
  }),

  // GET /api/items/:id - Fetch single item
  http.get('/api/items/:id', ({ params }) => {
    const { id } = params;
    const item = mockItems.find(i => i.id === id);

    if (!item) {
      return HttpResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return HttpResponse.json(item, { status: 200 });
  }),

  // POST /api/items - Create new item
  http.post('/api/items', async ({ request }) => {
    const newItem = (await request.json()) as CreateItemDto;
    const item: Item = {
      id: Math.random().toString(36).substr(2, 9),
      ...newItem,
      createdAt: new Date().toISOString(),
    };

    mockItems.push(item);
    return HttpResponse.json(item, { status: 201 });
  }),

  // PUT /api/items/:id - Update item
  http.put('/api/items/:id', async ({ params, request }) => {
    const { id } = params;
    const updates = (await request.json()) as Partial<Item>;
    const itemIndex = mockItems.findIndex(i => i.id === id);

    if (itemIndex === -1) {
      return HttpResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    const updatedItem: Item = {
      ...mockItems[itemIndex],
      ...updates,
      id: id as string, // Prevent id from being updated
      name: updates.name ?? mockItems[itemIndex]!.name,
      description: updates.description ?? mockItems[itemIndex]!.description,
      updatedAt: new Date().toISOString(),
    };

    mockItems[itemIndex] = updatedItem;

    return HttpResponse.json(mockItems[itemIndex], { status: 200 });
  }),

  // DELETE /api/items/:id - Delete item
  http.delete('/api/items/:id', ({ params }) => {
    const { id } = params;
    const itemIndex = mockItems.findIndex(i => i.id === id);

    if (itemIndex === -1) {
      return HttpResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    mockItems = mockItems.filter(i => i.id !== id);

    return HttpResponse.json(
      { message: 'Item deleted successfully' },
      { status: 200 }
    );
  }),
];
