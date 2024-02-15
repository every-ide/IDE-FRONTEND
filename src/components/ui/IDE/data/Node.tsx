import React, { FC } from 'react';
import { NodeApi, NodeRendererProps, TreeApi } from 'react-arborist';
import { AiFillFolder } from 'react-icons/ai';
import { MdArrowRight, MdArrowDropDown, MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

import useFileStore from '@/src/store/useFileStore';
import {
  getFileIcon,
  getFileLanguage,
} from '@/src/utils/fileTree/langauageSelector';
import { FileNodeType } from '@/src/types/IDE/FileTree/FileDataTypes';
// DiC 아이콘을 대신할 적절한 아이콘을 찾아 import하세요.

interface MyNodeData {
  id: string;
  name: string;
  type: 'file' | 'directory';
  icon?: React.ElementType;
  iconColor?: string;
  children?: MyNodeData[];
}

interface NodeProps {
  node: NodeApi<MyNodeData>;
  style: React.CSSProperties;
  dragHandle: React.Ref<HTMLDivElement>;
  tree: TreeApi<MyNodeData>;
}

const Node: FC<NodeProps> = ({
  node,
  style,
  dragHandle,
  tree,
}): NodeRendererProps<FileNodeType> => {
  const { selectFile, openFile } = useFileStore();

  // 파일 확장자를 기반으로 아이콘 선택
  const IconComponent =
    node.data.type === 'file' ? (
      getFileIcon(node.data.name)
    ) : (
      <AiFillFolder color="#f6cf60" />
    );

  const FolderArrowIcon =
    node.data.type === 'directory' ? (
      node.isOpen ? (
        <MdArrowDropDown />
      ) : (
        <MdArrowRight />
      )
    ) : (
      <span className="pl-3"> </span>
    );

  const nodeStyle = node.data.type === 'file' ? 'file-node' : 'folder-node';

  const handleNodeClick = () => {
    const { id, name, type } = node.data;
    const lang = getFileLanguage(name);
    console.log('Node ID:', node.data.id); // 현재 노드의 ID 출력
    console.log('Node Data:', node.data); // 현재 노드의 데이터 출력
    console.log(node.isInternal);

    if (type === 'file') {
      selectFile(node.data.id);
      openFile(id, name, null, lang);
    }
    if (node.isInternal || node.data.type === 'directory') {
      node.toggle(); // 내부 노드인 경우, 열기/닫기 토글
    }
  };

  return (
    <div
      className={`node-container ${nodeStyle} ${node.state.isSelected ? 'isSelected' : ''}`}
      style={style}
      ref={dragHandle}
    >
      <div className="node-content" onClick={() => handleNodeClick()}>
        <span>{FolderArrowIcon}</span>
        <span className="file-folder-icon">{IconComponent}</span>
        <span className="node-text">
          {node.isEditing ? (
            <input
              type="text"
              defaultValue={node.data.name}
              onFocus={(e) => e.currentTarget.select()}
              onBlur={() => node.reset()}
              onKeyDown={(e) => {
                if (e.key === 'Escape') node.reset();
                if (e.key === 'Enter') node.submit(e.currentTarget.value);
              }}
              autoFocus
            />
          ) : (
            <span>{node.data.name}</span>
          )}
        </span>
      </div>

      <div className="file-actions">
        <div className="folderFileActions">
          <button onClick={() => node.edit()} title="Rename...">
            <MdEdit />
          </button>
          <button onClick={() => tree.delete(node.id)} title="Delete">
            <RxCross2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Node;
