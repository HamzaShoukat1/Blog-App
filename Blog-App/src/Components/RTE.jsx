import { Editor } from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"


export default function RTE({control,name, label,}){
  return (
    <div className='md:w-full w-[90%] mx-auto px-2 py-4 md:py-0'>
      {label && <label className='inline-block mb-1  pl-1'>
        {label}
        </label>}

        <Controller

        name={name || "content"}
        control={control}
                rules={{ required: "Content is required" }} 
        render={({field: {onChange},fieldState:{error}})=> (
        
      <>
          {error && (
              <p className="text-red-600 text-sm mt-1">{error.message}</p> 
            )}
          <Editor
        
            onEditorChange={onChange}
        // value={value}


  init={
   {branding: false,
     height: 400,
    //  width:800,
     menubar:true,
   plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
              ],
              toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style: "body {font-family:Helvetica, Arial, sans-serif; font-size:14px}"


   }
  }
   /> 
      </>
          
        )}

       />

    </div>
 
  )
}