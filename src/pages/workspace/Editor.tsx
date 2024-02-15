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
  const { files, selectedFilePath, closeFile, selectFile } = useFileStore();
  const [tab, setTab] = useState(selectedFilePath);

  // 선택된 file이 변경될 때마다 : 선택된 탭에 대한 창 띄우기 (Tabs 컴포넌트의 value 변경)
  useEffect(() => {
    if (selectedFilePath) {
      setTab(selectedFilePath);
    }
  }, [selectedFilePath, closeFile]);

  return (
    <main className="h-[calc(100vh-96px)] flex-1 overflow-y-auto bg-mdark">
      <Tabs
        defaultValue={selectedFilePath ? selectedFilePath : ''}
        value={tab ? tab : selectedFilePath}
        onValueChange={(value) => {
          selectFile(value);
        }}
      >
        <TabsList id="tabs-list">
          {files?.map((file) => (
            <TabsTrigger variant="editor" key={file.path} value={file.path}>
              {file.name}
              <FaXmark
                className="text-[#888] hover:text-white"
                onClick={() => closeFile(file.path)}
              />
            </TabsTrigger>
          ))}
        </TabsList>

        {files?.map((file) => (
          <TabsContent key={file.path} value={file.path} asChild>
            <CodeEditorWindow
              filePath={file.path}
              content={file.content}
              language={file.language}
              selected={file.isOpen}
            />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
};

export default Editor;
