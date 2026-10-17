import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1]?.content || '';
    const geminiApiKey = process.env.GEMINI_API_KEY;

    // If Gemini API Key is provided, use Google Generative AI
    if (geminiApiKey) {
      try {
        const systemInstruction = `You are FitSphere AI, a world-class certified fitness coach, sports nutritionist, and gym equipment biomechanist.
Your goal is to give encouraging, science-backed, accurate advice regarding workout programming, gym machine usage, Indian dietary alternatives (paneer, soya chunks, dal, curd, eggs, chicken), and supplement comparisons.
RULES:
1. Always be supportive, motivating, and concise.
2. Emphasize proper lifting form, warm-ups, and injury prevention.
3. For medical, injury, or severe dietary restrictions, explicitly state that you are an AI fitness guide, not a physician or registered clinical dietitian, and advise consulting a doctor.
4. Keep responses structured with bullet points and bold highlights when useful.`;

        const formattedContents = messages.map((m: { role: string; content: string }) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        }));

        const geminiRes = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: formattedContents,
              system_instruction: { parts: [{ text: systemInstruction }] },
              generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
            })
          }
        );

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const reply = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply) {
            return NextResponse.json({ reply });
          }
        }
      } catch (e) {
        console.warn('Gemini chat error, falling back to local reasoning agent:', e);
      }
    }

    // Local High-Performance Fitness Reasoning Engine
    const lower = latestMessage.toLowerCase();
    let reply = '';

    if (lower.includes('protein') || lower.includes('supplement') || lower.includes('whey')) {
      reply = `**FitSphere Supplement & Protein Advice:**\n\n` +
        `• **Target Intake:** For muscle gain and recovery, aim for **1.6 to 2.2 grams of protein per kg of bodyweight** daily.\n` +
        `• **Whey Isolate vs Concentrate:** Whey Concentrate (~80% protein) offers the best value per rupee for most lifters. If you are mildly lactose sensitive or in a deep calorie deficit, Whey Isolate (90%+ protein, ultra-low carbs/fat) digests faster.\n` +
        `• **Indian Whole Food Proteins:** You can pair your whey shake with economical Indian sources like **paneer (18g/100g)**, **soya chunks (52g/100g)**, **boiled eggs (6g/egg)**, and **roasted chana (20g/100g)**.\n\n` +
        `*Tip: Check our side-by-side [Supplement Comparison](/compare) to compare prices on Amazon India vs Flipkart!*`;
    } else if (lower.includes('diet') || lower.includes('meal') || lower.includes('calories') || lower.includes('vegetarian')) {
      reply = `**FitSphere Nutrition Guidance:**\n\n` +
        `• **Energy Balance:** For fat loss, target a mild caloric deficit (-300 to -400 kcal below maintenance). For lean bulking, target a slight surplus (+250 to +300 kcal).\n` +
        `• **High-Protein Vegetarian Staples:**\n` +
        `  - *Breakfast:* Masala Oats cooked with 100g crumbled Paneer or Tofu.\n` +
        `  - *Lunch:* Soya Chunk Curry + 1 katori Yellow Moong Dal + 2 multigrain rotis or brown rice.\n` +
        `  - *Snack:* Sattu buttermilk or roasted chana with green tea.\n` +
        `  - *Dinner:* Grilled Paneer / Soy Tikka with sautéed capsicum & broccoli.\n\n` +
        `*You can customize and generate your complete weekly grocery list in the [Diet Planner](/nutrition)!*`;
    } else if (lower.includes('lat') || lower.includes('back') || lower.includes('pull')) {
      reply = `**Lat Pulldown & Back Biomechanics:**\n\n` +
        `• **Grip Width:** Grip the bar 1.5× shoulder width with an overhand or thumbless hook grip.\n` +
        `• **Scapular Depression:** Before bending your elbows, depress your shoulder blades downward ("pull them into your back pockets").\n` +
        `• **Torso Angle:** Keep a slight 10-15° torso lean without swinging your lower back. Pull the bar to your upper clavicles.\n` +
        `• **Alternative:** If the lat machine is occupied, jump on the pull-up bar or use the [Seated Cable Row](/exercises)!`;
    } else if (lower.includes('leg') || lower.includes('squat') || lower.includes('press')) {
      reply = `**Leg Press & Quad Hypertrophy Tips:**\n\n` +
        `• **Foot Placement:** Mid-platform width builds balanced quadriceps. Lower placement increases quad bias (requires ankle mobility), while higher placement targets glutes and hamstrings.\n` +
        `• **Crucial Safety Rule:** Never lock your knees out aggressively at the top of the sled under heavy loads. Always maintain a soft micro-bend.\n` +
        `• **Pelvic Stability:** Keep your lower spine firmly glued to the back pad to protect your lumbar discs.`;
    } else if (lower.includes('workout') || lower.includes('split') || lower.includes('routine')) {
      reply = `**Recommended Workout Splits on FitSphere:**\n\n` +
        `• **Push-Pull-Legs (PPL):** Ideal for 3 to 6 days/week. Allows complete 48h recovery for each muscle group.\n` +
        `• **Upper / Lower Split:** Excellent for 4 days/week training with high strength carryover.\n` +
        `• **Full Body:** Best for beginners (3 days/week) to master compound movement patterns.\n\n` +
        `*Head over to the [Workout Planner](/workouts) to start your live tracked gym session right now!*`;
    } else {
      reply = `Hello! I'm your **FitSphere AI Assistant**.\n\n` +
        `I can help you with:\n` +
        `1. **Gym Equipment Recognition:** Upload any gym machine photo in [Equipment AI](/equipment-ai) for instant form instructions.\n` +
        `2. **Custom Indian Meal Plans:** Macro calculations for vegetarian, vegan, and non-veg fitness goals.\n` +
        `3. **Exercise Demos:** Video library with step-by-step cues and breathing techniques.\n` +
        `4. **Supplement Comparison:** Real price-per-gram analysis on Amazon & Flipkart.\n\n` +
        `*What fitness or nutrition goal are you working on today?*`;
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error('Chat error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
