import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";
// import { uploadFiles } from "../utils/uploadthing";

const Editor = ({ onChange, initialData, editable }) => {

    const editor = useCreateBlockNote({
        initialContent : initialData ? JSON.parse(initialData.content.body) : undefined,
        defaultStyles: true,
    });

    useEffect(() => {
        console.log('initialContent', initialData)
    }, []);

    return (
        <div className="-mx-[54px] my-4">
            <BlockNoteView
                editor={editor}
                editable={editable}
                theme='light'
                onChange={() => onChange(editor.document)}
            />
        </div>
    )
}

export default Editor