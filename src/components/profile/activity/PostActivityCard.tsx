import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegBookmark, FaRegCopy, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { ThumbsUp, MessageCircle, Repeat2, Send } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { PostCardProps } from '@/components/feed/PostCard';
// import { MoreHorizontal } from 'lucide-react';
import { uploadedTimeAgo } from '@/lib/utils';
import { IoMdGlobe } from 'react-icons/io';
import DefaultImage from '@/../public/default-profile.svg'; // Adjust the path as necessary

function PostActivityCard({post}:{post:PostCardProps}) {
  const router = useRouter();
    const name = post?.author?.firstName + ' ' + post?.author?.lastName;
  return (
    <Link key={post._id} href={`/feed/update/${post._id}`} className="flex-1 min-w-0 h-full border border-border rounded-md">
    <Card className=" dark:bg-backgroundC-dark border-none rounded-md shadow-none p-0 relative">
      <div className="">
        {/* Header */}
        <div className="flex items-start justify-between p-3">
          <div className="flex items-start gap-2">
          <Image
            src={post.author.profileImageUrl ||DefaultImage}
            alt={name || "User Avatar"}
            width={40}
            height={40}
            className="rounded-full mt-1"
          />
            <div className="text-sm">
              <div className="font-semibold text-theme flex items-end gap-1">
               {name}
                <span className="text-xs text-muted-foreground">• You</span>
              </div>
              <div className="text-xs text-muted-foreground line-clamp-1">{post?.author?.headline}</div>
              <div className="flex gap-1 items-center text-muted-foreground ">
              <p className="text-xs py-0 ">
                {uploadedTimeAgo(post.createdAt)}
              </p>
              <div className="flex-center gap-1 h-5">
              • <IoMdGlobe className="inline-block " size={16}/>
              </div>
            </div>
            </div>
          </div>
          {/* <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer" /> */}
        </div>

        {/* Content */}
        {post.content && <div className="px-3 text-sm text-theme mb-2 h-fit max-h-15 relative">
          <span className='
          line-clamp-3
          '>{post.content}</span>
          <span className="text-blue-500 cursor-pointer ml-1 absolute bottom-0 right-4 bg-white dark:bg-backgroundC-dark">...more</span>
        </div>}

        {/* Image */}
        {post.images && post.images.length>0 && <div className="relative w-full overflow-hidden h-[300px]">
          <Image
            src={post?.images[0]}
            alt="Post Image"
            fill
              sizes="100vw"
            className="object-cover"
          />
          {/* <PostImageGallery
              images={post.images || []}
              /> */}
        </div>
}
        {/* Reactions */}
        <div className="px-3 pb-3 flex justify-between text-xs text-muted-foreground mt-2">
          <span>👍 {post.likes?.length} • {post.comments?.length} comments</span>
       
        </div>
        <div className="flex items-center justify-between  text-theme text-sm font-medium border-t border-border p-2">
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
              <ThumbsUp size={16} /> 
          </button>
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
              <MessageCircle size={16} /> 
          </button>
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
              <Repeat2 size={18} /> 
          </button>
          <button className="flex-1 py-2 hover:bg-muted rounded-md flex-center gap-2">
              <Send size={16} />
          </button>
         </div>
      </div>
      <div className="absolute top-2 right-2 z-10 ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="linkedIn-button-ghost"><BsThreeDots /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <FaRegBookmark className="mr-2" /> Save
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(`${window.location.origin}/feed/update/${post._id}`)}>
              <FaRegCopy className="mr-2" /> Copy link to post
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(`/feed/update/${post._id}/edit`)}>
              <FaRegEdit className="mr-2" /> Edit this post
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">
              <FaRegTrashAlt className="mr-2" /> Delete this post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  </Link>
  )
}

export default PostActivityCard