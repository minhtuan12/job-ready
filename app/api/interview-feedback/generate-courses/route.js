import { softSkills } from '@/utils/constants';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { weaknesses } = await req.json();
        if (!weaknesses || weaknesses.length === 0) {
            return NextResponse.json({ error: 'Missing weaknesses' }, { status: 400 });
        }
        // Compose a prompt for Gemini
        const prompt = `Bạn là chuyên gia huấn luyện phỏng vấn. Tôi có một danh sách các khóa học sau đây:
${JSON.stringify(softSkills)}

Dựa trên các điểm yếu trong buổi phỏng vấn "${weaknesses.join(', ')}", hãy đề xuất 3 khóa học phù hợp nhất từ danh sách trên để cải thiện điểm yếu đó.

Định dạng câu trả lời của bạn phải là một mảng JSON (array of objects), chỉ bao gồm các khóa học từ danh sách đã cho. Mỗi đối tượng trong mảng phải có các trường: "name".
\`\`\`json
[
    {
        "name": "Tên khóa học",
    },
    {
        "name": "Tên khóa học",
    }
]
\`\`\`
Gợi ý phải bằng tiếng Việt, tập trung vào cách cải thiện rõ ràng, không chung chung.`
        const { generateWithRetry } = await import("@/utils/GeminiAIModal");
        const suggestion = await generateWithRetry(prompt);
        return NextResponse.json({ suggestion }, { status: 200 });
    } catch (error) {
        console.error('Error generating suggestion:', error);
        return NextResponse.json({ error: 'Failed to generate suggestion' }, { status: 500 });
    }
} 