import { renderHook, waitFor } from '@testing-library/react';
import useArticles from './useArticle';
import { fetchArticles } from '../services/api';

// Mock the API function
jest.mock('../services/api');

describe('useArticles', () => {
  const mockArticles = [
    {
      id: 1,
      title: 'Mock Article 1',
      published_date: '2025-01-01',
      byline: 'By Author 1',
      media: [
        {
          'media-metadata': [
            { url: 'mock-image-1-small.jpg' },
            { url: 'mock-image-1-medium.jpg' },
            { url: 'mock-image-1-large.jpg' },
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Mock Article 2',
      published_date: '2025-01-02',
      byline: 'By Author 2',
      media: [
        {
          'media-metadata': [
            { url: 'mock-image-2-small.jpg' },
            { url: 'mock-image-2-medium.jpg' },
            { url: 'mock-image-2-large.jpg' },
          ],
        },
      ],
    },
  ];

  it('fetches articles successfully', async () => {
    // Mock the API response
    fetchArticles.mockResolvedValue(mockArticles);

    const { result } = renderHook(() => useArticles(7));

    // Initial state: loading is true
    expect(result.current.loading).toBe(true);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for the hook to finish fetching data
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.articles).toEqual(mockArticles);
      expect(result.current.error).toBe(null);
    });
  });

  it('handles errors when fetching articles', async () => {
    // Mock the API error
    fetchArticles.mockRejectedValue(new Error('Failed to fetch articles.'));

    const { result } = renderHook(() => useArticles(7));

    // Initial state: loading is true
    expect(result.current.loading).toBe(true);
    expect(result.current.articles).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for the hook to finish fetching data
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.articles).toEqual([]);
      expect(result.current.error).toBe('Failed to fetch articles.');
    });
  });


});