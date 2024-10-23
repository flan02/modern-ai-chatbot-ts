/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import ChatWrapper from '@/components/ChatWrapper'
import { db } from '@/db'
import { ragChat } from '@/lib/rag-chat'
import { reconstructUrl } from '@/lib/utils'
import { cookies } from 'next/headers'
import React from 'react'

type PageProps = {
  params: {
    url: string | string[] | undefined
  }
}

type Url = {
  url: string[]
}

const UrlPage = async ({ params }: PageProps) => {
  const { url } = params
  //console.log(params)
  // ? We need to re construct the params string because it contains strings replacing slashes with %2F
  const sessionCookie: string = cookies().get("sessionId")!.value
  const reconstructedUrl = reconstructUrl({ url: url as string[] })

  const sessionId = (reconstructedUrl + "--" + sessionCookie).replace(/\//g, "-")
  const urlFound = await db.url.findFirst({
    where: {
      url: reconstructedUrl
    },
    select: {
      id: true
    }
  })

  if (!urlFound) {
    await ragChat.context.add({
      type: "html",
      source: reconstructedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 }
    })

    const urlAdded = await db.url.create({
      data: {
        url: reconstructedUrl
      },
      select: {
        id: true
      }
    })

  }

  // ! Check if config create some problems at the moment of creating the context

  const initialMessages = await db.chat.findMany({
    where: {
      sessionId: sessionId
    },
    select: {
      id: true,
      content: true,
      role: true
    },
    take: 10
  })

  /* 
  cursor: {
      id: sessionId
    },
    skip: 1 // ? We skip the first message because it is cursor message
  */

  // $ chunkOverlap: (Solapamiento de fragmentos) esto indica cuantos caracteres del ultimo fragmento se repetiran en el proximo para evitar perdidas de texto cuando se divida el texto.
  // $ chunkSize: (Tamaño de fragmento) esto indica cuantos caracteres tendra cada fragmento.

  return <ChatWrapper sessionId={sessionId} initialMessages={initialMessages} />
}

export default UrlPage


