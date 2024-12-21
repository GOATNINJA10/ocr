import { createWorker } from 'tesseract.js';

const converter = async (img: string) => {
    const worker = await createWorker('eng');
    const ret = await worker.recognize(img);
    const text = ret.data.text;
    // console.log(text)
    await worker.terminate();
    return text;
  }

export default converter;