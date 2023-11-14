import { z } from 'zod';
import { AssemblyAI } from 'assemblyai';

const schema = z.object({
  audioURL: z.string().min(5),
});

export async function POST(req: Request, res: Response) {
  const body = await req.json();
  try {
    const { audioURL } = schema.parse(body);

    const client = new AssemblyAI({
      apiKey: '273efe6f3624426abe3cbaf26241b1f1',
    });

    const transcript = await client.transcripts.create({
      audio_url: audioURL,
    });
    console.log(transcript.text);

    return new Response(JSON.stringify({ message: 'hey' }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 400,
    });
  }
}
