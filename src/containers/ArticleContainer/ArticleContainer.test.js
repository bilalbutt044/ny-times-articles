import React from 'react'; // Add this line
import { render, screen } from '@testing-library/react';
import ArticleContainer from './index';
import useArticles from '../../hooks/useArticle';
import { MemoryRouter } from 'react-router-dom';

// Mock the `useArticles` hook
jest.mock('../../hooks/useArticle');

describe('ArticleContainer', () => {
  it('displays a loading message when loading', () => {
    // Mock the loading state
    useArticles.mockReturnValue({
      articles: [],
      error: null,
      loading: true,
    });

    render(
      <MemoryRouter>
        <ArticleContainer />
      </MemoryRouter>
    );

    // Check if the loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    // Mock the error state
    useArticles.mockReturnValue({
      articles: [],
      error: 'Failed to fetch articles.',
      loading: false,
    });

    render(
      <MemoryRouter>
        <ArticleContainer />
      </MemoryRouter>
    );

    // Check if the error message is displayed
    expect(screen.getByText('Failed to fetch articles.')).toBeInTheDocument();
  });

  it('renders the ArticleList with articles when data is available', () => {
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

    // Mock the successful data state
    useArticles.mockReturnValue({
      articles: mockArticles,
      error: null,
      loading: false,
    });

    render(
      <MemoryRouter>
        <ArticleContainer />
      </MemoryRouter>
    );

    // Check if the heading is present
    expect(screen.getByText('NY Times Most Popular Articles')).toBeInTheDocument();

    // Check if the ArticleList renders articles
    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    });
  });
});