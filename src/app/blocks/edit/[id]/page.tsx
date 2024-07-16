import { editBlock } from "@/app/actions";
import { db } from "@/db";

export default async function EditBlockPage({ params }: { params: { id: string } }) {
  const block = await db.block.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!block) {
    return <p>Block not found</p>;
  }

  return (
    <form action={editBlock}>
      <h3 className="font-bold m-3">Edit Block</h3>
      <input type="hidden" name="id" value={block.id} />
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            className="border rounded p-2 w-full"
            type="text"
            name="title"
            id="title"
            defaultValue={block.title}
          />
        </div>
        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            className="border rounded p-2 w-full"
            id="code"
            name="code"
            defaultValue={block.code}
          />
        </div>
        <button
          className="rounded p-2 bg-blue-600 hover:bg-blue-700 text-white"
          type="submit"
        >
          Update
        </button>
      </div>
    </form>
  );
}
