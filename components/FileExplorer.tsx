import React from 'react';
import { FileNode } from '../types';
import { Folder, FileCode, FolderOpen } from 'lucide-react';

interface Props {
  structure: FileNode[];
}

const FileItem: React.FC<{ node: FileNode; depth: number }> = ({ node, depth }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const toggleOpen = () => {
    if (node.type === 'folder') setIsOpen(!isOpen);
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center py-1 px-2 hover:bg-slate-800 cursor-pointer text-sm ${depth === 0 ? 'ml-0' : ''}`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={toggleOpen}
      >
        <span className="mr-2 text-slate-400">
          {node.type === 'folder' ? (
            isOpen ? <FolderOpen className="w-4 h-4 text-yellow-500" /> : <Folder className="w-4 h-4 text-yellow-500" />
          ) : (
            <FileCode className="w-4 h-4 text-blue-400" />
          )}
        </span>
        <span className={`${node.type === 'folder' ? 'font-semibold text-slate-200' : 'text-slate-300'}`}>
          {node.name}
        </span>
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map((child, idx) => (
            <FileItem key={`${child.name}-${idx}`} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC<Props> = ({ structure }) => {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden h-full flex flex-col">
      <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Explorador de Proyecto</span>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="p-2 overflow-y-auto flex-1 font-mono">
        <div className="text-xs text-slate-500 mb-2 px-2">root/</div>
        {structure.map((node, idx) => (
          <FileItem key={idx} node={node} depth={0} />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
