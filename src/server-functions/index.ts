import { db } from "@/db";
import { ragChat } from "@/lib/rag-chat";
import { Role } from "@prisma/client";

export async function handlerUserMessage(message: string, sessionId: string, role: Role) {
  const entry = await db.chat.create({
    data: {
      content: message,
      sessionId: sessionId,
      role: role
    }
  })
  console.log(entry);
  return { success: true, status: 200 }

}


export async function sendRagChatMessage(lastMessage: string, sessionId: string) {
  const response = await ragChat.chat(lastMessage, { streaming: true, sessionId })
  /*const responseStream = new ReadableStream({
    start(controller) {
      controller.enqueue(response.output); // Respuesta del chatbot enviada al cliente
      controller.close();
    }
  })*/
  return response
}

export async function handlerChatbotResponse(res: string, sessionId: string, role: Role) {


  const response = await db.chat.create({
    data: {
      content: res,
      sessionId: sessionId,
      role: role
    }
  })
  console.log(response);
  return { success: true, status: 200 }
}