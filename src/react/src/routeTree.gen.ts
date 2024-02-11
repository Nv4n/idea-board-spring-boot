/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as BoardBoardImport } from './routes/board.$board'
import { Route as BoardBoardNotesImport } from './routes/board.$board.notes'
import { Route as BoardBoardChatChatImport } from './routes/board.$board.chat.$chat'

// Create Virtual Routes

const BoardsLazyImport = createFileRoute('/boards')()
const AboutLazyImport = createFileRoute('/about')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const BoardsLazyRoute = BoardsLazyImport.update({
  path: '/boards',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/boards.lazy').then((d) => d.Route))

const AboutLazyRoute = AboutLazyImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/about.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const BoardBoardRoute = BoardBoardImport.update({
  path: '/board/$board',
  getParentRoute: () => rootRoute,
} as any)

const BoardBoardNotesRoute = BoardBoardNotesImport.update({
  path: '/notes',
  getParentRoute: () => BoardBoardRoute,
} as any)

const BoardBoardChatChatRoute = BoardBoardChatChatImport.update({
  path: '/chat/$chat',
  getParentRoute: () => BoardBoardRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      preLoaderRoute: typeof AboutLazyImport
      parentRoute: typeof rootRoute
    }
    '/boards': {
      preLoaderRoute: typeof BoardsLazyImport
      parentRoute: typeof rootRoute
    }
    '/board/$board': {
      preLoaderRoute: typeof BoardBoardImport
      parentRoute: typeof rootRoute
    }
    '/board/$board/notes': {
      preLoaderRoute: typeof BoardBoardNotesImport
      parentRoute: typeof BoardBoardImport
    }
    '/board/$board/chat/$chat': {
      preLoaderRoute: typeof BoardBoardChatChatImport
      parentRoute: typeof BoardBoardImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  AboutLazyRoute,
  BoardsLazyRoute,
  BoardBoardRoute.addChildren([BoardBoardNotesRoute, BoardBoardChatChatRoute]),
])

/* prettier-ignore-end */
