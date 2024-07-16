import { db } from "@/db";
import { deleteBlock } from "@/app/actions";
import Link from "next/link";

export default async function DeletePage({ params }: { params: { id: string } }) {
  const block = await db.block.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!block) {
    return <p>Block not found</p>;
  }

  return (
    <div>
      <h3 className="font-bold m-3">Are you sure you want to delete this block?</h3>
      <p className="mt-4">Title: {block.title}</p>
      <p className="mt-2">Code: {block.code}</p>
      <form action={deleteBlock} method="post">
        <input type="hidden" name="id" value={block.id} />
        <button
          className="rounded p-2 bg-red-600 hover:bg-red-700 text-white mt-4"
          type="submit"
        >
          Confirm Delete
        </button>
        <Link href={`/blocks/${block.id}`}>
          <button className="rounded p-2 bg-gray-600 hover:bg-gray-700 text-white mt-4 ml-2">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
}
