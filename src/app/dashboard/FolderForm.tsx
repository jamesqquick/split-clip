import { getXataClient } from '@/xata';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(5),
});

export default function FolderForm() {
  async function createForm(formData: FormData) {
    'use server';
    const parsed = schema.parse({
      name: formData.get('name'),
    });
    const xataClient = getXataClient();
    const folder = await xataClient.db.folder.create({
      name: parsed.name,
    });
    redirect(`/dashboard/${folder.id}`);
  }

  return (
    <div className="w-full max-w-xs">
      <form className=" mb-4 items-end" action={createForm}>
        <div className="mb-2">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="name"
          >
            New Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            id="name"
            type="text"
            placeholder="my folder"
          />
        </div>
        <button className="bg-gray-800 w-full hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </button>
      </form>
    </div>
  );
}
