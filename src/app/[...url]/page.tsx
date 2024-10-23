/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import ChatWrapper from '@/components/ChatWrapper'
import { db } from '@/db'
import { ragChat } from '@/lib/rag-chat'
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
  const reconstrutedUrl = reconstructUrl({ url: url as Url['url'] })

  let sessionId: string = ''
  const urlFound = await db.url.findFirst({
    where: {
      url: reconstrutedUrl
    },
    select: {
      id: true
    }
  })

  if (!urlFound) {
    await ragChat.context.add({
      type: "html",
      source: reconstrutedUrl,
      config: { chunkOverlap: 50, chunkSize: 200 }
    })

    const urlAdded = await db.url.create({
      data: {
        url: reconstrutedUrl
      },
      select: {
        id: true
      }
    })

    sessionId = urlAdded.id
  } else {
    sessionId = urlFound.id
  }

  // $ chunkOverlap: (Solapamiento de fragmentos) esto indica cuantos caracteres del ultimo fragmento se repetiran en el proximo para evitar perdidas de texto cuando se divida el texto.
  // $ chunkSize: (Tamaño de fragmento) esto indica cuantos caracteres tendra cada fragmento.

  return <ChatWrapper sessionId={sessionId} />
}

export default UrlPage


function reconstructUrl({ url }: Url) {
  const decodedComponents = url.map((component) => decodeURIComponent(component))
  return decodedComponents.join('/')
}