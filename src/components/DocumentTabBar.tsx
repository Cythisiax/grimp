import React from 'react';

export interface DocumentTab {
  id: string;
  name: string;
  dirty: boolean;
}

interface Props {
  documents: DocumentTab[];
  activeDocumentId: string;
  onSelectDocument: (id: string) => void;
  onCloseDocument: (id: string) => void;
  onNewMap: () => void;
}

/**
 * Top-level document tabs. GridTabBar remains below this component: a document
 * can contain several grids, while each document tab is a separate YAML file.
 */
export const DocumentTabBar: React.FC<Props> = ({
  documents,
  activeDocumentId,
  onSelectDocument,
  onCloseDocument,
  onNewMap,
}) => {
  return (
    <div className="flex items-end bg-elevated border-b border-subtle shrink-0">
      <div className="flex items-end overflow-x-auto min-w-0">
        {documents.map((document) => {
          const active = document.id === activeDocumentId;
          return (
            <div
              key={document.id}
              role="button"
              tabIndex={0}
              aria-label={document.name}
              className={`px-3 py-1.5 text-xs cursor-pointer border-x-0 border-t-0 border-b-2 whitespace-nowrap
                ${active ? 'bg-panel text-primary border-b-accent' : 'bg-elevated text-muted border-b-transparent hover:bg-hover hover:text-primary'}`}
              onClick={() => onSelectDocument(document.id)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') onSelectDocument(document.id);
              }}
              title={document.name}
            >
              {document.dirty && <span className="text-warning mr-1">●</span>}
              {document.name}
              {documents.length > 1 && (
                <button
                  className="ml-2 text-muted hover:text-danger"
                  title="Close document"
                  onClick={(event) => {
                    event.stopPropagation();
                    onCloseDocument(document.id);
                  }}
                >
                  ×
                </button>
              )}
            </div>
          );
        })}
        <button
          className="px-2 py-1.5 text-xs text-muted hover:text-primary hover:bg-hover"
          title="New map document"
          onClick={onNewMap}
        >
          +
        </button>
      </div>
    </div>
  );
};
