import React from 'react';
import { render, screen } from '@testing-library/react';
import ArticleDetails from './index';

describe('ArticleDetails', () => {
  const mockArticle = {
    headline: {
      main: 'Mock Article Headline',
    },
    abstract: 'This is a mock abstract.',
    lead_paragraph: 'This is a mock lead paragraph.',
    source: 'Mock Source',
  };

  it('renders the correct article details', () => {
    render(<ArticleDetails article={mockArticle} />);

    // Check if the headline is rendered
    expect(screen.getByText(mockArticle.headline.main)).toBeInTheDocument();

    // Check if the abstract is rendered
    expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();

    // Check if the lead paragraph is rendered
    expect(screen.getByText(mockArticle.lead_paragraph)).toBeInTheDocument();

    // Check if the source is rendered
    expect(screen.getByText(`sourc: ${mockArticle.source}`)).toBeInTheDocument();
  });


  it('renders partial details if article data is incomplete', () => {
    const incompleteArticle = {
      headline: {
        main: 'Incomplete Article Headline',
      },
      // Missing abstract, lead_paragraph, and source
    };

    render(<ArticleDetails article={incompleteArticle} />);

    // Check if the headline is rendered
    expect(screen.getByText(incompleteArticle.headline.main)).toBeInTheDocument();

    // Check if abstract, lead_paragraph, and source are not rendered
    expect(screen.queryByText(/This is a mock abstract/)).not.toBeInTheDocument();
    expect(screen.queryByText(/This is a mock lead paragraph/)).not.toBeInTheDocument();
    expect(screen.queryByText(/sourc:/)).not.toBeInTheDocument(); // This should now pass
  });
});