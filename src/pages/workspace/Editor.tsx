import CodeEditorWindow from '@/components/codeEditor/CodeEditorWindow';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import useFileStore from '@/src/store/useFileStore';
import { FaXmark } from 'react-icons/fa6';

const Editor = () => {
  const { files, selectedFileId } = useFileStore();

  return (
    <main className="h-[calc(100vh-96px)] flex-1 overflow-y-auto bg-mdark">
      <Tabs defaultValue={selectedFileId ? selectedFileId : ''}>
        <TabsList>
          {files?.map((file) => (
            <TabsTrigger variant="editor" key={file.id} value={file.id}>
              {file.name}
              <button
                onClick={() => {}}
                className={`text-[#888] hover:text-white `}
              >
                <FaXmark />
              </button>
            </TabsTrigger>
          ))}
        </TabsList>

        {files?.map((file) => (
          <TabsContent value={file.id}>
            <CodeEditorWindow
              key={file.id}
              fileId={file.id}
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
