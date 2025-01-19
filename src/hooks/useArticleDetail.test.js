import { renderHook, waitFor } from '@testing-library/react';
import useArticleDetail from './useArticleDetail';
import { fetchArticleDetail } from '../services/api';

// Mock the API function
jest.mock('../services/api');

describe('useArticleDetail', () => {
  const mockArticle = {
    headline: {
      main: 'Mock Article Headline',
    },
    abstract: 'This is a mock abstract.',
    lead_paragraph: 'This is a mock lead paragraph.',
    source: 'Mock Source',
  };

  it('fetches article details successfully', async () => {
    // Mock the API response
    fetchArticleDetail.mockResolvedValue(mockArticle);

    const { result } = renderHook(() => useArticleDetail('mock-article-title'));

    // Initial state: loading is true
    expect(result.current.loading).toBe(true);
    expect(result.current.article).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for the hook to finish fetching data
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.article).toEqual(mockArticle);
      expect(result.current.error).toBe(null);
    });
  });

  it('handles errors when fetching article details', async () => {
    // Mock the API error
    fetchArticleDetail.mockRejectedValue(new Error('Failed to fetch article.'));

    const { result } = renderHook(() => useArticleDetail('mock-article-title'));

    // Initial state: loading is true
    expect(result.current.loading).toBe(true);
    expect(result.current.article).toEqual([]);
    expect(result.current.error).toBe(null);

    // Wait for the hook to finish fetching data
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.article).toEqual([]);
      expect(result.current.error).toBe('Failed to fetch article.');
    });
  });

});