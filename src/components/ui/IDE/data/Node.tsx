import React, { FC } from 'react';
import { NodeApi, TreeApi } from 'react-arborist';
import { AiFillFolder, AiFillFile } from 'react-icons/ai';
import { MdArrowRight, MdArrowDropDown, MdEdit } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
// 필요한 아이콘들을 import
import { DiJavascript1, DiReact, DiPython } from 'react-icons/di';
import {
  SiCss3,
  SiHtml5,
  SiJson,
  SiMarkdown,
  SiTypescript,
} from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';
import { LiaJava } from 'react-icons/lia';
// DiC 아이콘을 대신할 적절한 아이콘을 찾아 import하세요.

interface MyNodeData {
  id: string;
  name: string;
  type: 'file' | 'folder';
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

const Node: FC<NodeProps> = ({ node, style, dragHandle, tree }) => {
  // 확장자에 따른 아이콘을 반환하는 함수

  // console.log('Node:isLeaf', node.data.id + ' :' + node.isLeaf);
  const getFileIcon = (filename: string) => {
    const extension = filename.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'js':
        return <DiJavascript1 color="#ffdf5d" />; // 더 밝은 노란색
      case 'jsx':
        return <DiReact color="#97dffd" />; // 더 밝은 파란색
      case 'ts':
        return <SiTypescript color="#63b3ed" />; // 밝은 청색
      case 'tsx':
        return <DiReact color="#97dffd" />; // 더 밝은 파란색
      case 'py':
        return <DiPython color="#7fb4e0" />; // 밝은 파랑
      case 'c':
        return <TbBrandCpp color="#b8d3e6" />; // 매우 밝은 청색
      case 'cpp':
        return <TbBrandCpp color="#6a9fb5" />; // 밝은 청색
      case 'html':
        return <SiHtml5 color="#f06529" />; // 밝은 주황색
      case 'css':
        return <SiCss3 color="#66d3fa" />; // 밝은 하늘색
      case 'json':
        return <SiJson color="#b8d3e6" />; // 매우 밝은 청색
      case 'md':
        return <SiMarkdown color="#f06529" />; // 밝은 주황색
      case 'java':
        return <LiaJava color="#f9be76" />; // 밝은 오렌지색
      default:
        return <AiFillFile color="#9ad0ec" />; // 매우 밝은 파란색
    }
  };

  // 파일 확장자를 기반으로 아이콘 선택
  const IconComponent =
    node.data.type === 'file' ? (
      getFileIcon(node.data.name)
    ) : (
      <AiFillFolder color="#f6cf60" />
    );

  const FolderArrowIcon =
    node.data.type === 'folder' ? (
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
    console.log('Node ID:', node.data.id); // 현재 노드의 ID 출력
    console.log('Node Data:', node.data); // 현재 노드의 데이터 출력
    console.log('부모노드', node.parent?.data); // 부모 노드의 데이터 출력 (부모 ID가 있는 경우)
    // console.log(node.)
    if (node.isInternal) {
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
