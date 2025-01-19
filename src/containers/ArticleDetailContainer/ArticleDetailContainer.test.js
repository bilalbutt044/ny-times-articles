import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ArticleDetailContainer from './index';
import useArticleDetail from '../../hooks/useArticleDetail';

// Mock the useArticleDetail hook
jest.mock('../../hooks/useArticleDetail');

describe('ArticleDetailContainer', () => {
  const mockArticle = {
    headline: {
      main: 'Mock Article Headline',
    },
    abstract: 'This is a mock abstract.',
    lead_paragraph: 'This is a mock lead paragraph.',
    source: 'Mock Source',
  };

  it('displays a loading message when loading', () => {
    // Mock the loading state
    useArticleDetail.mockReturnValue({
      article: null,
      error: null,
      loading: true,
    });

    render(
      <MemoryRouter initialEntries={['/article/mock-article-title']}>
        <Routes>
          <Route path="/article/:title" element={<ArticleDetailContainer />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the loading message is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays an error message when there is an error', () => {
    // Mock the error state
    useArticleDetail.mockReturnValue({
      article: null,
      error: 'Failed to fetch article.',
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/article/mock-article-title']}>
        <Routes>
          <Route path="/article/:title" element={<ArticleDetailContainer />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the error message is displayed
    expect(screen.getByText('Failed to fetch article.')).toBeInTheDocument();
  });

  it('displays "Article not found" when the article is not found', () => {
    // Mock the article not found state
    useArticleDetail.mockReturnValue({
      article: null,
      error: null,
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/article/mock-article-title']}>
        <Routes>
          <Route path="/article/:title" element={<ArticleDetailContainer />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the "Article not found" message is displayed
    expect(screen.getByText('Article not found.')).toBeInTheDocument();

    // Check if the "Go Back" button is displayed
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
  });

  it('renders the ArticleDetails component when the article is available', () => {
    // Mock the successful data state
    useArticleDetail.mockReturnValue({
      article: mockArticle,
      error: null,
      loading: false,
    });

    render(
      <MemoryRouter initialEntries={['/article/mock-article-title']}>
        <Routes>
          <Route path="/article/:title" element={<ArticleDetailContainer />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the ArticleDetails component is rendered with the correct data
    expect(screen.getByText(mockArticle.headline.main)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
    expect(screen.getByText(mockArticle.lead_paragraph)).toBeInTheDocument();
    expect(screen.getByText(`sourc: ${mockArticle.source}`)).toBeInTheDocument();
  });
});