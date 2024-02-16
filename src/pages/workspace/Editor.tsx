import CodeEditorWindow from '@/components/codeEditor/CodeEditorWindow';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import useFileStore from '@/src/store/useFileStore';
import { useCallback, useEffect, useState } from 'react';
import { FaXmark } from 'react-icons/fa6';

const Editor = () => {
  const { files, selectedFileId, closeFile, selectFile } = useFileStore();
  const [tab, setTab] = useState(selectedFileId);

  // 선택된 file이 변경될 때마다 : 선택된 탭에 대한 창 띄우기 (Tabs 컴포넌트의 value 변경)
  useEffect(() => {
    if (selectedFileId) {
      setTab(selectedFileId);
    }
  }, [selectedFileId, closeFile]);

  return (
    <main className="h-[calc(100vh-96px)] flex-1 overflow-y-auto bg-mdark">
      <Tabs
        defaultValue={selectedFileId ? selectedFileId : ''}
        value={tab ? tab : selectedFileId}
        onValueChange={(value) => {
          selectFile(value);
        }}
      >
        <TabsList id="tabs-list">
          {files?.map((file) => (
            <TabsTrigger variant="editor" key={file.id} value={file.id}>
              {file.name}
              <FaXmark
                className="text-[#888] hover:text-white"
                onClick={() => closeFile(file.id)}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {files?.map((file) => (
          <TabsContent key={file.id} value={file.id} asChild>
            <CodeEditorWindow
              filePath={file.path}
              content={file.content}
              language={file.language}
              selected={file.isOpen}
            />
          </TabsContent>
        ))}

        {/* 열린 파일이 없는 경우 */}
        {!files.length && (
          <div className="flex h-[370px] flex-col items-center justify-center gap-5">
            <p className="text-[1rem] text-neutral-200">
              파일을 열어 시작하세요.
            </p>
            <div className="inline-flex items-center justify-center gap-2">
              <p className="text-[1rem] text-[#888]">Open Terminal </p>
              <div className="rounded-md border border-[#888] p-1">⌘</div>
              <div className="rounded-md border border-[#888] px-2 py-1">J</div>
            </div>
            <div className="inline-flex items-center justify-center gap-2">
              <p className="text-[1rem] text-[#888]">Save File </p>
              <div className="rounded-md border border-[#888] p-1">⌘</div>
              <div className="rounded-md border border-[#888] px-2 py-1">S</div>
            </div>
          </div>
        )}
      </Tabs>
    </main>
  );
};

export default Editor;
