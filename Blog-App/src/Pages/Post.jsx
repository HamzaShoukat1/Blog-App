import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import parse from 'html-react-parser';
import toast from 'react-hot-toast';
import { Button, Container } from '../Components';
import ConfirmDialog from '../Components/Popups/ConfirmDialogue';
import appwriteService from '../Appwrite/config';
import { getFileView } from '../Store/PostSlice';
import { clearCurrentPost, getPostbyId } from '../Store/PostSlice';



function Post() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { currentPost, status ,fileview} = useSelector((state) => state.posts);
  const imageUrl = fileview[currentPost?.featuredimage]

  
  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = currentPost && userData
    ? currentPost.userid === userData.$id
    : false;

  const localFallbackImage = '/images.jpg';

  useEffect(() => {
    dispatch(getPostbyId(slug));

    return () => {
      dispatch(clearCurrentPost());
    };
  }, [slug, dispatch]);



  //for fetch post img
 useEffect(() => {
   if(currentPost?.featuredimage && !imageUrl){
    dispatch(getFileView(currentPost?.featuredimage))
    console.log("fileView:", fileview)

   }
 }, [currentPost?.featuredimage,dispatch,imageUrl])
 

  // Delete Post
  const deletePost = () => {
    appwriteService.deletePost(currentPost.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(currentPost.featuredimage);
        navigate('/');
        toast.success('Post deleted successfully!');
      }
    });
  };

  // Confirmation Dialog Handlers
  const handleDelClick = () => {
    setConfirmOpen(true);
  };

  const handleCancel = () => {
    setConfirmOpen(false);
  };

  const handleConfirm = () => {
    deletePost();
    setConfirmOpen(false);
  };

  // Loading / Error States
  if (status === 'loading') {
    return <p className="text-center p-4"></p>;
  }

  if (status === 'failed') {
    return <p className="text-red-500 text-center p-4">Failed to load post.</p>;
  }

  // Main Render
  return currentPost ? (
    <div className="py-2">
      <Container>
        <div className="w-full flex justify-center mb-3 relative border rounded-md p-4">
            <img
               src={imageUrl || localFallbackImage}
              alt={currentPost.title}
              className="rounded-xl w-2xl"  
              onError={(e) => {
                e.currentTarget.src = localFallbackImage;
              }}
            />


          {/* Author Controls */}
          {isAuthor && (
            <div className="absolute right-8 top-8">
              <Link to={`/edit-post/${currentPost.$id}`}>
                <Button className="bg-gray-600 mr-3 cursor-pointer">
                  Edit
                </Button>
              </Link>

              <Button
                className="bg-gray-600 cursor-pointer"
                onClick={handleDelClick}
              >
                Delete

              </Button>


              <ConfirmDialog
                open={confirmOpen}
                onClose={handleCancel}
                onConfirm={handleConfirm}

               

              />

            </div>
            

          
          )}

        </div>

        {/* Post Title */}
        <div className="w-full mb-6">
          <h1 className="font-bold text-3xl">Title</h1>
          <hr className="w-15" />
          <h1 className="text-xl font-bold">{currentPost.title}</h1>
        </div>

        {/* Post Content */}
        <div>
          <h1 className="font-semibold text-3xl">Content</h1>
          <hr className="w-28" />
          {parse(currentPost.content)}
        </div>
      </Container>
    </div>
  ) : null;
}

export default Post;
