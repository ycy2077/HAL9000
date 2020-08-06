import { PATH_ROOT, PATH_HOME } from './const'

let currentPath = PATH_HOME

export function getCurrentPath() {
  return currentPath
}

export function setCurrentPath(path: string) {
  currentPath = path
}

export type File = {
  name: string
  alias: string
  sudo: boolean
} & (
  {
    type: 'dir',
    content: File[]
  } |
  {
    type: 'file',
    content: string
  }
)

const root: File = {
  name: '/',
  alias: '/',
  sudo: true,
  type: 'dir',
  content: [
    {
      name: 'usr',
      alias: '~',
      sudo: false,
      type: 'dir',
      content: [
        {
          name: 'blog',
          alias: 'blog',
          sudo: false,
          type: 'dir',
          content: [],
        },
        {
          name: 'bin',
          alias: 'bin',
          sudo: false,
          type: 'dir',
          content: [],
        },
        {
          name: 'project',
          alias: 'project',
          sudo: false,
          type: 'dir',
          content: [],
        },
        {
          name: 'introduction.md',
          alias: 'introduction.md',
          sudo: false,
          type: 'file',
          content: '',
        },
      ],
    },
  ],
}

function addSlash(path: string) {
  if (path.length && path[path.length - 1] !== '/') {
    return `${path}/`
  }
  return path
}

function goToParentDir(path: string) {
  return path.split('/').slice(0, -1).join('/')
}

/**
 * 输入路径转化为绝对路径
 * example /usr/.. -> /
 * example ~ -> /usr
 * example currentPath = /usr ./blog -> /usr/blog
 */
function completePath(path: string): string {
  const paths = addSlash(path).split('/').slice(0, -1)
  let current = getCurrentPath()
  if (paths[0] === '') {
    current = PATH_ROOT
    paths.shift()
  } else if (paths[0] === '~') {
    current = PATH_HOME
    paths.shift()
  }

  paths.forEach((subPath) => {
    switch (subPath) {
      case '.': // nothing
        break
      case '..': // go to parent path
        current = goToParentDir(current)
        break
      default: // go to sub path
        current = addSlash(current)
        current += `${subPath}`
        break
    }
  })
  return current
}

/**
 *
 * @param {string} path
 * @return {File}
 */
function getFileWithPath(path) {
  let dir = root
  if (path === '/') {
    return dir
  }
  const paths = path.split('/').slice(1)
  paths.forEach((pathItem) => {
    dir.content.some((subFile) => {
      if (subFile.name === pathItem || subFile.comm_name === pathItem) {
        if (subFile.type === FILE_TYPE_DIR) {
          dir = subFile
        } else {
          throw ERROR_CODE_NOT_DIR
        }
        return true
      }
      return false
    })
  })

  return dir
}

function suggestPath(path = '') {
  const absoultePath = completePath(path)
  const paths = absoultePath.split('/')
  const lastPath = paths.pop()
  const dir = getFileWithPath(paths.join('/'))
  let res = ''
  if (dir.type === FILE_TYPE_DIR) {
    for (let i = 0; i < dir.content.length; i++) {
      const { name } = dir.content[i]
      if (name.indexOf(lastPath) === 0) {
        res = name.substr(lastPath.length)
        break
      }
    }
  }
  return res
}