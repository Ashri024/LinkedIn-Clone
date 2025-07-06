import Link from "next/link";

export interface SearchPostCardProps {
    _id: string;
    content: string;
    authorName: string;
    authorId: string;
  }
  
  export function SearchPostCard({ content, authorName, authorId }: SearchPostCardProps) {
    return (
      <div className="p-4 border rounded-md">
        <Link href={`/profile/${authorId}`} className="font-semibold hover:underline">
          {authorName}
        </Link>
        <p className="mt-2 text-sm text-muted-foreground">{content}</p>
      </div>
    );
  }
  