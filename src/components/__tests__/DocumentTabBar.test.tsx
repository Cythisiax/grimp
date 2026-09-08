import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { DocumentTabBar } from '../DocumentTabBar';

const DOCUMENTS = [
  { id: 'wendover', name: 'Wendover.yml', dirty: true },
  { id: 'sunnyvale', name: 'Sunnyvale.yml', dirty: false },
];

describe('DocumentTabBar', () => {
  it('switches documents without treating them as grid tabs', () => {
    const onSelectDocument = vi.fn();
    render(
      <DocumentTabBar
        documents={DOCUMENTS}
        activeDocumentId="wendover"
        onSelectDocument={onSelectDocument}
        onCloseDocument={vi.fn()}
        onNewMap={vi.fn()}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sunnyvale.yml' }));
    expect(onSelectDocument).toHaveBeenCalledWith('sunnyvale');
    expect(screen.queryByText('●')).not.toBeNull();
  });

  it('offers an independent close button when more than one document is open', () => {
    const onCloseDocument = vi.fn();
    render(
      <DocumentTabBar
        documents={DOCUMENTS}
        activeDocumentId="wendover"
        onSelectDocument={vi.fn()}
        onCloseDocument={onCloseDocument}
        onNewMap={vi.fn()}
      />,
    );

    fireEvent.click(screen.getAllByTitle('Close document')[1]);
    expect(onCloseDocument).toHaveBeenCalledWith('sunnyvale');
  });
});
