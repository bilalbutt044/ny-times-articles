import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Required for testing components with <Link>
import ArticleList from './index';

describe('ArticleList', () => {
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
          caption: 'Mock Caption 1',
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
          caption: 'Mock Caption 2',
        },
      ],
    },
  ];

  it('renders the correct number of articles', () => {
    render(
      <MemoryRouter>
        <ArticleList articles={mockArticles} />
      </MemoryRouter>
    );

    // Check if all articles are rendered
    const articleElements = screen.getAllByRole('link');
    expect(articleElements).toHaveLength(mockArticles.length);
  });

  it('displays the correct article details', () => {
    render(
      <MemoryRouter>
        <ArticleList articles={mockArticles} />
      </MemoryRouter>
    );

    // Check if the title, published date, and byline are displayed for each article
    mockArticles.forEach((article) => {
      expect(screen.getByText(article.title)).toBeInTheDocument();
      expect(screen.getByText(`Published Date: ${article.published_date}`)).toBeInTheDocument();
      expect(screen.getByText(article.byline)).toBeInTheDocument();
    });
  });

  it('renders the correct image for each article', () => {
    render(
      <MemoryRouter>
        <ArticleList articles={mockArticles} />
      </MemoryRouter>
    );

    // Check if the correct image is rendered for each article
    mockArticles.forEach((article) => {
      const imageElement = screen.getByAltText(article.media[0].caption);
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('src', article.media[0]['media-metadata'][1].url);
    });
  });

  it('renders the correct link for each article', () => {
    render(
      <MemoryRouter>
        <ArticleList articles={mockArticles} />
      </MemoryRouter>
    );

    // Check if the correct link is rendered for each article
    mockArticles.forEach((article) => {
      // Construct the accessible name for the link
      const accessibleName = `${article.media[0].caption} ${article.title} Published Date: ${article.published_date} ${article.byline}`;
      const linkElement = screen.getByRole('link', { name: accessibleName });
      expect(linkElement).toHaveAttribute('href', `/article/${article.title}`);
    });
  });

  it('renders nothing if articles array is empty', () => {
    const { container } = render(
      <MemoryRouter>
        <ArticleList articles={[]} />
      </MemoryRouter>
    );

    // Check if no articles are rendered
    expect(container.firstChild).toBeEmptyDOMElement();
  });
});