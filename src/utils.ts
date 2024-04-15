export function extractTitles(input: string) {
  // Define a regular expression pattern to match the title values
  const pattern = /"title\d+":\s*"([^"]+)"/g;
  const titles: string[] = [];
  let match;

  // Loop through all matches of the pattern
  while ((match = pattern.exec(input)) !== null) {
      if (match && match.length >= 1)
          titles.push(match[1] as string);
  }

  const defaultTitles = ["A Sunset's Embrace", "Whimsical Wanderer", "Nature's Fury", "Ephemeral Dreams"];
  let i = 0;
  while(titles.length<4){
      titles.push(defaultTitles[i])
      i++;
  }
  return titles;
}

export function selectRandomTitle(titles: string[]) {
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
}

export async function fetchImageFromStream(stream: ReadableStream) {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    chunks.push(value);
  }

  const blob = new Blob(chunks, { type: 'image/jpeg' }); // Adjust type based on actual image format
  const imageUrl = URL.createObjectURL(blob);
  console.log(imageUrl)
  return imageUrl;
}

export async function fetchTextFromStream(stream: ReadableStream) {
  const reader = stream.getReader();
  let text = '';

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      break;
    }

    // Assuming the text is encoded as UTF-8
    text += new TextDecoder().decode(value);
  }

  return text;
}