import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import path from "path";
import fs from "fs";  
import cloudinary from "../configs/cloudinary.js";
import axios from "axios";

const stylePrompts = {
  "Bold & Graphic":
    "eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style",
  "Tech/Futuristic":
    "futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere",
  Minimalist:
    "minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point",
  Photorealistic:
    "photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field",
  Illustrated:
    "illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style",
};

const colorSchemeDescriptions = {
  vibrant:
    "vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette",
  sunset:
    "warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow",
  forest:
    "natural green tones, earthy colors, calm and organic palette, fresh atmosphere",
  neon: "neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow",
  purple:
    "purple-dominant color palette, magenta and violet tones, modern and stylish mood",
  monochrome:
    "black and white color scheme, high contrast, dramatic lighting, timeless aesthetic",
  ocean:
    "cool blue and teal tones, aquatic color palette, fresh and clean atmosphere",
  pastel:
    "soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic",
};

export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;
    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    // Build the Prompt for Pollinations
    let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;
    if (color_scheme) {
      prompt += ` Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`;
    }
    if (user_prompt) {
      prompt += ` Additional instructions: ${user_prompt}`;
    }
    prompt += `, professional youtube thumbnail, high quality, 4k resolution`;

    // Determine dimensions based on aspect ratio
    let width = 1280;
    let height = 720;

    if (aspect_ratio === "1:1") {
      width = 1024;
      height = 1024;
    } else if (aspect_ratio === "9:16") {
      width = 720;
      height = 1280;
    }

    const seed = Math.floor(Math.random() * 1000000);
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

    console.log("Generating with Pollinations (Free):", pollinationsUrl);

    // Fetch the image from Pollinations
    const pollinationsResponse = await axios.get(pollinationsUrl, {
      responseType: "arraybuffer",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      },
    });

    const contentType = pollinationsResponse.headers["content-type"];
    console.log("Pollinations Response Content-Type:", contentType);

    if (!contentType?.includes("image")) {
      const errorText = Buffer.from(pollinationsResponse.data).toString();
      console.log("Pollinations actually returned text:", errorText);
      throw new Error(`Pollinations failed: ${errorText.substring(0, 100)}`);
    }

    const finalBuffer = Buffer.from(pollinationsResponse.data);

    if (!finalBuffer) {
      throw new Error("Failed to generate image data from Pollinations");
    }

    const filename = `pollinations-output-${Date.now()}.png`;
    const filePath = path.join("images", filename);

    // Create directory if it doesn't exist
    fs.mkdirSync("images", { recursive: true });
    fs.writeFileSync(filePath, finalBuffer);

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });

    thumbnail.image_url = uploadResult.secure_url || uploadResult.url;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    console.log("Thumbnail Generated and Uploaded Successfully");
    res.json({ message: "Thumbnail Generated Successfully", thumbnail });

    // Remove temporary file
    fs.unlinkSync(filePath);
  } catch (error: any) {
    console.log("Error in generation flow:", error.message);
    res.status(500).json({ message: error.message || "Failed to generate thumbnail" });
  }
};

export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {userId} = req.session;
    await Thumbnail.findOneAndDelete({_id: id, userId});
    res.json({ message: "Thumbnail deleted" });
    
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }

}
